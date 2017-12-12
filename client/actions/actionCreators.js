// Start Timer
export function startTimer(buttons) {
	return {
		type: 'START_TIMER',
		buttons
	}
}

// Stop Timer
export function stopTimer(buttons) {
	return {
		type: 'STOP_RESUME_TIMER',
		buttons
	}
}

// Reset Timer
export function resetTimer(buttons, message) {
	return {
		type: 'RESET_TIMER',
		buttons,
		message
	}
}

//

// Reset Timer
export function sessionChange(message) {
	return {
		type: 'SESSION_CHANGE',
		message
	}
}

//

// Time Timer
export function timeRun(isSession, current, newSession, newBreakTime) {
	return {
		type: 'TIME_RUN',
		isSession,
		current,
		newSession,
		newBreakTime
	}
}

//