{{* Strings which are needed for some js functions (e.g. translation or the interval for page update)
They are loaded into the html <head> so that js functions can use them *}}
<script type="text/javascript">
	const _conf = {
		// Background ping - for latest posts and notifications
		pingInterval: {{$update_interval}},
		pingPaused: false,

		// Notification settings
		notifications: {
			// Make a sound when there is something new
			sound: false,
			// Do not disturb
			paused: false,

			// Do not disturb for how long
			pausedTimer: false,
		}
	}

	var localUser = {{if $local_user}}{{$local_user}}{{else}}false{{/if}};
	var aStr = {
		'delitem'     : "{{$delitem}}",
	};
</script>