//Functions
function leadingZeros(number, length) {
	return number.length < length ? leadingZeros("0" + number, length) : number;
}

function nl2br(str) {
	return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1"+ "<br />" +"$2");
}

$(function() {
	//Helprequests
	var helprequestManageData = {
		id: 3243,
		title: "Example A",
		urgency: 1,
		location: "Eindhoven",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla erit controversia. Hunc vos beatum; Zenonis est, inquam, hoc Stoici. Tollenda est atque extrahenda radicitus. Duo Reges: constructio interrete.\n\n"
				+"Itaque ab his ordiamur. Nihil enim hoc differt. Minime vero, inquit ille, consentit. Quae cum dixisset, finem ille. Ego vero isti, inquam, permitto. Confecta res esset. Et nemo nimium beatus est\n\n."
				+"Qui convenit? Bonum valitudo: miser morbus. Sit enim idem caecus, debilis.\n\n"
				+"Equidem, sed audistine modo de Carneade? Itaque ab his ordiamur. Tubulo putas dicere? Quid de Pythagora? Itaque fecimus. Quaerimus enim finem bonorum.\n\n"
				+"Dici enim nihil potest verius. Dici enim nihil potest verius. Quaerimus enim finem bonorum.",
		closed: true,
		applications: [
			{
				id: 5432,
				date: "2016-12-23T08:32:16.511Z",
				status: 1,
				user: {
					id: 5324,
					name: "John Doe"
				}
			},
			{
				id: 4324,
				date: "2016-10-24T12:56:43.511Z",
				status: 0,
				user: {
					id: 4252,
					name: "Jane Doe"
				}
			}
		]
	};
	
	function helprequestManagePopup(data) {
		var applications = "";
		for(var x = 0; x < data.applications.length; x++) {
			var date = new Date(data.applications[x].date);
			applications += "<li data-id=\"" + data.applications[x].id + "\">"
								+"<h3>" + data.applications[x].user.name + "</h3>"
								+"<time>" + leadingZeros(date.getDate().toString(), 2) + "-" + leadingZeros((date.getMonth() + 1).toString(), 2) + "-" + date.getFullYear() + "</time>"
								+"<button class=\"primary_button approve\">Goedkeuren</button>"
								+"<button class=\"primary_button interview\">Kennismaken</button>"
								+"<button class=\"primary_button cancel\">Afmelden</button>"
							+"</li>";
		}
		return new jPopup({
			title: "<h3>" + data.title + "</h3>",
			content: "<ul class=\"tabs\">"
						+"<li class=\"current info_tab\">Info</li>"
						+"<li class=\"applications_tab\">Aanmeldingen</li>"
					+"</ul>"
					+"<div class=\"info\">"
						+"<h4>Locatie</h4>"
						+(data.location ? "<p>" + data.location + "</p>" : "")
						+"<h4>Inhoud</h4>"
						+"<p>" + nl2br(data.content) + "</p>"
					+"</div>"
					+"<ul class=\"applications\">" + applications + "</ul>",
			closeButton: true,
			classes: "helprequest_manage_popup",
			buttons: [
				{
					text: "Wijzigen",
					classes: "primary_button"
				}
			],
			overrides: {
				open: function() {
					var s = jPopup._super(this);
					return s;
				}
			}
		});
	}
	
	$("table.helprequests").on("click", "tr", function() {
		helprequestManagePopup(helprequestManageData).open();
	});
	
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
			}
		}
	});
	
	$(".add_helprequest").click(function() {
		helprequestEditPopup.clone().open(function(r) {
			if(r) {
				var f = this.form();
				var helprequest = {
					title: f.find(".title").val(),
					urgency: parseInt(0 + f.find(".urgency").val()),
					location: f.find(".location").val(),
					content: f.find(".content").val()
				}
			}
		});
	});
	
	//Footer
	$(".go_to_top").click(function() {
		$("html, body").animate({
			scrollTop: 0
		}, 500);
	});
});