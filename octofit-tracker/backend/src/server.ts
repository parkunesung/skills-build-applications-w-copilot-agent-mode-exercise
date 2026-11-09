import cors from 'cors';
import express from 'express';
import Activity from './models/activity.js';
import Leaderboard from './models/leaderboard.js';
import Team from './models/team.js';
import User from './models/user.js';
import Workout from './models/workout.js';

const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const frontendOrigin = process.env.FRONTEND_URL ?? (codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173');

export const app = express();

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user').lean());
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user team').sort({ points: -1 }).lean());
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
});
