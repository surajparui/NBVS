const homeController = () => {
    return {
        index: (req, res) => {
            res.render('index');
        },
        about: (req, res) => {
            res.render('about');
        },
        projects: (req,res) => {
            res.send('This is projects page');
        },
        work: (req,res)=>{
            res.send('This is work page');
        },
        contact: (req,res)=>{
            res.send('This is contact page');
        },
        login:(req,res)=>{
            res.render('login');
        },
        register:(req,res)=>{
            res.render('register');
        },
        favourites:(req,res)=>{
            res.render('favourites');
        },
        nft:(req,res)=>{
            res.render('nft');
        }
    }
};
module.exports = homeController;