const { gql } = require('graphql-tag');
const { Admin, User, Coach, Commentator, Referee, Player } = require('../models/persons');
const Match = require('../models/matchModel');
const Team = require('../models/teamModel');
const Stadium = require('../models/stadiumModel');

const typeDefs = gql`
  type Admin {
    id: ID!
    name: String!
    age: Int!
    username: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    age: Int!
    username: String!
    password: String!
  }

  type Coach {
    id: ID!
    name: String!
    age: Int!
    nationality: String!
  }

  type Commentator {
    id: ID!
    name: String!
    age: Int!
    nationality: String!
  }

  type Referee {
    id: ID!
    name: String!
    age: Int!
    nationality: String!
  }

  type Player {
    id: ID!
    name: String!
    age: Int!
    nationality: String!
    kitNumber: Int!
    position: String!
    team: Team!
  }

  type Team {
    id: ID!
    name: String!
    squad: [Player!]!
    coach: Coach!
    wins: Int!
    loss: Int!
    draw: Int!
    points: Int!
    kit: String!
    logo: String!
  }

  type Stadium {
    id: ID!
    homeTeam: Team!
    name: String!
    capacity: Int!
    state: Boolean!
  }

  type Match {
    id: ID!
    homeTeam: Team!
    awayTeam: Team!
    referee: Referee!
    commentator: Commentator!
    stadium: Stadium!
    date: String!
    homeGoals: Int!
    awayGoals: Int!
    goals: [Goal!]!
    cards: [Card!]!
    status: Boolean!
    endState: Boolean!
    events: [Event!]!
  }

  type Goal {
    player: Player!
    team: Team!
  }

  type Card {
    player: Player!
    team: Team!
    card: String!
  }

  type Event {
    player: Player!
    team: Team!
    eventType: String!
  }

  type Query {
    admins: [Admin!]!
    users: [User!]!
    coaches: [Coach!]!
    commentators: [Commentator!]!
    referees: [Referee!]!
    players: [Player!]!
    teams: [Team!]!
    stadiums: [Stadium!]!
    matches: [Match!]!
    match(id: ID!): Match
  }

  type Mutation {
    registerAdmin(name: String!, age: Int!, username: String!, password: String!): Admin!
    registerUser(name: String!, age: Int!, username: String!, password: String!): User!
    login(username: String!, password: String!): String!
    addCoach(name: String!, age: Int!, nationality: String!): Coach!
    updateCoach(id: ID!, name: String, age: Int, nationality: String): Coach!
    deleteCoach(id: ID!): Coach!
    addCommentator(name: String!, age: Int!, nationality: String!): Commentator!
    updateCommentator(id: ID!, name: String, age: Int, nationality: String): Commentator!
    deleteCommentator(id: ID!): Commentator!
    addReferee(name: String!, age: Int!, nationality: String!): Referee!
    updateReferee(id: ID!, name: String, age: Int, nationality: String): Referee!
    deleteReferee(id: ID!): Referee!
    addPlayer(name: String!, age: Int!, nationality: String!, kitNumber: Int!, position: String!, team: ID!): Player!
    updatePlayer(id: ID!, name: String, age: Int, nationality: String, kitNumber: Int, position: String, team: ID): Player!
    deletePlayer(id: ID!): Player!
    addTeam(name: String!, squad: [ID!]!, coach: ID!, wins: Int!, loss: Int!, draw: Int!, points: Int!, kit: String!, logo: String!): Team!
    updateTeam(id: ID!, name: String, squad: [ID!], coach: ID, wins: Int, loss: Int, draw: Int, points: Int, kit: String, logo: String): Team!
    deleteTeam(id: ID!): Team!
    addStadium(homeTeam: ID!, name: String!, capacity: Int!, state: Boolean!): Stadium!
    updateStadium(id: ID!, homeTeam: ID, name: String, capacity: Int, state: Boolean): Stadium!
    deleteStadium(id: ID!): Stadium!
    addMatch(homeTeam: ID!, awayTeam: ID!, referee: ID!, commentator: ID!, date: String!): Match!
    updateMatch(id: ID!, homeTeam: ID, awayTeam: ID, referee: ID, commentator: ID, date: String): Match!
    deleteMatch(id: ID!): Match!
    goal(match: ID!, team: ID!, player: ID!): Match!
    giveCard(match: ID!, team: ID!, player: ID!, card: String!): Match!
    startMatch(id: ID!): Match!
    endMatch(id: ID!): Match!
  }
`;

const resolvers = {
  Query: {
    admins: async () => {
      try {
        return await Admin.find({});
      } catch (error) {
        throw new Error('Error fetching admins');
      }
    },
    users: async () => {
      try {
        return await User.find({});
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    coaches: async () => {
      try {
        return await Coach.find({});
      } catch (error) {
        throw new Error('Error fetching coaches');
      }
    },
    commentators: async () => {
      try {
        return await Commentator.find({});
      } catch (error) {
        throw new Error('Error fetching commentators');
      }
    },
    referees: async () => {
      try {
        return await Referee.find({});
      } catch (error) {
        throw new Error('Error fetching referees');
      }
    },
    players: async () => {
      try {
        return await Player.find({});
      } catch (error) {
        throw new Error('Error fetching players');
      }
    },
    teams: async () => {
      try {
        return await Team.find({});
      } catch (error) {
        throw new Error('Error fetching teams');
      }
    },
    stadiums: async () => {
      try {
        return await Stadium.find({});
      } catch (error) {
        throw new Error('Error fetching stadiums');
      }
    },
    matches: async () => {
      try {
        return await Match.find({});
      } catch (error) {
        throw new Error('Error fetching matches');
      }
    },
    match: async (_, { id }) => {
      try {
        return await Match.findById(id).populate('homeTeam').populate('awayTeam').populate('referee').populate('commentator').populate('stadium');
      } catch (error) {
        throw new Error('Error fetching match');
      }
    },
  },
  Mutation: {
    registerAdmin: async (_, { name, age, username, password }) => {
      try {
        const admin = new Admin({ name, age, username, password });
        return await admin.save();
      } catch (error) {
        throw new Error('Error registering admin');
      }
    },
    registerUser: async (_, { name, age, username, password }) => {
      try {
        const user = new User({ name, age, username, password });
        return await user.save();
      } catch (error) {
        throw new Error('Error registering user');
      }
    },
    login: async (_, { username, password }) => {
      try {
        const admin = await Admin.findOne({ username });
        if (admin && admin.password === password) {
          return generateToken(admin._id, 'admin');
        }
        const user = await User.findOne({ username });
        if (user && user.password === password) {
          return generateToken(user._id, 'user');
        }
        throw new Error('Invalid credentials');
      } catch (error) {
        throw new Error('Error during login');
      }
    },
    addCoach: async (_, { name, age, nationality }) => {
      try {
        const coach = new Coach({ name, age, nationality });
        return await coach.save();
      } catch (error) {
        throw new Error('Error adding coach');
      }
    },
    updateCoach: async (_, { id, name, age, nationality }) => {
      try {
        return await Coach.findByIdAndUpdate(id, { name, age, nationality }, { new: true });
      } catch (error) {
        throw new Error('Error updating coach');
      }
    },
    deleteCoach: async (_, { id }) => {
      try {
        return await Coach.findByIdAndDelete(id);
      } catch (error) {
        throw new Error('Error deleting coach');
      }
    },
    addCommentator: async (_, { name, age, nationality }) => {
      try {
        const commentator = new Commentator({ name, age, nationality });
        return await commentator.save();
      } catch (error) {
        throw new Error('Error adding commentator');
      }
    },
    updateCommentator: async (_, { id, name, age, nationality }) => {
      try {
        return await Commentator.findByIdAndUpdate(id, { name, age, nationality }, { new: true });
      } catch (error) {
        throw new Error('Error updating commentator');
      }
    },
    deleteCommentator: async (_, { id }) => {
      try {
        return await Commentator.findByIdAndDelete(id);
      } catch (error) {
        throw new Error('Error deleting commentator');
      }
    },
    addReferee: async (_, { name, age, nationality }) => {
      try {
        const referee = new Referee({ name, age, nationality });
        return await referee.save();
      } catch (error) {
        throw new Error('Error adding referee');
      }
    },
    updateReferee: async (_, { id, name, age, nationality }) => {
      try {
        return await Referee.findByIdAndUpdate(id, { name, age, nationality }, { new: true });
      } catch (error) {
        throw new Error('Error updating referee');
      }
    },
    deleteReferee: async (_, { id }) => {
      try {
        return await Referee.findByIdAndDelete(id);
      } catch (error) {
        throw new Error('Error deleting referee');
      }
    },
    addPlayer: async (_, { name, age, nationality, kitNumber, position, team }) => {
      try {
        const player = new Player({ name, age, nationality, kitNumber, position, team });
        return await player.save();
      } catch (error) {
        throw new Error('Error adding player');
      }
    },
    updatePlayer: async (_, { id, name, age, nationality, kitNumber, position, team }) => {
      try {
        return await Player.findByIdAndUpdate(id, { name, age, nationality, kitNumber, position, team }, { new: true });
      } catch (error) {
        throw new Error('Error updating player');
      }
    },
    deletePlayer: async (_, { id }) => {
      try {
        return await Player.findByIdAndDelete(id);
      } catch (error) {
        throw new Error('Error deleting player');
      }
    },
    addTeam: async (_, { name, squad, coach, wins, loss, draw, points, kit, logo }) => {
      try {
        const team = new Team({ name, squad, coach, wins, loss, draw, points, kit, logo });
        return await team.save();
      } catch (error) {
        throw new Error('Error adding team');
      }
    },
    updateTeam: async (_, { id, name, squad, coach, wins, loss, draw, points, kit, logo }) => {
      try {
        return await Team.findByIdAndUpdate(id, { name, squad, coach, wins, loss, draw, points, kit, logo }, { new: true });
      } catch (error) {
        throw new Error('Error updating team');
      }
    },
    deleteTeam: async (_, { id }) => {
      try {
        return await Team.findByIdAndDelete(id);
      } catch (error) {
        throw new Error('Error deleting team');
      }
    },
    addStadium: async (_, { homeTeam, name, capacity, state }) => {
      try {
        const stadium = new Stadium({ homeTeam, name, capacity, state });
        return await stadium.save();
      } catch (error) {
        throw new Error('Error adding stadium');
      }
    },
    updateStadium: async (_, { id, homeTeam, name, capacity, state }) => {
      try {
        return await Stadium.findByIdAndUpdate(id, { homeTeam, name, capacity, state }, { new: true });
      } catch (error) {
        throw new Error('Error updating stadium');
      }
    },
    deleteStadium: async (_, { id }) => {
      try {
        return await Stadium.findByIdAndDelete(id);
      } catch (error) {
        throw new Error('Error deleting stadium');
      }
    },
    addMatch: async (_, { homeTeam, awayTeam, referee, commentator, date }) => {
      try {
        const team = await Team.findById(homeTeam);
        const match = new Match({ homeTeam, awayTeam, referee, commentator, stadium: team.stadium, date });
        return await match.save();
      } catch (error) {
        throw new Error('Error adding match');
      }
    },
    updateMatch: async (_, { id, homeTeam, awayTeam, referee, commentator, date }) => {
      try {
        return await Match.findByIdAndUpdate(id, { homeTeam, awayTeam, referee, commentator, date }, { new: true });
      } catch (error) {
        throw new Error('Error updating match');
      }
    },
    deleteMatch: async (_, { id }) => {
      try {
        return await Match.findByIdAndDelete(id);
      } catch (error) {
        throw new Error('Error deleting match');
      }
    },
    goal: async (_, { match, team, player }) => {
      try {
        const matchDoc = await Match.findById(match);
        const isHome = team === String(matchDoc.homeTeam);
        if (isHome) {
          matchDoc.homeGoals++;
        } else {
          matchDoc.awayGoals++;
        }
        matchDoc.goals.push({ player, team });
        return await matchDoc.save();
      } catch (error) {
        throw new Error('Error adding goal');
      }
    },
    giveCard: async (_, { match, team, player, card }) => {
      try {
        const matchDoc = await Match.findById(match);
        matchDoc.cards.push({ player, team, card });
        return await matchDoc.save();
      } catch (error) {
        throw new Error('Error giving card');
      }
    },
    startMatch: async (_, { id }) => {
      try {
        const match = await Match.findByIdAndUpdate(id, { status: true }, { new: true });
        await Stadium.findByIdAndUpdate(match.stadium, { state: true });
        return match;
      } catch (error) {
        throw new Error('Error starting match');
      }
    },
    endMatch: async (_, { id }) => {
      try {
        const match = await Match.findByIdAndUpdate(id, { endState: true, status: false }, { new: true });
        await Stadium.findByIdAndUpdate(match.stadium, { state: false });
        return match;
      } catch (error) {
        throw new Error('Error ending match');
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
