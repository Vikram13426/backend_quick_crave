const express=require('express')
const dotEnv=require('dotenv')
const mongoose=require('mongoose')
const vendorRoutes=require('./routes/vendorRoutes')
const bodyParser=require('body-parser')
const firmRoutes=require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes');
const cors=require('cors')

const app=express()
const PORT= process.env.PORT||4000;



dotEnv.config();
app.use(cors())


mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("Successfully connected to mongodb")})
.catch((err)=>{  console.log(err); })

app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);//middle ware for vendor 

app.use('/firm',firmRoutes)//middleware for firm

app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));


app.listen(PORT,()=>{
    console.log(`App started and running on port ${PORT}`)
})
app.use('/',(req,res)=>{
    res.send("<h1>Welcome to the QuickCrave</h1>");

})