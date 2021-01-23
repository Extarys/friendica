{{* This content will be added to the html page <head> *}}

<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<base href="{{$baseurl}}/" />
<meta name="generator" content="{{$generator}}" />
<meta name="viewport" content="initial-scale=1.0">

{{* All needed css files - Note: css must be inserted before js files *}}

<link rel="stylesheet"
	href="view/asset/perfect-scrollbar/dist/css/perfect-scrollbar.min.css?v={{$smarty.const.FRIENDICA_VERSION}}"
	type="text/css" media="screen" />
<link rel="stylesheet" href="view/asset/fork-awesome/css/fork-awesome.min.css?v={{$smarty.const.FRIENDICA_VERSION}}"
	type="text/css" media="screen" />

<link rel="stylesheet"
	href="view/theme/ash/frameworks/bootstrap/css/bootstrap.min.css?v={{$smarty.const.FRIENDICA_VERSION}}"
	type="text/css" media="screen" />

<link rel="stylesheet"
	href="view/theme/ash/frameworks/ekko-lightbox/ekko-lightbox.min.css?v={{$smarty.const.FRIENDICA_VERSION}}"
	type="text/css" media="screen" />
<link rel="stylesheet"
	href="view/theme/ash/frameworks/justifiedGallery/justifiedGallery.min.css?v={{$smarty.const.FRIENDICA_VERSION}}"
	type="text/css" media="screen" />
<link rel="stylesheet" href="view/theme/ash/font/open_sans/open-sans.css?v={{$smarty.const.FRIENDICA_VERSION}}"
	type="text/css" media="screen" />

{{* own css files *}}
<link rel="stylesheet" href="view/theme/ash/css/font-awesome.custom.css?v={{$smarty.const.FRIENDICA_VERSION}}"
	type="text/css" media="screen" />

{{foreach $stylesheets as $stylesheetUrl => $media}}
	<link rel="stylesheet" href="{{$stylesheetUrl}}" type="text/css" media="{{$media}}" />
{{/foreach}}

<link rel="shortcut icon" href="{{$shortcut_icon}}" />
<link rel="apple-touch-icon" href="{{$touch_icon}}" />

<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="manifest" href="{{$baseurl}}/manifest" />
<script type="text/javascript">
	// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat
	// Prevents links to switch to Safari in a home screen app - see https://gist.github.com/irae/1042167
	(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(chref=d.href).replace("{{$baseurl}}/", "").replace(e.href,"").indexOf("#")&&(!/^[a-z\+\.\-]+:/i.test(chref)||chref.indexOf(e.protocol+"//"+e.host)===0)&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone");
		// |license-end
	</script>

	<link rel="search" href="{{$baseurl}}/opensearch" type="application/opensearchdescription+xml"
		title="Search in Friendica" />


	{{* IE shim *}}
	<!--[if IE]>
<script type="text/javascript" src="https://html5shiv.googlecode.com/svn/trunk/html5.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
<![endif]-->
	{{* Vendor Javascript *}}
	<script type="text/javascript" src="view/js/modernizr.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	<script type="text/javascript" src="view/asset/jquery/dist/jquery.min.js?v={{$smarty.const.FRIENDICA_VERSION}}">
	</script>
	<script type="text/javascript" src="view/js/jquery.textinputs.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	<script type="text/javascript"
		src="view/asset/textcomplete/dist/textcomplete.min.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	<script type="text/javascript" src="view/js/autocomplete.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	<script type="text/javascript"
		src="view/asset/perfect-scrollbar/dist/js/perfect-scrollbar.jquery.min.js?v={{$smarty.const.FRIENDICA_VERSION}}">
	</script>
	<script type="text/javascript"
		src="view/asset/imagesloaded/imagesloaded.pkgd.min.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	<script type="text/javascript" src="view/asset/base64/base64.min.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	<script type="text/javascript" src="view/asset/dompurify/dist/purify.min.js?v={{$smarty.const.FRIENDICA_VERSION}}">
	</script>

	<script type="text/javascript"
		src="view/theme/ash/frameworks/bootstrap/js/bootstrap.min.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	<script type="text/javascript"
		src="view/theme/ash/frameworks/ekko-lightbox/ekko-lightbox.min.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	<script type="text/javascript"
		src="view/theme/ash/frameworks/justifiedGallery/jquery.justifiedGallery.min.js?v={{$smarty.const.FRIENDICA_VERSION}}">
	</script>
	<script type="text/javascript"
		src="view/theme/ash/frameworks/flexMenu/flexmenu.custom.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	<script type="text/javascript"
		src="view/theme/ash/frameworks/jquery-scrollspy/jquery-scrollspy.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	<script type="text/javascript"
		src="view/theme/ash/frameworks/autosize/autosize.min.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	<script type="text/javascript"
		src="view/theme/ash/frameworks/sticky-kit/jquery.sticky-kit.min.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>

	{{* Custom Javascript *}}
	{{* <script type="text/javascript" src="view/js/main.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script> *}}
	<script type="text/javascript" src="view/theme/ash/js/theme.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	{{* <script type="text/javascript" src="view/theme/ash/js/modal.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script> *}}
	{{if ! $block_public}}
		<script type="text/javascript" src="view/theme/ash/js/hovercard.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
	{{/if}}
	{{* <script type="text/javascript" src="view/theme/ash/js/textedit.js?v={{$smarty.const.FRIENDICA_VERSION}}"></script>
*}}

	{{* Include the strings which are needed for some js functions (e.g. translation)
They are loaded into the html <head> so that js functions can use them *}}
	{{include file="js_strings.tpl"}}