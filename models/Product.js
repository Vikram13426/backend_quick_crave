const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
productName:{
    type:String,
    required:true,

},
price:{
    type:String,
    required:true,
},
category:{
    type:[
        {
            type:String,
            enum:['veg','non-veg']
        }
    ]


},
bestSeller:{
    type:String
},
image:{
    type:String
}
,

description:{
    type:String
},
firm:[        //linking the firm model 
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }
]


})

const Product=mongoose.model('Product',productSchema);
module.exports=Product;