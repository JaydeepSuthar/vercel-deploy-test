<template>
	<div id="course">
		<v-card>
			<v-card-title>
				All Course
				<v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search Course"
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
		</v-card>

		<v-data-table
			:search="search"
			:headers="headers"
			:items="courses"
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

					<v-btn to="/admin/course/new" class="success" exact nuxt
						>Add Course</v-btn
					>
				</v-toolbar>
			</template>

			<template v-slot:item.actions="{ item }">
				<!-- <v-icon small class="mr-2" @click="editItem(item)">
					mdi-pencil
				</v-icon> -->
				<v-btn
					small
					:to="`/admin/course/${item.id}/edit`"
					class="mr-2 warning"
					nuxt
					>Edit</v-btn
				>
				<v-btn small @click="deleteCourse(item)" class="mr-2 error"
					>Delete</v-btn
				>
				<v-btn small class="info" @click="showChapter(item)"
					>Chapters</v-btn
				>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	layout: "admin",
	async fetch({ store }) {
		try {
			await store.dispatch("courses/loadAllCourses");
		} catch ({ response }) {
			console.log(response);
		}
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
				{ text: "Slug", value: "slug" },
				{ text: "Price", value: "price" },
				{ text: "Duration(in Months)", value: "duration" },
				{ text: "is_active", value: "is_active" },
				{ text: "Instructor", value: "admin.name" },
				{ text: "Actions", value: "actions", sortable: false },
			],
		};
	},
	methods: {
		closeDialogBox(value) {
			this.showDialog = value;
		},
		showChapter(value) {
			// FIXME: THIS IS INCOMPLETE
			console.log(value);
			this.$router.push(`/admin/course/${value.id}/chapter`);
		},

		async deleteCourse(course) {
			let confirmation = confirm(
				`Are you sure you want to delete ${course.title}`
			);

			if (confirmation) {
				this.$store.dispatch("courses/delete", course);
				this.$store.dispatch("snackbar/setSnackbar", {
					text: `You have successfully deleted your course, ${course.title}.`,
				});
			}
		},
	},
	computed: {
		...mapState({
			courses: (state) => state.courses.courses,
		}),
	},
};
</script>
