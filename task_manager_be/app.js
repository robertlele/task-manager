import express from "express";
import cors from "cors"; // Needed to handle cross-origin resource sharing issues
import tasks from "./tasks.js";

const app = express();
const PORT = 3000; // Set port for server to run on

app.use(cors());

app.use(express.json());

app.use("/tasks", tasks);

app.use((err, req, res, next) => {
  console.errror(err.stack);
  res.status(500).send("Error! Something went wrong!");
});

app.listen(PORT, () => {
  console.log(
    "Database is ready.\nServer is successfully running on port " + PORT
  );
});
