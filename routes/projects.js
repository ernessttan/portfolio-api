const express = require('express');
const projectsControllers = require('../controllers/projects');

const router = express.Router();

// Route that gets all projects
router.get('/', projectsControllers.getProjects);

// Route to get a single project by id
router.get('/:pid', projectsControllers.getProjectById);

// Route to post a project
router.post('/', projectsControllers.createProject);

// Route to edit a project
router.patch('/:pid', projectsControllers.editProject);

// Route to delete a project
router.delete('/:pid', projectsControllers.deleteProject);

module.exports = router;
