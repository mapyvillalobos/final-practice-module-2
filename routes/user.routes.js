const router = require("express").Router();
const User = require("../models/User.model")
const fileUploader = require("../config/cloudinary.config")

/* GET home page */
router.get("/edit-myUser", (req, res, next) => {
 //sacar al current user del request que fue almacenado gracias a express-session
 const {user} = req.session   
  res.render("user/edit-user", user);
});

router.post("/edit-myUser", fileUploader.single("profile_pic"),(req,res,next)=>{
    let profile_pic;
    if(req.file){
        profile_pic = req.file.path
    }
const {role, ...restUSer} = req.body
const {user} = req.session

User.findByIdAndUpdate(user._id, {...restUSer, profile_pic}, {new:true})
.then(updatedUser =>{
    //sobreescribir el user current req.session
    req.session.user = updatedUser

    res.redirect("/user/my-profile")

})
.catch(error =>{
    next(error)
})
})

//perfil
router.get("/my-profile", (req, res, next) => {
  //sacar al current user del request que fue almacenado gracias a express-session
  const { user } = req.session;
  res.render("user/profile", user);
});

module.exports = router;
