const Assistant = require('../models/assistant.model');
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
		return newItem;
	}
	static async delete(id) {
		const delItem = await Assistant.findByIdAndRemove(id);
		return delItem;
	}
	static async list(filter) {
		return await Assistant.find(filter);
	}
}
module.exports = AssistantController;