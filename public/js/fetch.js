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


$('#fetchButton').click(function(e){
	$('#fetchButton').hide()
	$('#credsLabel').show()
	$('table[id="credentials"]').show()
})

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