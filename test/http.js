var http = require('http')
var request = require('supertest')

/**
 * Request `/<responseStatusCode>`
 */
function createServer() {
    return http.createServer(function onRequest(req, res) {
        var reqEndpoint = Number(req.url.match(/\/(\d*)/)[1])

        if (100 <= reqEndpoint && reqEndpoint < 600) {
            res.statusCode = reqEndpoint
        }

        res.end('some data')
    })
}


const server = createServer()


describe('http', function () {
    for (var hundreds = 1; hundreds < 6; ++hundreds) {
        for (var i = 0; i <= 10; ++i) {
            (function (status) {
                it(String(status), function (done) {
                    request(server)
                        .get('/' + status)
                        .expect(status)
                        .end(function (err, res) {
                            if (err) throw err
                            done()
                        })
                })
            })(hundreds * 100 + i)
        }
    }
})
