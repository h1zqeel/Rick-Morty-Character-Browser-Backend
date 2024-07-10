import axios from './axios.js';
import { CharacterParams } from '../interfaces/Filter.js';
const END_POINT = '/graphql';

const getcharacters = async ({ page = 1, filter = {} }: CharacterParams) => {
	let filterQuery = '';

	if (filter.status) {
		filterQuery += `status: "${filter.status}", `;
	}

	if (filter.species) {
		filterQuery += `species: "${filter.species}", `;
	}

	const graphqlQuery = {
		operationName: 'fetchCharacters',
		query: `query Query {
					characters(page: ${page}, filter: {${filterQuery}}) {
						info {
							count,
							pages,
							next,
							prev
						},
						results {
							id,
							name,
							image,
							status,
							species
						}
					}
				}`,
		variables: {}
	};

	const response = await axios.post(END_POINT, {
		query: graphqlQuery.query
	});

	return response.data.data.characters;
};

const getCharacter = async (id: number) => {
	const graphqlQuery = {
		operationName: 'fetchCharacter',
		query: `query Query {
					character(id: ${id}) {
						id,
						name,
						image,
						status,
						species,
						location {
							id,
							name,
							type,
							dimension,
							created
						},
						episode {
							id,
							name,
							air_date,
							episode,
							created
						},
					}
				}`,
		variables: {}
	};

	const response = await axios.post(END_POINT, {
		query: graphqlQuery.query
	});

	return response.data.data.character;
};

export { getcharacters, getCharacter };
