const express = require('express');
const ComunicationController = require('../controllers/comunication.controller');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const items = await ComunicationController.list();
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/:id', async (req, res, next) => {
	try {
		const item = await ComunicationController.get(req.params.id);
		res.status(200).json(item);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.post('/', async (req, res, next) => {
	if (req.isAuthenticated()) {
		const {
            type,
		    fromName,
		    from,
		    toName,
		    to,
            subject,
            message,
		    campaign
		} = req.body;
		try {
			const item = {
                type,
                fromName,
                from,
                toName,
                to,
                subject,
                message,
                campaign
			};

			const newItem = await ComunicationController.addItem(item);

			res.status(200).json(newItem);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(500).json({ message: 'No estàs autenticat' });
	}
});
router.put('/:id', async (req, res, next) => {
	if (req.isAuthenticated()) {
		const { type, fromName, from, toName, to, subject, message, campaign } = req.body;
		const item = {
			_id: req.params.id,
            type,
		    fromName,
		    from,
		    toName,
		    to,
            subject,
            message,
		    campaign
		};

		const editItem = await ComunicationController.set(item);

		res.status(200).json(editItem);
	} else {
		res.status(500).json({ message: 'No estàs autenticat' });
	}
});
router.delete('/:id', async (req, res, next) => {
	try {
		if (req.isAuthenticated) {
			const delItem = await ComunicationController.delete(req.params.id);
			res.status(200).json(delItem);
		} else {
			res.status(500).json({ message: 'No estàs autenticat' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
