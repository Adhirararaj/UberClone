const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Name is less than 3 charachters long '),
    body('password').isLength({min:6}).withMessage('Password is too short '),
    body('vehicle.color').isLength({min:3}).withMessage('Color is less than 3 charachters long '),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate is less than 3 charachters long '),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid Vehicle Type'),
],
    captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password is too short ')     
],
    captainController.loginCaptain
)

router.get('/profile',authMiddleware.authCaptain ,captainController.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)


module.exports = router;