$(function(){
//creates an image object for each instance of a picture
var Image = function(obj){
	for (var key in obj){
		this[key] = obj[key];
	}
}
//This function loops through an array of image objects and assmbles a tagCounts object.
//This function returns the tagCounts object.
var TagCloud = function(arr){
	this.tagCounts = {};
	for (var i=0; i<arr.length; i++){
		for (var j=0; j<arr[i].tags.length; j++){
			if(this.tagCounts[arr[i].tags[j]] === undefined){
				this.tagCounts[arr[i].tags[j]]=1;	
			}else{
				this.tagCounts[arr[i].tags[j]]++;
			}
		}
	}

};
//This function calculates the most frequent tag in the TagCloud object
//then it calculates the relative weight of all other tags in the cloud and 
//places those values in a fontSizes object. It returns the tagWeights object. 
TagCloud.prototype.setTagWeights = function(){
	var maxProp = null;
	var maxValue = -1;
	for(var key in this.tagCounts){	
		var value = this.tagCounts[key];
		if (value > maxValue) {
		      maxValue = value;
		      maxProp = key;
    		}
    	}
    	var tagWeights ={};

    	for(var key in this.tagCounts){
  		tagWeights[key] = key;
    		tagWeights[key]=this.tagCounts[key]/maxValue;
    		tagWeights[key] = tagWeights[key] > .3 ? (((tagWeights[key])*2.7).toFixed(1)).toString() + 'em' : '1em';
    	}
        	return tagWeights;
}
//This function builds a array of all available image objects. It takes an array as its argument.
var Catalogue = function(arr){
	var images = [];
	for (i=0; i<arr.length; i++){
		var imageObject = new Image(arr[i]);
		images.push(imageObject);
	}
	return images;
};
//This function builds a selectedPhotos array of image objects with a tag value that 
///is exactly equal to the search term of all available image objects stored in raw-data.js
///Function takes an array of photo objects as its first argument and a string as it's second argument.
var createPastiche = function(lib, term){
	var selectedPhotos = [];
	selectedPhotos= filter(lib, function(item){
			return item.tags.indexOf(term) !== -1;
		});
	return selectedPhotos;
};
//This function creates and inserts the dom elements necesary to hold the tag cloud.
//The function's first argument is an object 
var tagsDomInsert = function(obj){
	$('#cloud-container').empty();
	var tagCloud = $('#tag-cloud').html();
 	var template = Handlebars.compile(tagCloud);
 	$('#cloud-container').append(template(obj));
};
//This function creates and inserts the dom elements necesary to hold the images in the pastiche.
//The function's first argument is an object 
var imagesDomInsert = function(arr){
	$('#image-container').empty();
	var imageTemplate = $('#image-template').html();
 	var template = Handlebars.compile(imageTemplate);
	
 	$('#image-container').append(template(arr));
 	
};
//This function randomly selects one of the photo objects in the pastiche array
//and uses its imagePath property to insert an image in the background
var  randomSelectBackground = function(){

};
// This function rotates three images through
var  loopingBackground = function(){

};
//
$('#background').hide();
$('#background').fadeIn(3000);


$(document).on('click', '#photo-search-submit', function(e){
	e.preventDefault();
	var catalogue = new Catalogue(library);
	var searchTerm = $('#photo-search').val();
	var pastiche = createPastiche(catalogue, searchTerm);
	var pasticheTagCloud = new TagCloud(pastiche);
	// console.log("pasticheTagCloud.setTagWeights: ", pasticheTagCloud.setTagWeights());
	tagsDomInsert(pasticheTagCloud.setTagWeights());
	imagesDomInsert(pastiche);
	// console.log("pastiche[0].imagePath", pastiche[0].imagePath);
	// console.log("pastiche[1].imagePath", pastiche[1].imagePath);
	// console.log("pastiche[2].imagePath", pastiche[2].imagePath);
	

	
	
});


});




