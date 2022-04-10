<template>
	<div>
		<div class="parent">
			<navbar />
			<section>
				<div class="middle">
					<div class="intro">
						<h1>
							Learn <br />
							Programming
						</h1>
						<br />
						Build projects, practice and learn to code from scratch
						without leaving your browser . <br /><br /><br />

						<nuxt-link to="/learn"
							><button>Explore Couse Library</button></nuxt-link
						>
					</div>
					<div class="vid">
						<div class="wrapper">
							<video controls class="video" autoplay>
                <source src="https://www.youtube.com/watch?v=EjavYOFoJJ0" type="video/mp4" />
              </video>
							<!-- <iframe
								width="560"
								height="315"
								src="https://www.youtube-nocookie.com/embed/EjavYOFoJJ0"
								title="YouTube video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe> -->
						</div>
					</div>
				</div>
				<div class="extra">
					<h1>GET OUT OF THE TUTORIAL HELL</h1>
					<br />
					<p style="margin: 20px">
						You have read about "Practice makes a man perfect", but
						you still learn by watching hours of videos. For the
						first time ever, you can experience an interactive
						course completely online - a perfect blend of theory and
						practice right inside your browser. 10x more engaging,
						higher quality, cheaper, and a stellar experience for
						visual learners. <br /><br />
						<br /><br />
					</p>
				</div>
			</section>
		</div>
		<ftr />
	</div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
	margin: 0;
	font-family: "Roboto", sans-serif;
}

.parent {
	display: flex;
	flex-direction: column;
	color: aliceblue;
	flex-shrink: 0;
	margin: 0;
	background: #292928;
	box-sizing: border-box;
	font-size: 20px;
}

.middle {
	display: flex;
	justify-content: space-between;
}

.video {
	width: 100%;
	height: 100%;
	object-fit: contain;
	display: inline-block;
}
.wrapper {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

button {
	border-radius: 25px;
	background: rgb(35, 35, 158);
	border: 2px solid rgb(35, 35, 158);
	color: whitesmoke;
	padding: 20px;
}
button:hover {
	opacity: 0.7;
}
.vid {
	width: 60vw;
	background: inherit;
}

.intro {
	width: 40vw;
	background: inherit;
	text-align: center;
	user-select: none;
}
.intro h1 {
	font-size: 60px;
}

.extra {
	display: flex;
	flex-direction: column;
	flex-basis: 450px;
	text-align: justify;
	padding-top: 30px;
	background: white;
	color: black;
	user-select: none;
}

.extra h1 {
	color: rgb(248, 124, 8);
	font-size: 30px;
}
</style>

<script>
export default {
	name: "IndexPage",
};
</script>
