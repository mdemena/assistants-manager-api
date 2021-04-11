const Team = require('../models/team.model');
const mongoose = require('mongoose');
class TeamController {
	static async get(id) {
		return await Team.findById(id);
	}
	static async set(team) {
		const editItem = await Team.findByIdAndUpdate(team._id, team, {
			new: true,
		});
		return editItem;
	}
	static async addItem(team) {
		const { season, category, name } = team;
		return await TeamController.add(season, category, name);
	}
	static async add(season, category, name) {
		const newItem = await Team.create({
            season,
			category,
			name
        });
		return newItem;
	}
	static async delete(id) {
		const delItem = await Team.findByIdAndRemove(id);
		return delItem;
	}
	static async list(filter) {
		return await Team.find(filter);
	}
}
module.exports = TeamController;
