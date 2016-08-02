// the crawling related activities are stored in a seperate file
var pxCrawl = require('../utils/500pxCrawl')

// verify login credentials
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

// fetch images after successful login
var imagesFetch = function (req, res) {
    var username = req.body.username
    var password = req.body.password
    pxCrawl.doLogin({username:username, password:password}, function(err, result){
    	if(!err){
    		if(result['success']){
    			pxCrawl.fetchAllImages(result, function(err, imageSet){
    				// return the set of images fetched from the user's profile
            		res.send({success: true, imageSet})    			
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
