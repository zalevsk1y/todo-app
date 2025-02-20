import { ITodo } from '../types/todo';
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Mongoose Schema
const todoSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  userId: { // ADDED: User ID field
    type: String, // Or mongoose.Schema.Types.ObjectId if you are using ObjectId for user IDs and have a User model
    required: true, // Every todo must be associated with a user
    index: true,     // Index for efficient querying by userId
  },
}, { timestamps: true });

export interface TodoDocument extends ITodo, Document {
  userId: string; // Make sure to include userId in the Document interface
}

export interface TodoModel extends Model<TodoDocument> {}

export const Todo = mongoose.model<TodoDocument, TodoModel>('Todo', todoSchema) as TodoModel;
