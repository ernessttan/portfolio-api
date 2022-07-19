const express = require("express");
const multer = require("multer");
const projectsControllers = require("../controllers/projects");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

// Route that gets all projects
router.get("/", projectsControllers.getProjects);

// Route to get a single project by id
router.get("/:pid", projectsControllers.getProjectById);

// Route that gets a projects image
router.get("/images/:key", projectsControllers.getImageByKey);

// Route to post a project
router.post("/", upload.single("image"), projectsControllers.createProject);

// Route to edit a project
router.patch("/:pid", projectsControllers.editProject);

// Route to delete a project
router.delete("/:pid", projectsControllers.deleteProject);

module.exports = router;
