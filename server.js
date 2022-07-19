const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ehu9eib.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000);
    console.log(`Server started on Port:${3000}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

const projectsRoutes = require('./routes/projects');

app.use('/api/projects', projectsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});
