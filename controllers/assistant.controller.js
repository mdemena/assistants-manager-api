const Assistant = require('../models/assistant.model');
const mongoose = require('mongoose');
class AssistantController {
	static async get(id) {
		return await Assistant.findById(id);
	}
	static async set(assistant) {
		const editItem = await Assistant.findByIdAndUpdate(assistant._id, assistant, {
			new: true,
		});
		return editItem;
	}
	static async addItem(assistant) {
		const { game, team, assistantName, assistantID, assistantEmail, assistantPhone, playerName} = assistant;
		return await AssistantController.add(game, team, assistantName, assistantID, assistantEmail, assistantPhone, playerName);
	}
	static async add(game, team, assistantName, assistantID, assistantEmail, assistantPhone, playerName) {
		const newItem = await Assistant.create({
            game,
            team,
            assistantName,
            assistantID,
            assistantEmail,
            assistantPhone,
            playerName
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