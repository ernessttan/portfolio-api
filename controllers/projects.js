const Project = require('../models/project');

// Function to get all projects
async function getProjects(req, res, next) {
  let projects;
  try {
    projects = await Project.find();
  } catch (err) {
    const error = new Error('Fetching projects failed', 500);
    return next(error);
  }
  res.json({ projects: projects.map((project) => project.toObject({ getters: true })) });
}

// Function to get a project by its id
async function getProjectById(req, res, next) {

}

// Function to create a project
async function createProject(req, res, next) {
  const {
    title, description, image, tags,
  } = req.body;
  const createdProject = new Project({
    title,
    description,
    image,
    tags,
  });

  try {
    await createdProject.save();
  } catch (err) {
    const error = new Error('Could not create project', 500);
    return next(error);
  }
  res.status(201).json({ project: createdProject });
}

// Function to edit a project
async function editProject(req, res, next) {

}

// Function to delete a project
async function deleteProject(req, res, next) {
  const projectId = req.params.pid;

  let project;
  try {
    project = await Project.findById(projectId);
  } catch (err) {
    const error = new Error('Could not find project for this id', 404);
    return next(error);
  }

  try {
    await project.remove();
  } catch (err) {
    const error = new Error('Could not delete project', 500);
    return next(error);
  }
  res.status(200).json({ message: 'Project Deleted' });
}

exports.getProjects = getProjects;
exports.getProjectById = getProjectById;
exports.createProject = createProject;
exports.editProject = editProject;
exports.deleteProject = deleteProject;
