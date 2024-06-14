const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app){
    app.use(
        //"매핑주소",createProxyMiddleware(설정객체)
        //["매핑주소1","매핑주소2",...],createProxyMiddleware(설정객체)
        '/api',createProxyMiddleware({
            //설정객체
            target:"http://127.0.0.1:8080/api",
            changeOrigin:true,
        })
    )
    //여러개 매핑주소를 만들고싶을 때
    // app.use(
    //     //"매핑주소",createProxyMiddleware(설정객체)
    //     //["매핑주소1","매핑주소2",...],createProxyMiddleware(설정객체)
    //     '/api2',createProxyMiddleware({
    //         //설정객체
    //         target:"http://127.0.0.1:8080",
    //         changeOrigin:true
    //     })
    // )
}