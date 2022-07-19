const Project = require("../models/project");
const { uploadToS3, getFileFromS3 } = require("../s3");

// Function to get all projects
async function getProjects(req, res, next) {
  let projects;
  try {
    projects = await Project.find();
  } catch (err) {
    const error = new Error("Fetching projects failed", 500);
    return next(error);
  }
  res.json({ projects: projects.map((project) => project.toObject({ getters: true })) });
}

// Function to get a project by its id
async function getProjectById(req, res, next) {
  const projectId = req.params.pid;

  let foundProject;
  try {
    foundProject = await Project.findById(projectId);
  } catch (err) {
    const error = new Error("Could not find project by that id", 500);
    return next(error);
  }
  res.status(201).json({ project: foundProject });
}

// Function to get a projects image
async function getImageByKey(req, res, next) {
  const { key } = req.params;
  const readStream = getFileFromS3(key);

  readStream.pipe(res);
}

// Function to create a project
async function createProject(req, res, next) {
  let file;
  try {
    file = await uploadToS3(req.file);
  } catch (err) {
    console.log(err);
  }
  const { title, description, tags } = req.body;
  const createdProject = new Project({
    title,
    description,
    image: `http://localhost:3000/api/projects/images/${file.key}`,
    tags,
  });

  try {
    await createdProject.save();
  } catch (err) {
    const error = new Error("Could not create project", 500);
    return next(error);
  }
  res.status(201).json({ project: createdProject });
}

// Function to edit a project
async function editProject(req, res, next) {
  const projectId = req.params.pid;
  const {
    title, description, image, tags,
  } = req.body;

  let projectToEdit;
  try {
    projectToEdit = await Project.findById(projectId);
  } catch (err) {
    const error = new Error("Could not find project", 404);
    return next(error);
  }
  projectToEdit.title = title;
  projectToEdit.description = description;
  projectToEdit.image = image;
  projectToEdit.tags = tags;

  try {
    await projectToEdit.save();
  } catch (err) {
    const error = new Error("Could not edit project", 500);
    return next(error);
  }
  res.status(201).json({ message: "Updated Project" });
}

// Function to delete a project
async function deleteProject(req, res, next) {
  const projectId = req.params.pid;

  let project;
  try {
    project = await Project.findById(projectId);
  } catch (err) {
    const error = new Error("Could not find project for this id", 404);
    return next(error);
  }

  try {
    await project.remove();
  } catch (err) {
    const error = new Error("Could not delete project", 500);
    return next(error);
  }
  res.status(200).json({ message: "Project Deleted" });
}

exports.getProjects = getProjects;
exports.getProjectById = getProjectById;
exports.createProject = createProject;
exports.editProject = editProject;
exports.deleteProject = deleteProject;
exports.getImageByKey = getImageByKey;
