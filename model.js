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
    		tagWeights[key] = tagWeights[key] > .3 ? (((tagWeights[key])*3).toFixed(1)).toString() + 'em' : '1em';
    	}
    	// console.log("tagWeights: ", tagWeights);
        	return tagWeights;
}
//This fucntion creates the dom elements neceray to hold the tag cloud.


//empty image catalogue
var image = [];
for (i=0; i<library.length; i++){
	//create a catalogue of all the image objects
	var imageObject= new Image(library[i]);
	image.push(imageObject);
}
$(document).on('click', '#photo-search-submit', function(e){
	e.preventDefault();
	var searchTerm = $('#photo-search').val();
	console.log('searchTerm.length: ', searchTerm.length);
	var pastiche = [];
	//the pastiche is an array of image objects with tags values that 
	//are exactly equal to the search term
	pastiche= filter(image, function(item){
			return item.tags.indexOf(searchTerm) !== -1;
		});
	// console.log(pastiche);
	var pasticheTagCloud = new TagCloud(pastiche);
	console.log("pasticheTagCloud: ", pasticheTagCloud);
	$('<ul id="tag-list" >').appendTo("#tagCloud");
	//create item
	var li = $("<li>");
	//add to list
	li.appendTo("#tag-list");
	var newTags = pasticheTagCloud.setTagWeights();
	console.log("newTags: ", newTags);
	for (var key in newTags){
		$('#tag-list').children('li').text('key').css('font-size', newTags[key]);
		
	}
});


});




