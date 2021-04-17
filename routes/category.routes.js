const express = require('express');
const CategoryController = require('../controllers/category.controller');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const items = await CategoryController.list();
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/club/:id', async (req, res, next) => {
	try {
		const items = await CategoryController.listByClub(req.params.id);
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/:id', async (req, res, next) => {
	try {
		const item = await CategoryController.get(req.params.id);
		res.status(200).json(item);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.post('/', async (req, res, next) => {
	if (req.isAuthenticated()) {
		const {
			club,
			name
		} = req.body;
		try {
			const item = {
				club,
				name
            };

			const newItem = await CategoryController.addItem(item);

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
		const { name } = req.body;
		const item = {
			_id: req.params.id,
			name
		};

		const editItem = await CategoryController.set(item);

		res.status(200).json(editItem);
	} else {
		res.status(500).json({ message: 'No estàs autenticat' });
	}
});
router.delete('/:id', async (req, res, next) => {
	try {
		if (req.isAuthenticated) {
			const delItem = await CategoryController.delete(req.params.id);
			res.status(200).json(delItem);
		} else {
			res.status(500).json({ message: 'No estàs autenticat' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
