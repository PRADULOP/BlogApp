require('dotenv').config();
require('./db/connection');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
app.use(morgan('dev')); 


const blogRoutes = require('./routes/blogRoutes');
app.use('/blogs', blogRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/users',userRoutes);





app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });


  
