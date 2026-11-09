import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const userProfiles = [
      { username: 'maya.chen', name: 'Maya Chen', email: 'maya.chen@example.com' },
      { username: 'liam.johnson', name: 'Liam Johnson', email: 'liam.johnson@example.com' },
      { username: 'sofia.ramirez', name: 'Sofia Ramirez', email: 'sofia.ramirez@example.com' },
      { username: 'noah.patel', name: 'Noah Patel', email: 'noah.patel@example.com' },
    ];

    const users = new Map<string, mongoose.Types.ObjectId>();
    for (const profile of userProfiles) {
      const user = await User.findOneAndUpdate(
        { username: profile.username },
        { $set: profile },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      );
      if (!user) {
        throw new Error(`Unable to seed user ${profile.username}`);
      }
      users.set(profile.username, user._id);
    }

    const teamProfiles = [
      {
        name: 'Morning Movers',
        description: 'A friendly crew building a consistent morning fitness habit.',
        usernames: ['maya.chen', 'liam.johnson'],
      },
      {
        name: 'Trail Blazers',
        description: 'Outdoor enthusiasts who enjoy running and weekend hikes.',
        usernames: ['sofia.ramirez', 'noah.patel'],
      },
    ];

    const teams = new Map<string, mongoose.Types.ObjectId>();
    for (const profile of teamProfiles) {
      const team = await Team.findOneAndUpdate(
        { name: profile.name },
        {
          $set: {
            name: profile.name,
            description: profile.description,
            members: profile.usernames.map((username) => {
              const userId = users.get(username);
              if (!userId) {
                throw new Error(`Unable to find seeded user ${username}`);
              }
              return userId;
            }),
          },
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      );
      if (!team) {
        throw new Error(`Unable to seed team ${profile.name}`);
      }
      teams.set(profile.name, team._id);
    }

    const activityRecords = [
      { username: 'maya.chen', type: 'Running', durationMinutes: 32, calories: 285, steps: 4200, date: new Date('2026-11-06T07:15:00.000Z') },
      { username: 'liam.johnson', type: 'Cycling', durationMinutes: 45, calories: 410, steps: 0, date: new Date('2026-11-06T07:30:00.000Z') },
      { username: 'sofia.ramirez', type: 'Hiking', durationMinutes: 75, calories: 520, steps: 9800, date: new Date('2026-11-07T09:00:00.000Z') },
      { username: 'noah.patel', type: 'Strength Training', durationMinutes: 40, calories: 310, steps: 1200, date: new Date('2026-11-07T16:00:00.000Z') },
    ];

    for (const activity of activityRecords) {
      const userId = users.get(activity.username);
      if (!userId) {
        throw new Error(`Unable to find seeded user ${activity.username}`);
      }
      await Activity.findOneAndUpdate(
        { user: userId, type: activity.type, date: activity.date },
        { $set: { ...activity, user: userId } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      );
    }

    const leaderboardEntries = [
      { username: 'maya.chen', teamName: 'Morning Movers', points: 860, rank: 1 },
      { username: 'sofia.ramirez', teamName: 'Trail Blazers', points: 790, rank: 2 },
      { username: 'liam.johnson', teamName: 'Morning Movers', points: 720, rank: 3 },
      { username: 'noah.patel', teamName: 'Trail Blazers', points: 650, rank: 4 },
    ];

    for (const entry of leaderboardEntries) {
      const userId = users.get(entry.username);
      const teamId = teams.get(entry.teamName);
      if (!userId || !teamId) {
        throw new Error(`Unable to resolve leaderboard entry for ${entry.username}`);
      }
      await Leaderboard.findOneAndUpdate(
        { user: userId },
        { $set: { user: userId, team: teamId, points: entry.points, rank: entry.rank } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      );
    }

    const workouts = [
      {
        name: 'Beginner Cardio Circuit',
        description: 'A low-impact circuit to build cardiovascular endurance.',
        difficulty: 'beginner',
        durationMinutes: 20,
        instructions: ['Warm up with a brisk walk.', 'Alternate marching and step-ups for 12 minutes.', 'Cool down and stretch.'],
      },
      {
        name: 'Full-Body Strength',
        description: 'A balanced strength session using bodyweight movements.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        instructions: ['Complete three rounds of squats and push-ups.', 'Add lunges and planks between rounds.', 'Rest for one minute between rounds.'],
      },
      {
        name: 'Tempo Run Builder',
        description: 'A progressive run workout for improving pace and stamina.',
        difficulty: 'advanced',
        durationMinutes: 45,
        instructions: ['Jog easily for 10 minutes.', 'Run at a comfortably hard pace for 25 minutes.', 'Cool down with a 10-minute easy jog.'],
      },
    ];

    for (const workout of workouts) {
      await Workout.findOneAndUpdate(
        { name: workout.name },
        { $set: workout },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      );
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Unable to close the database connection after seeding:', error);
  process.exitCode = 1;
});
