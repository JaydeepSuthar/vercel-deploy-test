<template>
	<div>
		<v-app class="man">
			<navbar />
			<h1>Login</h1>
			<br />
			<v-layout>
				<v-flex sm12 md6 offset-md3>
					<v-card elevation="4" light tag="section">
						<v-container>
							<UserAuthForm
								:submitForm="handleUserLogin"
								buttonText="Login"
							/>

							<br />

							<!-- <v-btn @click="loginWithGoogle" color="blue">
								Sign in with Google</v-btn
							> -->
							<br />
							<br />

							<strong style="font-size: 20px">New User? </strong
							>&nbsp;&nbsp;&nbsp;
							<v-btn
								type="submit"
								large
								class="success"
								to="/signup"
								>Sign up</v-btn
							>
						</v-container>
					</v-card>
				</v-flex>
			</v-layout>
		</v-app>
		<ftr />
	</div>
</template>
<style scoped>
h1 {
	color: rgba(10, 49, 85, 0.959);
	font-size: 60px;
	text-align: center;
}
.man {
	background: rgb(199, 199, 199);
}
</style>

<script>
import UserAuthForm from "@/components/UserAuthForm.vue";

export default {
	components: {
		UserAuthForm,
	},
	beforeCreate () {
		if (this.$store.state.auth.loggedIn) {
			this.$router.push('/')
		}
	},
	methods: {
		async handleUserLogin(loginInfo) {
			try {
				let response = await this.$axios.post("/user/login", loginInfo);
				let userData = response.data;

				if (response.data.is_success == true) {
					let user = userData.data;

					this.$auth.setUser(user);
					this.$auth.$storage.setUniversal("user", user, true);

					console.log(user);

					this.$router.push("/");
				}
			} catch ({ response }) {
				alert(response.data.msg);
				this.$store.dispatch("snackbar/setSnackbar", {
					text: `Invalid Credentails`,
				});
			}
		},
	},
};
</script>
