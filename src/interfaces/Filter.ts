export type CharacterFilter = {
	status?: string;
	species?: string;
};

export type CharacterParams = {
	page: number;
	filter: CharacterFilter;
	order: string;
	name: string;
};

export type SingleCharacterParams = {
	id: number;
};
