const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		address: { type: String, required: true },
		formattedAddress: { type: String },
		gpsLocation: {
			type: { type: String, default: 'Point' },
			coordinates: [{ type: Number }],
		},
	},
	{ timestamps: true }
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
