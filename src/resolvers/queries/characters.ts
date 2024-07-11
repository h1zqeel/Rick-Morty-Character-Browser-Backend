import { getCharacter, getcharacters } from '../../data/characters.js';
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
		const data = await getcharacters({ page, filter, order, name });
		return data;
	} catch (error) {
		console.log({ error });
		throw new GraphQLError(
			error.message ?? 'An error occurred while fetching characters'
		);
	}
};

const character = async (_: unknown, { id }: SingleCharacterParams) => {
	try {
		const data = await getCharacter(id);
		return data;
	} catch (error) {
		throw new GraphQLError(
			error.message ?? 'An error occurred while fetching character'
		);
	}
};

export { characters, character };
