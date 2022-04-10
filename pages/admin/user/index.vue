<template>
	<v-container fluid>
		<div id="course">

			<v-card>
				<v-card-title>
					All Users
					<v-spacer></v-spacer>
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Search Users"
						single-line
						hide-details
					></v-text-field>
				</v-card-title>
			</v-card>

			<v-data-table
				:headers="headers"
				:items="users"
				:items-per-page="10"
				:search="search"
				class="mt-2 elevation-5"
			>
				<template v-slot:item.actions="{ item }">
					<!-- <v-btn small class="mr-2 warning">Edit</v-btn> -->
					<v-btn small @click="deleteUser(item)" class="mr-2 error"
						>Delete</v-btn
					>
				</template>
			</v-data-table>
		</div>
	</v-container>
</template>


<script>
	export default {
		layout: "admin",
		async asyncData({ $axios, store }) {
			let response = await $axios.get(`/user/all`);
			let users = await response.data.data;
			console.log(response);
			// store.commit('SET_COURSES', users);
			return {
				users,
			};
		},

		data() {
			return {
				search: "",
				showDialog: false,
				headers: [
					{
						text: "Name",
						align: "start",
						sortable: false,
						value: "name",
					},
					{ text: "Email", value: "email" },
					{ text: "Contact", value: "contact" },
					{ text: "Authenticated", value: "is_authenticated" },
					{ text: "Actions", value: "actions", sortable: false },
				],
				courses: [],
			};
		},
		methods: {
			closeDialogBox(value) {
				this.showDialog = value;
			},

			async deleteUser(user) {
				let confirmation = confirm(
					`Are you sure you want to delete ${user.name}`
				);

				if (confirmation) {
					const response = await this.$axios.delete(
						`/user/delete/${user.id}`
					);

					console.log(`User Deleted Successfully: ${response.data}`);

					this.$store.dispatch("snackbar/setSnackbar", {
						text: `You have successfully deleted your user, ${user.title}.`,
					});

					// TODO: NOT THE MOST EFFECIENT WAY
					this.$nuxt.refresh();
				}
			},
		},
	};
</script>
