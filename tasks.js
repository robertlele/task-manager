import express from "express";
import { getTasks, getTask, addTask, getTasksByPriority } from "./database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await getTasks();
  res.send(tasks);
});

router.post("/", async (req, res) => {
  const { task, date, priority } = req.body
  const t = await addTask(task, date, priority)
  res.status(201).send(t);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (id == "low") {
    const tasks = await getTasksByPriority("L");
    res.send(tasks);
  } else if (id == "mid") {
    const tasks = await getTasksByPriority("M");
    res.send(tasks);
  } else if (id == "high") {
    const tasks = await getTasksByPriority("H");
    res.send(tasks);
  } else {
    const task = await getTask(id);
    res.send(task);
  }
});

export default router;
