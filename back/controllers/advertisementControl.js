const pool = require('../utils/database'); // Correct the import path

exports.getAllAdvertisements = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Advertisements");
        console.log(result)
        res.send(result);
    } catch (err) {
        throw err;
    }
};

exports.postAdvertisement = async (req, res) => {
    try {
        const form = req.body
        console.log(form)

        const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/; //regex for email address
        
        const emailCompany = await pool.query("SELECT EmailAddress FROM Companies WHERE AdvertisementID = ?", [form]); // Get all email address from companies

        try { // Insert Advertisement in database
            const result = await pool.query("INSERT INTO Advertisements (JobTitle, Description, SkillsRequired, SalaryOffered, LanguagesRequired, PostedDate) VALUES (?, ?, ?, ?, ?, ?)", [form.JobTitle, form.Description, form.SkillsRequired, form.SalaryOffered, form.LanguagesRequired, form.PostedDate]);
            res.send({ message: 'Advertisement created successfully', insertId: Number(result.insertId) });
        } catch (err) {
            throw err;
        }
    } catch (err) {
        throw err;
    }
}