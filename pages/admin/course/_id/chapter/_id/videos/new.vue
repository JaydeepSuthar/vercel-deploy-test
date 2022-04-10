<template>
	<v-container fluid>
		<v-row>
			<v-col md="6" cols="12">
				<h1>Video Create Page</h1>
				<VideoEditForm
					:video="video"
					:saveVideo="createVideo"
					buttonText="Create Video"
				/>
			</v-col>
			<v-col md="9" cols="12">
				<!-- <VideoListVideo :video="video" /> -->
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
//   import VideoListVideo from '@/components/VideoListVideo.vue';
//   import VideoEditForm from '@/components/VideoEditForm.vue';

export default {
	layout: "admin",
	data() {
		return {
			video: {
				title: "Nuxt Master Class",
				slug: "nuxt-masterclass",
				description:
					"Learn how to build robust, modern websites with Nuxt from scratch. Or improve your website performance, code quality, while making better use of the framework.",
				thumbnail: "vue.png",
				price: 500,
				duration: "1 Month",
				requirement: "Basic Internet Connection",
				is_active: true,
				adminId: "61d03e796e7ebb2f3b138317",
			},
		};
	},
	components: {
		//   VideoListVideo,
		//   VideoEditForm,
	},
	methods: {
		async createVideo() {
			let video = await this.$store.dispatch("videos/create", this.video);
			this.$store.dispatch("snackbar/setSnackbar", {
				text: `You have successfully created a new video, ${video.name}.`,
			});
			this.$router.push(`/watch/${video.id}`);
		},
	},
};
</script>
