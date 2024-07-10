export type CharacterFilter = {
	status?: string;
	species?: string;
};

export type CharacterParams = {
	page: number;
	filter: CharacterFilter;
};

export type SingleCharacterParams = {
	id: number;
};
