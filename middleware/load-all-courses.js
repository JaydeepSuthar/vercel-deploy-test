import RSVP from 'rsvp'

export default async function ({ store, from }) {
	let isIntialPageLoad = !from

	if (isIntialPageLoad) {
		await RSVP.all([
			store.dispatch('courses/loadAllCourses'),
		])
	}
}

