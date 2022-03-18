import express from 'express';

const server = express();

server.use(express.json());

server.listen(3000, () =>
    console.log('Server ready at: http://localhost:3000')
);
