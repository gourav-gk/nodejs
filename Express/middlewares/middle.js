function mymiddleware(req,res,next){
    console.log('I am custom middleware')
    next()
}

module.exports = mymiddleware