const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
        website: { type: String, required: true },
        email: { type: String, required: true }
	},
	{ timestamps: true }
);

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;