# Pokedex App

## About
The Pokedex App is a fun and engaging project created by a Pokémon fan, for Pokémon fans. Inspired by the Pokédex from the Pokémon series, this fan-made application aims to provide a comprehensive, interactive experience for exploring and learning about Pokémon.

### What is a Pokédex?
A Pokédex is an electronic device in the Pokémon series designed to catalog and provide information regarding the various species of Pokémon. Each entry includes detailed descriptions, stats, abilities, and other essential data about the Pokémon. Trainers use the Pokédex to learn more about the Pokémon they encounter, capture, and train.

This Pokedex App brings that concept to life, offering an extensive database of Pokémon information from Generations 1-9.

## Features
- **Gen 1-9 Pokémon**: Access comprehensive data on Pokémon from Generations 1 through 9.
- **Dynamic Website Using PokeAPI**: Fetch real-time Pokémon data from the PokeAPI.
- **Search Functionality**: Easily search for any Pokémon by name or ID.
- **Compare Pokémon**: Compare the stats and abilities of different Pokémon side-by-side.
- **Detailed Information View**: View extensive details about each Pokémon, including stats, abilities, and evolution.
- **Favorite Pokémon**: Mark and store your favorite Pokémon for quick access.
- **Saved Sessions and Login**: Use Firebase for authentication and saving user sessions.
- **Styled, Modern Responsive UI**: Enjoy a polished, responsive design for both desktop and mobile devices.

## Tech Stack
- **React**: For building the user interface.
- **Redux & Redux Toolkit**: For state management.
- **TypeScript**: For type safety and enhanced code quality.
- **PokeAPI**: To fetch Pokémon data.
- **Firebase**: For authentication and session management.
- **SCSS**: For styling the application.

## Getting Started
Follow these instructions to set up and run the project on your local machine.

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn

### Installation
1. **Clone the repository**

2. **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up Firebase**
    - Create a project in Firebase.
    - Enable authentication (Google).
    - Create a Firestore database.
    - Get your Firebase config object and add it to your environment variables.

    Create a .env file in the root of the project and add your Firebase config:

    ```env
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```
4. **Installing Firebase Tools**

    To interact with Firebase services such as Firestore, you'll need to have `firebase-tools` installed globally. If you haven't already installed it, you can do so by running the following command in your terminal:

    ```bash
    npm install -g firebase-tools

5. **Run the Application**

    ```bash
    npm start
    # or
    yarn start
    ```

    The application will start on `http://localhost:3000`.