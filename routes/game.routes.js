const express = require('express');
const GameController = require('../controllers/game.controller');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const items = await GameController.list();
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/season/:id', async (req, res, next) => {
	try {
		const items = await GameController.listBySeason(req.params.id);
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/category/:id', async (req, res, next) => {
	try {
		const items = await GameController.listByCategory(req.params.id);
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/team/:id', async (req, res, next) => {
	try {
		const items = await GameController.listByTeam(req.params.id);
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/:id', async (req, res, next) => {
	try {
		const item = await GameController.get(req.params.id);
		res.status(200).json(item);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.post('/', async (req, res, next) => {
	if (req.isAuthenticated()) {
		const {
			season,
			category,
            localTeam,
            visitTeam,
			setsLocalTeam,
			setsVisitTeam,
			sets,
            date,
            location,
            status
		} = req.body;
		try {
			const item = {
                season,
                category,
                localTeam,
				visitTeam,
				setsLocalTeam,
				setsVisitTeam,
				sets,
                date,
                location,
                status
			};

			const newItem = await GameController.addItem(item);

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
		const { season, category, localTeam, visitTeam, setsLocalTeam, setsVisitTeam, sets, date, location, status } = req.body;
		const item = {
			_id: req.params.id,
            season,
            category,
            localTeam,
			visitTeam,
			setsLocalTeam,
			setsVisitTeam,
			sets,
            date,
            location,
            status
		};

		const editItem = await GameController.set(item);

		res.status(200).json(editItem);
	} else {
		res.status(500).json({ message: 'No estàs autenticat' });
	}
});
router.delete('/:id', async (req, res, next) => {
	try {
		if (req.isAuthenticated) {
			const delItem = await GameController.delete(req.params.id);
			res.status(200).json(delItem);
		} else {
			res.status(500).json({ message: 'No estàs autenticat' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
