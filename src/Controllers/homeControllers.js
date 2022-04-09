const homepage = () => {
    return {
        index: (req, res) => {
            res.render('index');
        },
        about: (req, res) => {
            res.send('This is about page');
        },
        projects: (req,res) => {
            res.send('This is projects page');
        },
        work: (req,res)=>{
            res.send('This is work page');
        },
        contact: (req,res)=>{
            res.send('This is contact page');
        }
    }
};
module.exports = homepage;