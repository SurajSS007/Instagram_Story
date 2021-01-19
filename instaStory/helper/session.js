module.exports = {
    login: (req,res,next)=>{
        if(!req.session.uname){
            return res.status(401).send("Login First")
        }
        console.log("welcome to Instagram story");
        next();
    }
}
