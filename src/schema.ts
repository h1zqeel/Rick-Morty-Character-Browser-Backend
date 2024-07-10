const typeDefs = `#graphql
  type Character {
    id: ID
    name: String
    image: String
    status: String
    species: String
    location: Location
    origin: Location
    episode: [Episode]
  }

  type Location {
    id: ID
    name: String
    type: String
    dimension: String
    residents: [Character]!
    created: String
  }

  type Episode {
    id: ID
    name: String
    air_date: String
    episode: String
    characters: [Character]!
    created: String
  }

  type CharacterPaginationInfo {
    count: Int
    pages: Int
    next: Int
    prev: Int
  }

  type PaginatedCharacters {
    info: CharacterPaginationInfo
    results: [Character]
  }

  input CharacterFilter {
    status: String
    species: String
  }

  type Query {
    characters(page: Int, filter: CharacterFilter): PaginatedCharacters
    character(id: Int!): Character
  }
`;

export { typeDefs };
