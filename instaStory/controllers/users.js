require('dotenv').config();
const express = require('express');
var router = express.Router();
const cloudinary = require("cloudinary");
require('../helper/cloudinary');
const upload = require('../helper/multer');
// const Stories = mongoose.model('Stories');
const bcrypt = require('bcrypt');
const {login} = require('../helper/session');

// const NewUser = mongoose.model('UserModel')
const NewUser = require('../models/user');


router.get('/',login,async(req,res) => {
  
    let allUsers = await NewUser.find();
    res.json(allUsers);
})

router.get('/:id', async(req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        const user=await NewUser.findById(id).populate('storys');
        res.json(user.storys);
    }catch(err){
    res.send(err)
}
});


router.post('/', upload.single('avatar'), async(req,res) =>{
    try {
        const { uname,email,password,bio } = req.body ;
        const avatar = await cloudinary.v2.uploader.upload(req.file.path,
            function(error, result) {console.log(result, error)});
        
                     
        const user = new NewUser();
        user.email = email
        user.uname = uname
        user.password = password
        user.bio =bio
        user.avatar = avatar.url;

        user.save((err, doc) => {
            if (!err)
                res.json(user)
            else {
                    console.log(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
})



router.post('/login',(req,res) => {
        // authenticateUser(req,res);
 

        NewUser.findOne({uname:req.body.uname},(err,userInfo) => {
            if(err){
                next(err);
        
            }else{
                if(bcrypt.compareSync(req.body.password, userInfo.password)){
                    req.session.uname = req.body.uname;
                    res.json({status:"success", message: "user found!!!"});
                }else{
                    res.json({status:"failure", message: "not found!!!"});
                }
            }
        }) 

    });

    

module.exports = router;