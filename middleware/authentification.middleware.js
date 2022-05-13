const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

module.exports.checkUser = async (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.locals.user =null;
                res.cookie('jwt', '', { expirationTemps: 1 }) ;
                res.status(400).send({error: "Invalid token"});
                next();
            }
            else{
                let user = await userModel.findById(decoded.id);
                res.locals.user = user;
                next();
            }
            }
        );
    }
    else{
        res.locals.user =null;
        next();
    }
};

//Permet de connecter l'utilisateur une seul fois et de se souvenir de son token + affichage console 
module.exports.requireAuthentification = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err){
                console.log(err);
                res.send({error: "Invalid token"});
            }
            else{
                console.log(decoded.id);
                next();
            }
            }
        );
    }
    else{
        res.locals.user =null;
        console.log('no token');
    }
}

module.exports.checkUserAdmin = async (req, res) => {
    try {
        const user = await userModel.findOne({
            identifiant: req.params.identifiant,
            admin: true,
        });
        if (!user) {
            return res.status(400).send({
                error: "utilisateur inexistant ou n'a pas les autorisations nécessaires",
            });
        }
        return true;
    } catch (err) {
        return res.status(400).send(err);
    }
};
