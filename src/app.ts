import { typeDefs } from './typeDefs';
import express from 'express';
import { createServer } from 'http';
import { PubSub } from 'graphql-subscriptions';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { resolvers } from './resolvers/merge-resolvers';
import dotenv from "dotenv";
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { logger, createContextLogger } from './lib/logger';
import morgan from 'morgan';
import AuthRouter from '@/routes/auth.route'
import { errorHandler } from '@/middlewares/error.middleware'
// Asnychronous Anonymous Function
// Inside of server.ts -> await keyword
dotenv.config();

(async function () {
    const PORT = Number(process.env.PORT) || 3000;
    // Server code in here!
    const pubsub = new PubSub(); // Publish and Subscribe, Publish -> everyone gets to hear it
    const app = express();
    app.use(express.json())
    app.use((req: any, res, next) => {
        req.id = Math.random().toString(36).substring(7);
        res.setHeader('X-Request-ID', req.id);
        next();
    });
    // HTTP request logging
    morgan.token('request-id', (req: any) => req.id);

    app.use(
      morgan((tokens, req: any, res) => {
        return JSON.stringify({
          type: 'http_access',
          request_id: req.id,
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: Number(tokens.status(req, res)),
          response_time_ms: Number(tokens['response-time'](req, res)),
          content_length: tokens.res(req, res, 'content-length'),
          user_agent: tokens['user-agent'](req, res),
          ip: tokens['remote-addr'](req, res),
        });
      }, {
        stream: {
          write: (message: string) => {
            logger.info('http_request', JSON.parse(message));
          },
        },
      })
    );
    
    // Request ID middleware

    const httpServer = createServer(app);

    interface createNewsEventInput {
        title: string
        description: string
    }
    app.use(cors({
      origin: true, // hoặc '*'
      credentials: true,
    }));
    
    const schema = makeExecutableSchema({ typeDefs, resolvers: resolvers });

    // ws Server
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql" // localhost:3000/graphql
    });

    const serverCleanup = useServer({ schema }, wsServer); // dispose

    // apollo server
    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ]
    });

    // start our server
    await server.start();
    app.use(
        graphqlUploadExpress({
          maxFileSize: 5_000_000,
          maxFiles: 1,
        })
      )
    app.use('/auth', AuthRouter)
    // apply middlewares (cors, expressmiddlewares)
    app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server, {
        context: async ({ req, res }: any) => {
            const contextLogger = createContextLogger({
                request_id: req.id,
            });
            
            return {
                req,
                res,
                pubsub,
                logger: contextLogger, // ← Add logger to context
                requestId: req.id,
            };
        }
    }));

    app.use(errorHandler)

      

    // http server start
    // http server start

    httpServer.listen(PORT, "0.0.0.0", () => {
        logger.info('Server started', {
            port: PORT,
            env: process.env.NODE_ENV,
            graphql: '/graphql',
            loki_enabled: !!process.env.GRAFANA_LOKI_URL,
        });
    });

})();
