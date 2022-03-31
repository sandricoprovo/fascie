import express from 'express';

import { businessRouter, locationRouter } from './routes';

const server = express();

// Express Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Routers
server.use('/businesses', businessRouter);
server.use('/locations', locationRouter);

server.listen(4000, () =>
    console.log('Server ready at: http://localhost:4000')
);
