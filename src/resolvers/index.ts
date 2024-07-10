import { character, characters } from './queries/characters.js';

const resolvers = {
	Query: {
		characters,
		character
	}
};

export default resolvers;
