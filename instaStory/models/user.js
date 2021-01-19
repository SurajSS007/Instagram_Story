const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    uname:{
    type:String,
    required:true
    },
    email:{
    type:String,
    required:true
    },  
    password:{
    type:String,
    required:true
    },
    avatar:String,
    bio:String ,
    storys:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Stories'
    }]
})


    userSchema.pre('save', async function(next){
        try{
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(this.password, salt)
            this.password= hashPassword
            next()
        }catch(err){
            console.log(err)
        }
    })
    

const User = mongoose.model('User',userSchema);
module.exports = User;