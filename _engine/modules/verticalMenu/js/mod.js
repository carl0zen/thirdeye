//Gestures



	
(function () {
    	// media query event handler
	if (matchMedia) {
		var mq = window.matchMedia("(min-width: 480px)");
		mq.addListener(WidthChange);
		WidthChange(mq);
	}
	
	// media query change
	function WidthChange(mq) {
		if (!mq.matches) {
			var element = document.getElementById('verticalMenu');
			var verticalMenu = Hammer(element).on("swipeleft", function(event) {
		        $('.menu-icon').trigger('click');
		    });

			element = document.getElementById('content');
			var content = Hammer(element).on("swiperight", function(event) {
		        $('.menu-icon').trigger('click');

		       
		    });




		   
		}
	}
})();