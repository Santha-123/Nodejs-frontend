import express from 'express';
import path from 'path';
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
