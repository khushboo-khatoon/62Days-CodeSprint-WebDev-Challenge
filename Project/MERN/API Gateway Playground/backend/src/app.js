import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import routeRoutes from './routes/routes.routes.js';
import keyRoutes from './routes/keys.routes.js';
import logRoutes from './routes/logs.routes.js';
import { gatewayHandler } from './gateway/gatewayHandler.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'api-gateway-playground' }));

app.use('/api/auth', authRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/keys', keyRoutes);
app.use('/api/logs', logRoutes);

// The simulated gateway itself: every method, any depth under /gateway.
app.all('/gateway*', gatewayHandler);

app.use(notFound);
app.use(errorHandler);

export default app;
