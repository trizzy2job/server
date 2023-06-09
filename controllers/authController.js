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
        var wallet = "";
        for (let i = 6; i <userMod.length; i++)
        {
            wallet += userMod[i];
        }
    return {wallet:{wallet}};
}

const handleLogin = async (req, res) => {
    const {wallet} = handleInput(req.body);
	console.log(wallet);
    const foundUser = await User.findOne(wallet).exec();
	console.log(foundUser);
   if (!foundUser)  return res.sendStatus(401); //Unauthorized 
    if(foundUser)
    {
        const v =  Object.values(foundUser.username.toString()).filter(Boolean).toString();
		console.log(v);
        const result = await foundUser.save();
        console.log(result);
        const name = foundUser.username;
        const email = foundUser.email;
        const wallet = foundUser.wallet;
        const submissions = foundUser.submissions;
        const votes = foundUser.votes;
        const orders = foundUser.orders;
        const role = foundUser.role;
        const arr = {name, email, wallet, orders, submissions, votes, role}
		res.send(arr);
    } else 
    {
        console.log(req.body);
    }
}
module.exports = { handleLogin };