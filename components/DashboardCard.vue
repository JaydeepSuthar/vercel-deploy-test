<template>
	<v-card
		class="card d-flex flex-column justify-center align-center"
		:color="color"
	>
		<p class="white--text display-4 font-weight-bold">{{ primaryText }}</p>
		<p class="white--text">{{ subText }}</p>
	</v-card>
</template>

<script>
	export default {
		name: "DashboardCard",
		props: {
			primaryText: {
				type: [Number, String],
				default: "0",
			},
			subText: {
				type: [Number, String],
				default: "Sub Text",
			},
			color: {
				type: [Number, String],
				default: "#0097A7",
			},
		},
	};
</script>

<style scoped>
	.card {
		height: 15rem;
		width: 20rem;
		display: inline-block;
		margin: 10px;
	}
</style>
