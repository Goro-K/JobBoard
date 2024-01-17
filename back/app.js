const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

// Middleware for parsing JSON and handling POST requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Include the routes
const advertisementRoute = require('./routes/advertisementRoutes.js');
const companyRoute = require('./routes/companyRoutes.js');
const userRoute = require('./routes/userRoutes.js')
const adminRoute = require('./routes/adminRoute.js')
// Route of our API
app.use('/api', advertisementRoute);
app.use('/api', companyRoute);
app.use('/api', userRoute);
app.use('/api', adminRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});