import createServer from './server.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = 4000;

const httpServer = await createServer();
httpServer.listen(PORT, () =>
	console.log(`🚀 Server ready at http://localhost:${PORT}/`)
);
