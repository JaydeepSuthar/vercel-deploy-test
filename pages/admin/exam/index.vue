<template>
	<div id="blog">
		<v-card>
			<v-card-title>
				All Exams
				<v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search Exam
			"
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
		</v-card>

		<v-data-table
			:search="search"
			:headers="headers"
			:items="exams"
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

					<v-btn class="success" to="./exam/new" nuxt
						>Add New Exam</v-btn
					>
				</v-toolbar>
			</template>
			<!-- eslint-ignore-next-line -->
			<template v-slot:item.google_form_link="{ item }">
				<span class="d-inline-block text-truncate" style="max-width: 200px;">{{ item.google_form_link }}</span>
			</template>
			<template v-slot:item.actions="{ item }">
				<!-- <v-btn
					small
					:to="`./blog/${item.id}/edit`"
					class="mr-2 warning"
					nuxt
				>
					<v-icon small class="mr-2" @click="editItem(item)">
						mdi-pencil </v-icon
					>Edit</v-btn
				> -->
				<v-btn small @click="deleteExam(item)" class="mr-2 error">
					<v-icon small> mdi-delete </v-icon
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
			let response = await $axios.get(`/course/exams`);
			let exams = await response.data.data;
			return {
				exams,
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
						value: "exam_name",
					},

					{ text: "Link", value: "google_form_link" },

					{ text: "Is_active", value: "is_active" },
					{ text: "Course", value: "course_details.title" },
					// { text: "Author", value: "admin.name" },
					{ text: "Actions", value: "actions", sortable: false },
				],
				//Exams: [],
			};
		},
		methods: {
			closeDialogBox(value) {
				this.showDialog = value;
			},

			async editBlog(exam) {
				console.log(`Exam Edit Successfully: ${exam.id}`);
			},

			async deleteExam(exam) {
				let confirmation = confirm(
					`Are you sure you want to delete ${exam.exam_name}`
				);

				// console.log(exam);

				if (confirmation) {
					const response = await this.$axios.delete(
						`/course/exams/delete/${exam.id}`
					);

					console.log(`Exam Deleted Successfully: ${response.data}`);

					this.$store.dispatch("snackbar/setSnackbar", {
						text: `You have successfully deleted your Exam, ${exam.title}.`,
					});

					// TODO: NOT THE MOST EFFECIENT WAY
					this.$nuxt.refresh();
				}
			},
		},
	};
</script>


<style scoped>
.truncate {
  /* width: 20px; */
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
}
.short-link {
	width: clamp(45ch, 50%, 75ch);
}
</style>
