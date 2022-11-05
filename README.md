# node-pokemon-api-rest
Api Rest complète avec BDD pokemons




## ! Nécessaire de créer un fichier .env !

Créer un fichier .env à la racine du projet, 
copier/coller les valeurs qui s'affichent ci-dessous,
et attribuez vos propres valeurs pour les valeurs entre crochets.

## Début fichier .env

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

## Fin fichier .env

- Ajouter ce fichier .env à .gitignore de votre projet
