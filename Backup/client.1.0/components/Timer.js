import React from 'react';
import ReactDOM from 'react-dom';

const audioSession = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-14566/zapsplat_bell_small_reception_desk_bell_single_ring_005_15127.mp3?_=1');

const Timer = React.createClass({
	
	iteration: 0,
	session: 1,
	newSession: 1,
	breakTime: 1,
	longBreakTime: 2,
	current: 0,
	isActive: false,
	isSession: true,
	n: 1,
	keepGoing: true,
	
	componentDidMount(){
		this.updateTimer();
	},

	handleTimerClick(e) {
		e.preventDefault();
		let active = this.isActive === true ? false : true;
		this.isActive = active;
		this.session = this.refs.session.value === '' ? this.session: this.refs.session.value;
		this.breakTime = this.refs.shortBreak.value === '' ? this.breakTime: this.refs.shortBreak.value;
		this.longBreakTime = this.refs.longBreak.value === '' ? this.longBreakTime: this.refs.longBreak.value;
		this.newSession= this.session;
		this.newBreakTime= this.breakTime;
		audioSession.play();
		const buttons = "Stop";
		this.props.startTimer(buttons);

		this.keepGoing = true;
		ReactDOM.findDOMNode(this.refs.stop).innerHTML = buttons;
		var that = this;
		function loop() {
			setInterval(function() {
				if( !that.isActive ){
					clearInterval(loop);
				}
				else{
					if (that.keepGoing) {
						var date = new Date();
						if( Math.round( date.getTime()/1000 ) > that.iteration ){
							that.updateTimer.call(this);
							that.iteration = Math.round( date.getTime()/1000 );
						}
					}
				}
			},200)	
		}
		loop();
	},

	handleTimerStop(e){
		const btn = this.props.buttons.stop === "Stop" ? "Resume" : "Stop";
		this.props.stopTimer(btn);
	    this.keepGoing = this.keepGoing === true ? false : true;
	    ReactDOM.findDOMNode(this.refs.stop).innerHTML = buttons;
	},

	handleTimerReset(e){
		const { buttons } = this.props
	    this.refs.settingTimer.reset();
	    const btn = "Stop";
	    const msg = "Session";
	    this.props.resetTimer(btn, msg);
	    ReactDOM.findDOMNode(this.refs.stop).innerHTML = buttons.stop;
	    ReactDOM.findDOMNode(this.refs.timer).innerHTML = this.session + ':' + '00';
	    ReactDOM.findDOMNode(this.refs.message).innerHTML = buttons.message;
	    this.current = 0;
	    this.n = 1;
	    this.isActive = false;
	    this.isSession = true;
	},
		
	render() {
		
		var that = this;
		const { buttons } = this.props;

		return (
			<div className='pomodoro'>
				<form ref="settingTimer" onSubmit={this.handleTimerClick}>
					<h1>Timer</h1>
					<div className='inputs center'>
						<label>Session</label>
						<input placeholder='25' className='setSession' type="text" ref="session" />
						<label>Short Break</label>
						<input placeholder='5' className='setSession' type="text" ref="shortBreak" />
						<label>Long Break</label>
						<input placeholder='15' className='setSession' type="text" ref="longBreak" />
					</div>
					<div className="btn-group">
						<button type="submit" >Start</button>
						<div className="stop" ref="stop" onClick={this.handleTimerStop}>{buttons.stop}</div>
						<div className="stop" ref="reset" onClick={this.handleTimerReset}>Reset</div>
					</div>
					<div className='center timer'>
						<div className='center info'>
							<h2 ref="message" className='center'>{buttons.message}</h2>
							<p ref="timer" className='center'></p>
						</div>
					</div>
				</form>
			</div>
		);
	},
		
	// handleTimerClick(e){
	// 	console.log("Start");
	// 	e.preventDefault();
	// 	let active = this.isActive === true ? false : true;
	// 	this.isActive = active;
	// 	this.message = "Session";
	// 	this.session = this.refs.session.value === '' ? this.session: this.refs.session.value;
	// 	this.breakTime = this.refs.shortBreak.value === '' ? this.breakTime: this.refs.shortBreak.value;
	// 	this.longBreakTime = this.refs.longBreak.value === '' ? this.longBreakTime: this.refs.longBreak.value;
	// 	this.newSession= this.session;
	// 	this.newBreakTime= this.breakTime;
	// 	this.startTimer();
	// 	audioSession.play();
	// },

	// handleTimerReset(e){
	// 	console.log("Reset" + '\n\n\n');
	//     this.refs.settingTimer.reset();
	//     ReactDOM.findDOMNode(this.refs.stop).innerHTML = "Stop";
	//     ReactDOM.findDOMNode(this.refs.timer).innerHTML = this.session + ':' + '00';
	//     ReactDOM.findDOMNode(this.refs.message).innerHTML = "Session";
	//     this.current = 0;
	//     this.n = 1;
	//     this.isActive = false;
	//     this.isSession = true;
	// },
	
	// startTimer(){
	// 	console.log('Session');
	// 	this.keepGoing = true;
	// 	ReactDOM.findDOMNode(this.refs.stop).innerHTML = "Stop";
	// 	var that = this;
	// 	function loop() {
	// 		setInterval(function() {
	// 			if( !that.isActive ){
	// 				clearInterval(loop);
	// 			}
	// 			else{
	// 				if (that.keepGoing) {
	// 					var date = new Date();
	// 					if( Math.round( date.getTime()/1000 ) > that.iteration ){
	// 						that.updateTimer.call(this);
	// 						that.iteration = Math.round( date.getTime()/1000 );
	// 					}
	// 				}
	// 			}
	// 		},200)	
	// 	}
	// 	loop();

	// },
	
	updateTimer(){
		const { buttons } = this.props;
		ReactDOM.findDOMNode(this.refs.message).innerHTML = buttons.message ;
		let { current,newSession,newBreakTime,isActive, keepGoing } = this;
		newSession
		if( (this.newSession === 0 && this.current === 0) || (this.newBreakTime === 0 && this.current === 0)){
			this.n = this.n + 1;
			var sessionCheck = this.isSession === true ? false : true;
			this.isSession = sessionCheck;
			this.newSession = this.session;
			this.newBreakTime = this.breakTime;
			if (this.n % 8 === 0) {
				this.newBreakTime = this.longBreakTime;
				newBreakTime = this.longBreakTime
				// console.log('Long Break' + '\n\n');
			}
			else {
				this.n % 2 === 0 ? console.log('Short Break') : console.log('Session');
			}
			if (this.isSession) {
				const msg = "Session";
			    this.props.sessionChange(msg);

				audioSession.play();
			}
			else {
				if (this.n % 8 === 0) {
					const msg = "Long Break";
				    this.props.sessionChange(msg);
				}
				else {
				    const msg = "Short Break";
				    this.props.sessionChange(msg);							
				}
				audioSession.play();
			}	
		}
		if( this.isActive ){
			if (this.isSession) {
				if(this.current !== 0){
					this.current--;
				}
				else{
					this.current = 1;
					this.newSession--;
				}	
			}
			else {
				if(this.current !== 0){
					this.current--;
				}
				else{
					this.current = 1;
					this.newBreakTime--;
				}
			}
		}
		
		current = current>9 ? current : "0" + current;
		var str = newSession + ':' + current;
		var strBreak = newBreakTime + ':' + current;
		str = this.isSession ? str : strBreak;
		
		ReactDOM.findDOMNode(this.refs.timer).innerHTML = str;
		// ReactDOM.findDOMNode(this.refs.message).innerHTML = buttons.message ;
	}
	
});


// const PhotoGrid = React.createClass({
// 	render() {
// 		return (
// 			<div className="photo-grid">
// 				{this.props.posts.map((post, i) => <Photo {...this.props} key={i} i={i} post={post} />)}
// 			</div>
// 		)
// 	}
// });

export default Timer;