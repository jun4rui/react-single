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

var props = [
	{
		style: {
			width:              '100%',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'center center',
			height:             '380px',
			backgroundImage:    'url(bg_01.jpg)'

		}
	},
	{
		style: {
			width:              '100%',
			height:             '347px',
			backgroundImage:    'url(bg_02.jpg)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'center center'

		}
	},
	{
		style: {
			width:              '100%',
			height:             '348px',
			backgroundImage:    'url(bg_03.jpg)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'center center'

		}
	},
	{
		style: {
			width:              '100%',
			height:             '348px',
			backgroundImage:    'url(bg_04.jpg)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'center center'

		}
	},
	{
		style: {
			width:              '100%',
			height:             '348px',
			backgroundImage:    'url(bg_05.jpg)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'center center'

		}
	},
	{
		style: {
			width:              '100%',
			height:             '348px',
			backgroundImage:    'url(bg_06.jpg)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'center center'

		}
	},
	{
		style: {
			width:              '100%',
			height:             '348px',
			backgroundImage:    'url(bg_07.jpg)',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'center center'

		}
	}
];



$(document).ready(function () {
	$.getJSON('http://www.htyou.com' + '/mobile/ipad_queryTourLine.action?jsoncallback=?&KeyWords=%E6%95%B0%E4%BA%BA%E5%AE%9A%E5%88%B6', function (result) {
		var tourList = [];
		result.value.map(function (unit) {
			tourList.push({
				href:  'http://www.htyou.com/tour/tourbrowse/' + unit.lineid + '.htm',
				text:  unit.tourproname,
				price: unit.leastprice,
				src:   'http://www.htyou.com/' + unit.spotviewpic
			});
			console.log(tourList);
		});
		props[1].list = tourList;//往第二个IUList中注入行程列表参数
		var OutHTML   = React.createClass({
			getInitialState: function(){
				return{
					test: 1
				}
			},
			clickHandle:     function () {
				//console.log(this.props.test);
				console.log('Click.');
				this.setState({
					test: this.state.test+1
				});
			},
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