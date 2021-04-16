const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
	{
		club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
		season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
		category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
		name: { type: String, required: true },
	},
	{ timestamps: true }
);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;