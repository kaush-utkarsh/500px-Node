var pxCrawl = require('../utils/500pxCrawl')

var verifyCreds = function (req, res) {
    var username = req.body.username
    var password = req.body.password
    console.log(username,password)
    pxCrawl.doLogin({username:username, password:password}, function(err, result){
    	if(!err){
    		console.log(result)
    		if(result['success']){
            	res.send({success: true})
    		}
    		else{
            	res.send({success: false})
    		}
    	}
    	else{
        	res.send({success: false})	
    	}

    })
}

module.exports = {
    verifyCreds:verifyCreds
};
