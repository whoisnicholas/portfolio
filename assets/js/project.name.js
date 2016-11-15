var ProjectName = (function($) {

	var init = function() {

		// Set up any all
		// default libraries here

		function currentTime() {
		  // get the current time + local offset
		  function timeNow() {
		    var d = new Date(),
		        offset = 8 - d.getTimezoneOffset() / 60,
		        h = d.getHours() - offset - (d.getHours()>12?'12':'0'),
		        m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
		        meridiem = (d.getHours()>12?'pm':'pm')

		   return h + '<span>:</span>' + m + meridiem;
		  }

		  // update the time & append to body
		  function updateTime() {
		    timeNow();
		    $('#time').html(timeNow());
		  }

		  // set time on load to avoid delay of first setInterval
		  $('#time').html(timeNow());

		  // call upUpdate time and refresh every 15s
		  setInterval(updateTime, 15000);
		}

		// Call the whole function
		currentTime();

	} // end init

	return {
		init: init
	};

}(jQuery));

$(function() {
	ProjectName.init();
});
