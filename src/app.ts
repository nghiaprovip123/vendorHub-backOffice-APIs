import { typeDefs } from './typeDefs';
import express from 'express';
import { createServer } from 'http';
import { PubSub } from 'graphql-subscriptions';
import gql from 'graphql-tag';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { resolvers } from './resolvers/mergeResolvers';

// Asnychronous Anonymous Function
// Inside of server.ts -> await keyword

( async function () {
    // Server code in here!
    const pubsub = new PubSub(); // Publish and Subscribe, Publish -> everyone gets to hear it
    const app = express();
    const httpServer = createServer(app);

    interface createNewsEventInput {
        title: string
        description: string
    }
    const schema = makeExecutableSchema({typeDefs, resolvers:resolvers});

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

    // apply middlewares (cors, expressmiddlewares)
    app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server,{
        context: async ({ req, res }) => ({
      req,
      res,
      pubsub, // nếu cần cho subscriptions
})
    }));

    // http server start
    // http server start
    httpServer.listen(4000, () => {
        console.log("Server running on http://localhost:" + "4000" + "/graphql");
    });


})();
