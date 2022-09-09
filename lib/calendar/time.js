"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactWheelpicker = _interopRequireDefault(require("react-wheelpicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
var TimePicker = function TimePicker(_ref) {
  var onRequestClose = _ref.onRequestClose;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "time-picker"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "time-picker__content"
  }, /*#__PURE__*/_react["default"].createElement(_reactWheelpicker["default"], {
    className: "time-picker__wheel time-picker__wheel time-picker__wheel_left",
    data: Array.from(Array(25).keys()),
    parentHeight: 250,
    fontSize: 13,
    defaultSelection: 3,
    updateSelection: console.log,
    scrollerId: "scroll-select-subject"
  }), /*#__PURE__*/_react["default"].createElement(_reactWheelpicker["default"], {
    className: "time-picker__wheel time-picker__wheel_right",
    data: Array.from(Array(60).keys()),
    parentHeight: 250,
    fontSize: 13,
    defaultSelection: 3,
    updateSelection: console.log,
    scrollerId: "scroll-select-subject"
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onRequestClose
  }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C")));
};

var _default = TimePicker;
exports["default"] = _default;