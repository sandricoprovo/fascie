import server from './server';

function liftServer(port: number) {
    try {
        // Starts the server at the passed port
        server.listen(port, () =>
            console.log(`Server ready at: http://localhost:${port}`)
        );
    } catch (error) {
        // Catches any error lifting the server and exits the process
        console.error(error);
        process.exit();
    }
}

// Starts the server
liftServer(4000);
