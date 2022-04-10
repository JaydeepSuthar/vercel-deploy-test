<template>
	<v-container fluid>
		<!-- <v-row> -->
		<v-form @submit.prevent="updateBlog">
			<v-text-field
				v-model="blog.title"
				label="Blog Title"
				placeholder="Enter Blog Title Here"
				autofocus
				outlined
				full-width
			></v-text-field>

			<v-text-field
				v-model="blog.slug"
				label="Slug"
				placeholder="Enter Slug Here"
				outlined
				full-width
				counter="15"
			></v-text-field>

			<v-textarea
				v-model="blog.body"
				label="Body"
				placeholder="Enter Blog Here"
				outlined
				full-width
				rows="10"
			></v-textarea>

			<!-- <v-file-input
				label="Thumbnail for Blog"
				filled
				prepend-icon="mdi-camera"
			></v-file-input> -->

			<v-text-field
				v-model="blog.author"
				:value="blog.author"
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
	async asyncData({ $axios, params }) {
		// FIXME: NOT WORKING
		const response = await $axios.get(`/blog/${params.id}`);
		const blog = response.data.data;
		// console.log(data);
		return {
			blog,
		};
	},
	data() {
		return {
			blog: {
				title: "",
				slug: "",
				body: "",
				author: "Jaydeep Suthar",
			},
		};
	},
	methods: {
		async updateBlog() {
			const response = await this.$axios.post("/blog/add", this.blog);

			if (true) {
				console.log(`new blog created`);
			}
			this.$router.push(`/admin/blog`);
		},
	},
};
</script>
