"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs_1 = require("./typeDefs");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const schema_1 = require("@graphql-tools/schema");
const server_1 = require("@apollo/server");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express4_1 = require("@as-integrations/express4");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const merge_resolvers_1 = require("./resolvers/merge-resolvers");
const dotenv_1 = __importDefault(require("dotenv"));
const graphql_upload_minimal_1 = require("graphql-upload-minimal");
const logger_1 = require("./lib/logger");
const morgan_1 = __importDefault(require("morgan"));
// Asnychronous Anonymous Function
// Inside of server.ts -> await keyword
dotenv_1.default.config();
(async function () {
    const PORT = Number(process.env.PORT) || 3000;
    // Server code in here!
    const pubsub = new graphql_subscriptions_1.PubSub(); // Publish and Subscribe, Publish -> everyone gets to hear it
    const app = (0, express_1.default)();
    // HTTP request logging
    app.use((0, morgan_1.default)('combined', {
        stream: {
            write: (message) => logger_1.logger.info(message.trim())
        }
    }));
    // Request ID middleware
    app.use((req, res, next) => {
        req.id = Math.random().toString(36).substring(7);
        res.setHeader('X-Request-ID', req.id);
        next();
    });
    const httpServer = (0, http_1.createServer)(app);
    app.use((0, cors_1.default)({
        origin: true, // hoặc '*'
        credentials: true,
    }));
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs_1.typeDefs, resolvers: merge_resolvers_1.resolvers });
    // ws Server
    const wsServer = new ws_1.WebSocketServer({
        server: httpServer,
        path: "/graphql" // localhost:3000/graphql
    });
    const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer); // dispose
    // apollo server
    const server = new server_1.ApolloServer({
        schema,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    };
                }
            }
        ]
    });
    // start our server
    await server.start();
    app.use((0, graphql_upload_minimal_1.graphqlUploadExpress)({
        maxFileSize: 5000000,
        maxFiles: 1,
    }));
    // apply middlewares (cors, expressmiddlewares)
    app.use('/graphql', (0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req, res }) => {
            const contextLogger = (0, logger_1.createContextLogger)({
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
    // http server start
    // http server start
    httpServer.listen(PORT, "0.0.0.0", () => {
        logger_1.logger.info('Server started', {
            port: PORT,
            env: process.env.NODE_ENV,
            graphql: '/graphql',
            loki_enabled: !!process.env.GRAFANA_LOKI_URL,
        });
    });
})();
