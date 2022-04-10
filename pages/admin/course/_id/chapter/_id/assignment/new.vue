<template>
	<v-container fluid>
		<!-- <v-row> -->
		<v-form @submit.prevent="submitAssignment">

			<v-text-field
				v-model="assignment.src"
				label="Assignment Link"
				placeholder="Enter Google Form Link Here"
				autofocus
				outlined
				full-width
				:rules="[required('Assignment Link')]"
			></v-text-field>

			<v-checkbox
				label="Is Active"
				color="info"
				v-model="assignment.is_active"
			></v-checkbox>

			<v-btn type="submit" block large class="success">Save</v-btn>
		</v-form>
	</v-container>
</template>

<script>
	import validation from "@/utils/validations";

	export default {
		layout: "admin",
		data() {
			return {
				...validation,
				assignment: {
					src: "",
					is_active: false,
				},
			};
		},
		methods: {
			async submitAssignment() {
				// console.log(this.getCourseName());
				let assignmentDetails = {
					...this.assignment,
					chapterId: this.$route.params.id
				}

				try {
					const response = await this.$axios.post(
						"/misc/assignment/add",
						assignmentDetails
					);

					if (response.status === 200 || response.status === 204) {
						this.$store.dispatch("snackbar/setSnackbar", {
							text: `You have successfully created assignment`,
						});

						this.$router.go(-1);
					}
				} catch (err) {
					alert("error while creating assignment");
				}
			}
		}
	};
</script>
