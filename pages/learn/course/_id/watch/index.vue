<template>
	<v-main>
		<v-row>
			<v-col md="9" cols="12">
				<div
					class="video-player-box"
					ref="videoPlayer"
					v-video-player:myVideoPlayer="playerOptions"
				></div>
			</v-col>
			<v-col md="3" cols="12">
				<div class="syllabus">
					<v-list>
						<v-list-group
							v-for="chapter in chapters"
							:key="chapter.id"
						>
							<template v-slot:activator>
								<v-list-item-title>{{
									chapter.chapter_name
								}}</v-list-item-title>
							</template>

							<v-list-item
								v-for="video in chapter.videos"
								:key="video.id"
								@click="setVideoSource(video)"
							>
								{{ video.title }}
							</v-list-item>
						</v-list-group>
					</v-list>

					<v-btn :href="this.exam" target="_blank" class="danger"
						>Exam</v-btn
					>
					<!-- {{ this.videoSource }} -->
				</div>
			</v-col>
		</v-row>
		<v-row align-content="center">
			<v-col cols="9">
				<v-tabs grow center-active>
					<v-tab>Description</v-tab>
					<v-tab>Assignment</v-tab>
					<!-- <v-tab>Summary</v-tab> -->

					<v-tab-item>
						<v-card>
							<v-container
								><h3>Description</h3>
								<p>
									this course is about to learn programing,
									this course is about to learn
									programing,this course is about to learn
									programing, this course is about to learn
									programing,this course is about to learn
									programing,this course is about to learn
									programing,
								</p></v-container
							>
						</v-card></v-tab-item
					>
					<v-tab-item>
						<v-container>
							<h3>Assignments</h3>

							<v-list>
								<v-list-item
									v-for="item in assignments"
									:key="item.id"
									:href="item.src"
									target="_blank"
								>
									{{ item.src }}
								</v-list-item>
							</v-list>
						</v-container>
					</v-tab-item>
					<!-- <v-tab-item>
					<v-container><h3>Summary</h3></v-container>
				</v-tab-item> -->
				</v-tabs>
			</v-col>
		</v-row>
	</v-main>
</template>

<script>
import "video.js/dist/video-js.css";

import Vue from "vue";
import { mapGetters, mapState } from "vuex";

// If used in nuxt.js/ssr, you should keep it only in browser build environment
if (process.browser) {
	const VueVideoPlayer = require("vue-video-player/dist/ssr");
	Vue.use(VueVideoPlayer);

	window.addEventListener(
		"contextmenu",
		function (e) {
			// do something here...
			e.preventDefault();
		},
		false
	);
}

export default {
	middleware: "watch-gaurd",
	async fetch({ store, params }) {
		await store.dispatch("videos/loadAllVideoOfCourse", params.id);
	},
	data() {
		return {
			videoSource: "",
			assignments: [],
			exam: "",
		};
	},
	async mounted() {
		this.videoSource = this.chapters[0].videos[0].src;
		let response = await this.$axios.get(
			`/misc/assignments/${this.$route.params.id}`
		);
		let examResponse = await this.$axios.get(
			`/misc/exam/${this.$route.params.id}`
		);

		this.exam = await examResponse.data.data;
		this.assignments = await response.data.data;
	},
	methods: {
		getCourseId() {
			console.log(this.params);
		},

		getVideos() {
			console.log(this.chapters);
		},

		async setVideoSource(video) {
			let videoSrc = video.src;

			this.videoSource = videoSrc;

			// await this.$axios.post("/watch/set", { src: videoSrc });
			// location.reload();
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

		playerOptions() {
			return {
				// videojs options
				language: "en",
				playbackRates: [0.25, 0.5, 1.0, 1.25, 1.5],
				sources: [
					{
						type: "video/mp4",
						src: `${process.env.BACKEND_URL}/video/${this.videoSource}`,
					},
				],
				poster: `${process.env.BACKEND_URL}/static/img/nodejs.png`,
				fluid: true,
			};
		},
	},
};
</script>
