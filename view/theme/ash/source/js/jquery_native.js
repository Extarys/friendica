/**
 * Execute a function when the DOM is ready. Equivalent to $(document).ready()
 * @param {*} fn 
 */
function __ready(fn) {
	if (document.readyState != 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

/**
 * Attach a custom javascript event to an element
 * 
 * __trigger("notif", "notif-all", { })
 * @param {*} data 
 */
let _events = {}
function __trigger(eventObj, eventName, data) {
	if (window.CustomEvent && typeof window.CustomEvent === 'function') {
		var _events[eventObj] = new CustomEvent(eventName, data);
	} else {
		var _events[eventObj] = document.createEvent('CustomEvent');
		_events[eventObj].initCustomEvent(eventName, true, true, data);
	}

	el.dispatchEvent(_events[eventObj]);
}