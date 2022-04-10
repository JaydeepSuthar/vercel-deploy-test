<template>
	<v-container fluid>
		<v-card>
			<v-card-title>
				All Admin Users
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

		<div id="instructor">
			<v-data-table
				:search="search"
				:headers="headers"
				:items="users"
				:items-per-page="10"
				class="mt-5 elevation-3"
			>
				<template v-slot:top>
					<v-toolbar flat>
						<!-- <v-toolbar-title class="display-1 text-decoration-underline"
						>All Courses</v-toolbar-title
					> -->
						<v-divider class="mx-4" inset vertical></v-divider>
						<v-spacer></v-spacer>

						<v-btn to="/admin/admin-user/new" class="success" exact nuxt
							>Add Instructor</v-btn
						>
					</v-toolbar>
				</template>

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
			let response = await $axios.get(`/admin/all`);
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
					{ text: "Role", value: "role" },
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
						`/user/admin/delete/${user.id}`
					);

					console.log(`User Deleted Successfully: ${response.data}`);

					this.$store.dispatch("snackbar/setSnackbar", {
						text: `You have successfully deleted your user, ${user.title}.`,
						color: "red",
					});

					// TODO: NOT THE MOST EFFECIENT WAY
					this.$nuxt.refresh();
				}
			},
		},
	};
</script>
