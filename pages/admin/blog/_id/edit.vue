<template>
	<v-container fluid>
		<!-- <v-row> -->
		<v-form ref="form" @submit.prevent="updateBlog">
			<v-text-field
				v-model="blog.title"
				label="Blog Title"
				placeholder="Enter Blog Title Here"
				autofocus
				outlined
				full-width
				:rules="[
					required('Title'),
					minLength('Title', 5),
					maxLength('Title', 50),
				]"
				counter="50"
			></v-text-field>

			<v-text-field
				v-model="blog.slug"
				label="Slug"
				placeholder="Enter Slug Here"
				outlined
				full-width
				counter="24"
				:rules="[
					required('Slug'),
					minLength('Slug', 5),
					maxLength('Slug', 24),
				]"
			></v-text-field>

			<v-textarea
				v-model="blog.body"
				label="Body"
				placeholder="Enter Blog Here"
				outlined
				full-width
				rows="10"
				counter="2500"
				:rules="[
					required('Body'),
					minLength('Body', 5),
					maxLength('Body', 2500),
				]"
			></v-textarea>

			<!-- <v-file-input
				label="Thumbnail for Blog"
				filled
				prepend-icon="mdi-camera"
			></v-file-input> -->

			<!-- <v-text-field
				v-model="blog.author"
				:value="blog.author"
				label="Author"
				outlined
				full-width
				readonly
			></v-text-field> -->

			<v-btn type="submit" block large class="success">Save</v-btn>
		</v-form>
	</v-container>
</template>

<script>
	import validation from "@/utils/validations";
	import { mapState } from "vuex";

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
				...validation,
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
				if (this.$refs.form.validate()) {
					if (this.blogAlreadyExists() === true) {
						alert("Blog Already Exists");
					} else {
						try {
							const response = await this.$axios.put(
								`/blog/edit/${this.$route.params.id}`,
								this.blog
							);
							if (
								response.status === 200 ||
								response.status === 204
							) {
								this.$store.dispatch("snackbar/setSnackbar", {
									text: `You have successfully updated blog`,
								});
								this.$router.push(`/admin/blog`);
							}
						} catch ({ response }) {
							alert(response.data.msg);
						}
					}
				}
			},

			blogAlreadyExists() {
				for (let i = 0; i < this.allBlogs.length; i++) {
					if (
						this.allBlogs[i].title.toLowerCase() ==
							this.blog.title.toLowerCase() ||
						this.allBlogs[i].slug.toLowerCase() ==
							this.blog.slug.toLowerCase()
					) {
						return true;
					}
				}
				return `Nothing`;
			},
		},
		computed: {
			...mapState({
				allBlogs: (state) => state.blogs.blogs,
			}),
		},
	};
</script>
