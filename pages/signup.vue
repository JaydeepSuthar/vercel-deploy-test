<template>
	<div>
		<navbar />
		<v-app class="man">
			<div style="text-align: center">
				<strong>
					<span
						style="
							color: #025950;
							font-size: 70px;
							text-align: center;
						"
						>Create A</span
					>
					<span
						style="
							color: orangered;
							font-size: 70px;
							text-align: center;
						"
						>Free Account</span
					>
					<p style="font-size: 25px; background: grey">
						Hands-on practice modules, learning paths for industry
						skills, projects, community, and more.
					</p></strong
				>
			</div>

			<br />

			<v-flex sm12 md6 offset-md3>
				<v-card elevation="4" light tag="section">
					<br />

					<v-card-text>
						<v-form @submit.prevent="registerUser">
							<v-text-field
								outlined
								label="Name"
								type="text"
								v-model="signup.name"
								counter="20"
								block
							></v-text-field>
							<v-text-field
								outlined
								label="email"
								type="email"
								v-model="signup.email"
							></v-text-field>
							<v-text-field
								outlined
								label="Contact"
								type="tel"
								v-model="signup.contact"
								counter="10"
							></v-text-field>

							<v-text-field
								outlined
								label="Password"
								v-model="signup.password"
								:type="showPassword ? 'text' : 'password'"
								:append-icon="
									showPassword ? 'mdi-eye' : 'mdi-eye-off'
								"
								@click:append="showPassword = !showPassword"
								counter="8"
							></v-text-field>

							<v-textarea
								outlined
								v-model="signup.add"
								label="Address"
								counter="true"
							/>

							<v-select
								:items="qual"
								v-model="signup.qual"
								label="Qualification"
								outlined
							>
							</v-select>

							<v-btn type="submit" block large class="success"
								>Submit</v-btn
							>
							<!-- @click="registerUser" -->
						</v-form>
					</v-card-text>
				</v-card>
			</v-flex>
			<br />
			<br />
		</v-app>
	</div>
</template>

<style scoped>
.man {
	background: whitesmoke;
}
.frm {
	background: white;
	width: 700px;
}
</style>

<script>
export default {
	layout: "login",
	data() {
		return {
			showPassword: false,
			signup: {
				name: "",
				email: "",
				contact: "",
				password: "",
				add: "",
			},
			qual: [
				{ "Higher Secondary": "higher_secondary" },
				{ "Under Graduate": "under_graduate" },
				{ "Post Graduate": "post_graduate" },
			],
		};
	},

	methods: {
		async registerUser(e) {
			const response = await this.$axios.post(
				"/user/signup",
				this.signup
			);

			console.log(response);
			if (
				response.status == 201 ||
				response.status == 200 ||
				response.status == 204
			) {
				// let user = response.data.data;
				// this.$auth.setUser(user);
				this.$router.push("/login");
			}
		},
	},
};
</script>
