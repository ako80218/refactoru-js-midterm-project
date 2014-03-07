// $(function(){
// 	var positionLightboxImage = function(){
// 	var top = ($(window).height() - $('#lightbox').height())/2;
// 	var left = ($(window).width() - $('#lightbox').width())/2;
// 	$('#lightbox')
// 	.css({
// 		top: top + $(document).scrollTop(),
// 		left : left
// 	})
// 	.fadeIn();
// };
// var removeLightbox = function(){
// 	$('#overlay, #lightbox')
// 	.fadeOut('slow', function(){
// 		$(this).remove();
// 		$('body').css('overflow-y', 'auto');//show scrollbars again
// 	});
// };
// 	$(document).on('click', '.image', function(e){
// 		console.log('CLICKED');
//       e.preventDefault();
//   //prevent scrollbars
//   $('body').css('overflow-y', 'hidden');
//   $('<div id="overlay">').css('top', $(document).scrollTop())
//   .css('opacity', '0')
//   .animate({'opacity': '0.8'}, 'slow')
//   .appendTo('body');
//  //  $('<div id ="lightbox">')
//  //  .hide()
//  //  .appendTo('body');
//  //  $('<img class="image-large">')
//  //  .attr('src', $(this).attr('src'))
//  //  .load(function(){
//  //    positionLightboxImage();
//  //  })
//  //  .click(function(){
//  //    removeLightbox();
//  //  })
//  //  .appendTo('#lightbox');
// 	// });
// });