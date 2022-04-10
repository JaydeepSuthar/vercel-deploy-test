<template>
  <div>
    <v-card>
      <CreateChapterDialog
        :chapters="chapters"
        :dialog="showCreateDialog"
        @closeDialog="showCreateDialog = !showCreateDialog"
      />
      <UpdateChapterDialog
        :dialog="showUpdateDialog"
        :chapterId="chapterId"
        @closeDialog="showUpdateDialog = !showUpdateDialog"
      />
      <v-card-title>
        All Chapters
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Chapters"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    </v-card>

    <v-card>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="chapters"
        :items-per-page="5"
        class="mt-10 elevation-3"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-btn class="success" @click="showCreateDialog = !showCreateDialog"
              >Add Chapters</v-btn
            >
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn x-small class="mr-2 warning" @click="editChapter(item)"
            >Edit</v-btn
          >
          <v-btn x-small @click="deleteChapter(item)" class="mr-2 error"
            >Delete</v-btn
          >
          <v-btn x-small :to="`./chapter/${item.id}/videos`" class="info" nuxt
            >Videos</v-btn
          >
          <v-btn
            x-small
            :to="`./chapter/${item.id}/assignment`"
            class="info"
            nuxt
            >Assignments</v-btn
          >
          <!-- <v-btn x-small class="info" @click="addAssignment(item)"
						>Assignment</v-btn
					> -->
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  layout: "admin",
  async fetch({ params, store }) {
    await store.dispatch("chapters/loadAllChapters", params.id);
  },
  data() {
    return {
      search: "",
      showCreateDialog: false,
      showUpdateDialog: false,
      chapterId: null,
      headers: [
        // ! uncomment it later
        // { text: "Sr No.", value: "srno" },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "chapter_name",
        },
        { text: "No. of Videos", value: "_count.videos" },
        { text: "No. of Assignment", value: "_count.assignments" },
        { text: "is_active", value: "is_visible" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async deleteChapter(chapter) {
      console.table(chapter);
      let confirmation = confirm(
        `Are you sure you want to delete ${chapter.chapter_name}`
      );

      if (confirmation) {
        this.$store.dispatch("chapters/delete", chapter);
        this.$store.dispatch("snackbar/setSnackbar", {
          text: `You have successfully deleted your chapter, ${chapter.chapter_name}.`,
        });
      }
    },
    editChapter(chapter) {
      this.chapterId = chapter.id;
      this.showUpdateDialog = !this.showUpdateDialog;
    },
  },
  computed: {
    ...mapState({
      chapters: (state) => state.chapters.chapters,
    }),
  },
};
</script>
