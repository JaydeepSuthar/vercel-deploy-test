<template>
	<v-container fluid>
		<!-- <v-row> -->
		<v-form @submit.prevent="submitExam">
			<v-text-field
				v-model="exams.title"
				label="Exam Title"
				placeholder="Enter Exam Title Here"
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
				v-model="exams.form_link"
				label="Exam Link"
				placeholder="Enter Google Form Link Here"
				autofocus
				outlined
				full-width
				:rules="[required('Exam Link')]"
			></v-text-field>

			<v-select
				:items="this.courseName"
				label="Course List"
				@change="selectCourse"
				placeholder="Select Course"
				outlined
				:rules="[required('Course')]"
			></v-select>

			<v-checkbox
				label="Is Active"
				color="info"
				v-model="exams.is_active"
			></v-checkbox>

			<!-- <v-text-field
				v-model="exams.author"
				:value="exams.author"
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
			await store.dispatch("courses/loadAllCourses");
		},
		data() {
			return {
				...validation,
				exams: {
					title: "",
					form_link: "",
					courseId: "",
					is_active: false,
					// author: "Fahad Jariwala",
				},
			};
		},
		methods: {
			async submitExam() {
				// console.log(this.getCourseName());
				try {
					const response = await this.$axios.post(
						"/course/exam/add",
						this.exams
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

			async selectCourse(course_name) {
				let selectedCourse = this.courses.find(course => course.title === course_name);
				this.exams.courseId = selectedCourse.id;
			}
		},

		computed: {
			...mapState({
				courses: (state) => state.courses.courses,
			}),
			...mapGetters({
				getCourseName: "courses/getAllCourseName",
			}),

			courseName() {
				return this.getCourseName();
			},
		},
	};
</script>
