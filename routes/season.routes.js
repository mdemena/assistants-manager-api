const express = require('express');
const SeasonController = require('../controllers/season.controller');
const router = express.Router();

// No veo la practicidad una lista de temporadas de todos los Clubs.
// router.get('/', async (req, res, next) => {
// 	try {
// 		const items = await SeasonController.list();
// 		res.status(200).json(items);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });
router.get('/club/:id', async (req, res, next) => {
	try {
		const items = await SeasonController.listByClub(req.params.id);
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/:id', async (req, res, next) => {
	try {
		const item = await SeasonController.get(req.params.id);
		res.status(200).json(item);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/enable/:id', async (req, res, next) => {
	try {
		const items = await SeasonController.enable(req.params.id);
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/disable/:id', async (req, res, next) => {
	try {
		const items = await SeasonController.disable(req.params.id);
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.post('/', async (req, res, next) => {
	if (req.isAuthenticated()) {
		const { club, name, initDate, endDate, enabled } = req.body;
		try {
			const item = {
				club,
				name,
				initDate, 
                endDate, 
                enabled
			};

			const newItem = await SeasonController.addItem(item);

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
		const { club, name, initDate, endDate, enabled } = req.body;
		const item = {
			_id: req.params.id,
			club,
            name,
            initDate, 
            endDate, 
            enabled
    };

		const editItem = await SeasonController.set(item);

		res.status(200).json(editItem);
	} else {
		res.status(500).json({ message: 'No estàs autenticat' });
	}
});
router.delete('/:id', async (req, res, next) => {
	try {
		if (req.isAuthenticated) {
			const delItem = await SeasonController.delete(req.params.id);
			res.status(200).json(delItem);
		} else {
			res.status(500).json({ message: 'No estàs autenticat' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
