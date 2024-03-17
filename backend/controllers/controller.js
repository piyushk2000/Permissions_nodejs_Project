// controller/controller.js
import asyncHandler from 'express-async-handler';
import { User, Project } from '../models/model.js';



// Create Project
const createProject = asyncHandler(async (req, res) => {
  const { name, related } = req.body;
  const project = new Project({ name, related });
  const createdProject = await project.save();
  res.status(201).json(createdProject);
});



// Read Project
const getProject = asyncHandler(async (req, res) => {
  const { id, role } = req.body.user; 
  const project = await Project.findById(req.params.id).populate('related');
  if(project) {
    if(role === 'client' && project.related.id !== id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});


// Update Project
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if(project) {
    project.name = req.body.name || project.name;
    project.related = req.body.related || project.related;
    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});



// Delete Project
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if(project) {
    await project.remove();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

export { createProject, updateProject, deleteProject,getProject};