import express from "express";
import { getTasks, getTask, addTask, getTasksByPriority, getTasksBySort, changeDone, deleteTask } from "./database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { priority, sort, order } = req.query;
  let tasks;
  if (priority == "1" || priority == "2" || priority == "3") {
    tasks = await getTasksByPriority(priority);
  }
  else if (sort != null && order != null) {
    tasks = await getTasksBySort(sort, order);
  }
  else {
    tasks = await getTasks();
  }
  res.send(tasks);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { task, date, priority } = req.body;
  const t = await addTask(task, date, priority);
  res.status(201).send(t);
});

router.post("/done/:id", async (req, res) => {
  const id = req.params.id;
  const { is_done } = req.body;
  const t = await changeDone(id, is_done);
  res.status(201).send(t);
})

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const task = await getTask(id);
  res.send(task);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const r = await deleteTask(id);
  res.send(r);
})

export default router;
