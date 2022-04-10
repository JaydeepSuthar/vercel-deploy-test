<template>
	<div class="cart">
		<navbar />
		<v-app>
			<v-container>
				<v-row>
					<v-col cols="12" sm="6" md="6">
						<v-card>
							<v-container>
								<h2>Items in Cart</h2>
								<v-divider> </v-divider>

								<div class="cart-items">
									<v-list three-line>
										<template
											v-for="(item, index) in cartItems"
										>
											<v-list-item :key="index">
												<nuxt-img
													:src="item.thumbnail"
													width="50"
													height="50"
													:modifiers="{
														roundCorner: 'max',
													}"
													class="mr-5"
												/>

												<v-list-item-content>
													<v-list-item-title>
														{{ item.title }}
													</v-list-item-title>
													<v-list-item-subtitle>
														&#8377;
														{{ item.price }}
													</v-list-item-subtitle>
													<v-icon
														@click="
															() =>
																removeItemFromCart(
																	item.id
																)
														"
														style="
															position: absolute;
															right: 25px;
														"
														>mdi-trash-can</v-icon
													>
													<hr />
												</v-list-item-content>
											</v-list-item>
										</template>
									</v-list>
								</div>
							</v-container>
						</v-card>
					</v-col>
					<v-spacer></v-spacer>
					<v-col cols="12" sm="6" md="5">
						<v-card>
							<v-container>
								<h2 style="text-align: center">Payment</h2>
								<v-divider> </v-divider> <br />

								<v-row>
									<v-col md="9">
										<v-text-field
											label="Coupon code"
											outlined
											autofocus
											placeholder="Enter Cupon Code"
											v-model="coupon"
										/>
										<v-btn
											@click="checkCouponIsValidOrNot"
											color="primary"
											>Apply</v-btn
										>
									</v-col>
								</v-row>
								<p class="mt-5">
									Gross Amount: Rs. {{ totalPrice }}
								</p>
								<p v-show="this.couponApplied" class="mt-5">
									Discount: Rs. {{ this.discount }}
								</p>
								<p class="mt-5">
									Net Payable Amount: Rs.
									<span v-if="totalPrice - this.discount > 0">
										{{ totalPrice - this.discount }}
									</span>
									<span v-else>1</span>
								</p>

								<br />
								<v-btn
									@click="pay"
									class="btn success"
									large
									block
									>Pay</v-btn
								>
							</v-container>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-app>
	</div>
</template>

<script>
export default {
	middleware: "auth-user",
	async asyncData({ $axios }) {
		let response = await $axios("/cart");
		let cartItemFromBackend = response.data.data;

		let courseInCart = cartItemFromBackend.map(
			(item) => item.Course_details
		);

		return {
			cartItems: courseInCart,
		};
	},
	data() {
		return {
			coupon: "",
			script: `https://checkout.razorpay.com/v1/checkout.js`,
			cartItems: [],
			couponApplied: false,
			discount: 0,
			pay_id: "",
		};
	},
	methods: {
		async removeItemFromCart(id) {
			console.log(id);
			let response = await this.$axios.post("/cart/delete", { id: id });

			if (response.status == 200 || response.status == 204) {
				this.$nuxt.refresh();
			}
		},
		async checkCouponIsValidOrNot() {
			try {
				let response = await this.$axios.post("/course/coupon/check", {
					coupon: this.coupon,
				});

				alert(`coupon is applied`);

				if (response.data.is_success == true) {
					this.couponApplied = true;
					this.discount = response.data.data;
				}
			} catch ({ response }) {
				console.log(response);

				if (response.status == 400) {
					alert(response.data.msg);
				}
			}
		},

		async loadRazorPay() {
			return new Promise((resolve) => {
				const script = document.createElement("script");
				script.src = this.script;
				script.onload = () => {
					resolve(true);
				};
				script.onerror = () => {
					resolve(false);
				};
				document.body.appendChild(script);
			});
		},

		async handlePaymentSuccess(response, order) {
			// console.log(response)
			let paymentVerifyResponse = await this.$axios.post(
				"/payment/success",
				{
					payment_id: response.razorpay_payment_id,
					orderDetails: order,
				}
			);

			if (
				paymentVerifyResponse.status === 200 ||
				paymentVerifyResponse.status === 204
			) {
				this.$router.push("/me/learning");
			} else {
				alert("error in payment. please try again after some time");
			}
		},

		async pay() {
			const result = await this.loadRazorPay();
			if (!result) {
				alert("Failed to load razorpay script");
				return;
			}

			let paymentResponse = await this.$axios.post("/payment/create", {
				discount: this.discount,
			});
			let orderDetails = paymentResponse.data.data;

			const paymentObject = new window.Razorpay({
				key: `rzp_test_WdCmBIvGEANsUe`,
				...paymentResponse.data.data,
				handler: (response) => {
					this.handlePaymentSuccess(response, orderDetails);
				},
			});
			paymentObject.open();
		},
	},

	computed: {
		totalPrice() {
			let price = 0;
			this.cartItems.map((item) => (price += item.price));
			return price;
		},
	},
};
</script>

<style scoped>
.cart {
	background: #292928;
	color: whitesmoke;
}

.btn {
	border-radius: 10px;
	padding: 20px;
	font-size: 15px;
}
</style>
