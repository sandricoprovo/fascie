import express from 'express';

import { businessRouter, locationRouter, categoryRouter } from './routes';

const server = express();

// Express Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Routers
server.use('/businesses', businessRouter);
server.use('/locations', locationRouter);
server.use('/categories', categoryRouter);

export default server;
