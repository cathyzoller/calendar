'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateTable = require('./date/DateTable');

var _DateTable2 = _interopRequireDefault(_DateTable);

var _MonthTable = require('./month/MonthTable');

var _MonthTable2 = _interopRequireDefault(_MonthTable);

var _CalendarMixin = require('./mixin/CalendarMixin');

var _CalendarMixin2 = _interopRequireDefault(_CalendarMixin);

var _CommonMixin = require('./mixin/CommonMixin');

var _CommonMixin2 = _interopRequireDefault(_CommonMixin);

var _CalendarHeader = require('./full-calendar/CalendarHeader');

var _CalendarHeader2 = _interopRequireDefault(_CalendarHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FullCalendar = _react2["default"].createClass({
  displayName: 'FullCalendar',

  propTypes: {
    defaultType: _react.PropTypes.string,
    type: _react.PropTypes.string,
    prefixCls: _react.PropTypes.string,
    locale: _react.PropTypes.object,
    onTypeChange: _react.PropTypes.func,
    fullscreen: _react.PropTypes.bool,
    monthCellRender: _react.PropTypes.func,
    dateCellRender: _react.PropTypes.func,
    showTypeSwitch: _react.PropTypes.bool,
    Select: _react.PropTypes.func.isRequired,
    headerComponents: _react.PropTypes.array,
    headerComponent: _react.PropTypes.object, // The whole header component
    headerRender: _react.PropTypes.func,
    showHeader: _react.PropTypes.bool
  },
  mixins: [_CommonMixin2["default"], _CalendarMixin2["default"]],
  getDefaultProps: function getDefaultProps() {
    return {
      defaultType: 'date',
      fullscreen: false,
      showTypeSwitch: true,
      showHeader: true,
      onTypeChange: function onTypeChange() {}
    };
  },
  getInitialState: function getInitialState() {
    var type = void 0;
    if ('type' in this.props) {
      type = this.props.type;
    } else {
      type = this.props.defaultType;
    }
    return {
      type: type
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('type' in nextProps) {
      this.setState({
        type: nextProps.type
      });
    }
  },
  onMonthSelect: function onMonthSelect(value) {
    this.onSelect(value, {
      target: 'month'
    });
  },
  setType: function setType(type) {
    if (!('type' in this.props)) {
      this.setState({
        type: type
      });
    }
    this.props.onTypeChange(type);
  },
  render: function render() {
    var props = this.props;
    var locale = props.locale;
    var prefixCls = props.prefixCls;
    var fullscreen = props.fullscreen;
    var showHeader = props.showHeader;
    var headerComponent = props.headerComponent;
    var headerRender = props.headerRender;
    var _state = this.state;
    var value = _state.value;
    var type = _state.type;


    var header = null;
    if (showHeader) {
      if (headerRender) {
        header = headerRender(value, type, locale);
      } else {
        var TheHeader = headerComponent || _CalendarHeader2["default"];
        header = _react2["default"].createElement(TheHeader, (0, _extends3["default"])({
          key: 'calendar-header'
        }, props, {
          prefixCls: prefixCls + '-full',
          type: type,
          value: value,
          onTypeChange: this.setType,
          onValueChange: this.setValue
        }));
      }
    }

    var table = type === 'date' ? _react2["default"].createElement(_DateTable2["default"], {
      dateRender: props.dateCellRender,
      contentRender: props.dateCellContentRender,
      locale: locale,
      prefixCls: prefixCls,
      onSelect: this.onSelect,
      value: value
    }) : _react2["default"].createElement(_MonthTable2["default"], {
      cellRender: props.monthCellRender,
      contentRender: props.monthCellContentRender,
      locale: locale,
      onSelect: this.onMonthSelect,
      prefixCls: prefixCls + '-month-panel',
      value: value
    });

    var children = [header, _react2["default"].createElement(
      'div',
      { key: 'calendar-body', className: prefixCls + '-calendar-body' },
      table
    )];

    var className = [prefixCls + '-full'];

    if (fullscreen) {
      className.push(prefixCls + '-fullscreen');
    }

    return this.renderRoot({
      children: children,
      className: className.join(' ')
    });
  }
});

exports["default"] = FullCalendar;
module.exports = exports['default'];