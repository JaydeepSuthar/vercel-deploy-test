<template>
	<v-container fluid>
		<!-- <v-row> -->
		<v-form @submit.prevent="submitBlog">
			<v-text-field
				v-model="Exams.title"
				label="AssignmentTitle"
				placeholder="Enter Exam Title Here"
				autofocus
				outlined
				full-width
			></v-text-field>
			<v-file-input v-model="Exams.file" label="Exam's File" counter>
			</v-file-input>

			<v-checkbox
				label="Is Active"
				color="info"
				v-model="Exams.is_visible"
			></v-checkbox>

			<v-text-field
				v-model="Exams.author"
				:value="Exams.author"
				label="Author"
				outlined
				full-width
				readonly
			></v-text-field>

			<v-btn type="submit" block large class="success">Save</v-btn>
		</v-form>
	</v-container>
</template>

<script>
export default {
	layout: "admin",
	data() {
		return {
			Exams: {
				title: "",
				file: "",

				is_active: "",
				author: "Fahad Jariwala",
			},
		};
	},
	methods: {
		async submitBlog() {
			const response = await this.$axios.post("/exam/add", this.exam);

			if (true) {
				console.log(`new Examcreated`);
			}
			this.$router.push(`/admin/exam`);
		},
	},
};
</script>
