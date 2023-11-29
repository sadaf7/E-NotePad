const express = require('express');
const connectToMongo = require("./config/db");
const cors = require('cors')
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require('path')

dotenv.config();
const app = express();
const port = 4000;

connectToMongo();

app.use(cors())
app.use(express.json());

// ------Deployment-----

// const _dirname1 = path.resolve()
// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(_dirname1,'/frontend/dist')))

//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname1,"frontend","dist", "index.html"))
//   })
// } else{
//   app.get('/',(req,res)=>{
//     res.send('api is running')
//   })
// }

// ------Deployment-----

// available routes
app.use('/api/user', require("./routes/userRoutes"));
app.use('/api/notes', require("./routes/noteRoutes"));

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(` App started on port ${port}`);
  })