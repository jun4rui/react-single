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
var FHPList       = React.createClass({
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
			target:    '_top',
			className: 'info-unit'
		}
	},
	render:          function () {
		return (
			<div className={this.props.className}>
				<div className="image" style={{backgroundImage: 'url(' + 'http://www.htyou.com/' + this.props.spotviewpic + ')'}}></div>
				<div className="text">{this.props.tourproname}</div>
				<div className="price">
					&yen;<span className="cprice">{this.props.leastprice}</span>起
				</div>
				<a href={'http://www.htyou.com/weixin_h5/tour-detail.html?lineid=' + this.props.lineid} target={this.props.target}>
					<div className="buyBtn">查看详情</div>
				</a>
			</div>
		);
	}
});

//大图+内容单元组件
var IUList = React.createClass({
	// 初始化state
	getInitialState:   function () {
		return {
			list: []
		};
	},
	//初始化props
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
	//获取list
	componentDidMount: function () {
		//url赋值了才调用ajax读取
		if (this.props.url != '') {
			$.getJSON(this.props.url, function (result) {
				this.setState({
					list: result.value
				});
			}.bind(this));
		}
	},
	//渲染组件
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

var props = [
	{
		style: {
			width:              '600px',
			height:             '421px',
			backgroundImage:    'url(shuren_mobile_1.png)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'top center',
			margin:             '0 auto'
		}
	},
	{
		style: {
			width:              '600px',
			height:             'auto',
			backgroundImage:    'url(shuren_mobile_2.png)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'top center',
			paddingBottom:      '20px',
			backgroundColor:    '#a4fefe',
			margin:             '0 auto'
		},
		url:   'http://www.htyou.com' + '/mobile/ipad_queryTourLine.action?jsoncallback=?&KeyWords=%E6%95%B0%E4%BA%BA%E5%AE%9A%E5%88%B6'
	},
	{
		style: {
			width:              '600px',
			height:             'auto',
			backgroundImage:    'url(shuren_mobile_3.png)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'top center',
			paddingBottom:      '20px',
			backgroundColor:    '#fff8ce',
			margin:             '0 auto'
		},
		url:   'http://www.htyou.com' + '/mobile/ipad_queryTourLine.action?jsoncallback=?&KeyWords=13518'
	}
];

$(document).ready(function () {
	$.getJSON('http://www.htyou.com' + '/mobile/ipad_queryTourLine.action?jsoncallback=?&KeyWords=%E6%95%B0%E4%BA%BA%E5%AE%9A%E5%88%B6', function (result) {
		var tourList = [];
		result.value.map(function (unit) {
			tourList.push({
				href:  'http://www.htyou.com/weixin_h5/tour-detail.html?lineid=' + unit.lineid,
				text:  unit.tourproname,
				price: unit.leastprice,
				src:   'http://www.htyou.com/' + unit.spotviewpic
			});
			console.log(tourList);
		});
		props[1].list = tourList;//往第二个IUList中注入行程列表参数
		var OutHTML   = React.createClass({
			render: function () {
				var _tempList = props.map(function (unit, index) {
					return (
						<IUList {...unit} key={index}/>
					);
				});
				return (
					<div>
						{_tempList}
					</div>
				);
			}
		});

		ReactDOM.render(<OutHTML/>, document.getElementById('top-section'));
	});

});