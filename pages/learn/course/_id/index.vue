<template>
  <div>
    <NavigationBar />

    <v-container id="course-details">
      <v-row>
        <v-col id="course-details-content" cols="12" sm="8" md="8">
          <h2>{{ course.title }}</h2>
          <p>{{ course.description }}</p>

          <h3>Syllabus</h3>
          <div class="syllabus">
            <v-list>
              <v-list-group v-for="chapter in chapters" :key="chapter.id">
                <template v-slot:activator>
                  <v-list-item-title>
                    {{ chapter.chapter_name }}
                  </v-list-item-title>
                </template>

                <v-list-item v-for="video in chapter.videos" :key="video.id">
                  <v-icon left>mdi-video</v-icon>

                  {{ video.title }}
                </v-list-item>
              </v-list-group>
            </v-list>
          </div>

          <div class="instructor-details">
            <h2>Instructor</h2>

            <div class="avtar-with-name">
              <v-avatar size="36px">
                <img
                  alt="Avatar"
                  src="https://avatars.githubusercontent.com/u/52647252?v=4&s=460"
                />
              </v-avatar>
              <strong class="ml-3">{{ course.admin.name }}</strong>
            </div>
          </div>
        </v-col>
        <v-col id="course-buy-content" cols="12" sm="4" md="4">
          <CourseBuyCard :course="course" />
        </v-col>
        <FAQ />
        <br />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  async fetch({ store, params }) {
    await store.dispatch("videos/loadAllVideoOfCourse", params.id);
  },
  methods: {
    getCourseId() {
      console.log(this.params);
    },

    getVideos() {
      console.log(this.chapters);
    },
  },
  computed: {
    ...mapState({
      chapters: (state) => state.videos.videos,
    }),

    ...mapGetters({
      getCourse: "courses/get",
    }),

    course() {
      return this.getCourse(this.$route.params.id);
    },
  },
};
</script>
