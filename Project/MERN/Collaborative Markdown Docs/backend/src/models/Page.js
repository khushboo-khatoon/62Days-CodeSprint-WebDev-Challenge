import mongoose from 'mongoose';
const version=new mongoose.Schema({content:String,at:{type:Date,default:Date.now},by:String});
export default mongoose.model('Page', new mongoose.Schema({
  workspace:{type:mongoose.Schema.Types.ObjectId,ref:'Workspace'},
  parentId:{type:mongoose.Schema.Types.ObjectId,ref:'Page',default:null},
  title:String, content:{type:String,default:''}, versions:[version],
  shareId:String, shareRole:{type:String,enum:['view','edit'],default:'view'}
},{timestamps:true}));