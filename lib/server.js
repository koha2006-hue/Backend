"use strict";

var _express = _interopRequireDefault(require("express"));
var _viewEngine = _interopRequireDefault(require("../../Blog/src/config/viewEngine"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config();
var app = (0, _express["default"])();
var port = process.env.PORT;
(0, _viewEngine["default"])(app);
app.get("/", function (req, res) {
  res.render("home");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});