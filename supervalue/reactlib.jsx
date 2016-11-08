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
			className:  'IU-List',
			titleImage: '',
			style:      {
				width:              'auto',
				height:             'auto',
				backgroundImage:    'none',
				backgroundRepeat:   'no-repeat',
				backgroundPosition: 'top center',
				backgroundColor:    'auto'
			},
			url:        ''
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
		//返回线路列表
		var _tempList = this.state.list.map(function (unit, index) {
			return (
				<InfoUnit {...unit} key={index}/>
			);
		});
		return (
			<div className={this.props.className} style={this.props.style}>
				<div className="info-unit-section">
					<img src={this.props.titleImage} alt="" style={{display: this.props.titleImage == '' ? 'none' : ''}}/>
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
			height:             '371px',
			backgroundImage:    'url(mobile0.jpg)'

		}
	},
	{
		style: {
			width:              '640px',
			height:             'auto',
			/*backgroundImage:    'url(mobile1.jpg)',*/
			backgroundRepeat:   'no-repeat',
			backgroundPosition: '50% 20px',
			backgroundColor:    '#FFFFFF',
			paddingTop:         '0px'
		},
		url:   ''

	}
];
var desktopProps = [
	{
		style: {
			width:              '100%',
			backgroundRepeat:   'no-repeat',
			backgroundPosition: 'center center',
			height:             '445px',
			backgroundImage:    'url(desktop0.jpg)'

		}
	},
	{
		style:      {
			width:           '100%',
			height:          'auto',
			backgroundColor: '#FFFFFF'
		},
		url:        ''
	}
];

$(document).ready(function () {
	//首先获取产品的查询串
	$.getJSON('http://www.htyou.com/common/websinfo_queryHTClass.action?datatype=json&jsoncallback=?&classId=690', function (result) {
		console.log(result, '更新', result[0].gotolink);
		//修改桌面版的数据url获取地址
		var _modeStartStr = '/tour/type/month/keyword';	//模式开始字符串
		var _modeEndStr   = '.htm';	//模式结束字符串
		var _startPos     = 0;
		var _endPos       = 0;

		//设定获取的ID
		if (result[0].gotolink.indexOf(_modeStartStr)>-1) {
			_startPos = result[0].gotolink.indexOf(_modeStartStr) + _modeStartStr.length;
			_endPos   = result[0].gotolink.indexOf(_modeEndStr) + _modeEndStr.length;
		}
		desktopProps[1].url = 'http://www.htyou.com/mobile/ipad_queryTourLine.action?jsoncallback=?&KeyWords=' + encodeURI(result[0].gotolink.substring(_startPos, _endPos));
		mobileProps[1].url = 'http://www.htyou.com/mobile/ipad_queryTourLine.action?jsoncallback=?&KeyWords=' + encodeURI(result[0].gotolink.substring(_startPos, _endPos));
		//设定图片
		desktopProps[0].style.backgroundImage = 'url(http://www.htyou.com/pic/class/'+result[0].pic+')';
		mobileProps[0].style.backgroundImage = 'url(http://www.htyou.com/pic/class/'+result[0].pic2+')';
		//desktopProps[1].style.backgroundImage = 'url(http://www.htyou.com/pic/class/'+result[0].pic+')';
	}).done(function () {
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
});