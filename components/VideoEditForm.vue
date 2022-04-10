<template>
	<v-form v-model="valid">
		<v-text-field
			v-model="video.title"
			label="Title"
			counter="50"
			:rules="[
				required('name'),
				minLength('name', 5),
				maxLength('name', 50),
			]"
		/>

		<!-- <v-text-field
			v-model="video.slug"
			label="slug"
			counter="50"
			:rules="[
				required('name'),
				minLength('name', 5),
				maxLength('name', 50),
			]"
		/>
		<v-textarea
			v-model="video.description"
			label="Description"
			counter="true"
			:rules="[required('description'), minLength('description', 20)]"
		/> -->
		<!-- <v-text-field
			v-model="video.src"
			label="Video URL"
			:rules="[required('video URL')]"
			hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo."
		/> -->

		<!-- price, duration, requirement, is_active, adminId -->
		<v-file-input
			label="Upload Video"
			filled
			accept="video/mp4, video/mkv"
			@change="fileSelected"
			ref="fileInput"
			prepend-icon="mdi-video"
		></v-file-input>
		<!-- <v-text-field
			type="number"
			v-model="video.price"
			label="Price"
			:rules="[required('price')]"
		/> -->

		<!-- <v-text-field
			v-model="video.duration"
			label="Duration"
			:rules="[required('course duration')]"
		/> -->

		<!-- <v-text-field
			v-model="video.requirement"
			label="Requirement"
			:rules="[required('basic requirement for course')]"
		/>
 -->
		<v-checkbox
			v-model="video.is_active"
			label="Is Active"
			color="info"
		></v-checkbox>
		<!-- :rules="[required('course is active')]" -->

		<!-- <v-text-field
			v-model="video.adminId"
			label="Instructor"
			:rules="[required('instructor')]"
		/> -->

		<v-btn @click="handleVideoUpload" :disabled="!valid">{{
			buttonText
		}}</v-btn>
	</v-form>
</template>

<script>
	import validations from "@/utils/validations";
	export default {
		props: ["video", "saveVideo", "buttonText"],
		data() {
			console.log(validations);
			return {
				valid: false,
				...validations,
				video: {
					title: "",
					file: null,
					is_active: false,
				},
			};
		},

		methods: {
			async handleVideoUpload() {
				let fd = new FormData();
				fd.append("srno", 1);
				fd.append("video", this.video.file, this.video.file.name);
				fd.append("title", this.video.title);
				fd.append("is_active", this.video.is_active);
				fd.append("chapterId", this.$route.params.id);

				// this.$axios
				// 	.post("/video/add", fd)
				// 	.then((response) => {
				// 		if (response.status === 200 || response.status === 204) {
				// 			alert("New Video Uploaded");
				// 			this.$router.push("../videos");
				// 		}
				// 	})
				// 	.catch((err) => console.log(err));

				try {
					let response = await this.$axios.post("/video/add", fd);
					if (response.status === 200 || response.status === 204) {
						this.$store.dispatch('videos/create', response.data.data);
						alert("New Video Uploaded");
						this.$router.push("../videos");
					}
				} catch (err) {
					(err) => console.log(err)
				}
			},

			fileSelected(video) {
				this.video.file = video;
			},
		},
	};
</script>
