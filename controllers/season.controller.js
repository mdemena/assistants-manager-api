const Season = require('../models/season.model');
const mongoose = require('mongoose');
class SeasonController {
	static async get(id) {
		return await Season.findById(id);
	}
	static async set(season) {
		const editItem = await Season.findByIdAndUpdate(season._id, season, {
			new: true,
		});
		return editItem;
	}
	static async enable(id) {
		const editItem = await Season.findByIdAndUpdate(id, { enabled:true }, {
			new: true,
		});
		return editItem;
	}
	static async disable(id) {
		const editItem = await Season.findByIdAndUpdate(id, { enabled:false }, {
			new: true,
		});
		return editItem;
	}
	static async addItem(season) {
		const { club, name, initDate, endDate, enabled } = season;
		return await SeasonController.add(club, name, initDate, endDate, enabled);
	}
	static async add(club, name, initDate, endDate, enabled) {
		const newItem = await Season.create({
			club,
			name,
            initDate,
            endDate,
            enabled
        });
		return newItem;
	}
	static async delete(id) {
		const delItem = await Season.findByIdAndRemove(id);
		return delItem;
	}
	static async listByClub(club) {
		const filter = { club };
		return await SeasonController.list(filter);
	}
	static async list(filter) {
		return await Season.find(filter).sort('name');
	}
}
module.exports = SeasonController;
