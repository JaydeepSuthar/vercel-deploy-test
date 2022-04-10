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
			<!-- <v-col cols="12">
				<v-file-input
					@change="uploadImgToCloudinary"
					filled
					prepend-icon="mdi-camera"
				></v-file-input>
			</v-col> -->
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
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
import validation from "@/utils/validations";
import { mapGetters } from "vuex";

export default {
	name: "UpdateCreateForm",
	data() {
		return {
			valid: false,
			...validation,
		};
	},
	methods: {
		async handleSubmit() {
			if (this.$refs.form.validate()) {
				let course = await this.$store.dispatch(
					"courses/edit",
					this.course
				);
				this.$store.dispatch("snackbar/setSnackbar", {
					text: `You have successfully updated course`,
				});
				this.$router.push("/admin/course");
			}
		},
	},

	computed: {
		...mapGetters({
			getCourse: "courses/get",
		}),

		course() {
			return this.getCourse(this.$route.params.id);
		},
	},
};
</script>
