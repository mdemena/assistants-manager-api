const Category = require('../models/category.model');
const mongoose = require('mongoose');
class CategoryController {
	static async get(id) {
		return await Category.findById(id);
	}
	static async set(category) {
		const editItem = await Category.findByIdAndUpdate(category._id, category, {
			new: true,
		});
		return editItem;
	}
	static async addItem(category) {
		const { club, name } = category;
		return await CategoryController.add(club, name);
	}
	static async add(club, name) {
		const newItem = await Category.create({
			club,
			name
        });
		return newItem;
	}
	static async delete(id) {
		const delItem = await Category.findByIdAndRemove(id);
		return delItem;
	}
	static async listByClub(club) {
		const filter = { club };
		return await CategoryController.list(filter);
	}
	static async list(filter) {
		return await Category.find(filter).sort('name');
	}
}
module.exports = CategoryController;
