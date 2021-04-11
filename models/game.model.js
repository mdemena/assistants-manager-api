const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
	{
		season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
		category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
		localTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
		visitTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
        date: { type: Date, required: true },
        location: { type: String, required: true },
		enabled: { type: Boolean, default: true, required: true }
	},
	{ timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;