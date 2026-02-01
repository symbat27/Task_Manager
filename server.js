const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend")));

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

let db, users, projects, tasks;

async function connectDB() {
  await client.connect();
  db = client.db("task_manager_db");
  users = db.collection("users");
  projects = db.collection("projects");
  tasks = db.collection("tasks");
  console.log("MongoDB connected");
}
connectDB();

app.get("/users", async (req, res) => {
  const data = await users.find().toArray();
  res.json(data);
});

app.post("/projects", async (req, res) => {
  const result = await projects.insertOne({
    ...req.body,
    createdAt: new Date()
  });
  res.json(result);
});

app.get("/projects", async (req, res) => {
  const data = await projects.find().toArray();
  res.json(data);
});

app.delete("/projects/:id", async (req, res) => {
  const result = await projects.deleteOne({
    _id: new ObjectId(req.params.id)
  });
  res.json(result);
});

app.post("/tasks", async (req, res) => {
  const task = {
    title: req.body.title,
    description: req.body.description,
    projectId: new ObjectId(req.body.projectId),
    assigneeId: new ObjectId(req.body.assigneeId),
    status: req.body.status,
    priority: req.body.priority,
    comments: req.body.comments || [],
    createdAt: new Date()
  };

  const result = await tasks.insertOne(task);
  res.json(result);
});

app.get("/tasks", async (req, res) => {
  const { projectId } = req.query;
  const filter = projectId ? { projectId: new ObjectId(projectId) } : {};
  const data = await tasks.find(filter).toArray();
  res.json(data);
});

app.patch("/tasks/:id/status", async (req, res) => {
  const result = await tasks.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { status: req.body.status } }
  );
  res.json(result);
});

app.delete("/tasks/:id", async (req, res) => {
  const result = await tasks.deleteOne({
    _id: new ObjectId(req.params.id)
  });
  res.json(result);
});

app.get("/projects/:id/progress", async (req, res) => {
  const projectId = new ObjectId(req.params.id);

  const result = await tasks.aggregate([
    { $match: { projectId } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]).toArray();

  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
