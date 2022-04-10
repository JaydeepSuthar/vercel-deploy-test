<template>
	<section id="my-learning">
		<NavigationBar />
		<v-container>
			<v-list v-if="this.courseList.length > 0">
				<v-list-items v-for="item in this.courseList" :key="item.id">
					<v-card class="mb-5" hover>
						<v-row>
							<v-col cols="3">
								<nuxt-img
									:src="item.thumbnail"
									width="200"
									height="200"
									:modifiers="{ roundCorner: 'max' }"
								/>
							</v-col>
							<v-col cols="8">
								<v-card-title>{{ item.title }}</v-card-title>
								<v-card-actions>
									<v-btn
										:to="`/learn/course/${item.id}/watch`"
										class="primary"
										>Continue Learning</v-btn
									>
								</v-card-actions>
							</v-col>
						</v-row>
					</v-card>
				</v-list-items>
			</v-list>

			<div
				v-else
				class="tw-min-h-screen tw-flex tw-justify-center tw-items-center"
			>
				<p
					class="main__text tw-font-semibold tw-opacity-40 tw-text-4xl"
				>
					You Haven't Enrolled in any Courses
				</p>
			</div>
		</v-container>
	</section>
</template>

<script>
export default {
	middleware: "auth-user",
	data: () => ({
		courseList: [],
	}),
	async fetch() {
		const response = await this.$axios(`/misc/learning`);
		const data = await response.data.data;
		data.map((item) => this.courseList.push(item));
		console.log(this.courseList);
	},
};
</script>
