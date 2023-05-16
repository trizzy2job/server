const Submissions = require('../model/Submission');

function handleInput(str = String) {
    console.log(str)
    var userIn = Array.prototype.map.call(JSON.stringify(str), eachLetter => eachLetter);
    var userMod = new Array();
        for (let i = 0; i <userIn.length; i++)
        { 
            if (userIn[i] !== ('}') & userIn[i] !== ('{') & userIn[i] !== ('"') & userIn[i] !== ('\\') & userIn[i] !== (':'))
            {
                userMod.push(userIn[i]);
            }
        }
        console.log(userMod)
        var ipfs = "";
        for (let i = 0; i <userMod.length; i++)
        {
            ipfs += userMod[i];
        }
        const temp = ipfs.split('/')
        user = temp[0]
        ipfs = temp[1]
    return {user: user, ipfs: ipfs};
}

const handleSubmissions = async (req, res) => {
    try {const {user, ipfs} = handleInput(req.body);
    console.log("IPFS" + ipfs)
    console.log(user)
    const foundSubmission = await Submissions.findOne({ipfs: ipfs});
    if (foundSubmission == null){res.sendStatus(404);}
	console.log(user.toLowerCase() == foundSubmission.wallet.toLowerCase() );
	if(user.toLowerCase() == foundSubmission.wallet.toLowerCase()) {res.send(foundSubmission);}
    else{res.sendStatus(404)}
}
    catch{res.sendStatus(404);}
}
module.exports = { handleSubmissions };