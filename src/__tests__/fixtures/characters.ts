
const testCharactersData = {
	data: {
		characters: {
			results: [
				{
					id: 1,
					name: 'Rick Sanchez',
					image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
					status: 'Alive',
					species: 'Human'
				},
				{
					id: 2,
					name: 'Morty Smith',
					image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
					status: 'Alive',
					species: 'Human'
				}
			],
			info: {
				count: 671,
				pages: 34,
				next: 2,
				prev: null
			}
		}
	}
};

const testCharacterData = {
	data: {
		character: {
			id: 1,
			name: 'Rick Sanchez',
			image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
			status: 'Alive',
			species: 'Human',
			location: {
				id: "20",
				name: 'Earth (Replacement Dimension)',
				type: 'Planet',
				dimension: 'Replacement Dimension',
				created: '2017-11-10T12:42:04.162Z'
			},
			episode: [
				{
					id: "1",
					name: 'Pilot',
					air_date: 'December 2, 2013',
					episode: 'S01E01',
					created: '2017-11-10T12:56:33.798Z'
				}
			]
		}
	}
};

export { testCharactersData, testCharacterData };
