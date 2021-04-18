const Team = require('../models/team.model');
const ClubController = require('../controllers/club.controller');
const SeasonController = require('../controllers/season.controller');
const CategoryController = require('../controllers/category.controller');
const mongoose = require('mongoose');
class TeamController {
	static async get(id) {
		return await Team.findById(id).populate(['season','category']);
	}
	static async set(team) {
		team.name = await this.getNameByTeam(team);
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
			name: await TeamController.getName(club, season, category)
        });
		return newItem;
	}
	static async delete(id) {
		const delItem = await Team.findByIdAndRemove(id);
		return delItem;
	}
	static async listBySeason(season) {
		const filter = {season}
		return await this.list(filter);
	}
	static async listByCategory(category) {
		const filter = {category}
		return await this.list(filter);
	}
	static async listByClub(club) {
		// const filter = { season:{club:{_id:clubId}}};
		// return await this.list(filter);
		const items = await Team.find().populate({path:'season', match:{club:club}});
		// console.log('Query: ',items.)
		return items;
	}
	static async list(filter) {
		return await Team.find(filter).sort('name');
	}
	static async getNameById(id) {
		const item = await this.get(id);
		return await this.getNameByTeam(item)
	}
	static async getNameByTeam(team) {
		// console.log('team: ', team);
		return await this.getName(team.club, team.season, team.category)
	}
	static async getName(club, season, category) {
		// console.log('club: ',club,'season: ', season,'category: ', category);
		const clubTmp = await ClubController.get(club);
		const categoryTmp = await CategoryController.get(category);
		const seasonTmp = await SeasonController.get(season);

		// console.log('clubTmp: ',clubTmp,'seasonTmp: ', seasonTmp,'categoryTmp: ', categoryTmp);
		return categoryTmp.name + ' ' + clubTmp.name + ' ' + seasonTmp.name;
	}
}
module.exports = TeamController;
