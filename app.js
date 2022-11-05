const express = require('express');
// const morgan = require('morgan');
const favicon = require('serve-favicon');
const sequelize = require('./src/db/sequelize');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app
	// .use(morgan('dev'))
	.use(favicon(__dirname + '/favicon.ico'))
	.use(express.urlencoded({ extended: true }))
	.use(express.json())
	.use(cors());

sequelize.initDb();

app.get('/', (req, res) => {
	res.json('Hello, Samsara ! 😻');
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

const message = `Notre application Node est démarrée sur : http://localhost:${port}`;
app.listen(port, () => console.log(message));
