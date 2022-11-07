const { Pokemon } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
	app.put('/api/pokemons/:id', auth, (req, res) => {
		const id = req.params.id;
		let tempName;

		Pokemon.findByPk(id)
			.then((pokemon) => {
				if (pokemon === null) {
					const message =
						"Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.";
					return res.status(404).json({ message });
				}

				tempName = pokemon.name;

				Pokemon.update(req.body, {
					where: { id: id },
				})
					.then((pokemon) => {
						const message = `Le pokémon ${tempName} a bien été modifié.`;
						res.json({ message, data: pokemon });
					})
					.catch((error) => {
						if (error instanceof ValidationError) {
							res.status(400).json({ message: error.message, data: error });
						}
						if (error instanceof UniqueConstraintError) {
							return res
								.status(400)
								.json({ message: 'error.message', data: error });
						}
						const message =
							// name, hp, cp, picture, types, color
							'Le pokémon n\'a pas pu être modifié. Les propriétés modifiées de req.body du pokemon ne sont pas valides. Modifier-les (name, hp, cp, picture, types, color) avec la écriture Json (ex: {"hp": 100, "cp": 25}) dans la fenêtre raw, et envoyer une autre requête.';
						res.status(400).json({ message, data: error });
					});
			})
			.catch((error) => {
				const message =
					"Le pokémon n'a pas pu être modifié. Réessayez dans quelques instants";
				res.status(500).json({ message, data: error });
			});
	});
};
