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
		applications: [
			{
				id: 4324,
				date: "2016-10-24T12:56:43.511Z",
				status: 0,
				user: {
					id: 4252,
					name: "Jane Doe"
				}
			},
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
				id: 1433,
				date: "2016-07-30T17:28:43.511Z",
				status: 1,
				user: {
					id: 6454,
					name: "John Smith"
				}
			}
		]
	};
	
	function helprequestManagePopup(data) {
		data.applications.sort(function(a, b) {
			return new Date(a.date) < new Date(b.date) ? 1 : -1;
		});
		var title = function() {
			var urgency = "";
			switch(data.urgency) {
				case 1:
					urgency = "<span class=\"urgency_low\">Belangrijk</span>";
					break;
				case 2:
					urgency = "<span class=\"urgency_normal\">Urgent</span>";
					break;
				case 3:
					urgency = "<span class=\"urgency_critical\">Zeer urgent</span>";
					break;
			}
			return "<h3>" + (data.closed ? "<span class=\"closed\">Gesloten</span>" : "") + urgency + data.title + "</h3>";
		}
		var statusButton = function(x) {
			switch(x) {
				case 0:
					return "Kennismaken";
				case 1:
					return "Goedkeuren";
				case 2:
					return "Afmelden";
			}
		};
		var status = function(x) {
			switch(x) {
				case 1:
					return "<span class=\"interview\">Kennismaken</span>";
				case 2:
					return "<span class=\"approved\">Goedgekeurd</span>";
				default:
					return "";
			}
		};
		var applications = "";
		var approved = false;
		for(var x = 0; x < data.applications.length; x++) {
			if(data.applications[x].status == 2) {
				approved = true;
			}
		}
		for(var x = 0; x < data.applications.length; x++) {
			var date = new Date(data.applications[x].date);
			applications += "<tr data-id=\"" + data.applications[x].id + "\">"
								+"<td><h4>" + status(data.applications[x].status) + data.applications[x].user.name + "</h4></td>"
								+"<td><time>" + leadingZeros(date.getDate().toString(), 2) + "-" + leadingZeros((date.getMonth() + 1).toString(), 2) + "-" + date.getFullYear() + "</time></td>"
								+"<td><button class=\"primary_button\"" + (approved && data.applications[x].status != 2 ? " disabled" : "") + ">" + statusButton(data.applications[x].status) + "</button></td>"
							+"</tr>";
		}
		var closeButton = new jPopup.button({
			text: data.closed ? "Openen" : "Sluiten",
			classes: "button",
			close: false,
			onclick: function() {
				console.log(closeButton);
				data.closed = !data.closed;
				closeButton.text(data.closed ? "Openen" : "Sluiten");
				closeButton._parents[0].title(title());
			}
		})
		return new jPopup({
			title: title(),
			content: "<ul class=\"tabs\">"
						+"<li class=\"current info_tab\">Info</li>"
						+"<li class=\"applications_tab\">Aanmeldingen</li>"
					+"</ul>"
					+"<div class=\"info\">"
						+(data.location ? "<h4>Locatie</h4>" : "")
						+(data.location ? "<p>" + data.location + "</p>" : "")
						+"<h4>Inhoud</h4>"
						+"<p>" + nl2br(data.content) + "</p>"
					+"</div>"
					+"<div class=\"applications\">"
						+"<table>" + applications + "</table>"
					+"</div>",
			closeButton: true,
			classes: "helprequest_manage_popup",
			buttons: [
				{
					text: "Aanpassen",
					classes: "primary_button",
					close: false,
					onclick: function() {
						var self = this;
						helprequestEditPopup(data).open(function(r) {
							if(r) {
								var f = this.form();
								data.title = f.find(".title").val();
								data.urgency = parseInt(0 + f.find(".urgency").val());
								data.location = f.find(".location").val();
								data.content = f.find(".content").val();
								self.title(title());
								self.elements.content.children(".info").html((data.location ? "<h4>Locatie</h4>" : "")
																			+(data.location ? "<p>" + data.location + "</p>" : "")
																			+"<h4>Inhoud</h4>"
																			+"<p>" + nl2br(data.content) + "</p>");
							}
							
						});
					}
				},
				closeButton
			],
			overrides: {
				open: function() {
					var s = jPopup._super(this);
					
					this.elements.content.children(".tabs").children().click(function() {
						$(this).parent().children().removeClass("current").end().end().addClass("current");
					});
					
					this.elements.content.children(".tabs").children(".info_tab").click(function() {
						s.elements.content.children(".applications").hide();
						s.elements.content.children(".info").show();
					});
					
					this.elements.content.children(".tabs").children(".applications_tab").click(function() {
						s.elements.content.children(".info").hide();
						s.elements.content.children(".applications").show();
					});
					
					this.elements.content.children(".applications").find("button").click(function() {
						for(var x = 0; x < data.applications.length; x++) {
							if(data.applications[x].id == $(this).parent().parent().data("id")) {
								data.applications[x].status = data.applications[x].status == 2 ? 0 : data.applications[x].status + 1;
								console.log(data.applications[x].status);
								if(data.applications[x].status == 0 || data.applications[x].status == 2) {
									s.elements.content.children(".applications").find("h4").children("span").remove();
								}
								if(data.applications[x].status == 1) {
									$(this).parent().parent().find("h4").html(status(1) + data.applications[x].user.name);
								}
								if(data.applications[x].status == 2) {
									for(var y = 0; y < data.applications.length; y++) {
										if(data.applications[y].id != data.applications[x].id) {
											data.applications[y].status = 0;
										}
									}
									s.elements.content.children(".applications").find("button").html(statusButton(0)).prop("disabled", true);
									$(this).parent().parent().find("h4").html(status(2) + data.applications[x].user.name);
								}
								if(data.applications[x].status == 0) {
									s.elements.content.children(".applications").find("button").prop("disabled", false);
								}
								$(this).html(statusButton(data.applications[x].status)).prop("disabled", false);
							}
						}
					});
					return s;
				}
			}
		});
	}
	
	function helprequestEditPopup(data) {
		var popup = new jPopup({
			title: "<h3>Hulpvraag toevoegen</h3>",
			content: "<input type=\"text\" class=\"input title\" placeholder=\"Titel\" />"
					+"<select class=\"input urgency\" required>"
						+"<option value=\"\" selected disabled>Urgentie</option>"
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
			classes: "helprequest_edit_popup",
			overrides: {
				open: function() {
					var s = jPopup._super(this);
					autosize(this.elements.content.find("textarea")).on("autosize:resized", function() {
						s.position("center");
					});
					s.position("center");
					return s;
				}
			}
		});
		if(data) {
			popup.title("<h3>Hulpvraag aanpassen</h3>");
			popup.elements.content.children(".title").val(data.title);
			popup.elements.content.children(".urgency").val(data.urgency);
			popup.elements.content.children(".location").val(data.location);
			popup.elements.content.children(".content").val(data.content);
		}
		return popup;
	}
	
	$("table.helprequests").on("click", "tr", function() {
		helprequestManagePopup(helprequestManageData).open();
	});
	
	$(".add_helprequest").click(function() {
		helprequestEditPopup().open(function(r) {
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