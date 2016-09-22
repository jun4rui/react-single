require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');


var React    = require('react');
var ReactDOM = require('react-dom');
var $        = require('jquery');

//浮动热区组件
var FloatHotPoint = React.createClass({
	getDefaultProps: function () {
		return {
			'className': 'float-hotpoint',

			'href':   'javascript:(void)',
			'target': '_blank',

			'style': {
				'position': 'relative',
				'left':     '0',
				'top':      '0',
				'width':    'auto',
				'height':   'auto',
				'z-index':  'auto'
			},

			'src': ''
		};
	},
	render:          function () {
		return (
			<a href={this.props.href} target={this.props.target}>
				<div className={this.props.className} style={this.props.style}>
					<img src={this.props.src} alt="" style={{
						'width':   this.props.style.width,
						'height':  this.props.style.height,
						'display': this.props.src == '' ? 'none' : 'display'
					}}/>
				</div>
			</a>
		);
	}
});

//大图+浮动热区列表组件
var FHPList = React.createClass({
	getDefaultProps: function () {
		return {
			'className': 'FHP-list',
			'width':     'auto',
			'height':    'auto',
			'style':     {
				'backgroundImage':    '',
				'backgroundRepeat':   'no-repeat',
				'backgroundPosition': 'top center',
				'backgroundColor':    'auto'
			}
		};
	},
	render:          function () {
		var _tempList = this.props.list.map(function (unit) {
			return (
				<FloatHotPoint {...unit}/>
			);
		});
		return (
			<div className={this.props.className} style={this.props.style}>
				{_tempList}
			</div>
		);
	}
});

//内容单元组件
var InfoUnit = React.createClass({
	getDefaultProps: function () {
		return {
			href:      'javascript:(void)',
			target:    '_blank',
			className: 'info-unit'
		}
	},
	render:          function () {
		//判断是移动版还是桌面版，然后根据不同的版本生成不同的跳转链接
		var linkUrl = '';
		if (window.location.href.indexOf('desktop.html') > -1) {
			linkUrl = 'http://www.htyou.com/tour/tourbrowse/' + this.props.lineid + '.htm';
		} else {
			linkUrl = 'http://www.htyou.com/weixin_h5/tour-detail.html?lineid=' + this.props.lineid;
		}
		return (
			<div className={this.props.className}>
				<div className="image" style={{backgroundImage: 'url(' + 'http://www.htyou.com/' + this.props.spotviewpic + ')'}}></div>
				<div className="text">{this.props.tourproname}</div>
				<div className="price">
					&yen;<span className="cprice">{this.props.leastprice}</span>起
				</div>
				<a href={linkUrl} target={this.props.target}>
					<div className="buyBtn">查看详情</div>
				</a>
			</div>
		);
	}
});

//大图+内容单元组件
var IUList = React.createClass({
	getInitialState:   function () {
		return ({
			list: []
		});
	},
	getDefaultProps:   function () {
		return {
			className: 'IU-List',
			style:     {
				width:              'auto',
				height:             'auto',
				backgroundImage:    '',
				backgroundRepeat:   'no-repeat',
				backgroundPosition: 'top center',
				backgroundColor:    'auto'
			},
			url:       ''
		};
	},
	componentDidMount: function () {
		//设定了url才用ajax载入数据
		if (this.props.url != '') {
			$.getJSON(this.props.url, function (result) {
				this.setState({
					list: result.value
				});
			}.bind(this));
		}
	},
	render:            function () {
		var _tempList = this.state.list.map(function (unit, index) {
			return (
				<InfoUnit {...unit} key={index}/>
			);
		});
		return (
			<div className={this.props.className} style={this.props.style}>
				<div className="info-unit-section">
					{_tempList}
					<div style={{clear: 'both'}}></div>
				</div>
			</div>
		);
	}
});

//浮动按钮
var FloatButton = React.createClass({
	getDefaultProps: function () {
		return {
			className: 'float-button',	//class名称
			text:      'Button'			//按钮文字
		}
	},
	render:          function () {
		return (
			<div className={this.props.className} data-code={this.props.code} style={this.props.style}>
				{this.props.name}
			</div>
		);
	}
});

var mobileProps  = [
	{
		style: {
			width:              '640px',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'center center',
			height:             '380px',
			backgroundImage:    'url(mobile_01.jpg)'

		}
	},
	{
		style: {
			width:              '640px',
			height:             'auto',
			backgroundImage:    'url(mobile_02.jpg)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'top center',
			backgroundColor:    '#09b9f2'
		},
		url:   'http://www.htyou.com/mobile/ipad_queryTourLine.action?jsoncallback=?&isnative=3_4&tourstartdate=2016-09-25&tourenddate=2016-10-07'

	},
	{
		style: {
			width:              '640px',
			height:             'auto',
			backgroundImage:    'url(mobile_03.jpg)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'top center',
			backgroundColor:    '#e2ee42'
		},
		url:   'http://www.htyou.com/mobile/ipad_queryTourLine.action?jsoncallback=?&isnative=1_2&tourstartdate=2016-09-25&tourenddate=2016-10-07'
	}
];
var desktopProps = [
	{
		style: {
			width:              '100%',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'center center',
			height:             '690px',
			backgroundImage:    'url(desktop_01.jpg)'

		}
	},
	{
		style: {
			width:              '100%',
			height:             'auto',
			backgroundImage:    'url(desktop_02.jpg)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'top center',
			backgroundColor:    '#09b9f2'
		},
		url:   'http://www.htyou.com/mobile/ipad_queryTourLine.action?jsoncallback=?&isnative=3_4&tourstartdate=2016-09-25&tourenddate=2016-10-07'

	},
	{
		style: {
			width:              '100%',
			height:             'auto',
			backgroundImage:    'url(desktop_03.jpg)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'top center',
			backgroundColor:    '#e2ee42'
		},
		url:   'http://www.htyou.com/mobile/ipad_queryTourLine.action?jsoncallback=?&isnative=1_2&tourstartdate=2016-09-25&tourenddate=2016-10-07'
	}
];


$(document).ready(function () {
	var OutHTML = React.createClass({
		render: function () {
			var props = [];
			//根据url决定采用mobile数据还是desktop数据
			if (window.location.href.indexOf('desktop.html') > -1) {
				props = desktopProps;
			} else {
				props = mobileProps;
			}
			//渲染每个每个子节点
			var _tempList = props.map(function (unit, index) {
				return (
					<IUList {...unit} key={index}/>
				);
			});
			//输出
			return (
				<div>
					{_tempList}
				</div>
			);
		}
	});
	//渲染到top-section顶级元素
	ReactDOM.render(<OutHTML/>, document.getElementById('top-section'));
});