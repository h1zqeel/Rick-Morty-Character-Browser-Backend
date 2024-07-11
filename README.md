# Rick and Morty Character Browser Backend (Node.js, GraphQL, Express)

This project is the backend server for a Rick and Morty character browser built with Node.js, GraphQL, and Express.

## Prerequisites

Ensure you have the following installed:

- Node.js v18 or higher
- npm (Node Package Manager)

The project was built and tested with Node.js v20.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
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