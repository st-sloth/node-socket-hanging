const http = require('http')
const request = require('supertest')

/**
 * Request `/<responseStatusCode>`
 */
function createServer() {
    return http.createServer(function onRequest(req, res) {
        const reqEndpoint = Number(req.url.match(/\/(\d*)/)[1])

        if (100 <= reqEndpoint && reqEndpoint < 600) {
            res.statusCode = reqEndpoint
        }

        res.end('some data')
    })
}


const server = createServer()


describe('http', function () {
    for (let hundreds = 1; hundreds < 6; ++hundreds) {
        for (let i = 0; i <= 10; ++i) {
            const status = hundreds * 100 + i

            it(String(status), function (done) {
                request(server)
                    .get('/' + status)
                    .expect(status)
                    .end((err, res) => {
                        if (err) throw err
                        done()
                    })
            })
        }
    }
})
