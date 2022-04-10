<template>
	<v-container class="d-flex flex-column pa-2">
		<h2 class="display-2 text-center mt-10 mb-10">Dashboard</h2>

		<div class="card-wrapper justify-center">
			<DashboardCard
				v-if="users > 0"
				id="total-user"
				:primaryText="users"
				subText="Registered Users"
			/>
			<DashboardCard
				v-if="instructors > 0"
				id="total-instructor"
				:primaryText="instructors"
				subText="Instructors"
				color="#00796B"
			/>
			<DashboardCard
				v-if="courses > 0"
				id="total-course"
				:primaryText="courses"
				subText="Courses"
				color="#00C853"
			/>
			<DashboardCard
				v-if="blogs > 0"
				id="total-blog"
				:primaryText="blogs"
				subText="Blogs"
				color="#512DA8"
			/>
		</div>

		<!-- <v-btn color="success" outlined small @click="getAdminSecret">Get Secret</v-btn> -->
	</v-container>
</template>

<script>
export default {
	layout: "admin",
	async asyncData({ $axios }) {
		let response = await $axios.get("/misc/stats");
		let allStats = response.data.stats;
		console.log(allStats);
		return {
			...allStats,
		};
	},

	methods: {
		async getAdminSecret() {
			let secret = await this.$axios.get("/admin/secret");
			console.log(secret);
		},
	},
};
</script>

<style lang="scss" scoped>
.card-wrapper {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
</style>
