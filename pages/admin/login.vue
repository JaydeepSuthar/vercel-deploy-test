<template>
	<v-container>
		<h2 class="h1">Login</h2>

		<UserAuthForm :submitForm="handleUserLogin" buttonText="Login" />

		<br>

		<v-btn @click="loginWithGoogle" color="blue">Sign in with Google</v-btn>

	</v-container>
</template>

<script>
	import UserAuthForm from '@/components/UserAuthForm.vue'

	export default {
		components: {
			UserAuthForm
		},
		methods: {
			async handleUserLogin(loginInfo) {
				let response = await this.$auth.loginWith('local', {
					data: loginInfo
				})
				let user = response.data.loggedInUser;

				this.$auth.setUser(user)
			},
			async loginWithGoogle() {
				let response = await this.$auth.loginWith('google');
			}
		}
	}
</script>
