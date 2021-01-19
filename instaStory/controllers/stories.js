require('dotenv').config();
require('../helper/cloudinary');
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const upload = require('../helper/multer');
const cloudinary = require("cloudinary");
const { getVideoDurationInSeconds } = require('get-video-duration');
const Stories = mongoose.model('Stories');
const User = mongoose.model('User')
const date = require('date-and-time');


router.post('/:id', upload.single('video'), async(req,res) => {
    try { 
        const UserId = req.params.id;
        var check = 0;     
        getVideoDurationInSeconds(req.file.path).then((duration) => {

            console.log(duration)
            if(duration<=30){
                console.log("done");
                check = 1;
                
            }else{
                console.log("undone");
                check = 0;
            }
          })
          if(check = 1){
        const result = await cloudinary.v2.uploader.upload(req.file.path,
            { resource_type: "video",public_id:"suraj/stories/1"},function(error, r) {console.log(r, error)}) 
        // res.send(result)
        const stories = new Stories()
        stories.stories = result.secure_url
        stories.Text = req.body.Text
        stories.Tagname= req.body.Tagname

        stories.user = UserId ;


        await stories.save(async(err,doc) => {
            if(!err){
                res.send(doc)
                const userById = await User.findById(UserId);
                userById.storys.push(stories);
                await userById.save();
            }else{
                res.send(err)
            }
        });
          }
          else{
              res.send("error");
          }
   
    } catch (error) {
        console.log(error); 
        res.send(error)
    }
})

router.get('/:uid/:sid',async(req,res)=>{
    const uid =req.params.uid;
    const sid =req.params.sid;
    let check = 0;
    try {
      const story = await Stories.findById(sid);
      story.counts = story.counts + 1;
      story.viewBy.forEach((item,index)=>{
        console.log(index,item)
        if (item==uid){
            check = 1;
        }else{
            check = 0;
        }
    })

        if(check == 0 ){
            await story.viewBy.push(uid) 
            res.send(story)
            console.log("add viewby");
        }else{
            console.log("viewby has this user id");
            res.send("viewby has this user id")
        }
      story.save((err,docs) =>{
          if(!err){
              console.log("done");
          }else{
              console.log("not done"+err);
              res.send(err)
          }
      });
      
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})



module.exports = router;