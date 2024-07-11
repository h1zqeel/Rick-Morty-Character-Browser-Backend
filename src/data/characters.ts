import axios from './axios.js';
import { CharacterParams } from '../interfaces/Filter.js';
import { Character } from '../interfaces/Character.js';
const END_POINT = '/graphql';

function sortCharactersByName(array: Character[], order: string) {
	if (!order || order === 'None') return array;
	return array.sort((a, b) => {
		if (a.name < b.name) return order === 'asc' ? -1 : 1;
		if (a.name > b.name) return order === 'asc' ? 1 : -1;
		return 0;
	});
}

function filterByName(array: Character[], name: string) {
	if (!name) return array;
	return array.filter((character) =>
		character.name.toLowerCase().includes(name.toLowerCase())
	);
}

const getcharacters = async ({
	page = 1,
	filter = {},
	order,
	name
}: CharacterParams) => {
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

	if (order) {
		response.data.data.characters.results = sortCharactersByName(
			response.data.data.characters.results,
			order
		);
	}

	if (name) {
		response.data.data.characters.results = filterByName(
			response.data.data.characters.results,
			name
		);
	}

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
						origin {
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
