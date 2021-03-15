import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default model('Blog', blogSchema);
