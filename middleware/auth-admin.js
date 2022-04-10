export default async function ({ $auth, redirect, store }) {

	let user = $auth.$storage.getUniversal('user');
	// store.dispatch('setUser', user);

	console.log("userdetails: \n");
	console.table(user);

	if (user && !(user.role === 'student')) {
		// let user in
	} else {
		redirect('/');
		alert('You are not allowed');
	}
}
