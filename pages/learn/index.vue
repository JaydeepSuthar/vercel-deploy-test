<template>
  <div class="wrapper tw-bg-slate-50">
    <NavigationBar />
    <section
      class="
        tw-header
        tw-h-44
        tw-flex
        tw-bg-slate-900
        tw-flex-row
        tw-justify-center
        tw-items-center
      "
    >
      <p class="greeting__text tw-text-5xl tw-text-white">
        Welcome to Be A Programmer
      </p>
    </section>

    <!-- <section class="display__course">
			Course List Here
			<CourseList
				imgUrl="https://picsum.photos/250/250"
				title="My New Course"
				price="500"
			/>
		</section> -->

    <section>
      <div class="home">
        <div class="display-2 ma-4 d-flex justify-center">All Courses</div>
        <div id="courese-list">
          <CourseList :courses="courses" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavigationBar from "~/components/NavigationBar.vue";
import CourseList from "../../components/CourseList.vue";
export default {
  components: { CourseList, NavigationBar },
  name: "IndexPage",
  computed: {
    ...mapState({
      courses: (state) => state.courses.courses,
    }),
  },
};
</script>
