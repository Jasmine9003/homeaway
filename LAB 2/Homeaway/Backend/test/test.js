var chai = require('chai'), chaiHttp = require('chai-http');
var moment = require('moment');
const should = require('should');
chai.use(chaiHttp);
var assert = require('assert');
var expect = chai.expect;
var email = "akhileshmalini@gmail.com";
var password = "abc123";
var jwt="";
var property="5bd203801217118ad3d1e7fc"
var where ="Tahoe";
var startDate=moment(new Date("11/14/18")).format("MM/DD/YYYY");
var endDate=moment(new Date("11/15/18")).format("MM/DD/YYYY");
var people=1;

describe('HomeAway Test Cases:', function () {


it("Login ", function(done){ 
    chai.request('http://localhost:8000')
    .post('/login')
    .send({ "email": email, "password" : password})
    .end(function (err, res) {
        jwt="JWT "+res.body.token;
        res.status.should.be.equal(200);
        done();
    });
})



it("Get Property Information ", function(done){ 
    chai.request('http://localhost:8000')
    .get('/user/getProperty?pid='+property)
    .set("Authorization", jwt)
    .end(function (err, res) {
        res.status.should.be.equal(200);
        done();
    });
})


it("Get all Properties of User", function(done){ 
    chai.request('http://localhost:8000')
    .get('/user/getAllPropertiesOfUser?email='+email)
    .set("Authorization", jwt)
    .end(function (err, res) {
        res.status.should.be.equal(200);
        expect(res.body.properties.length).to.equal(4)
        done();
    });
})



it("Get all Bookings of Owners Properties", function(done){ 
    chai.request('http://localhost:8000')
    .get('/user/getAllPropertiesWhere')
    .query({where: where, startDate:startDate, endDate:endDate, people:people}) 
    .set("Authorization", jwt)
    .end(function (err, res) {
        res.status.should.be.equal(200);
        expect(res.body.filteredProperties.length).to.equal(1)
        done();
    });
})



it("Get all Trips of Traveller", function(done){ 
    chai.request('http://localhost:8000')
    .get('/user/getTravellerBookings')
    .query({email:email})
    .set("Authorization", jwt) 
    .end(function (err, res) {
        res.status.should.be.equal(200);
        done();
    });
})


})
