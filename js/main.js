//Functions
function leadingZeros(number, length) {
	return number.length < length ? leadingZeros("0" + number, length) : number;
}

function nl2br(str) {
	return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1"+ "<br />" +"$2");
}

function popupTabs(self, method) {
	self.elements.content.children(".tabs").children().click(function() {
		var tab = $(this).data("tab");
		$(this).parent().children().removeClass("current").end().end().addClass("current");
		self.elements.content.children(":not(.tabs)").hide().end().children("[data-tab=" + tab + "]").show();
		if(method) {
			method(tab);
		}
	});
	
	self.elements.content.children("[data-tab=" + self.elements.content.children(".tabs").children(".current").data("tab") + "]").show();
}

$(function() {
	//Login
	function loginPopup() {
		var passwordButtons = [
			{
				text: "Inloggen",
				classes: "primary_button",
				value: true
			},
			{
				text: "Wachtwoord vergeten?",
				classes: "button small_button light_button"
			}
		];
		new jPopup({
			title: "<h3>Inloggen</h3>",
			content: "<ul class=\"tabs\">"
						+"<li class=\"current\" data-tab=\"rfid\">RFID</li>"
						+"<li data-tab=\"password\">Wachtwoord</li>"
					+"</ul>"
					+"<article data-tab=\"rfid\">"
						+"<i class=\"material-icons\">&#xE870;</i>"
						+"<p>Hou de pas bij de scanner om in te loggen.</p>"
					+"</article>"
					+"<article data-tab=\"password\">"
						+"<input type=\"text\" class=\"input\" placeholder=\"E-mailadres\" />"
						+"<input type=\"password\" class=\"input\" placeholder=\"Password\" />"
					+"</article>",
			closeButton: true,
			classes: "login_popup",
			overrides: {
				open: function() {
					var self = this;
					popupTabs(this, function(tab) {
						if(tab == "password") {
							self.buttons(passwordButtons);
						} else {
							self.buttons([]);
						}
					});
					return jPopup._super(this);
				}
			}
		}).open(function(r) {
			if(r) {
				window.location.href = "helpseeker/helprequests.html"
			}
		});
	}
	
	$(".login").click(function() {
		loginPopup();
	});
	
	//User
	var userData = {
		id: 4324,
		name: "John Doe",
		birthdate: "1995-03-30T12:56:43.511Z",
		adres: "Eindhoven",
		driversLicense: true,
		car: true
	};
	
	function userPopup(data) {
		var age = Math.abs(new Date(new Date() - new Date(data.birthdate)).getFullYear() - 1970);
		return new jPopup({
			title: "<h3>" + data.name + "</h3>",
			content: (data.birthdate ? "<h4>Leeftijd</h4>" : "")
					+(data.birthdate ? "<p>" + age + " jaar</p>" : "")
					+(data.adres ?" <h4>Adres</h4>" : "")
					+(data.adres ? "<p>" + data.adres + "</p>" : "")
					+(data.driversLicense ?" <h4>Rijbewijs</h4>" : "")
					+(data.driversLicense ? "<p><i class=\"material-icons\">&#xE5CA;</i>Heeft een rijbewijs.</p>" : "")
					+(data.car ? "<h4>Auto</h4>" : "")
					+(data.car ? "<p><i class=\"material-icons\">&#xE5CA;</i>Heeft beschikking tot een auto.</p>" : ""),
			closeButton: true,
			classes: "user_popup",
			plugins: {
				draggable: true
			}
		});
	}
	
	//Helprequests
	var helprequestData = {
		id: 3243,
		title: "Example D",
		urgency: 2,
		location: "Eindhoven",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla erit controversia. Hunc vos beatum; Zenonis est, inquam, hoc Stoici. Tollenda est atque extrahenda radicitus. Duo Reges: constructio interrete.\n\n"
				+"Itaque ab his ordiamur. Nihil enim hoc differt. Minime vero, inquit ille, consentit. Quae cum dixisset, finem ille. Ego vero isti, inquam, permitto. Confecta res esset. Et nemo nimium beatus est\n\n."
				+"Qui convenit? Bonum valitudo: miser morbus. Sit enim idem caecus, debilis.\n\n"
				+"Equidem, sed audistine modo de Carneade? Itaque ab his ordiamur. Tubulo putas dicere? Quid de Pythagora? Itaque fecimus. Quaerimus enim finem bonorum.\n\n"
				+"Dici enim nihil potest verius. Dici enim nihil potest verius. Quaerimus enim finem bonorum.",
		user: "Thomas Gladdines",
		date: new Date(),
		application: {
			id: 5324,
			status: 1
		}
	};
	
	var helprequestManageData = {
		id: 3243,
		title: "Example D",
		urgency: 2,
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
				status: 1,
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
				status: 0,
				user: {
					id: 6454,
					name: "John Smith"
				}
			}
		]
	};
	
	function helprequestPopup(data, context) {
		var applyText = function() {
			return data.application && data.application.status < 3 ? "<i class=\"material-icons\">&#xE15B;</i>Afmelden" : "<i class=\"material-icons\">&#xE145;</i>Aanmelden";
		};
		var applyButton = new jPopup.button({
			text: applyText,
			classes: "primary_button",
			close: false,
			onclick: function() {
				var self = this;
				if(data.application && data.application.status < 3) {
					new jPopup({
						title: "<h3>Afmelden</h3>",
						content: "<p>Weet je zeker dat je wilt afmelden van deze hulpvraag?</p>",
						buttons: [
							{
								text: "Afmelden",
								classes: "primary_button",
								value: true
							},
							{
								text: "Annuleren",
								classes: "button"
							}
						]
					}).open(function(r) {
						if(r) {
							data.application.status = 3;
							applyButton.text(applyText());
							self.title("<h3>" + title() + "</h3>");
							$(context).children("td:first-child").children("h4").html("<h4>" + title() + "</h>");
							if($(context).closest(".applications").length) {
								$(context).hide();
								self.close();
							}
						}
					});
				} else {
					data.application = {
						id: 5324,
						status: 0
					};
					applyButton.text(applyText());
					this.title("<h3>" + title() + "</h3>");
					$(context).children("td:first-child").children("h4").html("<h4>" + title() + "</h3>");
				}
			}
		})
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
			if(data.application) {
				switch(data.application.status) {
					case 0:
						urgency = "<span class=\"applied\"><i class=\"material-icons\">&#xE145;</i><i>Aangemeld</i></span>";
						break;
					case 1:
						urgency = "<span class=\"interview\"><i class=\"material-icons\">&#xE7FB;</i><i>Kennismaken</i></span>";
						break;
					case 2:
						urgency = "<span class=\"approved\"><i class=\"material-icons\">&#xE5CA;</i><i>Goedgekeurd</i></span>";
						break;
				}
			}
			return urgency + data.title;
		}
		var date = new Date(data.date);
		return new jPopup({
			title: "<h3>" + title() + "</h3>",
			content: "<div class=\"info\">"
						+"<h4>Gebruiker</h4>"
						+"<p>" + data.user + "</p>"
						+"<h4>Datum</h4>"
						+"<p>" + leadingZeros(date.getDate().toString(), 2) + "-" + leadingZeros((date.getMonth() + 1).toString(), 2) + "-"  + date.getFullYear() + "</p>"
						+(data.location ? "<h4>Locatie</h4>" : "")
						+(data.location ? "<p>" + data.location + "</p>" : "")
					+"</div>"
					+"<h4>Inhoud</h4>"
					+"<p>" + nl2br(data.content) + "</p>",
			closeButton: true,
			classes: "helprequest_popup",
			buttons: [applyButton]
		});
	}
	
	function helprequestManagePopup(data, context) {
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
			return (data.closed ? "<span class=\"closed\"><i class=\"material-icons\">&#xE897;</i><i>Gesloten</i></span>" : urgency) + data.title;
		}
		var statusButton = function(x) {
			switch(x) {
				case 0:
					return "<i class=\"material-icons\">&#xE7FB;</i>Kennismaken";
				case 1:
					return "<i class=\"material-icons\">&#xE5CA;</i>Goedkeuren";
				case 2:
					return "<i class=\"material-icons\">&#xE5CD;</i>Afmelden";
			}
		};
		var status = function(x) {
			switch(x) {
				case 1:
					return "<span class=\"interview\"><i class=\"material-icons\">&#xE7FB;</i><i>Kennismaken</i></span>";
				case 2:
					return "<span class=\"approved\"><i class=\"material-icons\">&#xE5CA;</i><i>Goedgekeurd</i></span>";
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
		var closeButtonText = function() {
			return data.closed ? "<i class=\"material-icons\">&#xE898;</i>Openen" : "<i class=\"material-icons\">&#xE899;</i>Sluiten"
		}
		var closeButton = new jPopup.button({
			text: closeButtonText(),
			classes: "button",
			close: false,
			onclick: function() {
				data.closed = !data.closed;
				closeButton.text(closeButtonText());
				closeButton._parents[0].title("<h3>" + title() + "</h3>");
				if(context) {
					$(context).children("td:first-child").children("h4").html(title());
				}
				closeButton._parents[0].elements.content.find(".tabs li:first-child").click().next().toggleClass("disabled");
			}
		})
		return new jPopup({
			title: "<h3>" + title() + "</h3>",
			content: "<ul class=\"tabs\">"
						+"<li class=\"current\" data-tab=\"info\">Info</li>"
						+"<li data-tab=\"applications\"" + (data.closed ? " class=\"disabled\"" : "") + ">Aanmeldingen</li>"
					+"</ul>"
					+"<article class=\"info\" data-tab=\"info\">"
						+(data.location ? "<h4>Locatie</h4>" : "")
						+(data.location ? "<p>" + data.location + "</p>" : "")
						+"<h4>Inhoud</h4>"
						+"<p>" + nl2br(data.content) + "</p>"
					+"</article>"
					+"<article class=\"applications\" data-tab=\"applications\">"
						+"<table>" + applications + "</table>"
					+"</article>",
			closeButton: true,
			classes: "helprequest_manage_popup",
			buttons: [
				{
					text: "<i class=\"material-icons\">&#xE3C9;</i>Aanpassen",
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
								self.title("<h3>" + title() + "</h3>");
								self.elements.content.children(".info").html((data.location ? "<h4>Locatie</h4>" : "")
																			+(data.location ? "<p>" + data.location + "</p>" : "")
																			+"<h4>Inhoud</h4>"
																			+"<p>" + nl2br(data.content) + "</p>");
								if(context) {
									$(context).children("td:first-child").children("h4").html(title());
									$(context).children("td:last-child").html(data.location ? data.location : "-");
								}
							}
							
						});
					}
				},
				closeButton
			],
			overrides: {
				open: function() {
					var self = this;
					popupTabs(this);
					this.elements.content.children(".applications").find("tr").click(function() {
						userPopup(userData).open();
					});
					this.elements.content.children(".applications").find("button").click(function(e) {
						e.stopPropagation();
						for(var x = 0; x < data.applications.length; x++) {
							if(data.applications[x].id == $(this).parent().parent().data("id")) {
								data.applications[x].status = data.applications[x].status == 2 ? 0 : data.applications[x].status + 1;
								if(data.applications[x].status == 0 || data.applications[x].status == 2) {
									self.elements.content.children(".applications").find("h4").children("span").remove();
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
									self.elements.content.children(".applications").find("button").html(statusButton(0)).prop("disabled", true);
									$(this).parent().parent().find("h4").html(status(2) + data.applications[x].user.name);
								}
								if(data.applications[x].status == 0) {
									self.elements.content.children(".applications").find("button").prop("disabled", false);
								}
								$(this).html(statusButton(data.applications[x].status)).prop("disabled", false);
							}
						}
					});
					return jPopup._super(this);;
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
	
	$("table.search_results").on("click", "tr:not(:first-child)", function() {
		helprequestPopup(helprequestData, this).open();
	});
	
	$("table.helprequests").on("click", "tr:not(:first-child)", function() {
		helprequestManagePopup(helprequestManageData, this).open();
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