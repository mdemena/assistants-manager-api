const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
		name: { type: String, required: true },
	},
	{ timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;