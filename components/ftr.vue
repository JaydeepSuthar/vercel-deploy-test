<template>
  <div
    style="background: rgb(22, 22, 22); color: whitesmoke; text-align: center"
  >
    <div class="man">
      <div>
        <a href="http://localhost:3000/"
          ><v-avatar id="avatar" class="mb-4" size="70">
            <img src="logo2.png" alt=""
          /></v-avatar>
        </a>

        <br />
        <h2>
          Learn to code interactively <br />
          without ever leaving your browser.
        </h2>
        <br />
        <br />
        <v-avatar class="mb-4" size="40">
          <img src="git.png" alt=""
        /></v-avatar>
        &nbsp; &nbsp;

        <v-avatar class="mb-4" size="40">
          <img src="linkdin.png" alt=""
        /></v-avatar>
        &nbsp; &nbsp;
        <v-avatar class="mb-4" size="40">
          <img src="insta.jpg" alt=""
        /></v-avatar>
        &nbsp; &nbsp;

        <v-avatar class="mb-4" size="40"> <img src="fb.png" alt="" /></v-avatar>
      </div>
      <div>
        <v-container>
          <v-container>
            <h3>Solution</h3>
            <ul>
              <br />
              <li><nuxt-link to="/learn"> Learning paths</nuxt-link></li>
              <br />
              <li>
                <nuxt-link to="/learn"
                  >Become a full stack web developer</nuxt-link
                >
              </li>
              <br />

              <li>
                <nuxt-link to="/contact"
                  >What programming language should I learn?</nuxt-link
                >
              </li>
              <br /></ul
          ></v-container>
        </v-container>
      </div>
      <div>
        <v-container
          ><v-container>
            <h3>Support</h3>
            <ul>
              <br />
              <li>
                <nuxt-link to="/contact">Contact us</nuxt-link>
              </li>
              <br />
              <li>
                <nuxt-link to="#">FAQ</nuxt-link>
              </li>
              <br />
              <li><nuxt-link to="/signup">Create A free Account</nuxt-link></li>
            </ul>
          </v-container>
        </v-container>
      </div>
      <div>
        <v-container
          ><v-container>
            <h3>Company</h3>
            <ul>
              <br />
              <li><nuxt-link to="/blogs">Blog</nuxt-link></li>
              <br />
            </ul>
          </v-container>
        </v-container>
      </div>
      <div>
        <v-container>
          <v-container>
            <h3>Legal</h3>
            <ul>
              <br />

              <li><nuxt-link to="#"> Privacy</nuxt-link></li>
              <br />
              <li><nuxt-link to="#">Terms</nuxt-link></li>
              <br />
            </ul>
          </v-container>
        </v-container>
      </div>
    </div>
    <hr size="6" width="100%" color="white" />

    <br />

    © BEAP™ 2022 | All rights reserved.
    <br />
    <br />
  </div>
</template>
<style scoped>
.man {
  background: rgb(22, 22, 22);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: whitesmoke;
  justify-content: space-between;
}

ul li {
  list-style: none;
}

a:link {
  color: whitesmoke;
  text-decoration: none;
}
a:hover {
  color: white;
  text-decoration: underline;
}
a:visited {
  color: whitesmoke;
  text-decoration: none;
}

h3 {
  font-size: 25px;
}
nuxt-link:hover {
  color: gray;
}
</style>
