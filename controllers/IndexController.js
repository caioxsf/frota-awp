class IndexController {

    indexView(req,res) {
        res.render("index/index.ejs");
    }

}

module.exports = IndexController;