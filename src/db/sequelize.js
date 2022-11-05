const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const { pokemons } = require('./mock-pokemon');
const PokemonModel = require('../models/pokemon');
const UserModel = require('../models/user');

require('dotenv').config();

let sequelize;
let login_username;

if (process.env.NODE_ENV === 'production') {
	sequelize = new Sequelize(
		process.env.DB_TABLE_PROD,
		process.env.DB_USER_PROD,
		process.env.DB_PASSWORD_PROD,
		{
			host: process.env.DB_HOST_PROD,
			dialect: process.env.DB_DIALECT_PROD,
			dialectOptions: {
				timezone: process.env.DB_TIMEZONE_PROD,
			},
			logging: false,
		},
	);

	login_username = process.env.LOGIN_USERNAME_PROD;
} else {
	sequelize = new Sequelize(
		process.env.DB_TABLE_DEV,
		process.env.DB_USER_DEV,
		process.env.DB_PASSWORD_DEV,
		{
			host: process.env.DB_HOST_DEV,
			dialect: process.env.DB_DIALECT_DEV,
			dialectOptions: {
				timezone: process.env.DB_TIMEZONE_DEV,
			},
			logging: false,
		},
	);

	login_username = process.env.LOGIN_USERNAME_DEV;
}

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
	return sequelize.sync(/*{ force: true } */).then(() => {
		console.log('INIT DB');
		pokemons.map((pokemon) => {
			Pokemon.create({
				name: pokemon.name,
				hp: pokemon.hp,
				cp: pokemon.cp,
				picture: pokemon.picture,
				types: pokemon.types,
				color: pokemon.color,
			})
				.then((pokemon) => console.log(pokemon.toJSON()))
				.catch((error) =>
					console.error(`Erreur lors de la création d'un pokemon : ${error}`),
				);
		});

		bcrypt
			.hash(login_username, 10)
			.then((hash) => User.create({ username: login_username, password: hash }))
			.then((user) => console.log(user.toJSON()))
			.catch((error) =>
				console.error(`Erreur lors de la création d'un user : ${error}`),
			);

		console.log('La base de données a bien été initialisée !');
	});
};

module.exports = {
	sequelize,
	initDb,
	Pokemon,
	User,
};
