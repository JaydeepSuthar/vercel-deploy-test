<template>
	<v-container>
		<v-row>
			<v-col
				v-for="course in courses"
				:key="course.id"
				xl="4"
				lg="4"
				md="4"
				sm="6"
			>
				<v-card
					width="340px"
					hover
					class="ma-2"
					:to="`/learn/course/${course.id}`"
				>
					<nuxt-img
						:src="course.thumbnail"
						width="300"
						height="300"
						:modifiers="{ roundCorner: 'max' }"
					/>
					<v-card-title>{{ course.title }}</v-card-title>
					<v-card-subtitle>₹ {{ course.price }}</v-card-subtitle>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "CourseList",
	props: ["courses"],
	methods: {
		showCourseList() {
			console.log(this.courses);
		},
	},
};
</script>
