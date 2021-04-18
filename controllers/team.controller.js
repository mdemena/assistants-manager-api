const Team = require('../models/team.model');
const ClubController = require('../controllers/club.controller');
const SeasonController = require('../controllers/season.controller');
const CategoryController = require('../controllers/category.controller');
const mongoose = require('mongoose');
class TeamController {
	static async get(id) {
		return await (await Team.findById(id)).populate(['club','category','season']);
	}
	static async set(team) {
		team.name = TeamController.getName(team.club, team.season, team.category)
		const editItem = await Team.findByIdAndUpdate(team._id, team, {
			new: true,
		});
		return editItem;
	}
	static async addItem(team) {
		const { club, season, category, name } = team;
		return await TeamController.add(club, season, category, name);
	}
	static async add(club, season, category, name) {
		const newItem = await Team.create({
            club,
			season,
			category,
			name: TeamController.getName(club, season, category)
        });
		return newItem;
	}
	static async delete(id) {
		const delItem = await Team.findByIdAndRemove(id);
		return delItem;
	}
	static async listBySeason(club, season) {
		const filter = {season}
		return await TeamController.list(filter);
	}
	static async listByClub(club) {
		const filter = {club}
		return await TeamController.list(filter);
	}
	static async list(filter) {
		return await Team.find(filter).sort('name');
	}
	static async getName(club, season, category) {
		const clubName = ClubController.get(club);
		const categoryName = CategoryController.get(category);
		const seasonName = SeasonController.get(season);

		return categoryName + ' ' + clubName + ' ' + seasonName;
	}
}
module.exports = TeamController;
