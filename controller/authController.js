const User = require("../modules/userModule.js");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
    const { username, password } = req.body;

    try {

        
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            username,
            password: hashPassword
        });
        res.status(201).json({
            status: 'success',
            data: {
                User: newUser
            }
        })

    } catch (e) {
        res.status(400).json({
            status: "failure"
        }
        )
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({username});
        if(!user) {
            return res.status(404).json({
                status: "failure",
                message: "user not found"
            });
        }

        const isCorrect = await bcrypt.compare(password, user.password);
        if(isCorrect) {
            res.status(200).json({
                status: "success"
            })
        } else {
            res.status(400).json({
                status: "failure",
                message: "incorrect username or password"
            })
        }

    } catch (e) {
        res.status(400).json({
            status: "error found"
        }
        )
    }
}
