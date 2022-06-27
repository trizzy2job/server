const Submission = require('../model/Submission');
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
        for (let i = 0; i <userMod.indexOf('§'); i++)
        {
            wallet += userMod[i];
        }
        userMod.splice(0,userMod.indexOf('§') +1)

        var title = "";
        for (let i = 0; i <userMod.indexOf('§'); i++)
        {
            title += userMod[i];
        }
        userMod.splice(0,userMod.indexOf('§') +1)
        
        var description = "";
        for (let i = 0; i <userMod.indexOf('§'); i++)
        {
            description += userMod[i];
        }
        userMod.splice(0,userMod.indexOf('§') +1)

        var ipfs = "";
        for (let i = 0; i <userMod.indexOf('§'); i++)
        {
            ipfs += userMod[i];
        }
        userMod.splice(0,userMod.indexOf('§') +1)
        var royalty = "";
        for (let i = 0; i <userMod.indexOf('§'); i++)
        {
            royalty += userMod[i];
        }
        userMod.splice(0,userMod.indexOf('§') +1)
        var manufacturer = "";
        for (let i = 0; i <userMod.length; i++)
        {
            manufacturer += userMod[i];
        }
    return {wallet, title, description, ipfs, royalty, manufacturer};
}
const handleSubmit = async (req, res) => {
    console.log(req.body);
    const reformed = handleInput(req.body);
    const {wallet, title, description, ipfs, royalty, manufacturer} = reformed;
    const artist = await User.findOne({wallet: wallet}).exec();
    const date = new Date().getTime();
    console.log(reformed);
    // check for duplicate usernames in the db
	const duplicate2 = await Submission.findOne({ipfs}).exec();
	if (duplicate2) return res.sendStatus(410); //Conflict 
    if (wallet === "undefined") return res.sendStatus(411);
    try {
        for(let i = 0; i < 50; i++){
        await Submission.create({
			"wallet": wallet,
            "artist": artist.username,
            "title": title + " " + i,
            "description": description,
            "ipfs": ipfs,
            "royalty": royalty,
            "manufacturer": manufacturer,
            "date": date,
        });
    }
    const result = await Submission.create({
        "wallet": wallet,
        "artist": artist.username,
        "title": title,
        "description": description,
        "ipfs": ipfs,
        "royalty": royalty,
        "manufacturer": manufacturer,
        "date": date,
    });
        console.log(result);
        res.status(201).json({ 'success': `New user ${Submission} created!`, result });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
    
}
module.exports = { handleSubmit };