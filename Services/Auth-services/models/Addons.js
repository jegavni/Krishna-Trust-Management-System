import mongoose from "mongoose";
const moduleSchema = new mongoose.schema(
{
name:{
    type : String,
    required : true,
},
slug:{
    type:String,
    unique:true,
    required:true,
},
route:{
    type:String,
    required:true,
},
icon:String,
enabled:{
    type:Boolean,
    default:true,
},
roles:[string],

},
{
    timestamps:true,
}

);

export default mongoose.model(module,moduleSchema)



