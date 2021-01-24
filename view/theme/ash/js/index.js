// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPLv3-or-later
function __ready(fn) {
    if (document.readyState != "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function __trigger(data) {
    if (window.CustomEvent && typeof window.CustomEvent === "function") {
        var event = new CustomEvent("my-event", data);
    } else {
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent("my-event", true, true, {
            some: "data"
        });
    }
    el.dispatchEvent(event);
}

exports.default = function() {
    function NavUpdate() {
        if (!stopped) {
            var pingCmd = "ping?format=json" + (localUser != 0 ? "&uid=" + localUser : "");
            $.get(pingCmd, (function(data) {
                if (data.result) {
                    $("nav").trigger("nav-update", data.result);
                    [ "network", "profile", "community", "notes", "display", "contact" ].forEach((function(src) {
                        if ($("#live-" + src).length) {
                            liveUpdate(src);
                        }
                    }));
                    if ($("#live-photos").length) {
                        if (liking) {
                            liking = 0;
                            window.location.href = window.location.href;
                        }
                    }
                }
            }));
        }
        timer = setTimeout(NavUpdate, updateInterval);
    }
}();

var jotcache = "";

function PWAPermNotification() {
    Notification.requestPermission().then((function(result) {
        console.log(result);
    }));
}

function initWidget(inflated, deflated) {
    var elInf = document.getElementById(inflated);
    var elDef = document.getElementById(deflated);
    if (!elInf || !elDef) {
        return;
    }
    if (localStorage.getItem(window.location.pathname.split("/")[1] + ":" + inflated) != "none") {
        elInf.style.display = "block";
        elDef.style.display = "none";
    } else {
        elInf.style.display = "none";
        elDef.style.display = "block";
    }
}

__ready((function() {
    PWAPermNotification();
    let bs_tooltip_options = {
        container: "body",
        placement: "auto",
        delay: {
            show: 500,
            hide: 100
        }
    };
    var bs_tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var bs_tooltipList = bs_tooltipTriggerList.map((function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, bs_tooltip_options);
    }));
    let bs_toastList_option = {};
    var bs_toastElList = [].slice.call(document.querySelectorAll(".toast"));
    var bs_toastList = bs_toastElList.map((function(toastEl) {
        return new bootstrap.Toast(toastEl, bs_toastList_option);
    }));
    function createToast() {
        let toastBase = '<div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">\t\t<div class="toast-header"><img src="..." class="rounded me-2" alt="...">\t\t<strong class="me-auto">Bootstrap</strong>    <small>11 mins ago</small>    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>  </div>  <div class="toast-body">\t\t\t\t\tHello, world! This is a toast message.  </div></div>';
        document.body.append(createToast);
    }
    createToast();
    var composeTextarea = document.getElementById("composeTextarea");
    var heightLimit = 10;
    composeTextarea.oninput = function() {
        composeTextarea.style.height = "";
        composeTextarea.style.height = Math.min(composeTextarea.scrollHeight, heightLimit) + "rem";
    };
    var scrollStart;
    $(window).scroll((function() {
        let currentScroll = $(this).scrollTop();
        if (!scrollStart || !currentScroll || currentScroll > scrollStart) {
            $("#back-to-top").fadeOut();
            scrollStart = currentScroll;
        }
        if (scrollStart - currentScroll > 100) {
            $("#back-to-top").fadeIn();
            scrollStart = currentScroll;
        }
    }));
    $("#back-to-top").click((function() {
        $("body,html").animate({
            scrollTop: 0
        }, 400);
        return false;
    }));
    if ($("#logo-img").length) {
        var pageurl = "url('" + window.location.href + "#logo-mask')";
        $("#logo-img").css({
            mask: pageurl
        });
    }
    $("ul.tabs.flex-nav").flexMenu({
        cutoff: 2,
        popupClass: "dropdown-menu pull-right",
        popupAbsolute: false,
        target: ".flex-target"
    });
    let $body = $("body");
    $body.change("input.item-select", (function() {
        var checked = false;
        $("input.item-select").each((function() {
            if ($(this).is(":checked")) {
                checked = true;
                return false;
            }
        }));
        if (checked) {
            $("#item-delete-selected").fadeTo(400, 1);
            $("#item-delete-selected").show();
        } else {
            $("#item-delete-selected").fadeTo(400, 0, (function() {
                $("#item-delete-selected").hide();
            }));
        }
    }));
    if ($(".search-heading").length) {
        $(".search-heading").appendTo("#topbar-second > .container > #tabmenu");
    }
    if ($(".search-content-wrapper").length) {
        var searchText = $(".section-title-wrapper > h2").html();
        if (typeof searchText === "undefined") {
            searchText = "No results";
        }
        var newText = '<h4 class="search-heading">' + searchText + "</h4>";
        $("#topbar-second > .container > #tabmenu").append(newText);
        var searchValue = $("#search-wrapper .form-group-search input").val();
        if (typeof searchValue === "undefined") {
            var urlPath = window.location.search;
            var splitPath = urlPath.split(/(\?search?=)(.*$)/);
            if (typeof splitPath[2] !== "undefined") {
                var searchValue = decodeURIComponent(splitPath[2]);
            }
        }
        if (typeof searchValue !== "undefined") {
            $("#nav-search-input-field").val(searchValue);
        }
    }
    $(".search-content-wrapper #search-save").appendTo("#topbar-second > .container > #navbar-button");
    if ($("aside .vcard .fn").length) {
        $(".vcard .fn").scrollspy({
            min: $(".vcard .fn").position().top - 50,
            onLeaveTop: function onLeave(element) {
                $("#vcard-short-info").fadeOut(500, (function() {
                    $("#vcard-short-info").appendTo("#vcard-short-info-wrapper");
                }));
            },
            onEnter: function(element) {
                $("#vcard-short-info").appendTo("#nav-short-info");
                $("#vcard-short-info").fadeIn(500);
            }
        });
    }
    if ($(".network-content-wrapper > #viewcontact_wrapper-network").length) {
        $(".network-content-wrapper > #viewcontact_wrapper-network .contact-wrapper").first().appendTo("#nav-short-info");
    }
    if ($(".network-content-wrapper > .section-title-wrapper").length) {
        var heading = $(".network-content-wrapper > .section-title-wrapper > h2");
        var headingContent = heading.html();
        var newText = '<h4 class="heading" data-bs-toggle="tooltip" title="' + headingContent + '">' + headingContent + "</h4>";
        heading.remove(), $("#topbar-second #nav-short-info").append(newText);
    }
    if ($(".community-content-wrapper").length) {
        var heading = $(".community-content-wrapper > h3").first();
        var headingContent = heading.html();
        var newText = '<h4 class="heading">' + headingContent + "</h4>";
        heading.remove(), $("#topbar-second > .container > #tabmenu").append(newText);
    }
    $body.on("click", ".dropdown-head .dropdown-menu li a, .dropdown-head .dropdown-menu li button", (function() {
        toggleDropdownText(this);
    }));
    $(".toggle label, .toggle .toggle-handle").click((function(event) {
        event.preventDefault();
        var input = $(this).siblings("input");
        var val = 1 - input.val();
        var id = input.attr("id");
        var onstyle = "btn-primary";
        var offstyle = "btn-default off";
        var removedclass = val == 0 ? onstyle : offstyle;
        var addedclass = val == 0 ? offstyle : onstyle;
        $("#" + id + "_onoff").addClass(addedclass).removeClass(removedclass);
        input.val(val);
    }));
    $body.on("click", ".form-group-search > input", (function() {
        var buttonWidth = $(this).next(".form-button-search").outerWidth();
        if (buttonWidth) {
            var newWidth = buttonWidth + 5;
            $(this).css("padding-right", newWidth);
        }
    }));
    $(document).on("mousedown", (function(event) {
        if (event.target.type === "button") {
            return true;
        }
        var $dontclosethis = $(event.target).closest(".wall-item-comment-wrapper").find(".comment-edit-form");
        $(".wall-item-comment-wrapper .comment-edit-submit-wrapper:visible").each((function() {
            var $parent = $(this).parent(".comment-edit-form");
            var itemId = $parent.data("itemId");
            if ($dontclosethis[0] != $parent[0]) {
                var textarea = $parent.find("textarea").get(0);
                commentCloseUI(textarea, itemId);
            }
        }));
    }));
    if (window.matchMedia("(display-mode: standalone)").matches) {
        $("body").on("click", ".plink", (function(e) {
            $(e.target).attr("target", "_blank");
        }));
    }
    $(document).on("change", "textarea", (function(event) {
        autosize.update(event.target);
    }));
    if ($(window).width() > 976) {
        $("aside").stick_in_parent({
            offset_top: 100,
            recalc_every: 10
        });
        $("aside").on("click", "a", (function() {
            $(document.body).trigger("sticky_kit:recalc");
        }));
    }
    $("aside").on("shown.bs.offcanvas", (function() {
        $body.addClass("aside-out");
    })).on("hidden.bs.offcanvas", (function() {
        $body.removeClass("aside-out");
    }));
    let $offcanvas_right_toggle = $(".offcanvas-right-toggle");
    let $offcanvas_right_container = $("#offcanvasUsermenu");
    $offcanvas_right_toggle.on("click", (function(event) {
        event.preventDefault();
        $("body").toggleClass("offcanvas-right-active");
    }));
    $(document).on("mouseup touchend", (function(event) {
        if (!$offcanvas_right_container.is(event.target) && $offcanvas_right_container.has(event.target).length === 0 && !$offcanvas_right_toggle.is(event.target) && $offcanvas_right_toggle.has(event.target).length === 0) {
            $("body").removeClass("offcanvas-right-active");
        }
    }));
    $body.on("click", ".event-map-btn", (function() {
        showHideEventMap(this);
    }));
    $body.on("submit", ".comment-edit-form", (function(e) {
        let $form = $(this);
        let id = $form.data("item-id");
        if (id === 0) {
            return;
        }
        e.preventDefault();
        let $commentSubmit = $form.find(".comment-edit-submit").button("loading");
        unpause();
        commentBusy = true;
        $.post("item", $form.serialize(), "json").then((function(data) {
            if (data.success) {
                $("#comment-edit-wrapper-" + id).hide();
                let $textarea = $("#comment-edit-text-" + id);
                $textarea.val("");
                if ($textarea.get(0)) {
                    commentClose($textarea.get(0), id);
                }
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(NavUpdate, 10);
                force_update = true;
                update_item = id;
            }
            if (data.reload) {
                window.location.href = data.reload;
            }
        })).always((function() {
            $commentSubmit.button("reset");
        }));
    }));
    $body.on("submit", ".modal-body #poke-wrapper", (function(e) {
        e.preventDefault();
        let $form = $(this);
        let $pokeSubmit = $form.find("button[type=submit]").button("loading");
        $.post($form.attr("action"), $form.serialize(), "json").then((function(data) {
            if (data.success) {
                $("#modal").modal("hide");
            }
        })).always((function() {
            $pokeSubmit.button("reset");
        }));
    }));
}));

function openClose(theID) {
    var elem = document.getElementById(theID);
    if ($(elem).is(":visible")) {
        $(elem).slideUp(200);
    } else {
        $(elem).slideDown(200);
    }
}

function showHide(theID) {
    var elem = document.getElementById(theID);
    var edit = document.getElementById("comment-edit-submit-wrapper-" + theID.match("[0-9$]+"));
    if ($(elem).is(":visible")) {
        if (!$(edit).is(":visible")) {
            edit.style.display = "block";
        } else {
            elem.style.display = "none";
        }
    } else {
        elem.style.display = "block";
    }
}

function showHideEventMap(elm) {
    var mapID = elm.getAttribute("data-map-id");
    var mapshow = elm.getAttribute("data-show-label");
    var maphide = elm.getAttribute("data-hide-label");
    if (elm.innerText == mapshow) {
        $("#" + elm.id).text(maphide);
    } else {
        $("#" + elm.id).text(mapshow);
    }
    var mappos = $("#" + mapID).css("position");
    if (mappos === "absolute") {
        $("#" + mapID).hide();
        $("#" + mapID).css({
            position: "relative",
            left: "auto",
            top: "auto"
        });
        openClose(mapID);
    } else {
        openClose(mapID);
    }
    return false;
}

function justifyPhotos() {
    justifiedGalleryActive = true;
    $("#photo-album-contents").justifiedGallery({
        margins: 3,
        border: 0,
        sizeRangeSuffixes: {
            lt48: "-6",
            lt80: "-5",
            lt300: "-4",
            lt320: "-2",
            lt640: "-1",
            lt1024: "-0"
        }
    }).on("jg.complete", (function(e) {
        justifiedGalleryActive = false;
    }));
}

function loadScript(url, callback) {
    var oscript = $('head script[src="' + url + '"]');
    if (oscript.length > 0) {
        oscript.remove();
    }
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

function qOrAmp(url) {
    if (url.search("\\?") < 0) {
        return "?";
    } else {
        return "&";
    }
}

String.prototype.normalizeLink = function() {
    var ret = this.replace("https:", "http:");
    var ret = ret.replace("//www", "//");
    return ret.rtrim();
};

function cleanContactUrl(url) {
    var parts = parseUrl(url);
    if (!("scheme" in parts) || !("host" in parts)) {
        return url;
    }
    var newUrl = parts["scheme"] + "://" + parts["host"];
    if ("port" in parts) {
        newUrl += ":" + parts["port"];
    }
    if ("path" in parts) {
        newUrl += parts["path"];
    }
    return newUrl;
}

function parseUrl(str, component) {
    var query;
    var mode = (typeof require !== "undefined" ? require("../info/ini_get")("locutus.parse_url.mode") : undefined) || "php";
    var key = [ "source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment" ];
    var parser = {
        php: new RegExp([ "(?:([^:\\/?#]+):)?", "(?:\\/\\/()(?:(?:()(?:([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?))?", "()", "(?:(()(?:(?:[^?#\\/]*\\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)" ].join("")),
        strict: new RegExp([ "(?:([^:\\/?#]+):)?", "(?:\\/\\/((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?))?", "((((?:[^?#\\/]*\\/)*)([^?#]*))(?:\\?([^#]*))?(?:#(.*))?)" ].join("")),
        loose: new RegExp([ "(?:(?![^:@]+:[^:@\\/]*@)([^:\\/?#.]+):)?", "(?:\\/\\/\\/?)?", "((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?)", "(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\\/?)?([^?#\\/]*))", "(?:\\?([^#]*))?(?:#(.*))?)" ].join(""))
    };
    var m = parser[mode].exec(str);
    var uri = {};
    var i = 14;
    while (i--) {
        if (m[i]) {
            uri[key[i]] = m[i];
        }
    }
    if (component) {
        return uri[component.replace("PHP_URL_", "").toLowerCase()];
    }
    if (mode !== "php") {
        var name = (typeof require !== "undefined" ? require("../info/ini_get")("locutus.parse_url.queryKey") : undefined) || "queryKey";
        parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
        uri[name] = {};
        query = uri[key[12]] || "";
        query.replace(parser, (function($0, $1, $2) {
            if ($1) {
                uri[name][$1] = $2;
            }
        }));
    }
    delete uri.source;
    return uri;
}

String.prototype.rtrim = function() {
    var trimmed = this.replace(/\s+$/g, "");
    return trimmed;
};

function scrollToItem(elementId) {
    if (typeof elementId === "undefined") {
        return;
    }
    var $el = $("#" + elementId + " > .media");
    if (!$el.length) {
        return;
    }
    var colWhite = {
        backgroundColor: "#F5F5F5"
    };
    var colShiny = {
        backgroundColor: "#FFF176"
    };
    var itemPos = $el.offset().top - 100;
    $("html, body").animate({
        scrollTop: itemPos
    }, 400).promise().done((function() {
        $el.animate(colWhite, 1e3).animate(colShiny).animate({
            backgroundColor: "transparent"
        }, 600);
    }));
}

function htmlToText(htmlString) {
    var text = htmlString.replace(/<br>/g, " ");
    text = text.replace(/<[^>]*>/g, "");
    return text;
}

function doLikeAction(ident, verb, un) {
    if (verb.indexOf("attend") === 0) {
        $(".item-" + ident + " .button-event:not(#" + verb + "-" + ident + ")").removeClass("active");
    }
    $("#" + verb + "-" + ident).toggleClass("active");
    dolike(ident, verb, un);
}

function hex2bin(s) {
    var ret = [];
    var i = 0;
    var l;
    s += "";
    for (l = s.length; i < l; i += 2) {
        var c = parseInt(s.substr(i, 1), 16);
        var k = parseInt(s.substr(i + 1, 1), 16);
        if (isNaN(c) || isNaN(k)) {
            return false;
        }
        ret.push(c << 4 | k);
    }
    return String.fromCharCode.apply(String, ret);
}

function bin2hex(s) {
    var i, l, o = "", n;
    s += "";
    for (i = 0, l = s.length; i < l; i++) {
        n = s.charCodeAt(i).toString(16);
        o += n.length < 2 ? "0" + n : n;
    }
    return o;
}

function toggleDropdownText(elm) {
    $(elm).closest(".dropdown").find(".btn").html($(elm).html() + ' <span class="caret"></span>');
    $(elm).closest(".dropdown").find(".btn").val($(elm).data("value"));
    $(elm).closest("ul").children("li").show();
    $(elm).parent("li").hide();
}

function hasClass(elem, cls) {
    return (" " + elem.className + " ").indexOf(" " + cls + " ") > -1;
}
// @license-end