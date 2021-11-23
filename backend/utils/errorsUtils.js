module.exports.signUpErrors = (err) => {
    let errors = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    };

    if (err.message.includes("prénom"))
        errors.firstName = "Veuillez renseigner votre prénom";

    if (err.message.includes("nom de famille"))
        errors.lastName = "Veuillez renseigner votre nom";

    if (err.message.includes("pseudo"))
        errors.userName = "Veuillez renseigner votre pseudo";

    if (err.message.includes("email"))
        errors.email = "Email incorrect";

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes("email"))
        errors.email = "Email inconnu";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas"

    return errors;
}

module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: "" };

    if (err.message.includes('invalid file'))
        errors.format = "Format incompatabile";

    if (err.message.includes('max size'))
        errors.maxSize = "Le fichier dépasse 500ko";

    return errors
}