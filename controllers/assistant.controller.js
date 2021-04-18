const Assistant = require('../models/assistant.model');
const ComunicationController = require('./comunication.controller');
const mongoose = require('mongoose');
class AssistantController {
	static async get(id) {
		return await (await Assistant.findById(id)).populate([{path:'game', populate:['localTeam','visitTeam']},'team']);
	}
	static async set(assistant) {
		const editItem = await Assistant.findByIdAndUpdate(assistant._id, assistant, {
			new: true,
		});
		return editItem;
	}
	static async setState(_id, _status) {
		const editItem = await Assistant.findByIdAndUpdate(_id, {status:_status}, {
			new: true,
		});
		let stateSubject = `Inscripció ${editItem.status}!`;
		let stateSufix = editItem.status === 'Acceptada' ? `l'accés serà habilitat 20 minuts abans de començar el partit i necessitarem el document de identitat amb el que us heu registrat per poder validar l'accés.`:`Esperem que en el proper partit ja s'hagi normalitzat la situació i no tinguem que limitar l'aforament.`;
		let stateMessage = `Hola <strong>${editItem.assistantName}</strong>,<br/>La seva inscripció pel partit del proper <strong>${editItem.game.date}</strong> com acompanyant del jugadora/a <strong>${editItem.playerName}</strong> del equip <strong>${editItem.team.name}</strong> ha estat <strong>${editItem.status}</strong>.<br/>${stateSufix}<br/><br/>Moltes mercès.<br/><br/>Atentament,<br/><strong>Club Vòlei Sant Celoni</strong>`;
		// ComunicationController.add('email', 'Comunicació Volei Sant Celoni', 'comunicacio@voleisantceloni.cat', assistantName, assistantEmail, stateSubject, stateMessage, 'Assitència Partits', false);
		return editItem;
	}
	static async addItem(assistant) {
		const { game, team, assistantName, assistantID, assistantEmail, assistantPhone, playerName, status} = assistant;
		return await AssistantController.add(game, team, assistantName, assistantID, assistantEmail, assistantPhone, playerName, status);
	}
	static async add(game, team, assistantName, assistantID, assistantEmail, assistantPhone, playerName, status) {
		const newItem = await Assistant.create({
            game,
            team,
            assistantName,
            assistantID,
            assistantEmail,
            assistantPhone,
            playerName,
			status
        });
		let addSubject = 'Rebuda la inscripció !';
		let addMessage = `Hola <strong>${assistantName}</strong>,<br/>La seva inscripció pel partit del proper <strong>${game.date}</strong> com acompanyant del jugadora/a <strong>${playerName}</strong> del equip <strong>${team.name}</strong> ha estat registrada.<br/>En breus dies rebrà l'acceptació o no de la mateixa, es tractaran per ordre d'inscripció fins arribar a l'aforament permès.<br/><br/>Moltes mercès.<br/><br/>Atentament,<br/><strong>Club Vòlei Sant Celoni</strong>`;
		// ComunicationController.add('email', 'Comunicació Volei Sant Celoni', 'comunicacio@voleisantceloni.cat', assistantName, assistantEmail, addSubject, addMessage, 'Assitència Partits', false);
		return newItem;
	}
	static async delete(id) {
		const delItem = await Assistant.findByIdAndRemove(id);
		return delItem;
	}
	static async listByGame(game) {
		const filter = { game };
		return await this.list(filter);
	}
	static async listByGameAndTeam(game, team) {
		const filter = { game, team };
		return await this.list(filter);
	}
	static async list(filter) {
		return await Assistant.find(filter);
	}
}
module.exports = AssistantController;