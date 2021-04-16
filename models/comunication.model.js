const mongoose = require('mongoose');

const comunCcationSchema = new mongoose.Schema(
	{
        assistant:{ type: mongoose.Schema.Types.ObjectId, ref: 'Assistant', required: true },
        game:{ type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
		type: { type: String, required: true, enum:['email','sms','call','whastapp','telegram'] },
		from: { type: String, required: true},
		to: { type: String, required: true},
        subject: { type: String, required: true },
        message: { type: String, required: true },
		sended: { type: Boolean, default: false, required: true }
	},
	{ timestamps: true }
);

const Comunication = mongoose.model('Comunication', comunicationSchema);

module.exports = Comunication;