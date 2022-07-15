const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DATABASE_URI

const app = express();

mongoose.connect(uri, { useNewUrlParser: true })
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT);
    console.log(`Server started on Port:${3000}`)
})
.catch(err => {
    console.log(err);
});

app.use(express.json());

const projectsRoutes = require('./routes/projects');
app.use('/api/projects', projectsRoutes);
