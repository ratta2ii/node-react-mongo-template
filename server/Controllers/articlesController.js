var express = require("express");
const db = require("./../Database/db.js");
var router = express.Router();


//////////////////////////////////// Targeting ALL Articles  ////////////////////////////////////
//! //! RESTful routing for all articles

//* READ ALL
router.get("/articles", function (req, res) {
    db.Article.find({}, function (err, foundArticles) {
        if (!err) {
            // Below is used to render a server side ejs page
            // res.render("list", { articleList: foundArticles });
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
});

//* WRITE
router.post("/articles", function (req, res) {
    const title = req.body.title;
    const content = req.body.content;

    const newArticle = new db.Article({
        title: title,
        content: content
    });

    newArticle.save((err) => {
        if (!err) {
            res.send("Your item has been added successfully!");
        } else {
            res.send(err);
        }
    });
});

//* DELETE ALL
router.delete("/articles", function (req, res) {
    db.Article.deleteMany(function (err) {
        if (!err) {
            res.send("Successfully deleted all articles");
        } else {
            res.send(err);
        }
    });
});
// End of "/articles" routes


///////////////////////////////// Targeting SPECIFIC Articles  /////////////////////////////////
//! RESTful routing for specific articles


//* READ ONE
router.get("/articles/:articleTitle/", function (req, res) {
    const title = req.params.articleTitle;

    db.Article.findOne({ title: title }, function (err, foundArticle) {
        if (!err) {
            if (!foundArticle) {
                res.send("Sorry, NO article matching that title")
            } else {
                res.send(foundArticle);
            }
        } else {
            res.send(err);
        }
    });
});

//* UPDATE ONE (entire entry)
router.put("/articles/:articleTitle/", function (req, res) {
    // Structure of below updateOne method
    // db.Article.updateOne({
    //     {conditions},
    //     {updates},
    //     {overwrite: true},
    //     function (err, result) {}
    // });
    const titleToLocate = req.params.articleTitle;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;

    db.Article.findOneAndUpdate(
        { title: titleToLocate },
        { title: updatedTitle, content: updatedContent },
        { overwrite: true },
        function (err) {
            if (!err) {
                res.send("Your article has successfully been updated!");
            } else {
                res.send(err);
            }
        }
    )
});

//* UPDATE ONE (update any combination of fields in an entry. Use PUT for updating all fields.)
router.patch("/articles/:articleTitle/", function (req, res) {
    db.Article.updateOne(
        { title: req.params.articleTitle },
        //! This "$set" will automatically update only the fields that have values from req.body
        { $set: req.body },
        function (err) {
            if (!err) {
                res.send("Successfully updated the article!")
            } else {
                res.send(err);
            }
        }
    )
});

//* DELETE ONE
router.delete("/articles/:articleTitle/", function (req, res) {
    db.Article.deleteOne(
        { title: req.params.articleTitle },
        function (err) {
            if (!err) {
                res.send("The item has successfully been deleted!");
            } else {
                res.send(err);
            }
        }
    )
});
// END of "/articles/:articleTitle/" routes


module.exports = router