const chai = require('chai')
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Test api', () => {
    it('correct response code', (done) => {
        chai.request('https://petstore.swagger.io/v2').get('/pet/1')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it('correct data format', (done) => {
        chai.request('https://petstore.swagger.io/v2').get('/store/inventory')
            .end((err, res) => {
                expect(res.headers['content-type']).to.include('application/json')
                done()
            })
    })
    it('return 404 if pet not exists', (done) => {
        chai.request('https://petstore.swagger.io/v2').get('/pet/-10')
            .end((err, res) => {
                expect(res).to.have.status(404)
                done()
            })
    })
    it('return correct error if pet not exists', (done) => {
        chai.request('https://petstore.swagger.io/v2').get('/pet/-10')
            .end((err, res) => {
                expect(res).to.have.status(404)
                expect(res.body).to.have.property('type', 'error')
                done()
            })
    })
    it('return 404 if invalid data', (done) => {
        chai.request('https://petstore.swagger.io/v2').get('/pet/asdfasgagk')
            .end((err, res) => {
                expect(res).to.have.status(404)
                done()
            })
    })
})

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// const expect = chai.expect;

// chai.use(chaiHttp);

// describe('Test api', () => {
//     it('correct response code', (done) => {
//         chai.request('https://petstore.swagger.io/v2').get('/store/order')
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             });
//     });
// });