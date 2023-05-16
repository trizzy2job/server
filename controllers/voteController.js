const { closestIndexTo } = require('date-fns');
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

        var ipfs = "";
        for (let i = 0; i <userMod.indexOf('§'); i++)
        {
            ipfs += userMod[i];
        }
        userMod.splice(0,userMod.indexOf('§') +1)
        var votes = "";
        for (let i = 0; i <userMod.length; i++)
        {
            votes += userMod[i];
        }
    return {wallet, ipfs, votes};
}
const handleVote = async (req, res) => {
    const reformed = handleInput(req.body);
    const {wallet, ipfs, votes} = reformed;
   if (wallet === "undefined") return res.sendStatus(411);
	
    try 
    {
        const foundSubmission = await Submission.findOne({ipfs}).exec();
    const title = foundSubmission.title;
    const newVotes = parseInt(foundSubmission.votes) + parseInt(votes);
    const foundUser = await User.findOne({wallet: wallet}).exec();
    await console.log(foundUser);
        const date = new Date().getTime();
    const newVotes2 = foundUser.votes.concat({votes, ipfs, title, date});
        const resultOne = await User.updateOne({wallet: wallet}, {$set:{votes: newVotes2}});
        const result = await Submission.updateOne({ipfs: ipfs}, {votes: newVotes});
        console.log(result);
        res.status(201).json({ 'success': `New user ${Submission} created!`, result });
    } catch (err) 
    {
        res.status(500).json({ 'message': err.message });
    }
}
module.exports = {handleVote};