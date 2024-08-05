const mongoose = require("mongoose");

const { Schema } = mongoose;//To Store Multiple Variable (can be Destruced)

const skillsSchema = new mongoose.Schema({
    name: String,
    imageUrl: String
});

const lifeAtCompanySchema = new mongoose.Schema({
    description: String,
    imageUrl: String
});

//create Table in the  DataBase Based on Data given Below.
const jobsSchema = new mongoose.Schema({
    title: String,
    companyLogoUrl: String,
    rating: Number,
    location: String,
    packagePerAnnum: String,
    jobDescription: String,
    employmentType: String

});

//Tabel Stored in this below Variable(Jobs)
const Jobs = mongoose.model("Jobs", jobsSchema);


//create Table in the  DataBase Based on Data given Below.
const jobDetailsSchema = new mongoose.Schema({
    title: String,
    companyLogoUrl: String,
    companyWebsiteUrl: String,
    rating: Number,
    location: String,
    packagePerAnnum: String,
    jobDescription: String,
    employmentType: String,
    skills: [skillsSchema],
    lifeAtCompany: lifeAtCompanySchema

});

//Tabel Stored in this below Variable(JobsDetails)
const JobDetails = mongoose.model('JobDetails', jobDetailsSchema);


//Export the Variables{Jobs,JobsDetails}
module.exports = { Jobs, JobDetails };
