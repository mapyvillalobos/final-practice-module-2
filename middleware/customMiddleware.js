//creamos un middleware para checar los roles  que tiene permitido acceder o realizar determinadas acciones
                        //"ADMIN", "STAFF"
exports.checkRole = (arrayRoles)=>{
return(req,res,next) =>{
    //voy a sacar de mi req.session al user logged para saber que rol tiene
    const {role} = req.session.user

    if(arrayRoles.includes(role)){
        return next()
    }else{
        //le mandamos mensaje o lo mandamos a una pagina
        return res.status(403).send("no tienes el nivel requerido para esta accion")
    }
}

}