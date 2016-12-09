var ProjectName = (function($) {

	var init = function() {

		// Set up any all
		// default libraries here

		function currentTime() {

  		var d;

		  // Checking for DST but I'm not sure this code is accurate if a country
		  // doesn't observe DST 🤔
		  Date.prototype.stdTimezoneOffset = function() {
		    var jan = new Date(this.getFullYear(), 0, 1);
		    var jul = new Date(this.getFullYear(), 6, 1);
		    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
		  }

		  Date.prototype.dst = function() {
		    return this.getTimezoneOffset() < this.stdTimezoneOffset();
		  }

		  // get the current local time + UTC offset
		  function timeNow() {
		    d = new Date();

		    var savings = (d.dst()) ? 1 : 0,
		        tOffset  = 8,             // Target offset --> local offset
		        offset   = tOffset - (d.getTimezoneOffset() / 60),
		        h        = d.getHours() - offset + savings, // 24hr display
		        hTwelve  = (h > 12 ? h - 12 : h),           // 12hr display
		        m        = (d.getMinutes() <10 ? '0' : '') + d.getMinutes(),
		        meridiem = (h < 12 ? 'am' : 'pm');
		    // console.log('time updated');

		   return  hTwelve + '<span>:</span>' + m + meridiem;
		  }

		  // add current time to the correct element
		  function createTime() {
		    $('#time').html(timeNow());
		  }

		  // set time on load to avoid delay of first setInterval
		  createTime();

		  // update the time & append to body
		  function updateTime() {
		    timeNow();
		    createTime();
		  }

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
