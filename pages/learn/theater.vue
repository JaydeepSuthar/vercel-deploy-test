<template>
	<div class="wrapper">
		<video controls class="video" autoplay>
			<source src="how.mp4" type="video/mp4" />
		</video>
	</div>
</template>

<style scoped>
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
</style>
<script>
export default {
	layout: "theater",
};
</script>
