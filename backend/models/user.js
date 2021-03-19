import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema, model } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  blogs: [{
    type: mongoose.Types.ObjectId,
    ref: 'Blog',
    required: true
  }]
});

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.'});

export default model('User', userSchema);
