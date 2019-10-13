const express =require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');
//setup express app
const app =express();
let cors = require('cors');

const port = process.env.PORT || 3001;


//listening setup 
app.listen(port , () => {
  console.log("listening on Port " + port)
});

app.use(cors());

//body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes 

const Productroutes = require('./routes/products');

const Cartroutes = require('./routes/cart');

const Userroutes =require("./routes/user")

app.use('/api/product' ,Productroutes);

app.use("/api/user" ,Userroutes)
app.use('/api/cart' ,Cartroutes);
app.use('/uploads',express.static('uploads'))
app.use((req,res,next) => {
  const error = new Error("not found");
  error.status = 400;
  next(error);
});

app.use((error,req,res,next) => {
  res.status (error.status || 500);
  res.json({
    error : {
      message : error.message
    }
  });
});
//connect mongodb 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://jahanzaibali:cV5EfT8t0NmoBBsf@cluster0-qwjew.mongodb.net/test?retryWrites=true&w=majority'
,{ useNewUrlParser: true })
.then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);




