import express from 'express';

import businessRouter from './routes/businesses';

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// Routers
server.use('/businesses', businessRouter);

server.listen(4000, () =>
    console.log('Server ready at: http://localhost:4000')
);
