const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET = 'MonkeyDLuffy';


//ROUTE 1: Create a User using: POST "api/auth/createuser"... Doesnt require Login
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can\'t be empty').exists()
],
    async (req, res) => {
        let success=false;
        //if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }


        try {

            //check if user with same email already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: 'User already exists' })
            }
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt);

            //Create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            success=true;
            const authtoken = jwt.sign(data, JWT_SECRET);


            res.json({success,authtoken})



        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error')
        }


    })

//ROUTE 2: LOGIN 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can\'t be empty').exists()
],
    async (req, res) => {
        let success=false;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({success, error: "Please try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({success, error: "Please try to login with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            success=true;
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({success, authtoken })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }



    })



//ROUTE 3 get loggedin user details
router.post('/getuser', fetchuser, async (req, res) => {
        try {
            let userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);

        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error')
        }


    })


module.exports = router;


