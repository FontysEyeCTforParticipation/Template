$(function() {
	function chatsDataToHtml(data) {
		var interviewHtml = "";
		var html = "";
		for(var x = 0; x < data.length; x++) {
			if("interview" in data[x] && data[x].interview) {
				interviewHtml += "<li data-id=\"" + data[x].id + "\"><span>Kennismaken</span>" + data[x].title + "</li>";
			} else {
				html += "<li data-id=\"" + data[x].id + "\">" + data[x].title + "</li>";
			}
		}
		return "<ul>" + interviewHtml + html + "</ul>";
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
	
	var chatsData = [
		{
			id: 2134,
			title: "Example A",
			interview: true
		},
		{
			id: 4523,
			title: "Example B",
			interview: true
		},
		{
			id: 6786,
			title: "Example C"
		},
		{
			id: 1423,
			title: "Example D"
		}
	];
	
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
	
	var chatsPopup = new jPopup({
		title: "<h2>Chat</h2>",
		closeButton: true,
		classes: "chats_popup",
		position: "stretchRight",
		overlayClose: true,
		speed: 300,
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
		}
	});
	
	$(".open_chat").click(function() {
		chatsPopup.content(chatsDataToHtml(chatsData));
		chatsPopup.open();
	});
		
	$("body").on("click", ".chats_popup .jp_content ul li", function() {
		var id = $(this).data("id");
		var title = $(this).html();
		
		var chatPopup = new jPopup({
			title: "<h3>" + title + "</h3>",
			content: "<ul class=\"conversation\"></ul><div class=\"reply\"><div class=\"input_wrapper\"><input type=\"text\" class=\"input\" placeholder=\"Schrijf een bericht...\" /></div><button class=\"primary_button\">Versturen</button></div>",
			closeButton: true,
			classes: "chat_popup",
			overlay: false,
			plugins: {
				draggable: true
			},
			overrides: {
				open: function() {
					var self = this;
					this.elements.popup.on("mousedown touchstart", function() {
						var scroll = self.elements.content.children(".conversation").scrollTop();
						setTimeout(function() {
							self.elements.content.children(".conversation").scrollTop(scroll);
						}, 1);
					});
					return jPopup._super(this);
				}
			}
		});
		
		var conversation = chatPopup.elements.content.children(".conversation");
		conversation.html(conversationToHtml(conversationData));
		
		chatPopup.open();
		
		conversation.scrollTop(conversation[0].scrollHeight);
		
	});
});