# node-pokemon-api-rest-public

Api Rest complète fonctionnant avec une base de données SQL contenant 12 pokemons de départ.

Api réalisée en JavaScript, sous Express/Node.js, avec l'ORM Sequelize pour gérer les échanges avec la base de données SQL.

L'Api est directement testable en ligne avec un outil comme Postman avec ces urls/routes :

https://samsara.live/api-pokemon/api/pokemons  
https://samsara.live/api-pokemon/api/pokemons/:id  
https://samsara.live/api-pokemon/api/login

Je décris plus bas l'exécution des requêtes.

## Récupération du projet de l'Api Rest Pokemon

(cloner le projet)

## Installer les dépendances du projet
`npm install`

## Lancer le serveur en développement
`npm run dev`

## Lancer le serveur en production
`npm run start`

_____________________________

L'exécution du projet nécessite au préalable la création d'une Base De Données SQL, afin de récupérer des infos de connexion pour Sequelize (nom et dialecte de BDD, nom et mot de passe de l'utilisateur BDD, etc.).

Et on utilise un fichier .env pour enregistrer et sécuriser ces données.

## ! Nécessaire de créer un fichier .env !

Créer un fichier .env à la racine du projet, dans le même dossier que `app.js`,  
copier/coller le contenu du fichier qui s'affiche plus bas (à partir de "**Début du contenu du fichier...**"),  
et personnaliser les valeurs en remplaçant les crochets par vos informations.

Exemple : (ici avec des valeurs définies pour le développement)

    NODE_ENV="development"

    DB_HOST_DEV="localhost"
    DB_NAME_DEV="pokedex"
    DB_USER_DEV="root"
    DB_PASSWORD_DEV="123456"
    DB_DIALECT_DEV="mariadb"
    DB_TIMEZONE_DEV="Etc/GMT-2"

Si vous avez besoin de travailler dans un environnement de développement ou de production,
modifier cette variable d'environnement :

`NODE_ENV="production"`,

par :

`NODE_ENV="development"`,

et inversement.

La valeur de la variable d'environnement `CUSTOM_PRIVATE_KEY` est utilisée par l'Api en tant que chaîne secrète pour créer et décoder le token d'authentification à la création/connexion de l'utilisateur. Il est donc conseillé de choisir une valeur de chaînes assez complexe pour sécuriser le token.

Exemple de valeur :  
  `CUSTOM_PRIVATE_KEY="r*RMTL#aWy$uhPUw@^i^A9*uki8z9$DC^*nc3#!R@fc"`  

Les valeurs des variables `LOGIN_USERNAME_DEV`, `LOGIN_PASSWORD_DEV` et leurs variantes `_PROD` servent à créer automatiquement un compte utilisateur authentifié à l'initiation de la base de données (génération du token crypté), et à tester l'authentification pour l'exécution des requêtes. 
Veillez donc bien à définir et à noter ces valeurs pour vos tests de requêtes.

Exemple de valeur :   
  `LOGIN_USERNAME_DEV="pikachu"`    
  `LOGIN_PASSWORD_DEV="motDePasse"`

## Début du contenu du fichier .env à créer :
```
NODE_ENV="development"

CUSTOM_PRIVATE_KEY="[cléPersonnalisée]"

LOGIN_USERNAME_DEV="[usernameDev]"
LOGIN_PASSWORD_DEV="[passwordDev]"

LOGIN_USERNAME_PROD="[usernameProd]"
LOGIN_PASSWORD_PROD="[passwordProd]"

DB_HOST_DEV="localhost"
DB_NAME_DEV="[dbNameDev]"
DB_USER_DEV="[dbUserDev]"
DB_PASSWORD_DEV="[dbPasswordDev]"
DB_DIALECT_DEV="[dbDialectDev]"
DB_TIMEZONE_DEV="[timezoneDev]"

DB_HOST_PROD="[dbHostProd]" 
DB_NAME_PROD="[dbNameProd]"
DB_USER_PROD="[dbUserProd]"
DB_PASSWORD_PROD="[dbPasswordProd]"
DB_DIALECT_PROD="[dbDialectProd]"
DB_TIMEZONE_PROD="[timezoneProd]"
DB_PORT=[dbPort]
```
## Fin du fichier .env

- Il faut également peut-être personnaliser les routes des requêtes si vous déployer votre projet auprès d'un hébergeur :

*Ici en prod avec un hébergeur comme Namecheap, 
il fallait par exemple ajouter à la base de chaque route, un bout d'url du projet hébergé ("/api-pokemon") 
pour qu'Express puisse fonctionner normalement en production au niveau du routing.*

Les requêtes de routage concernées avec leurs fichiers :

- `corsOptions.origin`, `app.get()` sur `app.js`,

- `app.get()` sur `./src/routes/findAllPokemons.js`,

- `app.post()` sur `./src/routes/createPokemon.js`,

- `app.put()` sur `./src/routes/updatePokemon.js`,

- `app.delete()` sur `./src/routes/deletePokemon.js`,

- `app.get()` sur `./src/routes/findPokemonByPk.js`,

- `app.post()` sur `./src/routes/login.js.js`

*********

## Description de l'utilisation de l'API

Après avoir entré un identifiant et un mot de passe reconnus par l'Api, on récupère un token crypté.  
Ce token permet d'envoyer des requêtes authentifiées à l'API, et ainsi accéder à la récupération de tous les pokémons de la base de données, ou un seul, le modifier à sa guise ou en encore le supprimer.  
On peut aussi en créer un de toutes pièces, en respectant des règles de validation établis avec Sequelize côté modèle.

L'Api informe l'utilisateur à chaque requête erronée, avec une validation métier et des contraintes, en précisant à chaque fois le type d'erreur (400, 401, 404, 500, 501) pour informer au maximum l'utilisateur et l'aider à corriger sa requête.

Les routes pour les requêtes :

(images à venir)

GET /api/pokemons

GET /api/pokemons/:id

PUT /api/pokemons/:id

DELETE /api/pokemons/:id

POST /api/pokemons

POST /api/login

      ****************

Les requêtes sur cette API Rest sont disponibles uniquement après l'obtention d'un token.  
En mode de développement, ce token est récupérable via l'API avec une requête POST sur   
  `https://localhost:3000/api-pokemon/api/login`,
  avec le nom d'utilisateur défini par la valeur de `LOGIN_USERNAME_DEV` (fichier .env) et le mot de passe définie par la valeur de `LOGIN_PASSWORD_DEV`.
  
Ici, dans notre exemple nous utilions `pikachu` pour les deux pour la démonstration. 
Il est déconseillé de faire de même pour votre projet.

Par exemple, en JavaScript via Node.js :

I) On construit cette requête :

```
 const request = require('request');

 const options = {
   'method': 'POST',
   'url': 'https://localhost:3000/api/login',
   'headers': {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": "[login]",    // pikachu
      "password": "[password]"  // pikachu
    })
 };

  request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
  });
```

I') Ou plus pratique sur Postman :

1. Choisir Requête : **POST**
2. Entrer cette url : [https://localhost:3000/api/pokemons](https://localhost:3000/api/pokemons)
3. Sélectionner l'onglet **Body**
4. Sélectionner sur le bouton radio **Raw**
5. Cliquer sur le formattage **JSON**
6. Entrez dans le grand champ vide:

```
{
   "username": "pikachu",
   "password": "pikachu"
}
```

7. Cliquez sur **Send** pour envoyer la requête
8. Copier le token qui s'affiche dans la réponse

En image :  
![Requête POST /api/login sous Postman](https://samsara.live/images/requete_post-login.jpg)

=> si la connexion est réussie :

```
{
  "message": "L'utilisateur a été connecté avec succès.",
  "data": {
      "id": 1,
      "username": "pikachu",
      "password": "$2b$10$3uguHpWx5WP/j8LLISHR9uucy8lHxLQTuH63krzj8n10IdfCIhcPy",
      "createdAt": "2022-11-05T16:05:04.000Z",
      "updatedAt": "2022-11-05T16:05:04.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NzY2NDQxMywiZXhwIjoxNjY3NzUwODEzfQ.CdKpCYDX1clyrYCNeXtIi4WNjlICg4jU1i9ElDVXQx4"
}
```

=> Vous devez récupérer le token et l'inscrire dans le header de toutes vos requêtes sous cette forme :

![Requête avec token](https://samsara.live/images/requete_header-token.jpg)
