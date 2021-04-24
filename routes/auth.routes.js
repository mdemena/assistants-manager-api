const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const UserController = require('../controllers/user.controller');
const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, failureDetails) => {
		if (err) {
			res
				.status(500)
				.json({ message: `Quelcom no ha funcionat correctament.` });
			return;
		}
		if (!user) {
			console.log(failureDetails);
			res.status(401).json(failureDetails);
			return;
		}
		req.login(user, (loginErr) => {
			if (loginErr) {
				res.status(500).json(loginErr);
				return;
			}
			res.status(200).json(user);
		});
	})(req, res, next);
});

router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: process.env.BASE_APP_URL + '/',
		failureRedirect: process.env.BASE_APP_URL + '/login',
	})
);

router.post('/signup', async (req, res, next) => {
	const { username, name, email, password } = req.body;
	if (!username || !name || !email || !password) {
		res
			.status(406)
			.json({ message: `Proporciona nom, usuari, email i clau d'accés` });
		return;
	}
	if (!validEmailRegex.test(email)) {
		res.status(406).json({
			message: `El format del correu electrònic no és correcte.`,
		});
	}
	if (password.length < 8) {
		res.status(406).json({
			message: `La clau d'accés ha de tenir minim 8 caracters.`,
		});
		return;
	}
	let foundUser = await UserController.existUsername(username);
	if (foundUser) {
		res.status(406).json({ message: 'Usuari existent. Utilitza un altre.' });
		return;
	} else {
		foundUser = await UserController.existEmail(email);
		if (foundUser) {
			res.status(406).json({ message: 'Correu existent. Utilitza un altre.' });
			return;
		} else {
			try {
				const salt = bcrypt.genSaltSync(10);
				const hashPass = bcrypt.hashSync(password, salt);
				const newUser = await UserController.add(
					username,
					name,
					email,
					hashPass
				);
				req.login(newUser, (err) => {
					if (err) {
						res.status(500).json({
							message: `Autenticació després de l'alta no ha funcionat correctament.`,
						});
						return;
					}
					res.status(200).json(newUser);
				});
			} catch (err) {
				res.status(500).json({
					message: `L'alta no ha funcionat correctament. Torna a intentar-ho en breus minuts.`,
				});
				return;
			}
		}
	}
});

router.post('/logout', (req, res, next) => {
	req.logout();
	res.status(200).json({ message: 'Ok' });
});
router.post('/loggedin', (req, res, next) => {
	if (req.isAuthenticated()) {
		res.status(200).json(req.user);
		return;
	}
	res.status(403).json({ message: 'No autoritzat' });
});
router.post('/existemail', async (req, res, next) => {
	try {
		const exist = await UserController.existEmail(req.body.email);
		console.log(exist);
		if (exist) {
			res.status(200).json(exist);
		} else {
			res.status(404).json({ message: 'Correu no registrat' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
router.post('/existusername', async (req, res, next) => {
	try {
		const exist = await UserController.existUsername(req.body.username);

		if (exist) {
			res.status(200).json(exist);
		} else {
			res.status(404).json({ message: 'Usuari disponible' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
