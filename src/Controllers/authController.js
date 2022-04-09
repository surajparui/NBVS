const bcrypt = require('bcrypt');
const userModel = require("../Models/Auth/User");
const authController = () => {
    return {
        // Here i am registering the new user
        signup: async (req, res) => {
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
                res.status(200).json({
                    success: true,
                    message: req.body
                });
            } catch (error) {
                // console.log(error);
                res.status(500).send(error);
            }
        },
        // Here i am loging the user
        login: async (req, res) => {
            // try {
            //     const user = await userModel.findOne({Email : req.body.Email});
            //     res.send(user);
            // } catch (error) {
            //     res.send(error);
            // }
            try {
                const user = await userModel.findOne({Email : req.body.Email});
                if (user) {
                    const validPassword = await bcrypt.compare(req.body.password, user.password)
                    if (!validPassword) {
                        res.status(404).json({
                            success: false,
                            message: "Invalid Credentials"
                        })
                    }
                    else {
                        res.status(200).json({
                            success: true,
                            message: user
                        })
                    }
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "User Not Found"
                    })
                }
            } catch (error) {
                res.status(500).json(error);
            }
        }
    }
};
module.exports = authController;