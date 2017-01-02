var originalResponsiveWidth = jPopup.plugins.responsive.vars.width;

function zoom(zoom) {
	localStorage.zoom = zoom;
	less.modifyVars({"@zoom": zoom});
	document.body.style.zoom = zoom;
	jPopup.plugins.responsive.vars.width = function() {
		return originalResponsiveWidth() / zoom;
	};
	$(window).trigger('resize');
	$(".zoom_level").html(parseInt(zoom * 100) + "%");
	$(".zoom_in").prop("disabled", parseFloat(zoom).toFixed(1) == 1.5);
	$(".zoom_out").prop("disabled", parseFloat(zoom).toFixed(1) == 1);
}

zoom(localStorage.zoom);

$(".zoom_in").click(function() {
	zoom(parseFloat(localStorage.zoom) + .1);
});

$(".zoom_out").click(function() {
	zoom(parseFloat(localStorage.zoom) - .1);
});