export class Bot {
	constructor(name) {
		this._name = name;

		// #TODO falta atribuir view e model de alguma forma
		this._chatView = chatView;
		this._chat = chat;
		
		this.messageInterval = 5000;
		this.ready = true;
	}

	get name() {
		return this._name;
	}

	set name(value) {
		this._name = value;
	}
	
	getChat() {}

	postMessage(msg) {
		this._chatView.postMessage('```[' + this._name + ']``` ' + msg);
	} // boolean ou Promise

	postMessageToBot(bot, msg) {
		this.postMessage('```[to:' + bot.name + ']```' + msg)
	} // boolean ou Promise.
}