<template>
	<v-container fluid>
		<!-- <v-row> -->
		<v-form @submit.prevent="generateCoupon">
			<v-text-field
				v-model="coupon.title"
				label="Coupon Name"
				placeholder="Enter Coupon Name"
				autofocus
				outlined
				full-width
			></v-text-field>

			<v-text-field
				v-model="coupon.discount"
				label="Discount in (%)"
				placeholder="Enter to discount Ratio"
				autofocus
				type="number"
				outlined
				full-width
			></v-text-field>

			<v-text-field
				v-model="coupon.code"
				label=" Unique Code"
				placeholder="Enter Unique  Coupon Code"
				autofocus
				outlined
				full-width
			></v-text-field>

			<!-- <h2>Offer Start from</h2> -->

			<v-spacer> </v-spacer>
			<!-- <v-date-picker
				v-model="coupon.startpicker"
				label="Start From"
				color="green lighten-1"
			></v-date-picker> -->
			<h2>Offer End At</h2>
			<v-spacer> </v-spacer>

			<v-date-picker
				v-model="coupon.endpicker"
				label="End Date"
				:min="new Date().toISOString().substr(0, 10)"
				color="green lighten-1"
			></v-date-picker>

			<!-- <v-text-field
				v-model="coupon.author"
				:value="coupon.author"
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
export default {
	layout: "admin",
	data() {
		return {
			coupon: {
				title: "",
				// item: "",
				discount: '',
				startpicker: new Date().toISOString().substr(0, 10),
				valid_till: new Date().toISOString().substr(0, 10),
				is_active: "",
				// author: "Fahad Jariwala",
			},
		};
	},
	methods: {
		async generateCoupon() {
			const response = await this.$axios.post(
				"/course/coupon/generate",
				this.coupon
			);

			if (response.status === 200 || response.status === 204) {
				alert('New Coupon Generated');
				this.$router.push('/admin/coupon');
			}
			// this.$router.push(`/admin/coupon`);
		},
	},
};
</script>
