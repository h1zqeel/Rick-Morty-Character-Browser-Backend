import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from './schema.js';
import express from 'express';
import http from 'http';
import cors from 'cors';
import resolvers from './resolvers/index.js';

const createServer = async () => {
	const app = express();
	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
	});

	await server.start();

	app.use('/', (req, res) => { res.send('Hello World!').end(); });
	app.use('/graphql', cors(), express.json(), expressMiddleware(server));

	return httpServer;
};

export default createServer;
