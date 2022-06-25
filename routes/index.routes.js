const router = require("express").Router();
const User = require("../models/User.model")
const {checkRole} = require("../middleware/customMiddleware")
const isLoggedIn = require("../middleware/isLoggedIn")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


//Rutas para admin
router.get("/admin/users", isLoggedIn, checkRole(["ADMIN", "STAFF"]),(req, res, next) => {
  User.find({role: {$ne:"ADMIN"}}, {password:0}) //para borrar el paswword de la terminal
  .then(users =>{
    console.log("users", users)
    res.render("listUser", {users})
  })
.catch(error=>{
  next(error)
})

});


module.exports = router;
