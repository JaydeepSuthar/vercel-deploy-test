<template>
  <div class="main">
    <div class="logo">
      <a href="http://localhost:3000/"
        ><v-avatar size="70">
          <nuxt-img src="logo2.png" />
        </v-avatar>
      </a>
    </div>
    <div>
      <ul>
        <div
          v-if="this.$store.state.auth.loggedIn"
          id="loggedIn"
          class="tw-flex tw-flex-row tw-gap-5 tw-mr-5"
        >
          <li><nuxt-link to="/me"> Profile</nuxt-link></li>

          <li><nuxt-link to="/me/learning"> Learning</nuxt-link></li>

          <li><nuxt-link to="/learn"> Courses</nuxt-link></li>
          <li><nuxt-link to="/blogs">Blog</nuxt-link></li>
          <li><nuxt-link to="/about"> About</nuxt-link></li>
          <li>
            <nuxt-link to="/contact"> Contact Us</nuxt-link>
          </li>
          <li>
            <v-icon @click="() => this.$router.push('/cart')" color="white">
              mdi-cart
            </v-icon>
          </li>

          <li>
            <!-- <nuxt-link to="/login"> -->

            <button
              @click="logOut"
              class="
                tw-bg-slate-400
                tw-p-2
                tw-rounded-md
                tw-text-white
                tw-font-semibold
                tw-text-base
              "
            >
              LogOut
            </button>
            <!-- </nuxt-link> -->
          </li>
        </div>

        <div v-else id="notLoggedIn" class="tw-flex tw-flex-row tw-gap-7">
          <li><nuxt-link to="/learn"> Courses</nuxt-link></li>
          <li><nuxt-link to="/blogs">Blog</nuxt-link></li>
          <li><nuxt-link to="/about"> About</nuxt-link></li>
          <li>
            <nuxt-link to="/contact"> Contact Us</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/login">
              <button
                class="
                  tw-p-2
                  tw-rounded-md
                  tw-text-white
                  tw-font-semibold
                  tw-text-base
                "
              >
                Login
              </button>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/signup">
              <button
                class="
                  tw-bg-green-500
                  tw-p-2
                  tw-rounded-md
                  tw-text-white
                  tw-font-semibold
                  tw-text-base
                "
              >
                Register
              </button>
            </nuxt-link>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.main {
  background: #292828;
  max-width: 100%;
  height: 80px;
  top: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.logo {
  cursor: pointer;
  margin-left: 20px;
  margin-top: 10px;
}

ul {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  font-family: "Roboto", sans-serif;
  gap: 2rem;
  font-size: 25px;
  color: white;
  background: inherit;
  cursor: pointer;
}

li {
  list-style: none;
}

ul button {
  padding: 7px;
  background: darkgrey;
  border: 1px solid darkgray;
  border-radius: 30px;
  color: white;
  cursor: pointer;
}
ul button:hover {
  opacity: 0.7;
}
a:link {
  color: white;
  text-decoration: none;
}
a:visited {
  color: white;
  text-decoration: none;
}
a:hover {
  color: gray;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
</style>
<script>
export default {
  name: "Navbar",
  methods: {
    logOut() {
      this.$auth.$storage.removeUniversal("user");
      this.$auth.logout();
      // let resposne = await this.$axios.delete("/user/logout");
      window.localStorage.clear();
      this.$cookies.removeAll();
      // console.log(resposne);
      // this.$router.push("/");
    },
  },
};
</script>
