const mongoose = require('mongoose');

const comunCcationSchema = new mongoose.Schema(
	{
		type: { type: String, required: true, enum:['email','sms','call','whastapp','telegram'] },
		fromName: { type: String, required: true},
		from: { type: String, required: true},
		toName: { type: String, required: true},
		to: { type: String, required: true},
        subject: { type: String, required: true },
        message: { type: String, required: true },
		campaign: { type: String, required: true },
		sended: { type: Boolean, default: false, required: true }
	},
	{ timestamps: true }
);

const Comunication = mongoose.model('Comunication', comunicationSchema);

module.exports = Comunication;