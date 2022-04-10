<template>
	<v-container fluid>
		<!-- <v-row> -->
		<v-form @submit.prevent="submitAssignment">
			<v-text-field
				v-model="assignment.title"
				label="Assignment Title"
				placeholder="Enter Assignment Title Here"
				autofocus
				outlined
				full-width
				:rules="[
					required('Title'),
					minLength('Title', 3),
					maxLength('Title', 20),
				]"
				counter="20"
			></v-text-field>

			<v-text-field
				v-model="assignment.form_link"
				label="Assignment Link"
				placeholder="Enter Google Form Link Here"
				autofocus
				outlined
				full-width
				:rules="[required('Assignment Link')]"
			></v-text-field>

			<v-select
				:items="this.chapterName"
				label="Course List"
				@change="selectCourse"
				placeholder="Select Course"
				outlined
				:rules="[required('Course')]"
			></v-select>

			<v-select
				:items="this.chapterName"
				label="Course List"
				@change="selectCourse"
				placeholder="Select Chapter"
				outlined
				:rules="[required('Course')]"
			></v-select>

			<v-checkbox
				label="Is Active"
				color="info"
				v-model="assignment.is_active"
			></v-checkbox>

			<!-- <v-text-field
				v-model="assignment.author"
				:value="assignment.author"
				label="Author"
				outlined
				full-width
				readonly
			></v-text-field> -->

			<v-btn type="submit" block large class="success">Save</v-btn>
		</v-form>
	</v-container>
</template>

<script>
	import validation from "@/utils/validations";
	import { mapGetters, mapState } from "vuex";

	export default {
		layout: "admin",
		async fetch({ store }) {
			await store.dispatch("chapters/loadAllChapters");
		},
		data() {
			return {
				...validation,
				assignment: {
					title: "",
					form_link: "",
					chapterId: "",
					is_active: false,
					// author: "Fahad Jariwala",
				},
			};
		},
		methods: {
			async submitAssignment() {
				// console.log(this.getCourseName());
				try {
					const response = await this.$axios.post(
						"/chapter/exam/add",
						this.assignment
					);

					if (response.status === 200 || response.status === 204) {
						this.$store.dispatch("snackbar/setSnackbar", {
							text: `You have successfully created exam`,
						});

						this.$router.push(`/admin/exam`);
					}
				} catch (err) {
					alert("exam already exists with same form");
				}
			},

			async selectCourse(chapter_name) {
				let selectedCourse = this.chapters.find(
					(chapter) => chapter.chapter_name === chapter_name
				);
				this.assignment.chapterId = selectedCourse.id;
			},
		},

		computed: {
			...mapState({
				chapters: (state) => state.chapters.chapters,
				courses: (state) => state.courses.courses,
			}),

			...mapGetters({
				getChapterName: "chapters/getAllChapterName",
				getCourseName: "courses/getAllCourseName",
			}),

			chapterName() {
				return this.getChapterName();
			},

			courseName() {
				return this.getCourseName();
			},
		},
	};
</script>
