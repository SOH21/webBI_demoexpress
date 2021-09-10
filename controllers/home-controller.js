export default {

    index: (req, res) => {
        console.log('La page home !');

        // ↓ Envoye une donnée brute
        // res.send('Home');

        // ↓ Resultat depuis le moteur de vue
        res.render('home/index');
    },

    about: (req, res) => {
        const donald = {
            firstname: 'Donald',
            lastname: 'Duck'
        };

        res.render('home/about', { user: donald });
    },

    contact: (req, res) => {
        res.render('home/contact');
    },
    contactPost: (req, res) => {

        const { username, message } = req.body;

        console.log(`message recu:(${username}) -> ${message}`);

        res.render("home/contact-response", { username })

    },

    cookies: (req, res) => {
        res.cookie('cookieDemo', 'webBi', {
            signed: true,
            samSite: 'strict',
            expires: new Date(Date.now + (24 * 3600 * 1000))
        });
        res.render("home/cookies");
    },

    session: (req, res) => {

        console.log('session', req.session);

        res.render('home/session', { session: req.session })


    },
    sessionCreate: (req, res) => {

        const { pseudo } = req.body;

        const dataSession = {
            pseudo: pseudo,
            role: 'demo'
        }
        req.session.user = dataSession;
        res.send('session crée')

    },
    sessionDestroy: (req, res) => {

        req.session.destroy();
        res.send('session detruite');
        req.redirect('/session')



    }
}