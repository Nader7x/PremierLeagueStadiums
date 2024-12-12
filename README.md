# PL GROUNDS

Tracking Premier League Stadiums matches and statistics

## Project Description

PL Grounds is a project aimed at tracking Premier League stadiums, matches, and statistics. It provides detailed information about the stadiums, teams, players, and matches in the Premier League. The project includes features such as match scheduling, live match updates, player statistics, and more.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Nader7x/PremierLeagueStadiums.git
   cd PremierLeagueStadiums
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   JWT_SECRET_KEY=your_jwt_secret_key
   MONGO_USERNAME=your_mongo_username
   MONGO_PASSWORD=your_mongo_password
   ```

4. Start the MongoDB server:
   ```bash
   mongod
   ```

5. Start the application:
   ```bash
   npm start
   ```

## Usage Guidelines

### Running the Project

To run the project, use the following command:
```bash
npm start
```

The application will start on `http://localhost:3000`.

### Using the Features

- Access the API documentation at `http://localhost:3000/api-docs`.
- Use the provided endpoints to interact with the application.
- Refer to the API documentation for detailed information on each endpoint.

## API Documentation

### Endpoints

#### Teams

- `GET /teams`: Retrieve all teams.
- `POST /team`: Add a new team.
- `DELETE /team/:id`: Delete a team.
- `PATCH /team/:id`: Update a team.

#### Stadiums

- `GET /stadiums`: Retrieve all stadiums.
- `POST /stadium`: Add a new stadium.
- `DELETE /stadium/:id`: Delete a stadium.
- `PATCH /stadium/:id`: Update a stadium.

#### Coaches

- `GET /coaches`: Retrieve all coaches.
- `POST /coach`: Add a new coach.
- `DELETE /coach/:id`: Delete a coach.
- `PATCH /coach/:id`: Update a coach.

#### Matches

- `GET /matches`: Retrieve all matches.
- `POST /match`: Add a new match.
- `DELETE /match/:id`: Delete a match.
- `PATCH /match/:id`: Update a match.

#### Players

- `GET /players`: Retrieve all players.
- `POST /player`: Add a new player.
- `DELETE /player/:id`: Delete a player.
- `PATCH /player/:id`: Update a player.

#### Admin Users

- `POST /register`: Register a new admin user.
- `POST /login`: Login as an admin user.

#### Commentators

- `GET /commentators`: Retrieve all commentators.
- `POST /commentator`: Add a new commentator.
- `DELETE /commentator/:id`: Delete a commentator.
- `PATCH /commentator/:id`: Update a commentator.
