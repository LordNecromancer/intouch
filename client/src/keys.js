if(process.env.NODE_ENV === 'production'){
    module.exports={
        host:''
    }
}else{
    module.exports={
        host:'http://localhost:5000/'
    }
}