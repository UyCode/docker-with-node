const User = require("../modules/userModule.js");

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(200).json({
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
