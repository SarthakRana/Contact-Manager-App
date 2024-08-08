const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection')
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

// make connection to mongoDB database
connectDb();

const app = express();

const port = process.env.PORT || 3000;

// allow CORS
app.use(cors()); 
// parse json data
app.use(express.json());
// contact router
app.use('/api/contacts', contactRoutes);
// user router
app.use('/api/users', userRoutes);
// error handler custom middleware - to show error in json
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});