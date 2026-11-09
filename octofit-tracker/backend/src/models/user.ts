import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  },
  { timestamps: true },
);

const User = mongoose.models.User ?? mongoose.model('User', userSchema);

export default User;
