function buttons(state = [], action) {
	switch(action.type) {
		case 'START_TIMER':
			console.log("Start");
			console.log('Session');
			return {...state, stop: action.buttons}
		case 'STOP_RESUME_TIMER':
			console.log('Stop');
			return {...state, stop: action.buttons}
		case 'RESET_TIMER':
			console.log("Reset" + '\n\n\n');
			return {...state, stop: action.buttons, message: action.message}
		case 'SESSION_CHANGE':
			return {...state, message: action.message}
		default:
			return state;
	}
}

export default buttons;
