// All the modules js copied from the module folder




/**
	Selective image loading for different devices
	E.g.
	
	<img data-small="url" data-medium="url" data-large="url">

**/
(function () {
    function removeQuotes(string) {
        if (typeof string === 'string' || string instanceof String) {
            string = string.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '');
        }
        return string;
    }

    function getBreakpoint() {
        var style = null;
        if ( window.getComputedStyle && window.getComputedStyle(document.body, '::before') ) {
            style = window.getComputedStyle(document.body, '::before');
            style = style.content;
        }
        return JSON.parse( removeQuotes(style) );
    }

    function setSource() {
      var label = getBreakpoint();
      var image = document.getElementsByTagName('img');
      for (var i = 0; i < image.length; i++) {
        var source = image[i].getAttribute('data-' + label.current);
        image[i].src = source;
      }
    }

    document.addEventListener("DOMContentLoaded", setSource);
    window.onresize = setSource;

})();
//Vertical Menu COde

(function () {
      // media query event handler
  
})();

//Replace all images for inline svg to use css for styling
// NOTE: The image must have an svg class
jQuery('img.svg').each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });