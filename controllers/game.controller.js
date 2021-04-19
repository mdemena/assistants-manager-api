const Game = require('../models/game.model');
const mongoose = require('mongoose');
class GameController {
	static async get(id) {
		return await Game.findById(id).populate(['season','category','localTeam','visitTeam']);
	}
	static async set(game) {
		const editItem = await Game.findByIdAndUpdate(game._id, game, {
			new: true,
		});
		return editItem;
	}
	static async addItem(game) {
		const { season, category, localTeam, visitTeam, setsLocalTeam, setsVisitTeam, sets, date, location, status } = game;
		return await GameController.add(season, category, localTeam, visitTeam, setsLocalTeam, setsVisitTeam, sets, date, location, status);
	}
	static async add(season, category, localTeam, visitTeam, setsLocalTeam, setsVisitTeam, sets, date, location, status) {
		const newItem = await Game.create({
            season,
			category,
			localTeam, 
            visitTeam, 
			setsLocalTeam,
			setsVisitTeam,
			sets,
            date,
            location,
            status
        });
		return newItem;
	}
	static async delete(id) {
		const delItem = await Game.findByIdAndRemove(id);
		return delItem;
	}
	static async listByLocalTeam(localTeam) {
		const filter = {localTeam}
		return await this.list(filter);
	}
	static async listByVisitTeam(visitTeam) {
		const filter = {visitTeam}
		return await this.list(filter);
	}
	static async listByCategory(category) {
		const filter = {category}
		return await this.list(filter);
	}
	static async listBySeason(season) {
		const filter = {season}
		return await this.list(filter);
	}
	static async list(filter) {
		return await Game.find(filter);
	}
}
module.exports = GameController;