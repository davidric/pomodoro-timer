import React from 'react';
import ReactDOM from 'react-dom';

// const audioSession = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-14566/zapsplat_bell_small_reception_desk_bell_single_ring_005_15127.mp3?_=1');
const audioSession = document.getElementById("myAudio");

const Timer = React.createClass({
	
	iteration: 0,
	isActive: false,
	n: 1,
	keepGoing: true,
	
	componentDidMount(){
		this.updateTimer();
	},

	handleTimerClick(e) {
		e.preventDefault();
		let active = this.isActive === true ? false : true;
		this.isActive = active;
		this.session = this.refs.session.value === '' ? this.props.time.session: this.refs.session.value;
		this.breakTime = this.refs.shortBreak.value === '' ? this.props.time.breakTime: this.refs.shortBreak.value;
		this.longBreakTime = this.refs.longBreak.value === '' ? this.props.time.longBreakTime: this.refs.longBreak.value;

		const sC = this.props.time.isSession;
		const cR = this.props.time.current;
		const nS = this.session;
		const nBT = this.breakTime;
		this.props.timeRun(sC, cR, nS, nBT);
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
		const { buttons } = this.props;
		const btn = this.props.buttons.stop === "Stop" ? "Resume" : "Stop";
		this.props.stopTimer(btn);
	    this.keepGoing = this.keepGoing === true ? false : true;
	    ReactDOM.findDOMNode(this.refs.stop).innerHTML = buttons.stop;
	},

	handleTimerReset(e){
		const { buttons } = this.props
	    this.refs.settingTimer.reset();
	    const btn = "Stop";
	    const msg = "Session";
	    this.props.resetTimer(btn, msg);
	    ReactDOM.findDOMNode(this.refs.stop).innerHTML = buttons.stop;
	    ReactDOM.findDOMNode(this.refs.timer).innerHTML = this.props.time.session + ':' + '00';
	    ReactDOM.findDOMNode(this.refs.message).innerHTML = buttons.message;
	    this.current = 0;
	    this.n = 1;
	    this.isActive = false;
	    const sC = true;
		const cR = 0;
		const nS = this.props.time.session;
		const nBT = this.props.time.breakTime;
		this.props.timeRun(sC, cR, nS, nBT);
	},
		
	render() {
		
		var that = this;
		const { buttons, time } = this.props;
		const current = this.props.time.current>9 ? this.props.time.current : "0" + this.props.time.current;
		const str = this.props.time.newSession + ':' + current;
		const strBreak = (this.props.time.newBreakTime) + ':' + current;
		const displayTime = this.props.time.isSession ? str : strBreak;

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
							<p ref="timer" className='center'>{displayTime}</p>
						</div>
					</div>
				</form>
			</div>
		);
	},
	
	updateTimer(){
		const { buttons } = this.props;
		const time = this.props.time;
		ReactDOM.findDOMNode(this.refs.message).innerHTML = buttons.message ;
		let { current,newSession,newBreakTime,isActive, keepGoing } = this;
		newSession
		if( (this.props.time.newSession === 0 && this.props.time.current === 0) || (this.props.time.newBreakTime === 0 && this.props.time.current === 0)){
			this.n = this.n + 1;
			var sessionCheck = this.isSession === true ? false : true;
			this.isSession = sessionCheck;
			const sC = this.props.time.isSession === true ? false : true;
			const cR = this.props.time.current;
			const nS = this.session;
			const nBT = this.breakTime;
			this.props.timeRun(sC, cR, nS, nBT);

			if (this.n % 8 === 0) {

				const sC = this.props.time.isSession;
				const cR = this.props.time.current;
				const nS = this.props.time.newSession;
				const nBT = this.longBreakTime;
				this.props.timeRun(sC, cR, nS, nBT);


				console.log('Long Break' + '\n\n');
			}
			else {
				this.n % 2 === 0 ? console.log('Short Break') : console.log('Session');
			}
			if (this.props.time.isSession) {
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
			if (this.props.time.isSession) {
				if(this.props.time.current !== 0){
					const sC = this.props.time.isSession;
					const cR = this.props.time.current - 1;
					const nS = this.props.time.newSession;
					const nBT = this.props.time.newBreakTime;
					this.props.timeRun(sC, cR, nS, nBT);
				}
				else{
					const sC = this.props.time.isSession;
					const cR = 59;
					const nS = this.props.time.newSession - 1;
					const nBT = this.props.time.newBreakTime;
					this.props.timeRun(sC, cR, nS, nBT);
				}	
			}
			else {
				if(this.props.time.current !== 0){
					const sC = this.props.time.isSession;
					const cR = this.props.time.current - 1;
					const nS = this.props.time.newSession;
					const nBT = this.props.time.newBreakTime;
					this.props.timeRun(sC, cR, nS, nBT);
				}
				else{
					const sC = this.props.time.isSession;
					const cR = 59;
					const nS = this.props.time.newSession;
					const nBT = this.props.time.newBreakTime - 1;
					this.props.timeRun(sC, cR, nS, nBT);
				}
			}
		}
	}
	
});

export default Timer;