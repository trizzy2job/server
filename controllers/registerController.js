const User = require('../model/User');

function handleInput(str = String) {
    console.log(JSON.stringify(str))
    var userIn = Array.prototype.map.call(JSON.stringify(str), eachLetter => eachLetter);
    var userMod = new Array();

        for (let i = 0; i <userIn.length; i++)
        {   
            if (userIn[i] !== ('}') & userIn[i] !== ('{') & userIn[i] !== ('"') & userIn[i] !== ('\\') & userIn[i] !== (':'))
            {
                userMod.push(userIn[i]);
            }
        }

        var user = "";
        for (let i = 0; i <userMod.indexOf(','); i++)
        {
            user += userMod[i];
        }
        userMod.splice(0,userMod.indexOf(',') +1)

        var email = "";
        for (let i = 0; i <userMod.indexOf(','); i++)
        {
            email += userMod[i];
        }
        userMod.splice(0,userMod.indexOf(',') +1)
        var wallet = "";
        for (let i = 0; i <userMod.length; i++)
        {
            wallet += userMod[i];
        }

    return {user, email, wallet};
}

const handleRegister = async (req, res) => {
    console.log(req.body);
    const reformed = handleInput(req.body);
    const {user, email, wallet} = reformed;
    console.log(user);
    console.log(email);
    console.log(wallet);
    //if (!user || !email || !wallet) return res.status(400).json({ 'message': 'Username, email and wallet are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({username: user }).exec();
	const duplicate2 = await User.findOne({email}).exec();
	const duplicate3 = await User.findOne({wallet}).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
	if (duplicate2) return res.sendStatus(410); //Conflict 
	if (duplicate3) return res.sendStatus(411); //Conflict 
    try {
        //create and store the new user
        const result = await User.create({
            "username": user,
            "email": email,
			"wallet": wallet,
            "votes": [],
            "submissions": [],
            "orders": [], 
            "role": "member"
        });
		
        //console.log(result);
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
module.exports = { handleRegister };