<template>
	<div style="text-align: center">
		<div class="img">
			<img src="error.jpg" alt="" />
		</div>
		<v-app dark>
			<h1 v-if="error.statusCode === 404">
				{{ pageNotFound }}
			</h1>
			<h1 v-else>
				{{ otherError }}
			</h1>

			<h2>We can't find the page you're looking for!</h2>
			<br />

			<nuxt-link class="link" to="/">
				<button class="btn">Take Me Home</button>
			</nuxt-link>
		</v-app>
	</div>
</template>

<style scoped>
.btn {
	background: rgb(123, 17, 223);
	padding: 20px;
	border-radius: 5px;
	border-color: whitesmoke;
	font-size: 25px;
	max-width: 10em;
}
.img {
	display: flex;
	justify-content: center;
	align-items: center;
}
.link:visited {
	color: whitesmoke;
}
.link:link {
	color: whitesmoke;
}
.link:hover {
	opacity: 0.7;
}
h1 {
	font-size: 90px;
	color: darkcyan;
}
h2 {
	font-size: 35px;
	color: darkblue;
}
</style>

<script>
export default {
	name: "EmptyLayout",
	layout: "empty",
	props: {
		error: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			pageNotFound: "404 Not Found",
			otherError: "An error occurred",
		};
	},
	head() {
		const title =
			this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
		return {
			title,
		};
	},
};
</script>
