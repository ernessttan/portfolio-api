const express = require('express');

const router = express.Router();

// Route that gets all projects
router.get('/')

// Route to get a single project by id
router.get('/:pid')

// Route to post a project
router.post('/')

// Route to edit a project
router.patch('/:pid')

// Route to delete a project
router.delete('/:pid')



module.exports = router;