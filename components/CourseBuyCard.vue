<template>
	<div>
		<v-card elevation="6" width="340px" class="ma-2">
			<nuxt-img
				:src="course.thumbnail"
				width="250"
				height="250"
				:modifiers="{ roundCorner: 'max' }"
			/>

			<v-card-title class="mt-3">₹{{ course.price }}</v-card-title>

			<v-card-actions>
				<v-btn @click="addToCart" color="light">Add to Cart</v-btn>
				<v-btn @click="buyNow" color="primary">Buy Now</v-btn>
			</v-card-actions>

			<hr />
			<v-card-text>
				<strong>What is included</strong> <br />

				50 Lessons <br />
				Certificate
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
	name: "CourseBuyCard",
	props: ["course"],
	methods: {
		async addToCart() {
			try {
				let response = await this.$axios.post("/cart/add", {
					course_id: this.$route.params.id,
				});

				alert(response.data.msg);
				if (response.data.is_success == true) {
				}
			} catch ({ response }) {
				alert(response.data.msg);
			}
		},

		async buyNow() {
			await this.addToCart();
			this.$router.push("/cart");
		},
	},
};
</script>
