const Category = require('../models/category.model');
const mongoose = require('mongoose');
class CategoryController {
	static async get(id) {
		return await Season.findById(id);
	}
	static async set(category) {
		const editItem = await Category.findByIdAndUpdate(category._id, category, {
			new: true,
		});
		return editItem;
	}
	static async addItem(category) {
		const { name } = category;
		return await CategoryController.add(name);
	}
	static async add(name) {
		const newItem = await Category.create({
            name
        });
		return newItem;
	}
	static async delete(id) {
		const delItem = await Category.findByIdAndRemove(id);
		return delItem;
	}
	static async list(filter) {
		return await Category.find(filter);
	}
}
module.exports = CategoryController;
