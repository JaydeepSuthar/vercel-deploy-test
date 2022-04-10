<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<v-card>
				<v-card-title>
					<span class="text-h5">Create Course</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<CreateCourseForm />
					</v-container>
					<small class="error--text">*indicates required field</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog = false">
						Close
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>

	export default {
		props: ["dialog"],
	};
</script>
