const express = require('express')
const multer = require('multer')
const  app = express()
const fs = require('fs')
const axios = require('axios')
const mongoose = require('mongoose')
const UserRoutes = require('./routes/user.route')
const subscriptionRoutes = require('./routes/subscription.route')


app.use(express.json())

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set the file name
    },
  });
  
  // Create Multer instance with storage configuration
  const upload = multer({ storage: storage });

app.use('/api/user', UserRoutes)
app.use('/api/subscription', subscriptionRoutes)


mongoose.connect( "mongodb+srv://sainath47:16oct1996@saicluster2.kzyf6n0.mongodb.net/pixelPhant").then(console.log('connected to MongoDb'))

app.listen(8000, ()=> console.log('Application listening on 8000'))