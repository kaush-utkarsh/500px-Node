$('#fetchButton').click(function(e){
	$('#fetchButton').hide()
	$('#credsLabel').show()
	$('table[id="credentials"]').show()
})

$('form[id="credentials"]').on('submit',function(e){
	e.preventDefault();
	$.ajax({
        type: "POST",
        url: '/verify500pxCreds/',
        data: {username:$('#username').val(),password:$('#password').val()},
        async:false,
        dataType: "json",
        success: function(response){
        	console.log(response);
        },
    });
})