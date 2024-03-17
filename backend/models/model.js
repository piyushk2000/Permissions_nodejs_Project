// models.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  role: {
    type: String,
    enum: ['client', 'admin', 'superAdmin'],
    default: 'client'
  },
});

const ProjectSchema = new mongoose.Schema({
  name: String,
  related: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


const User = mongoose.model('User', UserSchema);
const Project = mongoose.model('Project', ProjectSchema);


export { User , Project };
