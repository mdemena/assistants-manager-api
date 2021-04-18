const Comunication = require('../models/comunication.model');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
class ComunicationController {
	static async get(id) {
		return await (await Comunication.findById(id)).populate(['Assistant','Game']);
	}
	static async set(comunicaction) {
		const editItem = await Comunication.findByIdAndUpdate(comunicaction._id, comunicaction, {
			new: true,
		});
		return editItem;
	}
	static async addItem(comunication) {
		const { type, fromName, from, toName, to, subject, message, campaign, sended } = comunication;
		return await ComunicationController.add( type, fromName, from, toName, to, subject, message, campaign, sended );
	}
	static async add( type, fromName, from, toName, to, subject, message, campaign, sended ) {
		const newItem = await Comunication.create({
            type,
			fromName,
            from,
			toName,
            to,
            subject,
            message,
			campaign,
            sended
            });
		
		this.sendComunicaction(newItem);
		
		return newItem;
	}
	static async delete(id) {
		const delItem = await Comunication.findByIdAndRemove(id);
		return delItem;
	}
	static async list(filter) {
		return await Comunication.find(filter);
	}
	static async sendComunicaction(comunication){
		switch (comunication.type) {
			case 'telegram':
				break;
			case 'whatsapp':
				break;
			case 'sms':
				break;
			default:
				let transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: process.env.GMAIL_USER,
						pass: process.env.GMAIL_PASS 
					}
				});
				transporter.sendMail({
					from: `"${comunication.fromName}" <${comunication.from}>`,
					to: `"${comunication.toName}" <${comunication.to}>`,
					subject: comunication.subject, 
  					// text: 'Awesome Message',
					html: comunication.message
				}).then(info => console.log(info)).catch(error => console.log(error));
				break;
		}
	}
}
module.exports = ComunicationController;