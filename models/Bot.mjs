import { BotAPI } from '../services/BotAPI.mjs';

export class Bot {
	constructor(name) {
		this._name = name;

		// estes 2 arrays não precisariam ser arrays, apenas string. Estão sendo mantidos como array para facilitar caso futuramente seja alterado o comportamento do bot
		this._messagesToBeRead = [];
		this._messagesToBeSent = [];
		this._api = new BotAPI();
	}

	get name() {
		return this._name;
	}

	set name(value) {
		return this._name = value;
	}

	addMessageToBeRead(msg) {
		return this._messagesToBeRead.push(msg);
	}
	
	addMessageToBeSent(msg) {
		this._sent = false;
		return this._messagesToBeSent.push('```[' + this.name + ']``` ' + msg);
	}

	clearMessagesToBeSent() {
		this._messagesToBeSent.length = 0;
	}

	clearMessagesToBeRead() {
		this._messagesToBeRead.length = 0;
	}

	reply() {
		return new Promise((resolve) => {
			console.log('Bot.reply()');
			console.log(this.name + '_messagesToBeRead', this._messagesToBeRead);
			if (!this._messagesToBeRead.length) {
				resolve();
				return;
			}

			// pega somente a última mensagem
			this._api.postMessage(this._messagesToBeRead[this._messagesToBeRead.length - 1])
				.then(answer => {
					this.addMessageToBeSent(answer);
					this._messagesToBeRead.length = 0;
					resolve();
				});
		});
	}

	getAnswer() {
		let answers = [...this._messagesToBeSent];
		this._messagesToBeSent.length = 0;
		return (answers.length ? answers[answers.length - 1] : '');
	}
}