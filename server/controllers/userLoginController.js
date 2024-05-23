import userSchema from "../models/userSchema.js";

export default async (req, res) => {
    if (!req.body) {
        res.status(400).send("Please send valid data");
        return;
    }
    const { username, password } = req.body;
    try {
        const user = await userSchema.findOne({ username });
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        // Further logic to check password etc.
        console.log(user);
        res.send("User found, proceed with login logic");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};
