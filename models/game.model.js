const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
	{
		season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
		category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
		localTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
		visitTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
		setsLocalTeam:{ type: Number },
		setsVisitTeam: { type: Number },
		sets: [{ name: {type:String}, localTeamPoints: { type: Number }, visitTeamPoints:{ type: Number }}],
        date: { type: Date, required: true },
        location: { type: String, required: true },
		status: { type: String, default: 'Planificado', required: true, enum:['Planificado','En Juego','Terminado','Aplazado'] }
	},
	{ timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;