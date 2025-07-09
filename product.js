
import express from 'express';
import path from 'path';
import requestIP from 'request-ip';
import https from 'https';
import{fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});
app.use(express.static(path.join(__dirname, 'public')));
app.get("/showfile", (req, res, next) => {
//     const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
const _retfile = path.join(__dirname, 'sample1.html');
res.sendFile(_retfile);
}); 
app.get('/get/ip/address', function (req, res) {
      const ip = getCallerIP(req);
      const useragent = req.headers['user-agent'];
      console.log({ip,useragent})
      res.send({ip,useragent})
})
function getCallerIP(request) {
    var ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection?.socket?.remoteAddress;
    return ip;
}
const options = {
    headers: { "User-Agent": "<MyBusinessApp/1.0 (contact@domain.com)'>" }
};
var callProductapi = function(productid, callback, res) {
    var productdata = '';
    const apiurl=`https://dummyjson.com/products/${productid}`;
    https.get(apiurl, (resp) => {
         resp.on('data', (chunk) => {
           productdata += chunk;
        });
        resp.on('end', () => {
    try {
        const parsed = JSON.parse(productdata);
        callback(null, parsed); 
    } catch (err) {
        callback(err);
    }
})
        }).on("error", (err) => {
            console.log("Error: " + err.message);
    });
}
app.get('/product/:id',(req,res)=>{
    const productId = req.params.id;
    callProductapi(productId, (err, data) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.send(data);
    });
});