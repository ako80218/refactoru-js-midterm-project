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
	console.log("this.tagCounts: ", this.tagCounts);
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
	this.images= map(arr, function(x){
		return x;
	});
};
//This function builds a selectedPhotos array of image objects with a tag value that 
///is exactly equal to the search term of all available image objects stored in raw-data.js
///Function takes an array of photo objects as its first argument and a string as it's second argument.
var Pastiche = function(lib, term){
	this.selectedPhotos= filter(lib.images, function(item){
		return item.tags.indexOf(term) !== -1;
	});
};
//This function randomly selects a photo object in the pastiche array
Pastiche.prototype.randomSelectOne = function(){
	// console.log(this);
 	var selectedIndex = Math.floor(Math.random() * (this.selectedPhotos.length));
 	return this.selectedPhotos[selectedIndex];
};
/////
Pastiche.prototype.randomSelectMany = function(num){
	var generatedRange = range(0, num-1);
	var randomImages = map(generatedRange, this.randomSelectOne.bind(this));
	console.log("randomImages:", randomImages);
	return randomImages;
};

//This function takes the imagePath of the randomly selected photo object from the pastiche 
//and assigns it to the background of the #background div element
var randomBackground = function(path){
	$("#background").hide();
	$("#pastiche-background").attr('src', path);
	$("#background").fadeIn(1000);
}




//This function creates and inserts the dom elements necesary to hold the tag cloud.
//The function's first argument is an object 
var tagsDomInsert = function(obj){
	console.log("obj ", obj);
	$('#cloud-container').empty();
	var tagCloud = $('#tag-cloud').html();
 	var template = Handlebars.compile(tagCloud);
 	$('#cloud-container').append(template(obj));
};
//This function creates and inserts the dom elements necesary to hold the images in the pastiche.
//The function's first argument is an object 
var imagesDomInsert = function(obj){
	$('#image-container').empty();
	var imageTemplate = $('#image-template').html();
	// console.log("obj ", obj.selectedPhotos);
 	var template = Handlebars.compile(imageTemplate);
 	$('#image-container').append(template(obj.selectedPhotos));
 };


// This function rotates three images through home background
// var  loopingBackground = function(){	
// 	$('#pastiche-background').hide();
// 	$("#background > div:gt(0)").hide();
// 	setInterval(function() { 
// 	  $('#background > div:first')
// 	    .fadeOut(2000)
// 	    .next()
// 	    .fadeIn(2000)
// 	    .end()
// 	    .appendTo('#background');
// 	},  4000);
		

// };

// loopingBackground();





$('#photo-search-submit').on('click', function(e){
	e.preventDefault();
	var catalogue = new Catalogue(library);
	var searchTerm = $('#photo-search').val();
	var pastiche = new Pastiche(catalogue, searchTerm);
	pastiche.randomSelectOne();
	pastiche.randomSelectMany(2);
	
	var pasticheTagCloud = new TagCloud(pastiche.selectedPhotos);
	tagsDomInsert(pasticheTagCloud.setTagWeights());
	imagesDomInsert(pastiche);
	var backgroundImage = pastiche.randomSelectOne();
	// console.log("backgroundImage.imagePath: ", backgroundImage.imagePath);
	randomBackground(backgroundImage.imagePath);

	

	
	
});


});




