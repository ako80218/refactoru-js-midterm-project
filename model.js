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
    		tagWeights.key =key;
    		tagWeights[key]=this.tagCounts[key]/maxValue;
    	}
    	console.log("tagWeights: ", tagWeights);
    	return tagWeights;
}
//This function assigns font sizes based on weights assigned to 
//tags in the setTagWeights method. This function takes as its argument, the 
//object that setTagWeights returns. The setFontSizes method returns an  
TagCloud.prototype.setFontSizes = function(obj){
	for(var key in obj){
		if(obj[key] ===1){}	
}
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
	pasticheTagCloud.setTagWeights();
});


});




