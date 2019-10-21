const express = require('express');

const server = express();

server.use(express.json());


const projects = [];

//MIDDLEWARE checkProjectExists

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

//MIDDLEWARE LogRequest

function logRequests(req, res, next) {

  console.count("Number of requests");

  return next();
}

server.use(logRequests);


//POST
server.post('/projects', (req, res) => {

  const { id, title} = req.body;

  const project = {
    id,
    title,
    task:[]

  };

  projects.push(project);

  return res.json(projects);
});

//GET
server.get('/projects', (req,res) => {
  return res.json(projects);
});

//PUT
server.put('/projects/:id',(req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);

});

//DELETE

server.delete('/projects/:id', (req, res) => {

  const { id } = req.params;

  const projectid = projects.findIndex(p => p.id == id);

  projects.splice(projectId, 1);

  return res.send();
});


server.listen(3000);