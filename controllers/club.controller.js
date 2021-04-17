const Club = require('../models/club.model');
const LocationController = require('../controllers/location.controller');
const mongoose = require('mongoose');
class ClubController {
	static async get(id) {
		return await Club.findById(id);
	}
	static async set(club) {
		const editItem = await Club.findByIdAndUpdate(club._id, club, {
			new: true,
		});
		return editItem;
	}
	static async addItem(club) {
		const { name, location, website, email } = club;
		return await ClubController.add(name, location, website, email);
	}
	static async add(name, location, website, email) {
		const newItem = await Club.create({
            name, 
            location, 
            website, 
            email
        });
		return newItem;
	}
	static async delete(id) {
		const delItem = await Club.findByIdAndRemove(id);
		return delItem;
	}
	static async list(filter) {
		return await Club.find(filter);
	}
}
module.exports = ClubController;
