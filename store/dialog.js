// ! It's not working corretly so don't use it

export const state = () => ({
	showDialog: false
});

export const mutation = {
	TOGGLE_DIALOG (state) {
		state.showDialog = !state.showDialog;
	}
}
