<template>
	<div id="assignment">
		<v-card>
			<v-card-title>
				All Assignment
				<v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search Assignment"
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
		</v-card>

		<v-data-table
			:search="search"
			:headers="headers"
			:items="assignments"
			:items-per-page="10"
			class="mt-5 elevation-3"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<!-- <v-toolbar-title class="display-1 text-decoration-underline"
						>All assignments</v-toolbar-title
					> -->
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-spacer></v-spacer>

					<v-btn class="success" to="./assignment/new" nuxt
						>Add Assignment</v-btn
					>

				</v-toolbar>
			</template>
			<!-- eslint-ignore-next-line -->
			<template v-slot:item.actions="{ item }">
				<!-- <v-btn
					small
					:to="`./assignment/${item.id}/edit`"
					class="mr-2 warning"
					nuxt
				>
					<v-icon small class="mr-2" @click="editItem(item)">
						mdi-pencil </v-icon
					>Edit</v-btn
				> -->
				<v-btn small @click="deleteassignment(item)" class="mr-2 error">
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
	async asyncData({ $axios, store, params }) {
		let response = await $axios.get(`/misc/assignment/${params.id}`);
		let assignments = await response.data.data;

		return {
			assignments,
		};
	},

	data() {
		return {
			search: "",
			showDialog: false,
			headers: [
				{ text: "src", value: "src" },
				{ text: "Is_active", value: "is_visible" },
				{ text: "Actions", value: "actions", sortable: false },
			],
		};
	},
	methods: {
		closeDialogBox(value) {
			this.showDialog = value;
		},

		async editassignment(assignments) {
			console.log(`Assignment Edit Successfully: ${assignments.id}`);
		},

		async deleteassignment(assignments) {
			let confirmation = confirm(
				`Are you sure you want to delete Assigment`
			);

			if (confirmation) {
				const response = await this.$axios.delete(
					`/misc/assignment/delete/${assignments.id}`
				);

				console.log(`Assigment Deleted Successfully: ${response.data}`);

				this.$store.dispatch("snackbar/setSnackbar", {
					text: `You have successfully deleted your Assignment, ${assignments.title}.`,
				});

				// TODO: NOT THE MOST EFFECIENT WAY
				this.$nuxt.refresh();
			}
		},
	},
};
</script>
