const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
        initDate: {type: Date, required: true},
        endDate: {type: Date, required: true},
        enabled: {type: Boolean, default: true, required: true}
	},
	{ timestamps: true }
);

const Season = mongoose.model('Season', seasonSchema);

module.exports = Season;