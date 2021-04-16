const Comunication = require('../models/comunication.model');
const mongoose = require('mongoose');
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
		const { assistant, game, type, from, to, subject, message, sended } = comunication;
		return await ComunicationController.add(assistant, game, type, from, to, subject, message, sended );
	}
	static async add(assistant, game, type, from, to, subject, message, sended ) {
		const newItem = await Comunication.create({
            assistant,
            game,
            type,
            from,
            to,
            subject,
            message,
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
}
module.exports = ComunicationController;