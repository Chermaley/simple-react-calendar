"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./style/base_style.styl");

require("./style/date_picker.styl");

var _react = _interopRequireDefault(require("react"));

var _calendar = _interopRequireDefault(require("../calendar/calendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var App = function App() {
  return /*#__PURE__*/_react["default"].createElement(_calendar["default"], {
    mode: "range",
    blockClassName: "date_picker",
    onSelect: function onSelect(_ref) {
      var start = _ref.start,
          end = _ref.end;

      /* eslint-disable no-console */
      console.log('>>>>>', {
        end: end,
        start: start
      });
    }
  });
};

App.displayName = 'App';
var _default = App;
exports["default"] = _default;