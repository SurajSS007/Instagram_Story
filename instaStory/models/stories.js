const mongoose = require('mongoose');


const storiesSchema = new mongoose.Schema({
    story:{
        type:String
    },
    Text:{
        type:String
    },
    Tagname:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    viewBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    counts:{
        type:Number,
        default:0
    }
},{timestamps:true})


const Stories = mongoose.model('Stories',storiesSchema);
module.exports = Stories ;