const express = require('express');
const ClubController = require('../controllers/club.controller');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const items = await ClubController.list();
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const item = await ClubController.get(req.params.id);
		res.status(200).json(item);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.post('/', async (req, res, next) => {
	if (req.isAuthenticated()) {
		const {
			name,
			locationAddress,
			locationFormattedAddress,
			locationCoordinatesLng,
			locationCoordinatesLat,
			website,
			email
		} = req.body;
		try {
			const item = {
				name: name,
				location: {
					address: locationAddress,
					formattedAddress: locationFormattedAddress,
					gpsLocation: {
						coordinates: [locationCoordinatesLng, locationCoordinatesLat],
					}
				},
				website: website,
				email: email
			};
			const newItem = await ClubController.addItem(item);

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
		const { name, location, website, email } = req.body;
		const item = {
			_id: req.params.id,
			name,
			location,
			website,
			email
		};

		const editItem = await ClubController.set(item);

		res.status(200).json(editItem);
	} else {
		res.status(500).json({ message: 'No estàs autenticat' });
	}
});
router.delete('/:id', async (req, res, next) => {
	try {
		if (req.isAuthenticated) {
			const delItem = await ClubController.delete(req.params.id);
			res.status(200).json(delItem);
		} else {
			res.status(500).json({ message: 'No estàs autenticat' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
