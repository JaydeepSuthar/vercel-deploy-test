<template>
	<div>
		<v-card v-for="blog in blogs" :key="blog.id" hover class="ma-2">
			<div class="blog" id="bloglist">
				<div class="img">
					<nuxt-img
						height="300"
						width="300"
						:src="blog.thumbnail"
						:alt="blog.title"
					/>
				</div>
				<div class="contn">
					<v-container>
						<h2>{{ blog.title }}</h2>
						<p class="chars">{{ blog.body }}</p>
						<v-btn class="success" :to="`/blogs/${blog.id}`">
							Read more
						</v-btn>
					</v-container>
				</div>
			</div>
		</v-card>
	</div>
</template>

<script>
export default {
	name: "BlogList",
	props: ["blogs"],
};
</script>

<style scoped>
.blog {
	display: flex;
}
.img {
	width: 40%;
}
.contn {
	width: 60%;
	background: #292928;
	color: whitesmoke;
}
.chars {
	width: 500ch;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
