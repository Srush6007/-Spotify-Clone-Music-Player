# Spotify Clone

A full-stack Spotify clone application built with React, FastAPI, and MongoDB. This project replicates the core functionality and UI of Spotify, allowing users to browse music, create playlists, and play songs.

![Spotify Clone Screenshot](./frontend/public/screenshot.png) <!-- You would need to add an actual screenshot -->

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and profile management
- Music browsing and search functionality
- Playlist creation and management
- Song playback controls
- Responsive design for all device sizes
- Dark mode UI similar to Spotify
- Album and artist exploration

## Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **React Router** - Declarative routing for React
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Axios** - Promise based HTTP client
- **Craco** - Create React App Configuration Override

### Backend
- **FastAPI** - Modern, fast (high-performance) web framework for building APIs
- **MongoDB** - Document-oriented NoSQL database
- **Motor** - Async Python driver for MongoDB
- **Pydantic** - Data validation and settings management
- **Uvicorn** - Lightning-fast ASGI server

### Database
- **MongoDB** - NoSQL database for storing user data, playlists, and music metadata

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- Git

## Installation

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Environment Variables

### Frontend
Create a `.env` file in the `frontend` directory:
```env
# Frontend environment variables
REACT_APP_API_URL=http://localhost:8000
```

### Backend
Create a `.env` file in the `backend` directory:
```env
# MongoDB connection
MONGO_URL=mongodb://localhost:27017
DB_NAME=spotify_clone

# CORS settings
CORS_ORIGINS=http://localhost:3000
```

## Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   python server.py
   ```
   The backend will be available at `http://localhost:8000`

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   # or
   yarn start
   ```
   The frontend will be available at `http://localhost:3000`

### Production Mode

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   # or
   yarn build
   ```

2. Serve the built files using the backend or a web server like Nginx.

## Project Structure

```
spotify-clone/
├── backend/
│   ├── server.py          # Main FastAPI application
│   ├── requirements.txt   # Python dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── public/           # Static files
│   ├── src/              # React source code
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── App.js        # Main App component
│   │   └── index.js      # Entry point
│   ├── package.json      # Frontend dependencies
│   └── .env             # Frontend environment variables
└── README.md
```

## API Endpoints

### Base URL
`http://localhost:8000/api`

### Endpoints
- `GET /` - Health check endpoint
- `POST /status` - Create a status check record
- `GET /status` - Retrieve status check records

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ as a Spotify clone project