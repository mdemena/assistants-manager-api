const mongoose = require('mongoose');

const assistantSchema = new mongoose.Schema(
	{
		game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
		team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
		assistantName: { type: String, required: true },
		assistantID: { type: String, required: true },
		assistantEmail: { type: String, required: true },
		assistantPhone: { type: String, required: true },
		playerName: { type: String, required: true },
		status: { type: String, enum:['Pendent','Denegada','Acceptada'], default:'Pendent', required: true },
	},
	{ timestamps: true }
);

const Assistant = mongoose.model('Assistant', assistantSchema);

module.exports = Assistant;