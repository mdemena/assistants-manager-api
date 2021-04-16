const Comunication = require('../models/comunication.model');
const mongoose = require('mongoose');
const SibApiV3Sdk = require('sib-api-v3-sdk');
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
				let emailClient = SibApiV3Sdk.ApiClient.instance;
				// Instantiate the client
				let emailApiKey = emailClient.authentications.apiKey .authentications['api-key'];
				emailApiKey.apiKey = process.env.SENDINBLUE_API_KEY;
				var emailApiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
				var emailEmail = new SibApiV3Sdk.SendSmtpEmail();
				// Define the campaign settings
				//emailEmail.name = comunication.campaign;
				emailEmail.subject = comunication.subject;
				emailEmail.sender = {"name": comunication.fromName, "email":comunication.from};
				emailEmail.replyTo = {"name": comunication.fromName, "email":comunication.from};
				emailEmail.type = "classic";
				emailEmail.htmlContent = comunication.message;
				emailEmail.to = {"name": comunication.toName, "email": comunication.to};

				//Make the call to the client
				emailApiInstance.sendTransacEmail(emailEmail).then(function(data) {
					console.log('API called successfully. Returned data: ' + data);
				}, function(error) {
					console.error(error);
				});
				break;
		}
	}
}
module.exports = ComunicationController;