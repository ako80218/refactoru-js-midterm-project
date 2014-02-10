$.ajax({
	url: 'http://api.flickr.com/services/rest/',
	type: "GET",
	data: { 
		method: "flickr.test.echo", 
		name: "Andrew",
		api_key: apiKey
	}
}).done(function( msg ) {
    	console.log( "Data Saved: " , msg);
});