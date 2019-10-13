// #TODO Talvez fazer binding em alguns casos
// #TODO Ao criar as VIEWs, envolvê-las num Proxy
export class ChatMapController extends Map {
	constructor(chatMap, chatMapView) {
		super();
		this._chatMap = chatMap;
		this._chatMapView = chatMapView;
		this.init();
	}
	
	init() {
		if (this._chatMap.size != this._chatMapView.size)
			throw new Error("Number of models and views doesn't match.");
		
		// #TODO forEach retorna cada par do map, não cada item
		this._chatMap.forEach(chat => {
			const chatView = this.chatMapView.get(chat.title);
			if (!chatView)
				throw new Error(`There is no chat view called "${chat.title}"`);
			
			this.set(chat.title, new ChatController(chat, chatView));
		})
	}
	
	addChat(chatController) {} // boolean

	removeChat(chatController) {} // boolean #TODO recebe Chat ou ID do chat?

	getChat(id) {} // ChatController ou null se não existir

	getChats() {}

	getUnansweredChatList() {} // ChatListController com os chats que tiverem mensagens novas, ou null se não houver

	getNextUnansweredChat() {} // qualquer ChatController com mensagem nova, ou null se não houver
}