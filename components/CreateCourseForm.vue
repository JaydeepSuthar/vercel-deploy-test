<template>
	<v-form ref="form">
		<v-row>
			<v-col cols="12" sm="6" md="6">
				<v-text-field
					outlined
					v-model="course.title"
					label="Title"
					counter="50"
					:rules="[
						required('Title'),
						minLength('Title', 5),
						maxLength('Title', 50),
					]"
				/>
			</v-col>
			<v-col cols="12" sm="6" md="6">
				<v-text-field
					outlined
					v-model="course.slug"
					label="slug"
					counter="50"
					:rules="[
						required('Slug'),
						minLength('Slug', 5),
						maxLength('Slug', 24),
					]"
				/>
			</v-col>
			<v-col cols="12" sm="12" md="12">
				<v-textarea
					outlined
					v-model="course.description"
					label="Description"
					counter="true"
					:rules="[
						required('description'),
						minLength('description', 20),
					]"
				/>
			</v-col>
			<v-col cols="12">
				<v-file-input
					@change="uploadImgToCloudinary"
					filled
					prepend-icon="mdi-camera"
				></v-file-input>
			</v-col>
			<v-col cols="12" sm="6" md="4">
				<v-text-field
					outlined
					type="number"
					v-model="course.price"
					label="Price"
					:rules="[required('Price')]"
				/>
			</v-col>

			<v-col cols="12" sm="6" md="4">
				<v-text-field
					outlined
					v-model="course.duration"
					label="Duration"
				/>
				<!-- :rules="[required('Course duration')]" -->
			</v-col>

			<v-col cols="12" sm="6" md="4">
				<v-text-field
					outlined
					v-model="course.requirement"
					label="Requirement"
				/>
				<!-- :rules="[required('basic requirement for course')]" -->
			</v-col>

			<v-col cols="12">
				<v-checkbox
					v-model="course.is_active"
					label="Is Active"
					color="info"
				></v-checkbox>
			</v-col>

			<!-- <v-col cols="12">
			<v-text-field
				outlined
				readonly
				v-model="course.adminId"
				label="Instructor"
			/>
		</v-col> -->

			<v-col cols="12">
				<v-btn class="success" x-large block @click="handleSubmit"
					>Create Course</v-btn
				>
				<!-- <v-btn class="mt-5" @click="fillForm">add random data</v-btn> -->
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
import validation from "@/utils/validations";

import { mapState } from "vuex";

export default {
	name: "CourseCreateForm",
	data() {
		return {
			valid: false,
			...validation,
			course: {
				title: "",
				slug: "",
				description: "",
				thumbnail: "",
				price: "",
				duration: "",
				requirement: "",
				is_active: "",
				adminId: "",
			},
		};
	},
	methods: {
		async uploadImgToCloudinary(file) {
			// console.log(`E: ` + e);
			// const file = e.target.files[0];

			/* Make sure file exists */
			if (!file) return;
			const readData = (f) =>
				new Promise((resolve) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result);
					reader.readAsDataURL(f);
				});

			/* Read data */
			const data = await readData(file);

			/* upload the converted data */
			const instance = await this.$cloudinary.upload(data, {
				folder: "courses",
				uploadPreset: "beap-img",
			});
			this.course.thumbnail = instance.url;
		},
		async handleSubmit() {
			if (this.$refs.form.validate()) {
				if (this.courseAlreadyExists() === true) {
					alert("Course Already Exists");
				} else {
					try {
						let currentlyLoggedInUserId =
							this.$auth.$storage.getLocalStorage("user").id;
						const response = await this.$axios.post("/course/add", {
							...this.course,
							adminId: currentlyLoggedInUserId,
						});
						this.$store.dispatch("snackbar/setSnackbar", {
							text: `You have successfully created course`,
						});

						console.log(response.data);
						if (response.data.is_success === true) {
							this.$router.push("/admin/course");
						}
					} catch ({ response }) {
						alert(response.data.error);
					}
				}
			}
		},
		courseAlreadyExists() {
			for (let i = 0; i < this.allCourses.length; i++) {
				if (
					this.allCourses[i].title.toLowerCase() ==
						this.course.title.toLowerCase() ||
					this.allCourses[i].slug.toLowerCase() ==
						this.course.slug.toLowerCase()
				) {
					return true;
				}
			}
			return `Nothing`;
		},
	},
	computed: {
		...mapState({
			allCourses: (state) => state.courses.courses,
		}),
	},
};
</script>
