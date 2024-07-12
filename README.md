# Rick and Morty Character Browser Backend (Node.js, GraphQL, Express)

This project is the backend server for a Rick and Morty character browser built with Node.js, GraphQL, and Express.

## Prerequisites

Ensure you have the following installed:

- Node.js v18 or higher
- npm (Node Package Manager)
- git

The project was built and tested with Node.js v20.

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:h1zqeel/Rick-Morty-Character-Browser-Backend.git
   cd Rick-Morty-Character-Browser-Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of the project and add the following (optional for caching):
   ```
   REDIS_URL=<redis-url>
   ```
   Replace `<redis-url>` with your Redis server URL if you want to enable caching. Caching is optional, and the application will work without it if `REDIS_URL` is not provided.

## Building and Running

To build TypeScript files and start the Node server:

```bash
npm start
```

This will compile TypeScript files (`tsc`) and then start the Node server (`node ./dist/index.js`).

## Available Commands

- `compile`: Runs TypeScript compiler (`tsc`) to compile TypeScript files.
- `compile:watch`: Runs TypeScript compiler in watch mode (`tsc -w`) to watch for changes and compile.
- `start`: Compiles TypeScript files (`npm run compile`) and starts the Node server (`node ./dist/index.js`).
- `lint`: Runs ESLint to lint the project files.
- `format`: Formats the TypeScript files using Prettier.
- `test`: Runs Jest for testing with experimental VM modules enabled (`NODE_OPTIONS=--experimental-vm-modules jest`).

## API Documentation

### Base URL

```
https://rick-morty-character-browser-backend.onrender.com/graphql
```

### Authentication

This API does not require authentication.

### Queries

#### `characters`

Retrieve a list of characters with pagination support.

##### Arguments

- `page`: Optional. Page number for pagination.
- `filter`: Optional. Filter characters by status, species, or name.
- `order`: Optional. Sort order for results.

##### Response

```graphql
type PaginatedCharacters {
  info: CharacterPaginationInfo
  results: [Character]
}

type CharacterPaginationInfo {
  count: Int
  pages: Int
  next: Int
  prev: Int
}

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
```

#### `character`

Retrieve a single character by ID.

##### Arguments

- `id`: Required. ID of the character.

##### Response

```graphql
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
```

### Example Queries

#### Retrieve Characters

```graphql
query {
  characters(page: 1, filter: { status: "Alive", species: "Human" }, order: "name") {
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
      location {
        id
        name
        type
      }
      origin {
        id
        name
        type
      }
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
}
```

#### Retrieve a Character by ID

```graphql
query {
  character(id: 1) {
    id
    name
    image
    status
    species
    location {
      id
      name
      type
    }
    origin {
      id
      name
      type
    }
    episode {
      id
      name
      air_date
      episode
    }
  }
}
```

### Errors

Errors follow standard GraphQL error handling.

## Access Deployed Version

- **Client**: [Rick and Morty Character Browser Client](https://rick-morty-character-browser.h1zqeel.com/)
- **Backend**: [Rick and Morty Character Browser Backend GraphQL](https://rick-morty-character-browser-backend.onrender.com/graphql)
- As I have utilised Render for Backend Deployment the Backend API Instance Spins down after 15 minutes of InActivity, it gets back up on next incoming request which takes almost 1 Minute. Read More: https://docs.render.com/free#spinning-down-on-idle
