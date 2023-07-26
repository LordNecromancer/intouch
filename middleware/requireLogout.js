module.exports =(req,res,next) =>{
    if(req.user){
        console.log('ttttttttttttttttttttttttttttttttttttttttttttttttttt')
        res.status(401).send({error :'You are already logged in '});
    }else{
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        next();
    }
}