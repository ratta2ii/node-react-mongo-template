const mongoose = require("mongoose");

//! IMPORTANT TO REMOVE PASSWORD WHEN HOSTING
mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// DB (Think about a Table/Model/Object/Class) Schema
const articlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "You forgot an article title!"]
    },
    content: String
});

// Model has similar results as creating a model class in C# (with fields), to be instantiated
exports.Article = mongoose.model("Article", articlesSchema);