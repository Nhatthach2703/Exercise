// // server.js
// var express = require('express');
// var app = express();
// // set the view engine to ejs
// app.set('view engine', 'ejs');
// // use res.render to load up an ejs view file
// // index page
// app.get('/', function (req, res) {    
//       res.render('pages/index');
// });
// // about page
// app.get('/about', function (req, res) {
//     res.render('pages/about');
// });
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



// server.js
var express = require('express');
var app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file
// index page
app.get('/', function (req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
      ];
      var tagline = "No programming concept is complete without a cute animal mascot.";
    
      res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
      });
});
// about page
app.get('/about', function (req, res) {
    res.render('pages/about');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

