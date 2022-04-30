const getHomePage = (req, res) => {
  res.render("home/home", {
    title: "HOME"
  });
};

module.exports = { getHomePage };
