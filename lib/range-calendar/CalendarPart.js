'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CalendarHeader = require('../calendar/CalendarHeader');

var _CalendarHeader2 = _interopRequireDefault(_CalendarHeader);

var _DateTable = require('../date/DateTable');

var _DateTable2 = _interopRequireDefault(_DateTable);

var _DateInput = require('../date/DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _index = require('../util/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function noop() {}

var CalendarPart = _react2["default"].createClass({
  displayName: 'CalendarPart',

  propTypes: {
    value: _react.PropTypes.any,
    direction: _react.PropTypes.any,
    prefixCls: _react.PropTypes.any,
    locale: _react.PropTypes.any,
    selectedValue: _react.PropTypes.any,
    showTimePicker: _react.PropTypes.bool,
    format: _react.PropTypes.any,
    placeholder: _react.PropTypes.any,
    disabledDate: _react.PropTypes.any,
    timePicker: _react.PropTypes.any,
    disabledTime: _react.PropTypes.any,
    timePickerDisabledTime: _react.PropTypes.object
  },
  render: function render() {
    var props = this.props;
    var value = props.value;
    var direction = props.direction;
    var prefixCls = props.prefixCls;
    var locale = props.locale;
    var selectedValue = props.selectedValue;
    var format = props.format;
    var placeholder = props.placeholder;
    var disabledDate = props.disabledDate;
    var timePicker = props.timePicker;
    var disabledTime = props.disabledTime;
    var timePickerDisabledTime = props.timePickerDisabledTime;
    var showTimePicker = props.showTimePicker;

    var disabledTimeConfig = disabledTime && timePicker ? (0, _index.getTimeConfig)(selectedValue, disabledTime) : null;
    var rangeClassName = prefixCls + '-range';
    var newProps = {
      locale: locale,
      value: value,
      prefixCls: prefixCls,
      showTimePicker: showTimePicker
    };
    var index = direction === 'left' ? 0 : 1;

    var timePickerEle = timePicker && _react2["default"].cloneElement(timePicker, (0, _extends3["default"])({
      showHour: true,
      showSecond: true,
      onChange: props.onInputSelect,
      defaultOpenValue: value,
      value: selectedValue[index],
      disabledHours: noop,
      disabledMinutes: noop,
      disabledSeconds: noop
    }, disabledTimeConfig, timePickerDisabledTime));

    return _react2["default"].createElement(
      'div',
      { className: rangeClassName + '-part ' + rangeClassName + '-' + direction },
      _react2["default"].createElement(_DateInput2["default"], {
        format: format,
        locale: locale,
        prefixCls: prefixCls,
        timePicker: timePicker,
        disabledDate: disabledDate,
        placeholder: placeholder,
        disabledTime: disabledTime,
        value: value,
        showClear: false,
        selectedValue: selectedValue[index],
        onChange: props.onInputSelect
      }),
      _react2["default"].createElement(
        'div',
        { style: { outline: 'none' } },
        _react2["default"].createElement(_CalendarHeader2["default"], (0, _extends3["default"])({}, newProps, {
          enableNext: direction === 'right',
          enablePrev: direction === 'left',
          onValueChange: props.onValueChange
        })),
        showTimePicker ? _react2["default"].createElement(
          'div',
          { className: prefixCls + '-time-picker' },
          _react2["default"].createElement(
            'div',
            { className: prefixCls + '-time-picker-panel' },
            timePickerEle
          )
        ) : null,
        _react2["default"].createElement(
          'div',
          { className: prefixCls + '-body' },
          _react2["default"].createElement(_DateTable2["default"], (0, _extends3["default"])({}, newProps, {
            selectedValue: selectedValue,
            dateRender: props.dateRender,
            onSelect: props.onSelect,
            onDayHover: props.onDayHover,
            disabledDate: disabledDate,
            showWeekNumber: props.showWeekNumber
          }))
        )
      )
    );
  }
});

exports["default"] = CalendarPart;
module.exports = exports['default'];