import { Schema, model, Document } from "mongoose";

export interface Task extends Document {
  title: string;
  description: string;
  completionTime: string;
  reminderTime: string;
  isCompleted: boolean;
}

const schema = new Schema<Task>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completionTime: { type: String },
    reminderTime: { type: String },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const TaskModel = model<Task>("Task", schema);

export default TaskModel;
