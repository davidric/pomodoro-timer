function time(state = [], action) {
	switch(action.type) {
		case 'TIME_RUN':
			return {...state, isSession: action.isSession, session: action.session, newSession: action.newSession};
		default:
			return state;
	}
}

export default time;
