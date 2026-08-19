import mongoose from 'mongoose';

const apiAccessRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Or ObjectId depending on how user references are handled in this app
      required: true,
      ref: 'User' // Assuming userId is the custom string userId or ObjectId
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    monthlySell: {
      type: String,
      required: true,
    },
    games: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

apiAccessRequestSchema.index({ status: 1, createdAt: -1 });
apiAccessRequestSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.ApiAccessRequest ||
  mongoose.model('ApiAccessRequest', apiAccessRequestSchema);
