'use strict';

const expect = require('chai').expect;
const request = require('request');

var server = require('../../../bin/server');

describe('Unit Test', () => {
    it('Index API testing', function (done) {
        request('http://localhost:3000/api/', (error, response, body) => {
            expect(body).to.equal('Hello World');
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('Registered Students without body', (done) => {
        request({
            url: 'http://localhost:3000/api/register',
            method: 'POST',
            json: null
        }, (error, response) => {
            expect(response.statusCode).to.equal(500);
            done();
        });
    });

    it('Registered Students with body', (done) => {
        request({
            url: 'http://localhost:3000/api/register',
            method: 'POST',
            json: {
                'teacher': 'khinlae@gmail.com',
                'students': [
                    'mieu@example.com',
                    'potay@example.com'
                ]
            }
        }, (error, response) => {
            expect(response.statusCode).to.equal(204);
            done();
        });
    });

    it('Registered Students with body', (done) => {
        request({
            url: 'http://localhost:3000/api/register',
            method: 'POST',
            json: {
                'teacher': 'ppshein@gmail.com',
                'students': [
                    'student1@example.com',
                    'student2@example.com'
                ]
            }
        }, (error, response) => {
            expect(response.statusCode).to.equal(204);
            done();
        });
    });

    it('Common Students without query param', (done) => {
        request('http://localhost:3000/api/commonstudents', (error, response, body) => {
            expect(response.statusCode).to.equal(500);
            done();
        });
    });

    it('Common Students with query param with not exist teacher', (done) => {
        request('http://localhost:3000/api/commonstudents?teacher=noteacher@gmail.com', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body)).to.be.an('object');
            done();
        });
    });

    it('Common Students with query param with exist teacher', (done) => {
        request('http://localhost:3000/api/commonstudents?teacher=khinlae@gmail.com', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body).students.length).to.above(0);
            done();
        });
    });

    it('Suspend Students without body', (done) => {
        request({
            url: 'http://localhost:3000/api/suspend',
            method: 'POST',
            json: null
        }, (error, response) => {
            expect(response.statusCode).to.equal(500);
            done();
        });
    });

    it('Suspend Students with body', (done) => {
        request({
            url: 'http://localhost:3000/api/suspend',
            method: 'POST',
            json: {
                'student': 'potay@example.com'
            }
        }, (error, response) => {
            expect(response.statusCode).to.equal(204);
            done();
        });
    });

    it('Notification Students without body', (done) => {
        request({
            url: 'http://localhost:3000/api/retrievefornotifications',
            method: 'POST',
            json: null
        }, (error, response) => {
            expect(response.statusCode).to.equal(500);
            done();
        });
    });

    it('Notification Students with body and with other students', (done) => {
        request({
            url: 'http://localhost:3000/api/retrievefornotifications',
            method: 'POST',
            json: {
                'teacher': 'ppshein@gmail.com',
                'notification': 'Hello students! @mieu@example.com @potay@gmail.com'
            }
        }, (error, response, body) => {
            expect(body.recipients.length).to.above(0);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('Notification Students with body and students', (done) => {
        request({
            url: 'http://localhost:3000/api/retrievefornotifications',
            method: 'POST',
            json: {
                'teacher': 'ppshein@gmail.com',
                'notification': 'Hello students!'
            }
        }, (error, response, body) => {
            expect(body.recipients.length).to.above(0);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    after(() => {
        server.exist();
    });
});