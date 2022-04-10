const bcrypt = require('bcrypt');
const userModel = require("../Models/Auth/User");
var userEmail;
const authController = () => {
    return {
        // Here i am registering the new user
        signup: async (req, res) => {
            const alreadyExist = await userModel.findOne({ Email: req.body.Email });
            if (alreadyExist) {
                res.status(400).json({ success: false, message: `User Already Exist` });
            }
            else {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(req.body.Password, salt);
                    const newUser = new userModel({
                        Name: req.body.Name,
                        Email: req.body.Email,
                        Password: hashedPassword,
                        Phone: req.body.Phone
                    });
                    const userData = await newUser.save();
                    res.redirect('otp');
                } catch (error) {
                    res.status(500).send(error);
                }
            }
        },
        // Here i am loging the user
        login: async (req, res) => {
            const body = req.body;
            const user = await userModel.findOne({ Email: body.Email });
            if (user) {
                const validPassword = await bcrypt.compare(body.Password, user.Password);
                if (validPassword) {
                    res.status(200).json({ success: true, message: "Login Successfully" });
                } else {
                    res.status(400).json({ error: "Invalid Password" });
                }
            } else {
                res.status(401).json({ error: "User does not exist" });
            }
        }
    }
};
module.exports = authController;