function time(state = [], action) {
	switch(action.type) {
		case 'TIME_RUN':
			return {...state, isSession: action.isSession, current: action.current, newSession: action.newSession, newBreakTime: action.newBreakTime};
		default:
			return state;
	}
}

export default time;
