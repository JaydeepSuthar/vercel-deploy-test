<template>
  <v-container>
    <h1>Create Instructor</h1>

    <UserAuthForm
      buttonText="Create Instructor"
      :submitForm="createAdminUser"
      :hasName="true"
    />
  </v-container>
</template>


<script>
export default {
  layout: "admin",
  methods: {
    async createAdminUser(registrationInfo) {
      try {
        const registerInstructor = await this.$axios.post(
          "/admin/add",
          registrationInfo
        );

        if (
          registerInstructor.status === 200 ||
          registerInstructor.status === 204
        ) {
          // console.log(`lOGGED IN USER: ${ JSON.stringify(registerInstructor, null, 2) }`);
          let user = registerInstructor.data.data;

          // this.$auth.$storage.setUniversal('user', user);
          // this.$auth.setUser(user);
          this.$router.go(-1);
        }
      } catch ({ response }) {
        alert(response.data.msg);
        this.$store.dispatch("snackbar/setSnackbar", {
          text: `Cannot Create Instructor`,
        });
      }
    },
  },
};
</script>
