<template>
	<div>
		<navbar />
		<h1>Blogs</h1>

		<BlogList :blogs="blogs" />
		<br />
		<br />

		<ftr />
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	async fetch({ store }) {
		await store.dispatch("blogs/loadAllBlogs");
	},

	computed: {
		...mapState({
			blogs: (state) => state.blogs.blogs,
		}),
	},
};
</script>

<style scoped>
h1 {
	text-align: center;
	font-size: 80px;
	color: rgb(17, 201, 185);
}
</style>
