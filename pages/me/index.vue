<template>
	<v-container>
		<v-row id="user-header">
			<v-col id="profile-photo">
				<nuxt-img src="/user.png" class="tw-rounded-full" />
			</v-col>
			<v-col id="user-details tw-h-full">
				<div
					class="tw-h-full tw-flex tw-flex-col tw-gap-4 tw-translate-y-1/2"
				>
					<h3>Name: {{user.name}}</h3>

					<p>Email: {{ user.email }}</p>
				</div>
			</v-col>
		</v-row>
		<v-row align-content="center">
			<v-tabs grow center-active>
				<v-tab>Personal Details</v-tab>
				<!-- <v-tab>Learning</v-tab>
				<v-tab>Certificate</v-tab> -->

				<v-tab-item>
					<br />

					<v-form ref="form" class="tw-p-3">
						<v-row>
							<v-col sm="12" md="10">
								<v-text-field
									v-model="user.name"
									label="name"
									outlined
									:disabled="this.disableInputBox"
									:rules="[required('Name')]"
								>
								</v-text-field>
							</v-col>
						</v-row>

						<v-row>
							<v-col sm="12" md="10">
								<v-text-field
									v-model="user.email"
									label="email"
									:disabled="this.disableInputBox"
									outlined
									:rules="[required('Email')]"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col sm="12" md="10">
								<v-text-field
									v-model="user.contact"
									label="Contact no"
									outlined
									:disabled="this.disableInputBox"
									:rules="[required('Contact Number')]"
								></v-text-field>
							</v-col>
						</v-row>
						<!-- <v-row>
							<v-col sm="12" md="10">
								<v-text-field
									v-model="user.password"
									label="Password"
									outlined
									:disabled="this.disableInputBox"
									type="password"
								></v-text-field>
							</v-col>
						</v-row> -->
						<v-row>
							<v-col sm="12" md="10">
								<v-textarea
									v-model="user.address"
									label="address"
									outlined
									:disabled="this.disableInputBox"
								></v-textarea>
							</v-col>
						</v-row>

						<v-row>
							<v-col sm="12" md="10">
								<!-- <v-text-field
									label="qualification"
									outlined
								></v-text-field> -->
								<v-select
									:items="qual"
									v-model="user.qualification"
									label="Qualification"
									:disabled="this.disableInputBox"
									outlined
								>
								</v-select>
							</v-col>
						</v-row>

						<v-btn
							v-if="this.disableInputBox"
							@click="toggleEditData"
							class="success"
						>
							Edit Data</v-btn
						>
						<div v-else>
							<v-btn @click="updateUserData" class="success">
								Save</v-btn
							>
							<v-btn class="primary" @click="cancelEditing">
								cancel</v-btn
							>
						</div>
					</v-form>
				</v-tab-item>
				<!-- <v-tab-item id="Learning"> Learning </v-tab-item> -->
				<!-- <v-tab-item id="Certificate"> Certificate </v-tab-item> -->
			</v-tabs>
		</v-row>
	</v-container>
</template>

<script>
import validation from "@/utils/validations";

export default {
	name: "Profile",
	middleware: "auth-user",
	async asyncData({ $axios }) {
		let response = await $axios.get("/misc/me");
		let user = response.data.data;

		return {
			user,
		};
	},
	data: () => ({
		valid: false,
		...validation,
		disableInputBox: true,
		qual: ["higher_secondary", "under_graduate", "post_graduate"],
	}),
	methods: {
		toggleEditData() {
			this.disableInputBox = !this.disableInputBox;
		},
		async updateUserData() {
			if (this.$refs.form.validate()) {
				let response = await this.$axios.patch(
					"/user/update",
					this.user
				);
				if (response.status == 204 || response.status == 200) {
					this.$nuxt.refresh();
					this.toggleEditData();
				}
			} else {
				alert(`Please Fill the Form Correctly`);
			}
		},
		cancelEditing() {
			this.$nuxt.refresh();
			this.toggleEditData();
		},
	},
};
</script>
