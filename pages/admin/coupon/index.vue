<template>
	<div id="coupon">
		<v-card>
			<v-card-title>
				All Coupon
				<v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search Discount Coupon "
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
		</v-card>

		<v-data-table
			:search="search"
			:headers="headers"
			:items="coupon"
			:items-per-page="10"
			class="mt-5 elevation-3"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<!-- <v-toolbar-title class="display-1 text-decoration-underline"
						>All Blogs</v-toolbar-title
					> -->
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-spacer></v-spacer>

					<v-btn class="success" to="/admin/coupon/new" exact nuxt
						>Add New Coupon</v-btn
					>

				</v-toolbar>
			</template>
			<!-- eslint-ignore-next-line -->
			<template v-slot:item.actions="{ item }">
				<v-btn
					small
					:to="`./blog/${item.id}/edit`"
					class="mr-2 warning"
					nuxt
				>
					<v-icon small class="mr-2" @click="editItem(item)">
						mdi-pencil </v-icon
					>Edit</v-btn
				>
				<!-- <v-btn small @click="deleteBlog(item)" class="mr-2 error">
					<v-icon small @click="deleteItem(item)"> mdi-delete </v-icon
					>Delete</v-btn
				> -->
				<!-- <v-btn small class="info" @click="showChapter(item)">Chapters</v-btn> -->
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	layout: "admin",
	async asyncData({ $axios, store }) {
		// FIXME:
		let response = await $axios(`/course/coupon`);
		let coupon = await response.data.data;
		return {
			coupon,
		};
	},

	data() {
		return {
			search: "",
			showDialog: false,
			headers: [
				{
					text: "Title",
					align: "start",
					sortable: false,
					value: "coupon_title",
				},

				{ text: "Coupon Code", value: "coupon_code" },
				{ text: "Discount", value: "discount" },
				// { text: "start", value: "start" },
				{ text: "end", value: "valid_till" },
				// { text: "Actions", value: "actions", sortable: false },
			],
			coupon: [],
		};
	},
	methods: {
		closeDialogBox(value) {
			this.showDialog = value;
		},

		async editBlog(coupon) {
			console.log(`Discount couponEdit Successfully: ${Assignments.id}`);
		},

		async deleteBlog(coupon) {
			let confirmation = confirm(
				`Are you sure you want to delete ${Assignments.title}`
			);

			if (confirmation) {
				const response = await this.$axios.delete(
					`/coupon/delete/${coupon.id}`
				);

				console.log(`coupon Deleted Successfully: ${response.data}`);

				this.$store.dispatch("snackbar/setSnackbar", {
					text: `You have successfully deleted your Assignment, ${coupon.title}.`,
				});

				// TODO: NOT THE MOST EFFECIENT WAY
				this.$nuxt.refresh();
			}
		},
	},
};
</script>
