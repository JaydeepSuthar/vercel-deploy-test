<template>
  <div id="blog">
    <v-card>
      <v-card-title>
        All Blog
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Blog"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    </v-card>

    <v-data-table
      :search="search"
      :headers="headers"
      :items="blogs"
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

          <v-btn class="success" to="./blog/new" nuxt>Add Blog</v-btn>
        </v-toolbar>
      </template>
      <!-- eslint-ignore-next-line -->
      <template v-slot:item.actions="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)">
					mdi-pencil
				</v-icon> -->
        <v-btn small :to="`./blog/${item.id}/edit`" class="mr-2 warning" nuxt
          >Edit</v-btn
        >
        <v-btn small @click="deleteBlog(item)" class="mr-2 error">Delete</v-btn>
        <!-- <v-btn small class="info" @click="showChapter(item)">Chapters</v-btn> -->
        <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
      </template>
    </v-data-table>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  layout: "admin",
  async fetch({ store }) {
    await store.dispatch("blogs/loadAllBlogs");
  },

  computed: {
    ...mapState({
      blogs: (state) => state.blogs.blogs,
    }),
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
          value: "title",
        },
        { text: "Slug", value: "slug" },
        // { text: "Is_active", value: "is_active" },
        // { text: "Tags", value: "tags" },
        { text: "Author", value: "admin.name" },
        { text: "Actions", value: "actions", sortable: false },
        // { text: "Duration(in Months)", value: "duration" },
        // { text: "Price", value: "price" },
      ],
    };
  },
  methods: {
    closeDialogBox(value) {
      this.showDialog = value;
    },

    async editBlog(blog) {
      console.log(`Blog Edit Successfully: ${blog.id}`);
    },

    async deleteBlog(blog) {
      let confirmation = confirm(
        `Are you sure you want to delete ${blog.title}`
      );

      if (confirmation) {
        const response = await this.$axios.delete(`/blog/delete/${blog.id}`);

        console.log(`Blog Deleted Successfully: ${response.data}`);

        this.$store.dispatch("snackbar/setSnackbar", {
          text: `You have successfully deleted your blog, ${blog.title}.`,
        });

        // TODO: NOT THE MOST EFFECIENT WAY
        this.$nuxt.refresh();
      }
    },
  },
};
</script>
