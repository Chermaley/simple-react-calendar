"use strict";

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _calendar = _interopRequireDefault(require("../calendar"));

var _month = _interopRequireDefault(require("../month"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Calendar', function () {
  var instance, props, wrapper;
  var date = new Date(2015, 6, 1);
  describe('#componentWillReceiveProps', function () {
    describe('when nextProps `activeMonth` is defined', function () {
      describe('when nextProps `activeMonth` and prop `activeMonth` is different', function () {
        it('sets state `activeMonth`', function () {
          props = {
            activeMonth: date
          };
          wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], null));
          wrapper.setProps({
            activeMonth: new Date(2015, 9, 1)
          });
          expect(wrapper.state('activeMonth')).toEqual(new Date(2015, 9, 1));
        });
      });
    });
    describe('when nextProps `activeMonth` is `undefined`', function () {
      it("doesn't set state", function () {
        props = {
          activeMonth: date
        };
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], null));
        wrapper.setProps({
          disableDaysOfWeek: false
        });
        expect(wrapper.state('activeMonth')).not.toEqual(new Date(2015, 9, 1));
      });
    });
  });
  describe('#_initialMonth', function () {
    describe('when prop `activeMonth` is valid date', function () {
      it('returns `activeMonth`', function () {
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], {
          activeMonth: date
        }));
        expect(wrapper.instance()._initialMonth()).toEqual(date);
      });
    });
    describe('when prop `activeMonth` is invalid date', function () {
      it('returns `activeMonth`', function () {
        props = {
          activeMonth: '2017-01-01',
          selected: 'abc',
          today: date
        };
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));
        expect(wrapper.instance()._initialMonth()).toEqual(props.today);
      });
    });
  });
  describe('#_switchMonth', function () {
    describe('when prop `onMonthChange` is defined', function () {
      it('calls prop #onMonthChange', function () {
        props = {
          activeMonth: date,
          onMonthChange: jest.fn()
        };
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));

        wrapper.instance()._switchMonth('2017-01-01');

        expect(props.onMonthChange).toHaveBeenCalledTimes(1);
        expect(props.onMonthChange).toHaveBeenCalledWith('2017-01-01');
      });
    });
    describe('when prop `onMonthChange` is `undefined`', function () {
      it('sets `activeMonth` state', function () {
        props = {
          activeMonth: date
        };
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));

        wrapper.instance()._switchMonth('2017-01-01');

        expect(wrapper.state('activeMonth')).toBe('2017-01-01');
      });
    });
  });
  describe('#_activeMonth', function () {
    describe('when prop `onMonthChange` is defined', function () {
      it('returns prop `activeMonth`', function () {
        props = {
          activeMonth: date,
          onMonthChange: jest.fn()
        };
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));
        expect(wrapper.instance()._activeMonth()).toBe(props.activeMonth);
      });
    });
    describe('when prop `onMonthChange` is `undefined`', function () {
      it('returns state `activeMonth`', function () {
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], {
          activeMonth: date
        }));
        wrapper.setState({
          activeMonth: '2015-01-01'
        });
        expect(wrapper.instance()._activeMonth()).toBe('2015-01-01');
      });
    });
  });
  describe('#_highlight', function () {
    describe('when prop `highlighted` is `undefined`', function () {
      it('returns object', function () {
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], null));
        expect(wrapper.instance()._highlight()).toEqual({
          end: null,
          start: null
        });
      });
    });
    describe('when prop `highlighted` is defined', function () {
      it('returns object', function () {
        props = {
          highlighted: {
            end: new Date(2015, 7, 1),
            start: date
          }
        };
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));
        expect(wrapper.instance()._highlight()).toEqual(props.highlighted);
      });
      describe('when prop `highlighted.start` is invalid date', function () {
        it('returns object', function () {
          props = {
            highlighted: {
              end: new Date(2015, 7, 1),
              start: 'abc'
            }
          };
          wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));
          expect(wrapper.instance()._highlight()).toEqual({
            end: null,
            start: null
          });
        });
      });
      describe('when prop `highlighted.end` is invalid date', function () {
        it('returns object', function () {
          props = {
            highlighted: {
              end: 'abc',
              start: date
            }
          };
          wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));
          expect(wrapper.instance()._highlight()).toEqual({
            end: null,
            start: null
          });
        });
      });
    });
  });
  describe('#_selection', function () {
    var instance;
    beforeEach(function () {
      wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], null));
      instance = wrapper.instance();
    });
    describe('when #_selectionStart and #_selectionEnd returns valid date', function () {
      it('returns object', function () {
        var start = date;
        var end = new Date(2015, 7, 1);

        instance._selectionStart = function () {
          return start;
        };

        instance._selectionEnd = function () {
          return end;
        };

        expect(instance._selection()).toEqual({
          end: end,
          start: start
        });
      });
    });
    describe('when #_selectionStart and #_selectionEnd returns invalid date', function () {
      it('returns object', function () {
        instance._selectionStart = function () {
          return date;
        };

        instance._selectionEnd = function () {
          return 'abc';
        };

        expect(instance._selection()).toEqual({
          end: null,
          start: null
        });
      });
    });
  });
  describe('#_selectionDate', function () {
    describe("when prop `mode` is 'single'", function () {
      it('returns prop `selected', function () {
        props = {
          selected: date
        };
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));
        expect(wrapper.instance()._selectionDate('end')).toBe(props.selected);
      });
    });
    describe("when prop `mode` is 'range'", function () {
      var selected = {
        end: new Date(2015, 7, 1),
        start: date
      };
      var selection = {
        end: new Date(2017, 7, 1),
        start: new Date(2017, 6, 1)
      };
      describe('when prop `onSelectionProgress` is `undefined`', function () {
        beforeEach(function () {
          props = {
            mode: 'range',
            selected: selected
          };
          wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));
          instance = wrapper.instance();
        });
        describe('when state `selection` is `defined`', function () {
          it('returns state `selection.start`', function () {
            wrapper.setState({
              selection: selection
            });
            expect(instance._selectionDate('start')).toBe(selection.start);
          });
        });
        it('returns prop `selected.start`', function () {
          expect(instance._selectionDate('start')).toBe(props.selected.start);
        });
      });
      describe('when prop `onSelectionProgress` is defined', function () {
        it('returns prop `selected.start`', function () {
          props = {
            mode: 'range',
            onSelectionProgress: function onSelectionProgress() {},
            selected: selected
          };
          wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));
          wrapper.setState({
            selection: selection
          });
          expect(wrapper.instance()._selectionDate('start')).toBe(props.selected.start);
        });
      });
    });
  });
  describe('#_selectionChanged', function () {
    var selection = {
      end: new Date(2015, 7, 1),
      start: date
    };
    describe("when prop `mode` is 'single'", function () {
      describe('when prop `onSelect` is defined', function () {
        describe('when selection `start` is defined', function () {
          it('calls prop #onSelect', function () {
            props = {
              onSelect: jest.fn()
            };
            wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));

            wrapper.instance()._selectionChanged(selection);

            expect(props.onSelect).toHaveBeenCalledTimes(1);
            expect(props.onSelect).toHaveBeenCalledWith(selection.start);
          });
        });
      });
    });
    describe("when prop `mode` is 'range'", function () {
      describe('when prop `onSelect` is defined', function () {
        it('calls prop #onSelect', function () {
          props = {
            mode: 'range',
            onSelect: jest.fn()
          };
          wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));

          wrapper.instance()._selectionChanged(selection);

          expect(props.onSelect).toHaveBeenCalledTimes(1);
          expect(props.onSelect).toHaveBeenCalledWith(selection);
        });
      });
      describe('when prop `onSelectionProgress` is defined', function () {
        it('calls prop #onSelectionProgress', function () {
          props = {
            mode: 'range',
            onSelectionProgress: jest.fn()
          };
          wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));

          wrapper.instance()._selectionChanged(Object.assign(selection, {
            inProgress: true
          }));

          expect(props.onSelectionProgress).toHaveBeenCalledTimes(1);
          expect(props.onSelectionProgress).toHaveBeenCalledWith(Object.assign(selection, {
            inProgress: true
          }));
        });
      });
      describe('when prop `onSelectionProgress` is `undefined`', function () {
        beforeEach(function () {
          props = {
            mode: 'range'
          };
          wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], props));
          instance = wrapper.instance();
        });
        describe('when selection `inProgress` is `true`', function () {
          it('sets state `selection`', function () {
            instance._selectionChanged(Object.assign(selection, {
              inProgress: true
            }));

            expect(wrapper.state('selection')).toEqual({
              end: new Date(2015, 7, 1),
              start: date
            });
          });
        });
        describe('when selection `inProgress` is `false`', function () {
          it('sets state `selection`', function () {
            instance._selectionChanged(Object.assign(selection, {
              inProgress: false
            }));

            expect(wrapper.state('selection')).toBe(null);
          });
        });
      });
    });
  });
  describe('#_noticeChanged', function () {
    it('sets state', function () {
      wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], null));
      expect(wrapper.state('shownNoticeType')).toBe(null);

      wrapper.instance()._noticeChanged('disabled_day_click');

      expect(wrapper.state('shownNoticeType')).toBe('disabled_day_click');
    });
  });
  describe('#_today', function () {
    describe('when prop `today` is defined', function () {
      it('returns date', function () {
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], {
          today: date
        }));
        expect(wrapper.instance()._today()).toBe(date);
      });
    });
    describe('when prop `today` is `undefined`', function () {
      it('returns date', function () {
        wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_calendar["default"], null));
        expect(wrapper.instance()._today()).toEqual(new Date(2000, 0, 1));
      });
    });
  });
  describe('#render', function () {
    it('renders <Calendar />', function () {
      var tree = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_calendar["default"], {
        activeMonth: date,
        onMonthChange: function onMonthChange() {}
      })).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
  it('uses normalized minDate with a start at 00:00', function () {
    var dirtyMinDate = '2020-09-03T11:26:49.526Z';

    var _ReactTestRenderer$cr = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_calendar["default"], {
      minDate: dirtyMinDate,
      activeMonth: date,
      onMonthChange: function onMonthChange() {}
    })),
        root = _ReactTestRenderer$cr.root;

    var startOfMinDate = new Date(2020, 8, 3); // start of the day in local time - 00:00

    expect(root.findByType(_month["default"]).props.minDate).toEqual(startOfMinDate);
  });
});