const express = require("express");

server = express();

server.use(express.json());

const projects = [];

server.get("/projects", (req, res) => {
  res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({ id, title, tasks });

  res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectUpdate = projects.find(p => {
    return p.id === id;
  });

  projectUpdate.title = title;

  res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const indexProjectDelete = projects.findIndex(p => {
    return p.id === id;
  });

  projects.splice(indexProjectDelete, 1);

  return res.send();
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectTask = projects.find(p => {
    return p.id === id;
  });

  projectTask.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
