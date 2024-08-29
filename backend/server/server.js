const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require('path'); 
const Routes = require("../routers/router");
const RoutesAdmin = require("../routers/routerAdmin");
const RoutesClient = require("../routers/routerClient");

dotenv.config({ path: '../.env' });
const app = express();
mongoose.connect(process.env.CONN_STR_LOCAL)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/user", Routes);
app.use("/Admin", RoutesAdmin);
app.use("/Client", RoutesClient);

const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
