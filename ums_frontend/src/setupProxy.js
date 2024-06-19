const {createProxyMiddleware} = require('http-proxy-middleware');
//"매핑주소",createProxyMiddleware(설정객체)
//["매핑주소1","매핑주소2",...],createProxyMiddleware(설정객체)
module.exports = function(app){
    app.use(
        '/api',createProxyMiddleware({
            target:"http://127.0.0.1:8080/api",
            changeOrigin:true,
        })
    )
    // app.use(
    //     '/api2',createProxyMiddleware({
    //         target:"http://127.0.0.1:9090",
    //         changeOrigin:true
    //     })
    // )
}
