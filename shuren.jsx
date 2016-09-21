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
			target:    '_blank',
			className: 'info-unit'
		}
	},
	render:          function () {
		return (
			<div className={this.props.className}>
				<div className="image" style={{backgroundImage: 'url(' + this.props.src + ')'}}></div>
				<div className="text">{this.props.text}</div>
				<div className="price">
					&yen;<span className="cprice">{this.props.price}</span>起
				</div>
				<a href={this.props.href} target={this.props.target}>
					<div className="buyBtn">查看详情</div>
				</a>
			</div>
		);
	}
});

//大图+内容单元组件
var IUList = React.createClass({
	getDefaultProps: function () {
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
			list:      []
		};
	},
	render:          function () {
		var _tempList = this.props.list.map(function (unit, index) {
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
			width: '100%',
			backgroundRepeat:'no-repeat',
			backgroundPosition:'center center',
			height:     '688px',
			backgroundImage: 'url(shuren_01.jpg)'
		}
	},
	{
		style: {
			width: '100%',
			height: 'auto',
			backgroundImage: 'url(shuren_02.jpg)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'top center',
			backgroundColor: '#a4fefe'
		}
	},
	{
		style: {
			width:      '100%',
			height:     'auto',
			backgroundImage: 'url(shuren_03.jpg)',
			backgroundRepeat:'no-repeat',
			backgroundPosition:'top center',
			backgroundColor: '#fff8ce'
		}
	}
];

$(document).ready(function () {
	var tourList = [];
	var tourList1 = [];

	$.getJSON('http://www.htyou.com' + '/mobile/ipad_queryTourLine.action?jsoncallback=?&KeyWords=%E6%95%B0%E4%BA%BA%E5%AE%9A%E5%88%B6', function (result) {
		result.value.map(function (unit) {
			tourList.push({
				href:  'http://www.htyou.com/tour/tourbrowse/' + unit.lineid + '.htm',
				text:  unit.tourproname,
				price: unit.leastprice,
				src:   'http://www.htyou.com/' + unit.spotviewpic
			});
		});
		/*console.log(tourList);*/
	}).done(function(){
		$.getJSON('http://www.htyou.com' + '/mobile/ipad_queryTourLine.action?jsoncallback=?&KeyWords=%E6%85%A2%E4%BA%AB%E5%AE%9A%E5%88%B6', function (result) {
			result.value.map(function (unit) {
				tourList1.push({
					href:  'http://www.htyou.com/tour/tourbrowse/' + unit.lineid + '.htm',
					text:  unit.tourproname,
					price: unit.leastprice,
					src:   'http://www.htyou.com/' + unit.spotviewpic
				});
			});
			/*console.log(tourList1);*/
			props[1].list = tourList;//往第2个IUList中注入行程列表参数
			props[2].list = tourList1;//往第3个IUList中注入行程列表参数
			var OutHTML   = React.createClass({
				render: function () {
					console.log(props);
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
});