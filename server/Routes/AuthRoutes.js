const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const UsersData = require('../model/Users')

const router = express.Router();

//signUp Api 
router.post("/signup", async (req, res) => {
    try {

        const { name, email, phoneNumber, gender, password, confirmPassword } = req.body;

        const isUserExist = await UsersData.findOne({ email: email });
        if (!isUserExist) {
            if (password === confirmPassword) {
                if (password.length >= 8) {
                    const hashedPassword = await bcrypt.hash(password, 10);

                    const newUsers = new UsersData({
                        name: name,
                        email: email,
                        phoneNumber: phoneNumber,
                        gender: gender,
                        password: hashedPassword,
                        confirmPassword: hashedPassword
                    });
                    newUsers.save();//it will save the document
                    return res.status(201).json({ message: "User Added Succuesfully" })
                }
                else {
                    return res.status(400).json({ message: "password length must be above 8 letters" })
                }
            }
            else {
                return res.status(400).json({ message: "password an dconfirm password should be same" })
            }
        }
        else {
            return res.status(400).json({ message: "This email is Already exists" })
        }

    } catch (e) {
        console.log('/singup', e)
        res.status(500).json({ message: "Internal Server Error" })
    }

});

//login Api
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const isUserExist = await UsersData.findOne({ email: email });

        if (isUserExist) {
            //password checking
            const isPassowrdMatch = await bcrypt.compare(password, isUserExist.password);
            if (isPassowrdMatch) {
                //Generating Token
                const payload = {
                    userId: isUserExist._id //_id it is same as in data bases
                }
                const token = jwt.sign(payload, "JOBS_JWT", { expiresIn: '2HR' });
                return res.status(200).json({ message: ' LOGIN Successfully', token: token })
            }
            else {
                return res.status(401).json({ message: " Password doesn't Match" })
            }
        }
        else {
            return res.status(400).json({ message: `User doesn't exist with this Email : ${email}` })
        }


    }
    catch (e) {
        console.log('/login', e)
        res.status(500).json({ message: "Internal Server Error" })
    }

});



module.exports = router;