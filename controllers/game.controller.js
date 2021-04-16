const Game = require('../models/game.model');
const mongoose = require('mongoose');
class GameController {
	static async get(id) {
		return await Game.findById(id).populate(['localTeam','visitTeam']);
	}
	static async set(game) {
		const editItem = await Game.findByIdAndUpdate(game._id, game, {
			new: true,
		});
		return editItem;
	}
	static async addItem(game) {
		const { season, category, localTeam, visitTeam, date, location, enabled } = game;
		return await GameController.add(season, category, localTeam, visitTeam, date, location, enabled);
	}
	static async add(season, category, localTeam, visitTeam, date, location, enabled) {
		const newItem = await Game.create({
            season,
			category,
			localTeam, 
            visitTeam, 
            date, 
            location, 
            enabled
        });
		return newItem;
	}
	static async delete(id) {
		const delItem = await Game.findByIdAndRemove(id);
		return delItem;
	}
	static async list(filter) {
		return await Game.find(filter);
	}
}
module.exports = GameController;