const nodemailer = require('nodemailer');
var OTP = Math.random() * 100000;
OTP = Math.ceil(OTP);
const otpController = () => {
    return {
        otp: (req, res) => {
            const nodemailer = require('nodemailer');
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vs125609@gmail.com',
                    pass: 'igezamvxvyqqblpp',
                }
            });
            const mailOption = {
                from: 'vs125609@gmail.com',
                to: `bhaveshmali0015@gmail.com`,
                subject: `Please Verify Yourself`,
                text: `Your verification OPT is ${OTP}`
            };
            transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Email Sent Successfully " + info.response);
                }
            });
            res.render('verify');
        },
        verifyOtp: (req, res) => {
            let Otp = parseInt(req.body.OTP);
            console.log(OTP);
            console.log(Otp);
            if (OTP == Otp) {
                res.status(200).json({ success: true, message: `Your OTP is verified successfully` });
            }
            else {
                res.status(400).json({success:false,message:`Your OTP is not verified`});
            }
        }
    }
};
module.exports = otpController;