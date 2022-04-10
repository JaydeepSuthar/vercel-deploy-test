<template>
  <div>
    <div class="home">
      <div class="display-4 ma-4 d-flex justify-center">All Courses</div>
      <div class="d-flex flex-wrap">
        <div v-for="video in videos" :key="video.id">
          <video-list-video :video="video" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoListVideo from "~/components/VideoListVideo.vue";
export default {
  components: { VideoListVideo },
  name: "IndexPage",
  computed: {
    ...mapState({
      videos: (state) => state.videos.videos,
    }),
  },
};
</script>
