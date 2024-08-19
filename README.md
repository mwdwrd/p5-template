# Project Name

A generative art project created by Matthew Woodward using p5.js.

## Description

This project is a web-based generative art application that creates unique artworks based on random seeds. It utilizes p5.js for rendering and includes features such as regeneration, exporting, and mobile support.

## Features

- Randomly generated artwork
- Regeneration of artwork with new seeds
- Export functionality (low and high resolution)
- Mobile-friendly interface
- Customizable color palettes using randomColor.js
- Toast notifications for user feedback

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies (if any)

## Usage

To run the project locally:

1. For development:
   ```
   node dev.js
   ```

2. For production:
   ```
   node server.js
   ```

3. Open your browser and navigate to `http://localhost:3000` (or the port specified in your config.js)

## Controls

- Desktop:
  - 'r' key: Regenerate artwork
  - 's' key: Export low-resolution image
  - '2' key: Export 2x resolution image
  - '4' key: Export 4x resolution image

- Mobile:
  - "Re-generate" button: Create new artwork
  - "Export" button: Save current artwork

## Configuration

The project uses a `config.js` file for central configuration. You can modify the following parameters:

- `projectName`: The name of your project
- `projectSlug`: A URL-friendly version of your project name
- `port`: The port number for the server (default: 3000)

## Development

The project structure includes:

- `public/`: Contains all client-side files
- `server.js`: Express server for production
- `dev.js`: Development server with live reloading

To start the development server:

```
node dev.js
```

To start the production server:

```
node server.js
```

## License

[Include your license information here]

## Acknowledgments

- p5.js library
- randomColor.js by David Merfield