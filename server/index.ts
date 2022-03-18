import express from 'express';

const server = express();

server.use(express.json());

server.listen(4000, () =>
    console.log('Server ready at: http://localhost:4000')
);
