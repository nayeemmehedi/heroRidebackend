const express = require("express");
var cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require("mongodb");
require("dotenv").config()

const app = express();
// const port = process.env.PORT || 5600;
const port = process.env.PORT || 5600;
//env
// DB_NAME =connect-db
// DB_PASSWORDS =mdJb12FDYt1v1tSO
// DB_VIEW = varsitybd

// db_first = varsitybd
// db_first_item = item

// db_secend = formData
// db_secend_item = form


// DB_PORT =4500
// "dependencies": {
//   "express": "^4.17.2",
//   "cors": "^2.8.5",
//   "dotenv": "^10.0.0",
  
//   "mongodb": "^4.2.2"
// }


app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORDS}@cluster0.teacx.mongodb.net/${process.env.DB_VIEW}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  

 

  const Hero_all100 = client.db("Hero_All100").collection("all");

  const Hero_trainner = client.db("Hero_trainnerlogin").collection("trainner");
  const Hero_driver = client.db("Hero_driver").collection("driver");


  

  

  app.get("/", (req, res) => {
    res.send("hlw i am excited to learning node");
  });

  app.post("/addAll", (req, res) => {
    const event = req.body;
    console.log(event)
    

   Hero_all100.insertMany(event, (err, result) => {
     
      res.send({count:result})
    });
  });


  app.get("/addHero100", (req, res) => {
    Hero_all100.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });


   app.post("/trainnerData", (req, res) => {
    const form = req.body;
 
    Hero_trainner.insertOne(form, (err, result) => {
      res.send({ count: result });
    });
  });

    app.get("/trainnerDataBack", (req, res) => {
    Hero_trainner.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });





   app.post("/driverData", (req, res) => {
    const form = req.body;
 
    Hero_driver.insertOne(form, (err, result) => {
      res.send({ count: result });
    });
  });










 
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});