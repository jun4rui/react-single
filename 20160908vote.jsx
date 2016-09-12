var React    = require('react');
var ReactDOM = require('react-dom');


var MainDOM = React.createClass({
	render:      function () {
		return (
			<div>
				<div id="main-panel" style={{
					'background': 'url(' + this.props.backgroundImage + ') no-repeat center top',
					'width':      this.props.width,
					'height':     this.props.height,
					'paddingBottom': this.props.showBtn?'4.5em':'0'
				}}></div>
				<div id="btn-panel" style={{display: this.props.showBtn ? 'block' : 'none'}}>
					<div id="submit-btn" data-degree="1">
						我要投票
					</div>
				</div>

				<div className="am-modal am-modal-loading am-modal-no-btn" tabIndex="-1" id="loading">
					<div className="am-modal-dialog">
						<div className="am-modal-hd">投票中...</div>
						<div className="am-modal-bd">
							<span className="am-icon-spinner am-icon-spin"></span>
						</div>
					</div>
				</div>
			</div>
		);
	}
});


$(document).ready(function () {
	//console.log('Begin.');
	var props = {
		backgroundImage: "20160908vote.jpg",
		width:           '600px',
		height:          '3061px',
		showBtn:         false
	};
	ReactDOM.render(<MainDOM {...props}/>, document.getElementById('top-section'));
	//console.log('End.');
});