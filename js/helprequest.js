$(function() {
	var helprequestEditPopup = new jPopup({
		title: "<h3>Hulpvraag toevoegen</h3>",
		content: "<input type=\"text\" class=\"input title\" placeholder=\"Titel\" />"
				+"<select class=\"input urgency\" required>"
					+"<option value=\"\">Urgentie</option>"
					+"<option value=\"0\">Geen</option>"
					+"<option value=\"1\">Belangrijk</option>"
					+"<option value=\"2\">Urgent</option>"
					+"<option value=\"3\">Zeer urgent</option>"
				+"</select>"
				+"<input type=\"text\" class=\"input location\" placeholder=\"Locatie\" />"
				+"<textarea class=\"input content\" rows=\"2\" placeholder=\"Inhoud\"></textarea>",
		buttons: [
			{
				text: "Opslaan",
				classes: "primary_button",
				value: true
			},
			{
				text: "Annuleren",
				classes: "button"
			}
		],
		closeButton: true,
		overrides: {
			open: function() {
				var s = jPopup._super(this);
				autosize(this.elements.content.find("textarea")).on("autosize:resized", function() {
					s.position("center");
				});
				return s;
			},
			close: function() {
				var s = jPopup._super(this);
				this.elements.content.find("textarea").off("autosize:resized");
				setTimeout(function() {
					autosize.destroy(s.elements.content.find("textarea"));
					s.elements.content.find("textarea").css("height", "");
					s.clear();
				}, this.speed());
				return s;
			}
		}
	});
	$(".add_helprequest").click(function() {
		helprequestEditPopup.open(function(r) {
			if(r) {
				var f = this.form();
				var helprequest = {
					title: f.find(".title").val(),
					urgency: parseInt(0 + f.find(".urgency").val()),
					location: f.find(".location").val(),
					content: f.find(".content").val()
				}
				console.log(helprequest);
			}
		});
	});
});