<template>
	<v-app>
	<v-container>


			<v-layout wrap>

					<v-flex sm12 md6 offset-md3  >
						<v-card elevation="4" light tag="section">
								<v-card-text >
		<h1 align="center">
	Create A Free Account
		</h1><br>
		<h3 align="center">
			Hands-on practice modules, learning paths for industry skills, projects, community, and more.
		</h3> <br><br>

		<v-form @submit.prevent="signup">


		<v-text-field
										outlined
										label="Name"
										placeholder="Enter your name"
										type="text"
										v-model="signup.Name"
										counter="20"
									></v-text-field>
<v-text-field
	outlined
	label="username"
	placeholder="Enter your username"
	type="text"
	v-model="signup.username"
	counter="10"
></v-text-field>

<v-text-field
	outlined
	label="email"
	placeholder="Enter your email address"
	type="text"
	v-model="signup.email"

></v-text-field>
<v-text-field
	outlined
	label="Password"
	placeholder="Enter your new password"
	type="password"
	v-model="signup.password"
	counter="8"

></v-text-field>






<v-btn type="submit" block large class="success" to="/admin">Submit</v-btn>
		</v-form>
			</v-card-text >

						</v-card >
	</v-flex >
</v-layout>
	</v-container>
	</v-app>
</template>

<style scoped>
h1{
	color:orange;
	font-size: 40px;

}
h3{
	color: rgb(33, 199, 221);
	font-size: 20px;

}
</style>

<script>


export default {
	layout:"login",
	data() {
		 return{
			 	signup: {
					 Name: "",
					 username: "",
					 email: "",
					 password: "",



				 }

		 };


	},
	 methods:
		{
				async signup()
				{
	if (response.status === 200) {
						this.$store.dispatch("snackbar/setSnackbar", {
							text: `Your Account is Created`,
						});

						this.$router.push(`/admin`);
					}
				}
		 }

	};



</script>

