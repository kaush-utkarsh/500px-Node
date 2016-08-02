
// function to fetch all the images related to the user's profile
function fetchImages(){
	$.ajax({
        type: "POST",
        url: '/imagesFetch/',
        data: {username:$('#username').val(),password:$('#password').val()},
        dataType: "json",
        success: function(response){
        	console.log(response)
        },
    });
}

// Shows the login form on fetch button click
$('#fetchButton').click(function(e){
	$('#fetchButton').hide()
	$('#credsLabel').show()
	$('table[id="credentials"]').show()
})

// handles credentials verification on login form submit
$('form[id="credentials"]').on('submit',function(e){
	e.preventDefault();
	$('#errLabel').hide()
	$('#waitLabel').show();

	$.ajax({
        type: "POST",
        url: '/verify500pxCreds/',
        data: {username:$('#username').val(),password:$('#password').val()},
        dataType: "json",
        success: function(response){
        	if(response.success)
        	{
        		$('#credsLabel').hide()
        		$('#errLabel').hide()
        		$('#waitLabel').hide()
        		$('#credentials').hide()
        		$('#imageWaitLabel').show()

        		// calls the function to fetch all images on succesful login
        		fetchImages()
        	}
        	else
        	{
        		$('#errLabel').show()
        		$('#waitLabel').hide()

        	}
        },
    });
})