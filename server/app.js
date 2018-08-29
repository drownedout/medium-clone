'use strict';

/** Dependencies **/
const express = require("express");
const routes = require('./routes/');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cloudinary = require('cloudinary');

const app = express();
const router = express.Router();
const url = process.env.MONGODB_URI || "mongodb://localhost/medium-clone";

/** Connect to MongoDB **/
mongoose.connect(url, (error) => {
	if(error){
		console.error('There was an error with Mongo DB');
		throw error;
	} else {
		console.log('MongoDB has connected to ' + url);
	}
});

const port = process.env.PORT || 4000;

/** Routing for API endpoints **/
routes(router);

/** Middleware setup **/
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use('/api', router);

/** start server **/
app.listen(port, () => {
	console.log(`Server has started on port: ${port}`);
});