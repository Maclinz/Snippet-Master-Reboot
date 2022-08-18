

//returns a user that is signed in
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
}