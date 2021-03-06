'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CalendarPart = require('./range-calendar/CalendarPart');

var _CalendarPart2 = _interopRequireDefault(_CalendarPart);

var _util = require('./util/');

var _TodayButton = require('./calendar/TodayButton');

var _TodayButton2 = _interopRequireDefault(_TodayButton);

var _OkButton = require('./calendar/OkButton');

var _OkButton2 = _interopRequireDefault(_OkButton);

var _TimePickerButton = require('./calendar/TimePickerButton');

var _TimePickerButton2 = _interopRequireDefault(_TimePickerButton);

var _SingleDayCheckbox = require('./calendar/SingleDayCheckbox');

var _SingleDayCheckbox2 = _interopRequireDefault(_SingleDayCheckbox);

var _CommonMixin = require('./mixin/CommonMixin');

var _CommonMixin2 = _interopRequireDefault(_CommonMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

function getNow() {
  return (0, _moment2.default)();
}

function onValueChange(direction, current) {
  var value = void 0;
  value = current;
  if (direction === 'right') {
    value.add(-1, 'months');
  }
  this.fireValueChange(value);
}

function normalizeAnchor(props, init) {
  var selectedValue = props.selectedValue || init && props.defaultSelectedValue || [];
  var value = props.value;
  if (Array.isArray(value)) {
    value = value[0];
  }
  var defaultValue = props.defaultValue;
  if (Array.isArray(defaultValue)) {
    defaultValue = defaultValue[0];
  }
  return value || init && defaultValue || selectedValue[0] || init && getNow();
}

function generateOptions(length) {
  var arr = [];
  for (var value = 0; value < length; value++) {
    arr.push(value);
  }
  return arr;
}

function onInputSelect(direction, value) {
  if (!value) {
    return;
  }
  var originalValue = this.state.selectedValue;
  var selectedValue = originalValue.concat();
  var index = direction === 'left' ? 0 : 1;
  selectedValue[index] = value;
  if (selectedValue[0] && selectedValue[1]) {
    if (this.compare(selectedValue[0], selectedValue[1]) > 0) {
      selectedValue[1 - index] = this.state.showTimePicker ? selectedValue[index] : undefined;
    }
  }
  if (this.state.showTimePicker && selectedValue[0] && !selectedValue[1]) {
    selectedValue[1] = selectedValue[0];
  }
  if (selectedValue[0] && this.state.singleDay) {
    selectedValue[1] = selectedValue[0];
  }

  this.fireSelectValueChange(selectedValue);
}

var RangeCalendar = _react2.default.createClass({
  displayName: 'RangeCalendar',

  propTypes: {
    prefixCls: _react.PropTypes.string,
    dateInputPlaceholder: _react.PropTypes.any,
    defaultValue: _react.PropTypes.any,
    timePicker: _react.PropTypes.any,
    value: _react.PropTypes.any,
    showOk: _react.PropTypes.bool,
    showSingleDay: _react.PropTypes.bool,
    singleDay: _react.PropTypes.bool,
    selectedValue: _react.PropTypes.array,
    defaultSelectedValue: _react.PropTypes.array,
    onOk: _react.PropTypes.func,
    showClear: _react.PropTypes.bool,
    locale: _react.PropTypes.object,
    onChange: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    onValueChange: _react.PropTypes.func,
    format: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),
    onClear: _react.PropTypes.func
  },

  mixins: [_CommonMixin2.default],

  getDefaultProps: function getDefaultProps() {
    return {
      defaultSelectedValue: [],
      onValueChange: noop,
      showSingleDay: true
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;
    var singleDay = props.singleDay || false;
    var selectedValue = props.selectedValue || props.defaultSelectedValue;
    var value = normalizeAnchor(props, 1);
    return {
      selectedValue: selectedValue,
      value: value,
      showTimePicker: false,
      singleDay: singleDay
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var newState = {};
    if ('value' in nextProps) {
      if (nextProps.value) {
        newState.value = nextProps.value;
      } else {
        newState.value = normalizeAnchor(nextProps, 0);
      }
      this.setState(newState);
    }
    if ('selectedValue' in nextProps) {
      newState.selectedValue = nextProps.selectedValue;
      this.setState(newState);
    }
  },
  onSelect: function onSelect(value) {
    var originalValue = this.state.selectedValue;
    var selectedValue = originalValue.concat();
    var changed = false;
    if (!selectedValue.length || selectedValue.length === 2 && !originalValue.hovering) {
      selectedValue.length = 1;
      selectedValue[0] = value;
      changed = true;
    } else if (this.compare(selectedValue[0], value) <= 0) {
      selectedValue[1] = value;
      changed = true;
    } else if (this.compare(selectedValue[0], value) > 0) {
      selectedValue.length = 1;
      selectedValue[0] = value;
      changed = true;
    }
    if (this.state.singleDay && selectedValue.length === 1) {
      selectedValue.length = 2;
      selectedValue[1] = selectedValue[0];
      changed = true;
    }
    if (changed) {
      this.fireSelectValueChange(selectedValue);
    }
  },
  onDayHover: function onDayHover(hoverValue) {
    var selectedValue = this.state.selectedValue;
    if (!selectedValue.length || selectedValue.length === 2 && !selectedValue.hovering) {
      return;
    }
    if (this.compare(hoverValue, selectedValue[0]) < 0) {
      return;
    }
    selectedValue = selectedValue.concat();
    selectedValue[1] = hoverValue;
    selectedValue.hovering = 1;
    this.fireSelectValueChange(selectedValue);
  },
  onToday: function onToday() {
    this.setState({
      value: (0, _util.getTodayTime)(this.state.value)
    });
  },
  onOpenTimePicker: function onOpenTimePicker() {
    this.setState({
      showTimePicker: true
    });
  },
  onCloseTimePicker: function onCloseTimePicker() {
    this.setState({
      showTimePicker: false
    });
  },
  onOk: function onOk() {
    this.props.onOk(this.state.selectedValue);
  },
  onSingleDayToggle: function onSingleDayToggle() {
    this.setState({
      singleDay: !this.state.singleDay
    });
  },
  getStartValue: function getStartValue() {
    var value = this.state.value;
    var selectedValue = this.state.selectedValue;
    // keep selectedTime when select date
    if (selectedValue[0] && this.props.timePicker) {
      value = value.clone();
      (0, _util.syncTime)(selectedValue[0], value);
    }
    return value;
  },
  getEndValue: function getEndValue() {
    var endValue = this.state.value.clone();
    endValue.add(1, 'months');
    var selectedValue = this.state.selectedValue;
    // keep selectedTime when select date
    if (selectedValue[1] && this.props.timePicker) {
      (0, _util.syncTime)(selectedValue[1], endValue);
    }
    if (this.state.showTimePicker) {
      return selectedValue[1] ? selectedValue[1] : this.getStartValue();
    }
    return endValue;
  },

  // get disabled hours for second picker
  getEndDisableTime: function getEndDisableTime() {
    var _state = this.state;
    var selectedValue = _state.selectedValue;
    var value = _state.value;

    var startValue = selectedValue && selectedValue[0] || value.clone();
    // if startTime and endTime is same day..
    // the second time picker will not able to pick time before first time picker
    if (!selectedValue[1] || startValue.isSame(selectedValue[1], 'day')) {
      var _ret = function () {
        var hours = startValue.hour();
        var minutes = startValue.minute();
        var second = startValue.second();
        var _disabledHours = generateOptions(hours);
        var _disabledMinutes = generateOptions(minutes);
        var _disabledSeconds = generateOptions(second);
        return {
          v: {
            disabledHours: function disabledHours() {
              return _disabledHours;
            },
            disabledMinutes: function disabledMinutes(hour) {
              if (hour === hours) {
                return _disabledMinutes;
              }
              return [];
            },
            disabledSeconds: function disabledSeconds(hour, minute) {
              if (hour === hours && minute === minutes) {
                return _disabledSeconds;
              }
              return [];
            }
          }
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    return null;
  },
  compare: function compare(v1, v2) {
    if (this.props.timePicker) {
      return v1.diff(v2);
    }
    return v1.diff(v2, 'days');
  },
  fireSelectValueChange: function fireSelectValueChange(selectedValue, direct) {
    if (!('selectedValue' in this.props)) {
      this.setState({
        selectedValue: selectedValue
      });
    }
    this.props.onChange(selectedValue);
    if (direct || selectedValue[0] && selectedValue[1] && !selectedValue.hovering) {
      this.props.onSelect(selectedValue);
    }
  },
  fireValueChange: function fireValueChange(value) {
    var props = this.props;
    if (!('value' in props)) {
      this.setState({
        value: value
      });
    }
    props.onValueChange(value);
  },
  clear: function clear() {
    this.fireSelectValueChange([], true);
    this.props.onClear();
  },
  render: function render() {
    var _className, _classnames;

    var props = this.props;
    var state = this.state;
    var showTimePicker = state.showTimePicker;
    var prefixCls = props.prefixCls;
    var dateInputPlaceholder = props.dateInputPlaceholder;
    var timePicker = props.timePicker;
    var showOk = props.showOk;
    var showSingleDay = props.showSingleDay;
    var locale = props.locale;
    var showClear = props.showClear;

    var className = (_className = {}, _defineProperty(_className, props.className, !!props.className), _defineProperty(_className, prefixCls, 1), _defineProperty(_className, prefixCls + '-hidden', !props.visible), _defineProperty(_className, prefixCls + '-range', 1), _defineProperty(_className, prefixCls + '-week-number', props.showWeekNumber), _className);
    var classes = (0, _classnames3.default)(className);
    var newProps = {
      selectedValue: state.selectedValue,
      onSelect: this.onSelect,
      onDayHover: this.onDayHover
    };

    var placeholder1 = void 0;
    var placeholder2 = void 0;

    if (dateInputPlaceholder) {
      if (Array.isArray(dateInputPlaceholder)) {
        var _dateInputPlaceholder = _slicedToArray(dateInputPlaceholder, 2);

        placeholder1 = _dateInputPlaceholder[0];
        placeholder2 = _dateInputPlaceholder[1];
      } else {
        placeholder1 = placeholder2 = dateInputPlaceholder;
      }
    }
    var showOkButton = showOk === true || showOk !== false && !!timePicker;
    var cls = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, prefixCls + '-footer', true), _defineProperty(_classnames, prefixCls + '-range-bottom', true), _defineProperty(_classnames, prefixCls + '-footer-show-ok', showOkButton), _classnames));

    var startValue = this.getStartValue();
    var endValue = this.getEndValue();
    var thisMonth = (0, _util.getTodayTime)(startValue).month();
    var isTodayInView = thisMonth === startValue.month() || thisMonth === endValue.month();

    return _react2.default.createElement(
      'div',
      {
        ref: 'root',
        className: classes,
        style: props.style,
        tabIndex: '0'
      },
      showClear ? _react2.default.createElement('a', {
        className: prefixCls + '-clear-btn',
        role: 'button',
        title: locale.clear,
        onClick: this.clear
      }) : null,
      _react2.default.createElement(
        'div',
        { className: prefixCls + '-date-panel' },
        _react2.default.createElement(_CalendarPart2.default, _extends({}, props, newProps, {
          direction: 'left',
          format: this.getFormat(),
          value: startValue,
          placeholder: placeholder1,
          onInputSelect: onInputSelect.bind(this, 'left'),
          onValueChange: onValueChange.bind(this, 'left'),
          timePicker: timePicker,
          showTimePicker: showTimePicker
        })),
        _react2.default.createElement(
          'span',
          { className: prefixCls + '-range-middle' },
          '~'
        ),
        _react2.default.createElement(_CalendarPart2.default, _extends({}, props, newProps, {
          direction: 'right',
          format: this.getFormat(),
          timePickerDisabledTime: this.getEndDisableTime(),
          placeholder: placeholder2,
          value: endValue,
          onInputSelect: onInputSelect.bind(this, 'right'),
          onValueChange: onValueChange.bind(this, 'right'),
          timePicker: timePicker,
          showTimePicker: showTimePicker
        }))
      ),
      _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-footer-btn' },
          _react2.default.createElement(_TodayButton2.default, _extends({}, props, {
            disabled: isTodayInView,
            value: state.value,
            onToday: this.onToday,
            text: locale.backToToday
          })),
          !!showSingleDay ? _react2.default.createElement(_SingleDayCheckbox2.default, _extends({}, props, {
            prefixCls: prefixCls,
            singleDay: this.state.singleDay,
            onSingleDayToggle: this.onSingleDayToggle
          })) : null,
          !!props.timePicker ? _react2.default.createElement(_TimePickerButton2.default, _extends({}, props, {
            showTimePicker: showTimePicker,
            onOpenTimePicker: this.onOpenTimePicker,
            onCloseTimePicker: this.onCloseTimePicker,
            timePickerDisabled: state.selectedValue.length === 1 || state.selectedValue.hovering
          })) : null,
          showOkButton ? _react2.default.createElement(_OkButton2.default, _extends({}, props, {
            value: state.value,
            onOk: this.onOk,
            okDisabled: state.selectedValue.length !== 2 || state.selectedValue.hovering
          })) : null
        )
      )
    );
  }
});

exports["default"] = RangeCalendar;
module.exports = exports['default'];
