const pool = require('../utils/database');

exports.getUser = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Users");
        console.log(result) // Pour vérifier si dans la console de nodemon tu recois des infos
        res.send(result);
    } catch (err) {
        throw err;
    }
};

exports.getCompanies = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Companies");
        console.log(result) // Pour vérifier si dans la console de nodemon tu recois des infos
        res.send(result);
    } catch (err) {
        throw err;
    }
};


