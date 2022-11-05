# node-pokemon-api-rest
Api Rest complète avec base de données contenant 12 pokemons de départ.

Api réalisé en JavaScript, sous Express/Node.js, avec l'ORM Sequelize pour gérer les échanges avec la base de données MariaDB.

Après avoir entré un identifiant et un mot de passe reconnus par l'Api, on récupère un token crypté. 
Ce token permet d'envoyer des requêtes authentifiées et ainsi accéder à la récupération de tous les pokémons de la base de données (comme un pokédex), ou un seul, le modifier à sa guise ou en encore le supprimer. On peut aussi en créer un de toutes pièces, en respectant des règles de validation établis avec Sequelize côté modèle.

API testable et disponible sur : https://samsara.live/api-pokemon/

Les routes pour les requêtes  :  
(images à venir)
GET /api/pokemons  

GET /api/pokemons/:id  

PUT /api/pokemons/:id  

DELETE /api/pokemons/:id  

POST /api/pokemons  

POST /api/login  

https://samsara.live/api-pokemon/api/pokemons  
https://samsara.live/api-pokemon/api/pokemons/:id  
https://samsara.live/api-pokemon/api/login  

      ****************
Les requêtes sur cette API Rest sont disponibles uniquement après l'obtention d'un token.  
Ce token est récupérable via l'API avec une requête POST sur https://samsara.live/api-pokemon/api/login.  

Par exemple, en JavaScript via Node.js :
  
I) on construit cette requête
```
 const request = require('request');

 const options = {  
   'method': 'POST',
   'url': 'https://samsara.live/api-pokemon/api/login',
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
  1) Choisir Requête : **POST**
  2) Entrer cette url : [https://samsara.live/api-pokemon/api/pokemons](https://samsara.live/api-pokemon/api/pokemons)  
  3) Sélectionner l'onglet **Body**
  4) Sélectionner sur le bouton radio **Raw**
  5) Cliquer sur le formattage **JSON**
  6) Entrez dans le grand champ vide:  

```
{
   "username": "pikachu",
   "password": "pikachu"
}
```
7) Cliquez sur **Send** pour envoyer la requête
8) Copier le token qui s'affiche dans la réponse

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

  
***************************************************
Installer le repository
  `npm init`

(Commande pour l'environnement de développement)
  `npm run dev`

(Commande pour l'environnement de production)
  `npm run start`

Pour reprendre le project et le personnaliser :  
## ! Nécessaire de créer un fichier .env !  

Créer un fichier .env à la racine du projet,  
copier/coller le contenu du fichier qui s'affiche ci-dessous,  
et personnaliser les valeurs en remplaçant les crochets par vos informations.  

(si vous avez besoin de travailler dans un environnement dev et/ou prod,    
modifier NODE_ENV="production" par NODE_ENV="development" et inversement).    

## Début fichier .env  
```
NODE_ENV="production"
CUSTOM_PRIVATE_KEY = "[cléPersonnalisée]"
LOGIN_USERNAME_DEV="[usernameTest]"
LOGIN_USERNAME_PROD="[usernameTest]"

DB_HOST_DEV="localhost" 
DB_NAME_DEV="[dbNameDev]"
DB_USER_DEV="[dbUserDev]"
DB_PASSWORD_DEV="[dbPasswordDev]"
DB_DIALECT_DEV="[dbDialectDev]"
DB_TIMEZONE_DEV="[timezoneDev]" #ex: DB_TIMEZONE_DEV="Etc/GMT-2" pour la France

DB_NAME_PROD="[dbNameProd]"
DB_USER_PROD="[dbUserProd]"
DB_PASSWORD_PROD="[dbPasswordProd]"
DB_DIALECT_PROD="[dbDialectProd]"
DB_TIMEZONE_PROD="[timezoneProd]"
DB_PORT=[dbPort]
```
## Fin fichier .env

- Ajouter ce fichier .env au fichier .gitignore de votre projet initié par Git.

- Il faut également personnaliser les routes de ces options/requêtes pour votre projet en fonction des besoins (dev/prod) :  
    *(Ici avec mon hébergeur Namecheap, j'ai du ajouter à la base de chaque route, l'url de mon projet "/api-pokemon", pour qu'Express puisse fonctionner normalement en production)*

  - (corsOptions.origin, app.get()) sur app.js, 
  - (app.get()) sur ./src/routes/findAllPokemons.js,
  - (app.post()) sur ./src/routes/createPokemon.js,  
  - (app.put()) sur ./src/routes/updatePokemon.js
  - (app.delete()) ./src/routes/deletePokemon.js,
  - (app.get()) sur ./src/routes/findPokemonByPk.js,
  - (app.post()) sur ./src/routes/login.js.js)


