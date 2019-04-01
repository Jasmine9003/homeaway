var chai = require('chai'), chaiHttp = require('chai-http');
const should = require('should');
chai.use(chaiHttp);
var assert = require('assert');
var expect = chai.expect;
var email = "vikram.markiv@gmail.com";
var password = "vikram123";
var moment = require('moment');



describe('HomeAway Test Cases:', function () {


it("Login ", function(done){ 
    chai.request('http://localhost:8000')
    .post('/login')
    .send({ "email": email, "password" : password})
    .end(function (err, res) {
        res.status.should.be.equal(200);
        done();
    });
})



it("Get Property Information ", function(done){ 
    chai.request('http://localhost:8000')
    .post('/getPropertyInformation')
    .send({ "pid": 59})
    .end(function (err, res) {
        res.status.should.be.equal(200);
       
        done();
    });
})


it("Get all Properties of User", function(done){ 
    chai.request('http://localhost:8000')
    .post('/getAllPropertiesOfUser')
    .send({ "email": email})
    .end(function (err, res) {
        res.status.should.be.equal(200);
        expect(res.body.rows.length).to.equal(1)
        done();
    });
})



it("Get all Bookings of Owners Properties", function(done){ 
    chai.request('http://localhost:8000')
    .post('/getAllBookingsOfOwnersProperties')
    .send({ "email": "akhileshmalini@gmail.com"})
    .end(function (err, res) {
        res.status.should.be.equal(200);
        expect(res.body.rows.length).to.equal(2)
        done();
    });
})



it("Get all Trips of Traveller", function(done){ 
    chai.request('http://localhost:8000')
    .post('/getAllTripsOfUser')
    .send({ "email": email})
    .end(function (err, res) {
        res.status.should.be.equal(200);
        expect(res.body.rows.length).to.equal(2)
        done();
    });
})


})
