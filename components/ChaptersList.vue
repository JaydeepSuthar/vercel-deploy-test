<template>
	<div class="syllabus">
		<v-list>
			<v-list-group v-for="chapter in chapters" :key="chapter.id">
				<template v-slot:activator>
					<v-list-item-title>{{
						chapter.chapter_name
					}}</v-list-item-title>
				</template>
				<v-list-item v-for="video in chapter.videos" :key="video.id">
					{{ video.title }}
				</v-list-item>
			</v-list-group>
		</v-list>
	</div>
</template>

<script>
export default {
	name: 'ChapterList',
	props: ['chapters']
}
</script>
