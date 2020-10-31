function isLive(lecture) {
	let current_time = new Date()
	return current_time >= new Date(lecture.start_time) &&
		current_time <= new Date(lecture.end_time)
}

function isUpcoming(lecture) {
	let current_time = new Date()
	let one_week_from_now = new Date()
	one_week_from_now.setDate(current_time.getDate() + 7)
	if(lecture.start_time) {
		return new Date(lecture.start_time) > current_time && new Date(lecture.start_time) <= one_week_from_now
	}else{
		return new Date(lecture.playback_submission_start_time) > current_time && new Date(lecture.playback_submission_start_time) <= one_week_from_now
	}
}

function isPast(lecture) {
	let current_time = new Date()
	return current_time > new Date(lecture.end_time) ||
		current_time > new Date(lecture.playback_submission_end_time)
}

function isActivePlayback(lecture) {
	let current_time = new Date()
	return current_time >= new Date(lecture.playback_submission_start_time) &&
		current_time <= new Date(lecture.playback_submission_end_time)
}

function isRecent(lecture) {
	let current_time = new Date()
	let one_week_ago = new Date()
	one_week_ago.setDate(current_time.getDate() - 7)
	if(lecture.start_time){
		return new Date(lecture.end_time) >= one_week_ago
	}else{
		return new Date(lecture.playback_submission_end_time) >= one_week_ago
	}
}

export function getLiveLectures(lectures) {
	let live_lectures = []
	lectures.forEach(lecture => {
		if(isLive(lecture))
			live_lectures.push(lecture)
	})
	return live_lectures
}

export function getUpcomingLectures(lectures) {
	let upcoming_lectures = []
	lectures.forEach(lecture => {
		if(isUpcoming(lecture))
			upcoming_lectures.push(lecture)
	})
	return upcoming_lectures
}

export function getPastLectures(lectures) {
	let past_lectures = []
	lectures.forEach(lecture => {
		if(isPast(lecture))
			past_lectures.push(lecture)
	})
	return past_lectures
}

export function getActivePlaybackLectures(lectures) {
	let active_playback_lectures = []
	lectures.forEach(lecture => {
		if(isActivePlayback(lecture))
			active_playback_lectures.push(lecture)
	})
	return active_playback_lectures
}

export function getRecentLectures(lectures) {
	let recent_lectures = []
	let past_lectures = getPastLectures(lectures)
	past_lectures.forEach(lecture => {
		if(isRecent(lecture))
			recent_lectures.push(lecture)
	})
	return recent_lectures
}