import winston from 'winston';
import LokiTransport from 'winston-loki';

// Format logs
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Transports
const transports: winston.transport[] = [
  // Console (local dev)
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        return `${timestamp} [${level}]: ${message} ${
          Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
        }`;
      })
    ),
  }),
];

// Add Grafana Cloud Loki (production)
if (process.env.GRAFANA_LOKI_URL) {
  console.log('Grafana Cloud Loki enabled');
  
  transports.push(
    new LokiTransport({
      host: process.env.GRAFANA_LOKI_URL,
      basicAuth: `${process.env.GRAFANA_LOKI_USER}:${process.env.GRAFANA_LOKI_API_KEY}`,
      
      labels: {
        service: 'vendorhub-backend',
        env: process.env.NODE_ENV || 'development',
      },
      
      json: true,
      batching: true,
      interval: 5,
      
      onConnectionError: (err: unknown) => {
        if (err instanceof Error) {
          console.error('Loki connection error:', err.message);
        } else {
          console.error('Loki connection error:', err);
        }
      },
    })
  );
}

// Create logger
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports,
});

// Helper
export const createContextLogger = (context: Record<string, any>) => ({
  info: (message: string, meta?: Record<string, any>) => 
    logger.info(message, { ...context, ...meta }),
  error: (message: string, meta?: Record<string, any>) => 
    logger.error(message, { ...context, ...meta }),
  warn: (message: string, meta?: Record<string, any>) => 
    logger.warn(message, { ...context, ...meta }),
});