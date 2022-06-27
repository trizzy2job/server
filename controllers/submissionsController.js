const Submissions = require('../model/Submission');


const handleSubmissions = async (req, res) => {

    const foundSubmissions = await Submissions.find({});
	console.log(foundSubmissions);

		res.send(foundSubmissions);
    
}
module.exports = { handleSubmissions };