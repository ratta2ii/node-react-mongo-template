const express = require("express");
const _ = require("lodash");
var cors = require('cors');
const app = express();
var routes = require(__dirname + "/Controllers/articlesController.js");



//! Express v4.16.0 and higher
// --------------------------
// (express is required in above already)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', routes);

//! For Express version less than 4.16.0
// ------------------------------------
// const bodyParser = require('body-parser');
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}

app.listen(port, function () {
    console.log(`Server is running on PORT: ${port}`);
});

//! Spaces are represented by "%20"
// You will need to account for this in the client making the request so it has proper params
// If your route parameter is 2 or more words, or has spaces, it will look like this
// https://localhost:5000/api/users/Trevor%20Mackin






















//! This is all the code in one file before changing the structure of the application
// const express = require("express");
// const mongoose = require("mongoose");
// const _ = require("lodash");
// const app = express();



// //! Express v4.16.0 and higher
// // --------------------------
// // (Already declared above) const express = require('express');
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //! For Express version less than 4.16.0
// // ------------------------------------
// // const bodyParser = require('body-parser');
// // app.use(express.json());
// // app.use(bodyParser.urlencoded({extended: true}));

// app.set('view engine', 'ejs');
// app.use(express.static("public"));

// let port = process.env.PORT;
// if (port == null || port == "") {
//     port = 5000;
// }

// app.listen(port, function () {
//     console.log(`Server is running on PORT: ${port}`);
// });



// //! IMPORTANT TO REMOVE PASSWORD WHEN HOSTING
// mongoose.connect("mongodb://localhost:27017/wikiDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
// });

// // DB "Table/Model/Object/Class" Schema
// const articlesSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: [true, "You forgot an article title!"]
//     },
//     content: String
// });

// // Similar results as creating a model class in C# (with fields), to be instantiated
// const Article = mongoose.model("Article", articlesSchema);


// //////////////////////////////////// Targeting ALL Articles  ////////////////////////////////////
// //! //! RESTful routing for all articles
// app.route("/articles")

//     //* READ
//     .get(function (req, res) {
//         Article.find({}, function (err, foundArticles) {
//             if (!err) {
//                 res.render("list", {articleList: foundArticles});
//             } else {
//                 res.send(err);
//             }
//         });
//     })

//     //* WRITE
//     .post(function (req, res) {
//         const title = req.body.title;
//         const content = req.body.content;

//         const newArticle = new Article({
//             title: title,
//             content: content
//         });

//         newArticle.save((err) => {
//             if (!err) {
//                 res.send("Your item has been added successfully!");
//             } else {
//                 res.send(err);
//             }
//         });
//     })

//     //* DELETE
//     .delete(function (req, res) {
//         Article.deleteMany(function (err) {
//             if (!err) {
//                 res.send("Successfully deleted all articles");
//             } else {
//                 res.send(err);
//             }
//         });
//     });
//     // End of "/articles" routes
//     // Remove semincolon (;) if chaining to this route


// ///////////////////////////////// Targeting SPECIFIC Articles  /////////////////////////////////
// //! RESTful routing for specific articles
// app.route("/articles/:articleTitle/")

//     //* READ
//     .get(function (req, res) {
//         const title = req.params.articleTitle;

//         Article.findOne({title: title}, function(err, foundArticle) {
//             if (!err) {
//                 if (!foundArticle) {
//                     res.send("Sorry, NO article matching that title")
//                 } else {
//                     res.send(foundArticle);
//                 }
//             } else {
//                 res.send(err);
//             }
//         });
//     })

//     //* UPDATE (entire entry)
//     .put(function(req, res) {
//         // Structure of below updateOne method
//         // Article.updateOne({
//         //     {conditions},
//         //     {updates},
//         //     {overwrite: true},
//         //     function (err, result) {}
//         // });
//         const titleToLocate = req.params.articleTitle;
//         const updatedTitle = req.body.title;
//         const updatedContent = req.body.content;

//         Article.findOneAndUpdate(
//             {title: titleToLocate},
//             {title: updatedTitle, content: updatedContent},
//             {overwrite: true},
//             function (err) {
//                 if (!err) {
//                     res.send("Your article has successfully been updated!");
//                 } else {
//                     res.send(err);
//                 }
//             }
//         )
//     })

//     //* UPDATE (update any combination of fields in an entry. Use PUT for updating all fields.)
//     .patch(function (req, res) {
//         Article.updateOne(
//             {title: req.params.articleTitle},
//             //! This "$set" will automatically update only the fields that have values from req.body
//             {$set: req.body},
//             function (err) {
//                 if (!err) {
//                     res.send("Successfully updated the article!")
//                 } else {
//                     res.send(err);
//                 }
//             }
//         )
//     })

//     //* DELETE
//     .delete(function (req, res) {
//         Article.deleteOne(
//             {title: req.params.articleTitle},
//             function (err) {
//                 if (!err) {
//                     res.send("The item has successfully been deleted!");
//                 } else {
//                     res.send(err);
//                 }
//             }
//         )
//     });
//     // END of "/articles/:articleTitle/" routes
//     // Remove semincolon (;) if chaining to this route