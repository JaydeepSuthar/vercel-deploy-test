<template>
	<div id="blog">
		<v-card>
			<v-card-title>
				All Assignment
				<v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search Assignment
			"
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
		</v-card>

		<v-data-table
			:search="search"
			:headers="headers"
			:items="Assignment"
			:items-per-page="10"
			class="mt-5 elevation-3"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<!-- <v-toolbar-title class="display-1 text-decoration-underline"
						>All Blogs</v-toolbar-title
					> -->
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-spacer></v-spacer>

					<v-btn class="success" to="./assignment/new" nuxt
						>Add Assignment</v-btn
					>

					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title class="text-h5"
								>Are you sure you want to delete this
								item?</v-card-title
							>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text>Cancel</v-btn>
								<!-- @click="closeDelete" -->
								<v-btn color="blue darken-1" text>OK</v-btn>
								<!-- @click="deleteItemConfirm" -->
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>
			<!-- eslint-ignore-next-line -->
			<template v-slot:item.actions="{ item }">
				<v-btn
					small
					:to="`./blog/${item.id}/edit`"
					class="mr-2 warning"
					nuxt
				>
					<v-icon small class="mr-2" @click="editItem(item)">
						mdi-pencil </v-icon
					>Edit</v-btn
				>
				<v-btn small @click="deleteBlog(item)" class="mr-2 error">
					<v-icon small @click="deleteItem(item)"> mdi-delete </v-icon
					>Delete</v-btn
				>
				<!-- <v-btn small class="info" @click="showChapter(item)">Chapters</v-btn> -->
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	layout: "admin",
	async asyncData({ $axios, store }) {
		let response = await $axios.get(`/blog`);
		let blogs = await response.data.data;

		return {
			blogs,
		};
	},

	data() {
		return {
			search: "",
			showDialog: false,
			headers: [
				{
					text: "Title",
					align: "start",
					sortable: false,
					value: "title",
				},

				{ text: "file", value: "file" },
				{ text: "Body", value: "Body" },
				{ text: "Is_active", value: "is_active" },
				{ text: "Author", value: "admin.name" },
				{ text: "Actions", value: "actions", sortable: false },
			],
			Assignments: [],
		};
	},
	methods: {
		closeDialogBox(value) {
			this.showDialog = value;
		},

		async editBlog(Assignments) {
			console.log(`Assignment Edit Successfully: ${Assignments.id}`);
		},

		async deleteBlog(Assignments) {
			let confirmation = confirm(
				`Are you sure you want to delete ${Assignments.title}`
			);

			if (confirmation) {
				const response = await this.$axios.delete(
					`/assignment/delete/${Assignments.id}`
				);

				console.log(`Assigment Deleted Successfully: ${response.data}`);

				this.$store.dispatch("snackbar/setSnackbar", {
					text: `You have successfully deleted your Assignment, ${Assignments.title}.`,
				});

				// TODO: NOT THE MOST EFFECIENT WAY
				this.$nuxt.refresh();
			}
		},
	},
};
</script>
