import { Request, Response } from "express";

import logger from "../config/logger.config";
import TaskModel, { Task } from "../models/task.model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const newTask = new TaskModel({
      title: req.body.title,
      description: req.body.description,
      completionTime: req.body.completionTime,
      reminderTime: req.body.reminderTime,
      isCompleted: req.body.isCompleted,
    });

    await newTask.save();

    logger.info("[CREATE_TASK] success");
    res.status(201).send(newTask);
  } catch (err) {
    logger.error(err, "[CREATE_TASK] error");
    return res.status(500).send({ message: err });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.findById(req.params.taskId);
    if (!task) {
      logger.warn("[UPDATE_TASK] task not found");
      return res.status(404).send({ message: "Task not found" });
    }
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.completionTime = req.body.completionTime || task.completionTime;
    task.reminderTime = req.body.reminderTime || task.reminderTime;
    task.isCompleted = req.body.isCompleted || task.isCompleted;
    task.save((err) => {
      if (err) {
        logger.error(err, "[UPDATE_TASK] save error");
        return res.status(500).send({ message: err });
      }
      res.send(task);
    });
  } catch (err) {
    logger.error(err, "[UPDATE_TASK] error");
    return res.status(500).send({ message: err });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.findById(req.params.taskId);
    if (!task) {
      logger.warn("[DELETE_TASK] task not found");
      return res.status(404).send({ message: "Task not found" });
    }
    await TaskModel.deleteOne({ _id: task.id });

    res.send({ message: "Task deleted!" });
  } catch (err) {
    logger.error(err, "[DELETE_TASK] error");
    return res.status(500).send({ message: err });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.findById(req.params.taskId);
    if (!task) {
      logger.warn("[GET_TASK] task not found");
      return res.status(404).send({ message: "Task not found" });
    }

    res.send(task);
  } catch (err) {
    logger.error(err, "[GET_TASK] error");
    return res.status(500).send({ message: err });
  }
};
