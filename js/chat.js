$(function() {
	//Data
	var chatsData = {
		2134: {
			title: "Example A",
			interview: true,
			lastMessage: {
				content: "Yo!",
				user: "John Doe",
				date: "2016-12-29T10:12:43.511Z"
			}
		},
		4523: {
			title: "Example B",
			interview: true,
			lastMessage: {
				content: "What about the deadline?",
				user: "John Doe",
				date: "2016-12-28T12:56:43.511Z"
			}
		},
		6786: {
			title: "Example C",
			lastMessage: {
				content: "Don't worry we're gonna miss the deadline.",
				date: "2016-10-24T12:56:43.511Z"
			}
		},
		1423: {
			title: "Example D",
			lastMessage: {
				content: "???",
				user: "John Doe",
				date: "2016-07-05T12:56:43.511Z"
			}
		}
	};
	
	var conversationData = {
		users: {
			4252: "John Doe"
		},
		messages: [
			{
				content: "Yo",
				date: "2016-12-26T12:56:43.511Z",
				user: 4252
			},
			{
				content: "How is it going?",
				date: "2016-12-26T13:04:43.511Z",
				user: 4252
			},
			{
				content: "Good!",
				date: "2016-12-26T13:21:43.511Z"
			},
			{
				content: "What about the deadline?",
				date: "2016-12-27T14:23:43.511Z",
				user: 4252
			},
			{
				content: "Don't worry we're gonna miss the deadline.",
				date: "2016-12-27T15:01:43.511Z"
			},
			{
				content: "???",
				date: "2016-12-27T15:02:43.511Z",
				user: 4252
			}
		]
	};
	
	//Functions
	function chatsDataToHtml(data) {
		var interviewHtml = "";
		var html = "";
		var now = new Date();
		var dataArray = [];
		for(id in data) {
			var chat = data[id];
			chat.id = id;
			dataArray.push(chat);
		}
		var data = dataArray.slice(0);
		data.sort(function(a, b) {
			return a.lastMessage.date < b.lastMessage.date ? 1 : -1;
		});
		for(var x = 0; x < data.length; x++) {
			var date = new Date(data[x].lastMessage.date);
			var dateString;
			var currentMonth = date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear();
			if(date.getDate() == now.getDate() && currentMonth) {
				dateString = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
			} else if(date.getDate() == now.getDate() - 1 && currentMonth) {
				dateString = "Gisteren";
			} else {
				dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear().toString().substr(2,2);
			}
			html += "<li data-id=\"" + data[x].id + "\"><h5>" + (data[x].interview ? "<span>Kennismaken</span>" : "") + data[x].title + "</h5><p>" + data[x].lastMessage.content + "</p><time>" + dateString+ "</time></li>";
		}
		return html;
	}
	
	function conversationToHtml(data) {
		var months = [ "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December" ];
		var html = "";
		var lastDate = null
		var lastUser = null;
		for(var x = 0; x < data.messages.length; x++) {
			var date = new Date(data.messages[x].date);
			var user = data.messages[x].user;
			var name = data.users[user];
			if(!lastDate || (lastDate < date && lastDate.getDate() < date.getDate())) {
				html += "<li class=\"date\"><time>" + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "</time></li>";
			}
			lastDate = date;
			html += "<li" + (name ? "" : " class=\"me\"") + ">" + (name && lastUser != user ? "<header>" + name + "</header>" : "") + "<time>" + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + "</time>" + data.messages[x].content + "</li>";
			lastUser = user;
		}
		return html;
	}
	
	//Open chat popups
	var chatPopups = {};
	
	//Add class to body
	$("body").addClass("chat_page");
	
	//Chat overview popup
	var chatsPopup = new jPopup({
		title: "<h2>Chat</h2>",
		content: "<ul></ul>",
		classes: "chats_popup",
		position: "stretchRight",
		overlay: false,
		freeze: false,
		animations: {
			open: {
				stretchRight: function() {
					this.elements.popup.addClass("open");
				}
			},
			close: {
				stretchRight: function() {
					this.elements.popup.removeClass("open");
				}
			}
		},
		plugins: {
			responsive: {
				0: function() {
					this.speed(300);
					this.close();
					this.overlay(true);
					this.closeButton(true);
				},
				1300: function() {
					this.speed(0);
					this.open();
					this.overlay(false);
					this.closeButton(false);
				}
			}
		},
		overrides: {
			open: function() {
				this.elements.content.children("ul").html(chatsDataToHtml(chatsData));
				this.elements.content.children("ul").on("click", "li", function() {
					var id = $(this).data("id");		
					if(id in chatPopups) {
						var popupTitle = chatPopups[id].elements.title;
						var offset = popupTitle.offset();
						var event = $.Event( "mousedown", {
							which: 1,
							pageX: offset.left,
							pageY: offset.top
						});
						popupTitle.trigger(event);
						popupTitle.mouseup();
					} else {
						chatPopups[id] = new jPopup({
							title: "<h3>" + (chatsData[id].interview ? "<span>Kennismaken</span>" : "") + chatsData[id].title + "</h3>",
							content: "<ul class=\"conversation\"></ul><div class=\"reply\"><div class=\"input_wrapper\"><input type=\"text\" class=\"input\" placeholder=\"Schrijf een bericht...\" /></div><button class=\"primary_button\">Versturen</button></div>",
							closeButton: true,
							classes: "chat_popup",
							overlay: false,
							freeze: false,
							plugins: {
								draggable: true
							},
							overrides: {
								open: function() {
									var s = jPopup._super(this);
									var conversation = this.elements.content.children(".conversation");
									conversation.html(conversationToHtml(conversationData));
									conversation.scrollTop(conversation[0].scrollHeight);
									return s;
								},
								close: function() {
									delete chatPopups[id];
									return jPopup._super(this);
								}
							}
						}).open();
					}
				});
				return jPopup._super(this);
			},
			close: function() {
				for(id in chatPopups) {
					chatPopups[id].close();
					delete chatPopups[id];
				}
				this.elements.content.children("ul").off("click");
				return jPopup._super(this);
			}
		}
	});
	
	chatsPopup.open();
	
	$(".open_chat").click(function() {
		chatsPopup.open();
	});
});