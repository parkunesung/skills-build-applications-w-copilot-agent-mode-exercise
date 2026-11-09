import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    calories: { type: Number, min: 0, default: 0 },
    steps: { type: Number, min: 0, default: 0 },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);

export default Activity;
