const Submission = require('../model/Submission');
const User = require('../model/User');

function handleInput(str = String) {
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

        var ipfs= "";
        for (let i = 0; i <userMod.indexOf('§'); i++)
        {
            ipfs += userMod[i];
        }
        userMod.splice(0,userMod.indexOf('§') +1)
        var ipfsThumb = "";
        for (let i = 0; i <userMod.indexOf('§'); i++)
        {
            ipfsThumb += userMod[i];
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
    return {wallet, title, description, ipfs, ipfsThumb, royalty, manufacturer};
}
const handleSubmit = async (req, res) => {
    const reformed = handleInput(req.body);
    const {wallet, title, description, ipfs,ipfsThumb, royalty, manufacturer} = reformed;
	console.log("parsed Input" + wallet + " " +  title + " " + description + " " + ipfs + " " + ipfsThumb + " " + royalty+ " " + manufacturer);
    const artist = await User.findOne({wallet: wallet}).exec();
    const date = new Date().getTime();
    // check for duplicate usernames in the db
	const duplicate2 = await Submission.findOne({ipfs}).exec();
	if (duplicate2) return res.sendStatus(410); //Conflict 
    if (wallet === "undefined") return res.sendStatus(411);
    const zero = 0
    try {
    const result = await Submission.create({
        "wallet": wallet,
        "artist": artist.username,
        "title": title,
        "description": description,
        "ipfs": ipfs,
        "ipfsThumb": ipfsThumb,
        "royalty": royalty,
        "manufacturer": manufacturer,
        "date": date,
        "votes": zero
    });
    console.log("submission created")
            const foundUser = await User.findOne({wallet: wallet})
            console.log("suser found")

        const subsArr = foundUser.submissions;

        console.log("subs Arr created")
        var subsArr2 = subsArr;
        subsArr2.push({title, description, ipfs, royalty, manufacturer, date, zero})
        console.log(subsArr2);
        const t = await User.updateOne({wallet:wallet},{ $set:{submissions: subsArr2}});
        console.log("submissions updated");

        /*
        let currSubmissions = await User.findOne({wallet:wallet}).submissions;
        currSubmissions.push(ipfs);
        */
        /* const t = await User.updateOne(
            { wallet: wallet },
            { $push: [{submissions: ipfs}]  }
          ) */
        res.status(201).json({ 'success': `New user ${Submission} created!`, result });
    } 
    catch (err)
    {
        res.status(500).json({ 'message': err.message });
    }
}
module.exports = { handleSubmit };