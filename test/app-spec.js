var request = require('supertest');
var app = require('../app');
var cheerio = require('cheerio');
var expect = require('chai').expect;

describe("My Resort List", function () {

    describe("API Routes", function () {

        it("Lists all ski resort names", function (done) {

            request(app).get('/ski-areas/names')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(done);

        });

        it("Filters resort names by string", function (done) {

            request(app).get('/ski-areas/names/sq')
                .expect('Content-Type', /json/)
                .expect(200, ["Squaw Valley"], done);

        });

    });

    describe("Home Page", function () {

        before(function (done) {

            request(app).get('/')
                .expect('Content-Type', /html/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }

                    this.$ = cheerio.load(res.text);
                    done();

                });

        });

        it("has correct title", function () {
            var heading = this.$('header>h1').text();
            expect(heading).to.equal("My Ski Resort List");
        });

    });

    it("throws 404 errors", function (done) {
        request(app).get('/notthere').expect(404).end(done);
    });

    it('Can POST resorts to myList', function (done) {
        request(app).post('/ski-areas/mylist')
            .set('Accept', 'application/json')
            .send({name: 'Squaw Valley'})
            .expect('Content-Type', /json/)
            .expect(200, {
                "id": "538",
                "web": "http://www.squaw.com/",
                "name": "Squaw Valley"
            }, done);
    });

});