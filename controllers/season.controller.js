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
	static async addItem(season) {
		const { name, initDate, endDate, enabled } = season;
		return await SeasonController.add(name, initDate, endDate, enabled);
	}
	static async add(name, initDate, endDate, enabled) {
		const newItem = await Season.create({
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
	static async list(filter) {
		return await Season.find(filter);
	}
}
module.exports = SeasonController;
