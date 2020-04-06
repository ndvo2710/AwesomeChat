const getLoginRegister = (req, res) => {
    return res.render('auth/loginRegister');
};

const getLogout = (req, res) => {
    // do something
};

module.exports = {
    getLoginRegister: getLoginRegister,
    getLogout: getLogout
};