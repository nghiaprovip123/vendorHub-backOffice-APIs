"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContextLogger = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_loki_1 = __importDefault(require("winston-loki"));
// Format logs
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json());
// Transports
const transports = [
    // Console (local dev)
    new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.printf(({ timestamp, level, message, ...meta }) => {
            return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
        })),
    }),
];
// Add Grafana Cloud Loki (production)
if (process.env.GRAFANA_LOKI_URL) {
    console.log('Grafana Cloud Loki enabled');
    transports.push(new winston_loki_1.default({
        host: process.env.GRAFANA_LOKI_URL,
        basicAuth: `${process.env.GRAFANA_LOKI_USER}:${process.env.GRAFANA_LOKI_API_KEY}`,
        labels: {
            service: 'vendorhub-backend',
            env: process.env.NODE_ENV || 'development',
        },
        json: true,
        batching: true,
        interval: 5,
        onConnectionError: (err) => {
            if (err instanceof Error) {
                console.error('Loki connection error:', err.message);
            }
            else {
                console.error('Loki connection error:', err);
            }
        },
    }));
}
// Create logger
exports.logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    transports,
});
// Helper
const createContextLogger = (context) => ({
    info: (message, meta) => exports.logger.info(message, { ...context, ...meta }),
    error: (message, meta) => exports.logger.error(message, { ...context, ...meta }),
    warn: (message, meta) => exports.logger.warn(message, { ...context, ...meta }),
});
exports.createContextLogger = createContextLogger;
