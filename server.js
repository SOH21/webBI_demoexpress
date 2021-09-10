import express from 'express';
import serverConfig from './config/server.json';
import router from './routes/router.js';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import session from 'express-session';

const __dirname = path.dirname(new URL(
    import.meta.url).pathname);
console.log(__dirname);

// Création du server Web
const app = express();

// Ajout d'un middleware qui log les requetes
app.use((req, res, next) => {
    console.log(`Requete :${req.method} ${req.url}`);
    next();
});


let verifStatut;
const currentConfig = verifStatut ?
    serverConfig.production :
    serverConfig.developpement;


// Configuration
const { port } = currentConfig;
// Configuration du moteur de vue
app.set('view engine', 'ejs');
app.set('views', './views');

//ajouter gestion fichier statique

app.use(express.static("css"))
app.use(express.static("public"))

//gestion formulaires

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ajouter cookies

app.use(cookieParser('ceci est la clef secrete qui permet au cookie de fonctionne'));


//ajout middleware pour gérer la session

app.use(session({
    secret: 'clef secret pour la session',
    resave: false,
    saveUninitialized: true,





}));


// Utilisation des routers 

app.use(router)
    //middlewar epour gerer les exeptions

if (process.argv.includes('--production')) {

} else {
    app.use(errorHandler());
}
// Demarrage du server


app.listen(port, () => {
    console.log(`Web server on ${port}`);
})