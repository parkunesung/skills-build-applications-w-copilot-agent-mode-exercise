import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    instructions: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);

export default Workout;
