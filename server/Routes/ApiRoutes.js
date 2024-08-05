const express = require("express");
const router = express.Router();

const { Jobs, JobDetails } = require('../model/Jobs');

const UsersData = require('../model/Users')


const jwtAuth = require('../middleware/jwtAuth');


//all jobs Api 
router.get('/jobs', jwtAuth, async (req, res) => {

    try {

        const jobs = await Jobs.find();//retrive all jobs
        res.status(200).json({ jobs: jobs });

    } catch (e) {

        console.log('/jobs', e);
        res.status(500).json({ message: "Internal Server jobs Error" })

    }
});

//single job Api(job details)
router.get('/job/:jobId', jwtAuth, async (req, res) => {

    try {
        const { jobId } = req.params;

        const jobs = await JobDetails.findOne({ _id: jobId });//retrive single job

        const jobTitle = jobs.title;


        const similarJob = await Jobs.find({ title: { $regex: jobTitle, $options: 'i' }, _id: { $ne: jobId } });


        res.status(200).json({ data: jobs, similarJobs: similarJob });

    } catch (e) {

        console.log('/job', e);
        res.status(500).json({ message: "Internal Server JOB Error" })

    }
})


//search Jobs

router.get("/filterjobs", jwtAuth, async (req, res) => {
    try {

        const { search, employment_type, minimum_package } = req.query;

        const query = {};


        if (employment_type) {
            const employmentTypeArray = employment_type.split(',');//split the employment types from client into array
            query.employment_type = { $in: employmentTypeArray.map(tpye => new RegExp(tpye, 'i')) };//to match selected type

        }

        if (minimum_package) {
            // 53:45

            const minPackage = parseFloat(minimum_package.replace(/\D+/g, " "));

            if (!isNaN(minimum_package)) {
                query.package_per_annum = { $gt: minPackage };
            }
            else {
                return res.status(404).json({ message: ' salary No Jobs Found' })
            }
        }


        if (search) {
            query.title = { $regex: search, $options: 'i' }//match the job title with case sentive
        }



        const filteredJobs = await Jobs.find(query);

        if (filteredJobs.length === 0) {
            return res.status(404).json({ message: 'No Jobs Found' })
        }
        return res.status(200).json({ jobs: filteredJobs });

    } catch (e) {

        console.log('/fliterjobs', e);
        res.status(500).json({ message: "Internal Server Error" })

    }
});


//profileApi

router.get('/profile', jwtAuth, async (req, res) => {
    try {
        const user = await UsersData.findOne({ _id: req.userId });
        if (!user) {
            return res.status(404).json({ message: "User not Found" })
        }
        return res.status(200).json({ user })

    } catch (e) {
        console.log('/profile', e);
        res.status(500).json({ message: "Internal server Error" });
    }
})


module.exports = router;