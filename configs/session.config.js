const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = (app) => {
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: true,
			cookie: { maxAge: 3600000 }, // 60 * 1000 ms === 1 min
			store: MongoStore.create({
				mongoUrl: process.env.MONGODB_URI,
				// ttl => time to live
				ttl: 60 * 60 * 24, // 60sec * 60min * 24h => 1 day
			}),
		})
	);
};
