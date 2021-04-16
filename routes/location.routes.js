const express = require('express');
const LocationController = require('../controllers/location.controller');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const items = await LocationController.list();
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/:id', async (req, res, next) => {
	try {
		const item = await LocationController.get(req.params.id);
		res.status(200).json(item);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.post('/', async (req, res, next) => {
	if (req.isAuthenticated()) {
		const {
			name,
			address,
			formattedAddress,
			longitude,
			latitude,
			event,
		} = req.body;
		try {
			const item = {
				name,
				address,
				formattedAddress,
				gpsLocation: {
					coordinates: [longitude, latitude],
				},
				event: event,
			};

			const newItem = await LocationController.addLocation(item);

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
		const { name, address, formattedAddress, longitude, latitude } = req.body;
		const item = {
			_id: req.params.id,
			name,
			address,
			formattedAddress,
			gpsLocation: {
				coordinates: [longitude, latitude],
			},
		};

		const editItem = await LocationController.set(item);

		res.status(200).json(editItem);
	} else {
		res.status(500).json({ message: 'No estàs autenticat' });
	}
});
router.delete('/:id', async (req, res, next) => {
	try {
		if (req.isAuthenticated) {
			const delItem = await LocationController.delete(req.params.id);
			res.status(200).json(delItem);
		} else {
			res.status(500).json({ message: 'No estàs autenticat' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
