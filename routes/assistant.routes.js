const express = require('express');
const AssistantController = require('../controllers/assistant.controller');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const items = await AssistantController.list();
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/game/:id', async (req, res, next) => {
	try {
		const items = await AssistantController.listByGame(req.params.id);
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/gameTeam/:gameId-:teamId', async (req, res, next) => {
	try {
		const items = await AssistantController.listByGameAndTeam(req.params.gameId, req.params.teamId);
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get('/:id', async (req, res, next) => {
	try {
		const item = await AssistantController.get(req.params.id);
		res.status(200).json(item);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.post('/', async (req, res, next) => {
	if (req.isAuthenticated()) {
		const {
            game,
            team,
            assistantName,
            assistantID,
            assistantEmail,
            assistantPhone,
            playerName
		} = req.body;
		try {
			const item = {
                game,
                team,
                assistantName,
                assistantID,
                assistantEmail,
                assistantPhone,
                playerName
			};

			const newItem = await AssistantController.addItem(item);

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
		const { game, team, assistantName, assistantID, assistantEmail, assistantPhone, playerName } = req.body;
		const item = {
			_id: req.params.id,
            game,
            team,
            assistantName,
            assistantID,
            assistantEmail,
            assistantPhone,
            playerName
		};

		const editItem = await AssistantController.set(item);

		res.status(200).json(editItem);
	} else {
		res.status(500).json({ message: 'No estàs autenticat' });
	}
});
router.put('/state/:id', async (req, res, next) => {
	if (req.isAuthenticated()) {
		const { state } = req.body;

		const editItem = await AssistantController.setState(req.params.id, state);

		res.status(200).json(editItem);
	} else {
		res.status(500).json({ message: 'No estàs autenticat' });
	}
});
router.delete('/:id', async (req, res, next) => {
	try {
		if (req.isAuthenticated) {
			const delItem = await AssistantController.delete(req.params.id);
			res.status(200).json(delItem);
		} else {
			res.status(500).json({ message: 'No estàs autenticat' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
