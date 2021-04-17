const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		location: {
			address: { type: String, required: true },
			formattedAddress: { type: String },
			gpsLocation: {
				type: { type: String, default: 'Point' },
				coordinates: [{ type: Number }],
			},
	 	},
        website: { type: String, required: true },
        email: { type: String, required: true }
	},
	{ timestamps: true }
);

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;