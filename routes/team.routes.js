const express = require('express');
const TeamController = require('../controllers/team.controller');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const items = await TeamController.list();
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/club/:id', async (req, res, next) => {
	try {
		const items = await TeamController.listByClub(req.params.id);
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/:id', async (req, res, next) => {
	try {
		const item = await TeamController.get(req.params.id);
		res.status(200).json(item);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.post('/', async (req, res, next) => {
	if (req.isAuthenticated()) {
		const {
			club,
			season,
			category,
			name,
		} = req.body;
		try {
			const item = {
				club,
				season,
				category,
				name
			};

			const newItem = await TeamController.addItem(item);

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
		const { club, season, category, name } = req.body;
		const item = {
			_id: req.params.id,
			club, 
			season, 
			category, 
			name
		};

		const editItem = await TeamController.set(item);

		res.status(200).json(editItem);
	} else {
		res.status(500).json({ message: 'No estàs autenticat' });
	}
});
router.delete('/:id', async (req, res, next) => {
	try {
		if (req.isAuthenticated) {
			const delItem = await TeamController.delete(req.params.id);
			res.status(200).json(delItem);
		} else {
			res.status(500).json({ message: 'No estàs autenticat' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
