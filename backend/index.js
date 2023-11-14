const express = require('express');
const connectToMongo = require("./config/db");
const cors = require('cors')
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const port = 4000;
dotenv.config();

connectToMongo();

app.use(cors())
app.use(express.json());

// available routes
app.use('/api/user', require("./routes/userRoutes"));

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(` App started on port ${port}`);
  })