var pxCrawl = require('../utils/500pxCrawl')

var verifyCreds = function (req, res) {
    var username = req.body.username
    var password = req.body.password
    pxCrawl.doLogin({username:username, password:password}, function(err, result){
    	if(!err){
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

var imagesFetch = function (req, res) {
    var username = req.body.username
    var password = req.body.password
    pxCrawl.doLogin({username:username, password:password}, function(err, result){
    	if(!err){
    		if(result['success']){
    			pxCrawl.fetchAllImages(result, function(err, imageSet){
    				console.log(imageSet)
    			
    			})
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
    verifyCreds:verifyCreds,
    imagesFetch:imagesFetch
};
