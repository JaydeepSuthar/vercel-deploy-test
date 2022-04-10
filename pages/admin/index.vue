<template>
	<v-container>
		<h1>Login</h1>

		<UserAuthForm buttonText="Login" :submitForm="loginAdminUser" />
	</v-container>
</template>


<script>
	export default {
		layout: "empty",
		methods: {
			async loginAdminUser(loginInfo) {
				try {
					let loggedInUser = await this.$auth.loginWith('local', {data: loginInfo});

					if (loggedInUser.status === 200 || loggedInUser.status === 204) {
						// console.log(`lOGGED IN USER: ${ JSON.stringify(loggedInUser, null, 2) }`);
						let user = loggedInUser.data.data;

						this.$auth.$storage.setUniversal('user', user);
						this.$auth.setUser(user);
						this.$router.push('/admin/home');
					}
				} catch ({ response }) {
					alert(response.data.msg);
					this.$store.dispatch('snackbar/setSnackbar', { text: `Invalid Credentails` })
				}
			},
		},
	};
</script>
