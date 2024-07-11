import request from 'supertest';
import {createServer} from '../../server.js';
import nock from 'nock';
import {
	testCharacterData,
	testCharactersData
} from '../fixtures/characters.js';
let server;

describe('GraphQL API', function () {
	beforeAll(async () => {
		server = await createServer();
	});

	afterAll(() => {
		server.close();
	});

	describe('All characters', function () {
		beforeEach(() => {
			nock('https://rickandmortyapi.com/')
				.post('/graphql')
				.reply(200, testCharactersData);
		});

		it('should return all characters', async function () {
			const query = `
				query {
						characters(page: 1) {
						info {
							count
							pages
							next
							prev
						}
						results {
							id
							name
							image
							status
							species
						}
					}
				}
			`;

			const response = await request(server)
				.post('/graphql')
				.send({ query })
				.expect(200);

			expect(response.body.data.characters.results).toHaveLength(2);

			expect(response.body.data.characters.results[0])
				.toHaveProperty('id');
			expect(response.body.data.characters.results[0])
				.toHaveProperty('name');
			expect(response.body.data.characters.results[0])
				.toHaveProperty('image');
			expect(response.body.data.characters.results[0])
				.toHaveProperty('status');
			expect(response.body.data.characters.results[0])
				.toHaveProperty('species');

			expect(response.body.data.characters.info)
				.toHaveProperty('count');
			expect(response.body.data.characters.info)
				.toHaveProperty('pages');
			expect(response.body.data.characters.info)
				.toHaveProperty('next');
			expect(response.body.data.characters.info)
				.toHaveProperty('prev');
		});

		it('should return data with queried fields', async function () {
			const query = `
			query {
					characters(page: 1) {
					info {
						count
						pages
					}
					results {
						name
						image
					}
				}
			}
			`;

			const response = await request(server)
				.post('/graphql')
				.send({ query })
				.expect(200);

			expect(response.body.data.characters.results)
				.toHaveLength(2);

			expect(response.body.data.characters.results[0])
				.toHaveProperty('name');
			expect(response.body.data.characters.results[0])
				.toHaveProperty('image');
			expect(response.body.data.characters.results[0])
				.not.toHaveProperty('id');
			expect(response.body.data.characters.results[0])
				.not.toHaveProperty('status');
			expect(response.body.data.characters.results[0])
				.not.toHaveProperty('species');

			expect(response.body.data.characters.info)
				.toHaveProperty('count');
			expect(response.body.data.characters.info)
				.toHaveProperty('pages');
			expect(response.body.data.characters.info)
				.not.toHaveProperty('next');
			expect(response.body.data.characters.info)
				.not.toHaveProperty('prev');
		});
	});

	describe('Single character', function () {
		beforeEach(() => {
			nock('https://rickandmortyapi.com/')
				.post('/graphql')
				.reply(200, testCharacterData);
		});

		it('should return a single character', async function () {
			const query = `
				query {
						character(id: 1) {
						id
						name
						image
						status
						species
					}
				}
			`;

			const response = await request(server)
				.post('/graphql')
				.send({ query })
				.expect(200);

			expect(response.body.data.character)
				.toHaveProperty('id');
			expect(response.body.data.character)
				.toHaveProperty('name');
			expect(response.body.data.character)
				.toHaveProperty('image');
			expect(response.body.data.character)
				.toHaveProperty('status');
			expect(response.body.data.character)
				.toHaveProperty('species');
		});

		it('should return data with location and episodes field', async function () {
			const query = `
				query {
						character(id: 1) {
							name,
							location {
								name
								type
							},
							episode {
								name
								air_date
							}
					}
				}
			`;

			const response = await request(server)
				.post('/graphql')
				.send({ query })
				.expect(200);

			expect(response.body.data.character)
				.toHaveProperty('name');
			expect(response.body.data.character)
				.toHaveProperty('location');
			expect(response.body.data.character)
				.toHaveProperty('episode');

			expect(response.body.data.character.location)
				.toHaveProperty('name');
			expect(response.body.data.character.location)
				.toHaveProperty('type');
			expect(response.body.data.character.location)
				.not.toHaveProperty('id');
			expect(response.body.data.character.location)
				.not.toHaveProperty('dimension');
			expect(response.body.data.character.location)
				.not.toHaveProperty('created');

			expect(response.body.data.character.episode)
				.toHaveLength(1);
			expect(response.body.data.character.episode[0]).toHaveProperty('name');
			expect(response.body.data.character.episode[0])
				.toHaveProperty('air_date');
			expect(response.body.data.character.episode[0])
				.not.toHaveProperty('id');
			expect(response.body.data.character.episode[0])
				.not.toHaveProperty('episode');
			expect(response.body.data.character.episode[0])
				.not.toHaveProperty('created');
		});
	});
});
