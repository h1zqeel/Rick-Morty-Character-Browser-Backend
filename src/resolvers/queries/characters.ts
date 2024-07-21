import {
	getCachedCharacter,
	getCachedCharacters
} from '../../data/characters.js';
import { GraphQLError } from 'graphql';
import {
	CharacterParams,
	SingleCharacterParams
} from '../../interfaces/Filter.js';

const characters = async (
	_: unknown,
	{ page, filter = {}, order, name }: CharacterParams
) => {
	try {
		const data = await getCachedCharacters({ page, filter, order, name });
		return data;
	} catch (error) {
		throw new GraphQLError(
			error.message ?? 'An error occurred while fetching characters', {
				extensions: {code: 'INTERNAL_SERVER_ERROR'}
			}
		);
	}
};

const character = async (_: unknown, { id }: SingleCharacterParams) => {
	try {
		const data = await getCachedCharacter(id);
		return data;
	} catch (error) {
		throw new GraphQLError(
			error.message ?? 'An error occurred while fetching characters', {
				extensions: {code: 'INTERNAL_SERVER_ERROR'}
			}
		);
	}
};

export { characters, character };
