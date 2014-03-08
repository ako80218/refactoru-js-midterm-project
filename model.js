$(function(){
//Creates an image object for each instance of a picture
var Image = function(obj){
	for (var key in obj){
		this[key] = obj[key];
	}
}

//Loops through an array of image objects and assmbles a TagCloud object.
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
Pastiche.prototype.randomSelectMany = function(num){
	var generatedRange = range(0, num-1);
	var randomImages = map(generatedRange, this.randomSelectOne.bind(this));
	console.log("randomImages:", randomImages);
	return randomImages;
};
//This function takes a string as its first argument to find images tagged with that string.
Pastiche.prototype.imageFind = function(term){
	var foundImages= filter(this.selectedPhotos, function(item){
        return item.tags.indexOf(term)!==-1;
      });
	return foundImages;
};
//This function takes the imagePath of the randomly selected photo object from the pastiche 
//and assigns it to the background of the #background div element
var randomBackground = function(path){
	$("#background").empty().hide();
	$("#background").append('<img id="pastiche-background" class="background-image" src="">');
	$("#pastiche-background").attr('src', path);
	$("#background").fadeIn(1000);
	$('#pastiche-background').fadeIn();
};
var randomDisplay = function(arr){
	console.log("arr: ", arr);
	for(var i=0; i<arr.length; i++){
	var imgSelector = ('img[data-id='+((arr[i].id).toString())+']');
	$(imgSelector).addClass('random');
	}
};
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
 //This function places borders on images selected through their data attribute.
var imageMakeBorders = function(arr){
	for(var i =0; i<arr.length; i++){
		$('img[data-id=\''+arr[i].id+'\']').css('border','red solid 3px');
	}
};
 //This function removes borders on images selected through their data attribute.
var imageRemoveBorders = function(){
	$('.image').css('border','none');
};
//This function removes images selected through data-id attributes. 
//It takes an array as its argument.
var imageRemove = function(arr){
	for(var i =0; i<arr.length; i++){
    	$('img[data-id=\''+arr[i].id+'\']').remove();
  	}
};
 //Positions the lightbox within the #overlay div, Used as a callback on a load event handler
var positionLightbox= function(){
	var imageWidth= $('#lightbox-image').width();
	var imageHeight = $('#lightbox-image').height();
	if(imageHeight>=($(window).height())*0.8){
		var widthRatio =($(window).height()*0.7)/imageHeight;
		imageWidth*=widthRatio;
		imageHeight=($(window).height()*0.7);
	}
	if(imageWidth>=($(window).width()*0.8)){
		var heightRatio =($(window).width()*0.7)/imageWidth;
		imageHeight*=heightRatio;
		imageWidth=($(window).width()*0.7);
	}
	$('#lightbox-image').height(imageHeight);
	$('#lightbox-image').width(imageWidth);
	var scrolling = $(document).scrollTop();
	var top = ($(window).height() - $('#lightbox').height())/2;
	var left = ($(window).width() - $('#lightbox').width())/2;
	$('#lightbox').css({
		top: top + scrolling,
		left : left
	})
	.fadeIn();
};
//closes the #lightbox and #overlay divs when used as a callback on a click handler 
var removeLightbox = function(){
	$('#overlay, #lightbox')
	.fadeOut('slow', function(){
		$(this).hide();
		$('body').css('overflow-y', 'auto');//show scrollbars again
	});
};
//Creates and inserst dom elements necesary to hold a single image in the lightbox view 
var imageLightbox = function(obj){
	$('#overlay').empty();
	//prevent scrollbars
	$('body').css('overflow-y', 'hidden');
	$('#overlay').fadeIn(600);
	var lightboxTemplate = $('#ligthbox-template').html();
	var template = Handlebars.compile(lightboxTemplate);
	$('#overlay').append(template(obj));
	$('#lightbox-image').on('load', function(){
	positionLightbox();
	
	});
	
};
// This function rotates three images through home background
var  loopingBackground = function(){	
	// $('#pastiche-background').hide();
	//prevent scrollbars
	$('body').css('overflow-y', 'hidden');
	$("#background > div:gt(0)").hide();
	setInterval(function() { 
	  $('#background > div:first')
	    .fadeOut(2000)
	    .next()
	    .fadeIn(2000)
	    .end()
	    .appendTo('#background');
	},  4000);
};
loopingBackground();
$('#photo-search-submit').on('click', function(e){
	e.preventDefault();
	$('body').css('overflow-y', 'auto');
	var catalogue = new Catalogue(library);
	var searchTerm = $('#photo-search').val();
	var pastiche = new Pastiche(catalogue, searchTerm);
	pastiche.randomSelectOne();
	var pasticheTagCloud = new TagCloud(pastiche.selectedPhotos);
	tagsDomInsert(pasticheTagCloud.setTagWeights());
	imagesDomInsert(pastiche);
	var backgroundImage = pastiche.randomSelectOne();
	randomBackground(backgroundImage.imagePath);
	randomDisplay(pastiche.randomSelectMany(4));
	$(document).on('click', '.image', function(){
		var photoId = $(this).data('id');
		console.log("photoID: ", photoId);
		console.log("pastiche: ", pastiche);
		var selectedImage = filter(pastiche.selectedPhotos, function(item){
			return item.id.indexOf(photoId) !== -1;
	});
	imageLightbox(selectedImage[0]);
		$(document).on('click', '#close', function(e){
				e.preventDefault();
				removeLightbox();
		});
	});
	$(document).on('mouseenter', '.tag', function(){
		var tag = $(this).data('tag');
		var foundImages = pastiche.imageFind(tag);
        imageMakeBorders(foundImages);
  	});
	$(document).on('mouseleave', '.tag', function(){
        imageRemoveBorders();
	});
      $(document).on('click', '.close', function(e){
      	e.preventDefault();
        $(this).parent().remove(); 
        var tag = $(this).parent().data('tag');
        var foundImages = pastiche.imageFind(tag);
        imageRemove(foundImages);
      });
});
});




