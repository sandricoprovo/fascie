import express from 'express';

import businessesRouter from './routes/businesses';
import locationsRouter from './routes/locations';
import categoriesRouter from './routes/categories';

const server = express();

// Express Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Routers
server.use('/businesses', businessesRouter);
server.use('/locations', locationsRouter);
server.use('/categories', categoriesRouter);

export default server;
