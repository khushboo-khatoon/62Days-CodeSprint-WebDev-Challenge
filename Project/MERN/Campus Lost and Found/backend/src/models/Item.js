import mongoose from 'mongoose';
export default mongoose.model('Item', new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, type:{type:String,enum:['lost','found'],required:true},
  title:String, description:String, tags:[String], image:String,
  lat:Number, lng:Number, status:{type:String,default:'open'}, moderated:{type:Boolean,default:false},
  colorHint:String
},{timestamps:true}));