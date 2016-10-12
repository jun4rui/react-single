require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');


var React    = require('react');
var ReactDOM = require('react-dom');
var $        = require('jquery');

var SERVER_ADDR = 'http://www.htyou.com';

//展示用的单个线路
var TourUnit = React.createClass({
	getDefaultProps: function () {
		return {
			image: '',	//展示图片
			link:  '',	//跳转链接（这里不用ID，因为可能会是一个产品的分类结果页面）
			name:  '',	//名称
			price: ''	//价格
		}
	},
	render:          function () {
		return (
			<a href={this.props.link} target="_blank">
				<div className='tour-unit'>
					<div className="image" style={{backgroundImage: this.props.image}}></div>
					<div className="text">{this.props.name}</div>
					<div className="price">&yen;{this.props.price}元</div>
				</div>
			</a>
		);
	}
});

//展示用的线路名称
var TabUnit = React.createClass({
	getInitialState:   function () {
		return {
			current: '',
			tabList: []
		}
	},
	getDefaultProps:   function () {
		return {
			jsonUrl:   '',
			title:     '',
			maxTabNum: 13	//最大tab-unit展示数
		}
	},
	componentDidMount: function () {
		/*注意！！！不能将获取json数据的代码写在render中，那样会造成不停的调用json，大量消耗资源*/
		//不为空才获取
		if (this.props.jsonUrl != '') {
			$.getJSON(SERVER_ADDR + this.props.jsonUrl, function (result) {
				//console.log('更新！');
				//切记！一定要用setState方法设置state！！！！
				this.setState({
					tabList: ('精选 ' + result[0].notes).split(' ')
				});
				//如果有的话，将tabList第一个元素发给clickUnit，传递给父组件
				if (this.state.tabList.length > 0) {
					this.props.clickUnit(this.state.tabList[0]);
					this.setState({current: this.state.tabList[0]});
				}
			}.bind(this));
		}
	},
	handleClick:       function (inUnit, event) {
		this.setState({current: inUnit});
		this.props.clickUnit(inUnit);
		//console.log(inUnit, event.currentTarget);
	},
	render:            function () {
		return (
			<div className="title">
				<span>{this.props.title}</span>
				<ul className="tab-panel">
					<div className="tab-title">热门:</div>
					{
						this.state.tabList.map(function (unit, index) {
							if (index >= this.props.maxTabNum) {
								return false;
							}
							return (
								<li className={'tab-unit' + (this.state.current == unit ? ' active' : '')} key={index} onClick={this.handleClick.bind(this, unit)}>{unit}</li>
							)
						}.bind(this))
					}
					<div className="clear"></div>
				</ul>
			</div>
		);
	}
});


//展示一系列线路的widget
var TourSection = React.createClass({
	getInitialState: function () {
		return {
			currentTourList: []
		}
	},
	getDefaultProps: function () {
		return {
			maxTourNum: 4,	//tour-unit最大展示数
			title:      '',	//大标题
			tabJsonUrl: '',	//标题栏目json数据url地址
			idName:     '',
			addStr:     ''	//额外的查询串
		}
	},
	//处理tab-unt点击后的操作
	handleClick:     function (name) {
		//先清空掉当前列表
		this.setState({currentTourList: []});
		//判断国内国籍
		var addStr = 'isnative=3_4'
		//通过接口读取数据
		if (name == '精选') {
			name = '';
		}
		$.getJSON(SERVER_ADDR + '/mobile/ipad_queryTourLine.action?jsoncallback=?&tourtype=3&KeyWords=' + encodeURI(name)+'&'+this.props.addStr, function (result) {
			//如果存在结果才赋值，结果可能有null可能导致出错要加入判断条件
			if (result.value!=null) {
				this.setState({
					currentTourList: result.value
				});
			}
		}.bind(this));
	},
	render:          function () {

		//生成
		return (
			<div className="tour-section" id={this.props.idName}>
				<TabUnit title={this.props.title} clickUnit={this.handleClick} jsonUrl={this.props.tabJsonUrl}></TabUnit>
				<div className="tour-unit-Panel">
					{
						this.state.currentTourList.map(function (unit, index) {
							if (index >= this.props.maxTourNum) {
								return false;
							}
							return (
								<a href={SERVER_ADDR + '/tour/tourbrowse/' + unit.lineid + '.htm'} target="_blank" key={index}>
									<div className='tour-unit'>
										<div className="image" style={{backgroundImage: 'url(' + SERVER_ADDR + '/' + unit.spotviewpic + ')'}}></div>
										<div className="text">{unit.tourproname}</div>
										<div className="price">&yen;{unit.leastprice}元</div>
									</div>
								</a>
							);
						}.bind(this))
					}
					<div className="clear"></div>
				</div>
			</div>
		);
	}
});


var reactJson = [
	{
		title:      '出境自由行',
		idName:     'chujing',
		tabJsonUrl: '/common/websinfo_queryHTClass.action?jsoncallback=?&datatype=json&classId=743',
		addStr:     'isnative=3_4'
	},
	{
		title:      '国内自由行',
		idName:     'guonei',
		tabJsonUrl: '/common/websinfo_queryHTClass.action?jsoncallback=?&datatype=json&classId=744',
		addStr:     'isnative=1_2'
	}
];
var OutDOM    = React.createClass({
	render: function () {
		return (
			<div>
				{
					reactJson.map(function (prop, index) {
						return (<TourSection {...prop} key={index}/>)
					})
				}
			</div>
		);
	}
});

$(document).ready(function () {
	ReactDOM.render(
		<OutDOM/>, document.getElementById('react-section'));
});