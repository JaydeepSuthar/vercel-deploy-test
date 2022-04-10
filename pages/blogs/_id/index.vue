<template>
	<div>
		<navbar />
		<v-card>
			<v-container>
				<h2>{{ blog.title }}</h2>
			</v-container>
		</v-card>
		<v-card>
			<v-container>
				<nuxt-img
					:src="blog.thumbnail"
					:alt="blog.title"
					:modifiers="{ roundCorner: 'max' }"
				/>
				<p>
					{{ blog.body }}
				</p>
			</v-container>
		</v-card>

		<ftr />
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters({
			getBlog: "blogs/get",
		}),

		blog() {
			return this.getBlog(this.$route.params.id);
		},
	},
};
</script>
