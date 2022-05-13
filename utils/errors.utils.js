module.exports.loginErrors = (err) => {
    let error = { id: "", password: "" };

    if (err.message.includes("identifiant")) {
        error.id = "Identifiant incorrect";
    }
    if (err.message.includes("password")) {
        error.password = "Mot de passe incorrect";
    }
    return error;
};
