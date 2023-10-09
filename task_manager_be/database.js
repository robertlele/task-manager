import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getTasks() {
  const [rows] = await pool.query("SELECT * FROM tasks");
  return rows;
}

export async function getTask(id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM tasks
    WHERE id = "${id}"
    `);
  return rows;
}

export async function addTask(task, date, priority) {
  const [result] = await pool.query(
    `
    INSERT INTO tasks (task, due, priority)
    VALUES (?, STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.000Z'), ?)
    `,
    [task, date, priority]
  );
  const id = result.insertId;
  return getTask(id);
}

export async function deleteTask(id) {
  const [result] = await pool.query(
    `
    DELETE FROM tasks
    WHERE id = ${id}
    `
  );
  return result;
}

export async function changeDone(id, bool) {
  const [result] = await pool.query(`
  UPDATE tasks
  SET is_done = "${bool}"
  WHERE id = "${id}"
  `);
  return result;
}

export async function getTasksByPriority(priority) {
  const [rows] = await pool.query(`
  SELECT *
  FROM tasks
  WHERE priority = "${priority}"
  `);
  return rows;
}

export async function getTasksBySort(sort, order) {
  const [rows] = await pool.query(
    `SELECT * FROM tasks ORDER BY ${sort} ${order}`
  );
  return rows;
}

// const date = new Date()
// const result = await addTask("Clean Bathroom", date.toISOString().slice(0,19).replace('T', ' '), 'H')
