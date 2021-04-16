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
		const { club, season, category, name } = team;
		return await TeamController.add(club, season, category, name);
	}
	static async add(season, category, name) {
		const newItem = await Team.create({
            club,
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
	static async listByClub(clubId) {
		return await TeamController.list({'club._id':`${clubId}`});
	}
	static async list(filter) {
		return await Team.find(filter);
	}
}
module.exports = TeamController;
