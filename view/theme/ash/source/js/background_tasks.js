
function PingPong() {
	if (!_config.pingPaused) {
		var pingCmd = 'ping?format=json' + ((localUser != 0) ? '&uid=' + localUser : '');
		$.get(pingCmd, function (data) {
			if (data.result) {
				// send nav-update event
				$('nav').trigger('nav-update', data.result);

				// start live update
				['network', 'profile', 'community', 'notes', 'display', 'contact'].forEach(function (src) {
					if ($('#live-' + src).length) {
						liveUpdate(src);
					}
				});
				if ($('#live-photos').length) {
					if (liking) {
						liking = 0;
						window.location.href = window.location.href;
					}
				}
			}
		});
	}
	timer = setTimeout(NavUpdate, _conf.updateInterval);
}


// $("nav").bind('nav-update', function (e, data) {
// 	if (pagetitle == null) pagetitle = document.title;
// 	var count = $(data).find('notif').attr('count');
// 	if (count > 0) {
// 		document.title = "(" + count + ") " + pagetitle;
// 		/* document.getElementById('notifsound').innerHTML='<object type="audio/mpeg" width="0" height="0" data="<?=$frio?>/audios/901.mp3"><param name="notif" value="<?=$frio?>/audios/901.mp3" /><param name="autostart" value="true" /><param name="loop" value="false" /></object>'; */
// 	}
// 	else {
// 		document.title = pagetitle;
// 	}
// });