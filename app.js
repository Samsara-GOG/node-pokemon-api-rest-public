const express = require('express');
const favicon = require('serve-favicon');
const sequelize = require('./src/db/sequelize');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

/*
const corsOptions = {
	origin: `https://localhost:${PORT}`,
};
*/

if (process.env.NODE_ENV === 'development') {
	const morgan = require('morgan');

	app
		.use(morgan('dev'))
		.use(favicon(__dirname + '/favicon.ico'))
		.use(express.urlencoded({ extended: true }))
		.use(express.json())
		.use(cors(/*corsOptions*/));
} else {
	app
		.use(favicon(__dirname + '/favicon.ico'))
		.use(express.urlencoded({ extended: true }))
		.use(express.json())
		.use(cors(corsOptions));
}

sequelize.initDb();

app.get('/', (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.json({ message: 'Welcome to API Pokemon.' }); // test message
});

app.get('/lolo/:name', (req, res) => {
	const name = req.params.name;
	res.send(`Hello ${name}`);
});

// Ici nous placerons nos futurs points de terminaison.
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);

// On ajoute la gestion des erreurs
app.use(({ res }) => {
	const message =
		'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.';
	res.status(404).json({ message });
});

const message = `Notre Api Pokemon est démarrée sur : http://localhost:${PORT}`;
app.listen(PORT, () => console.log(message));
