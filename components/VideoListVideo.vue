<template>
	<div class="card-container">
		<v-card width="340px" hover class="ma-2" :to="`/watch/${video.id}`">
			<!-- :to="{ name: 'video-watch', params: { id: video.id } }" -->
			<v-img :src="`${process.env.BACKEND_URL}/static/img/${video.thumbnail}`" />
			<v-card-title>{{ video.title }} </v-card-title>
			<v-card-text>
				<!-- something -->
			</v-card-text>
			<v-card-actions>
				<!-- <span v-for="tag_id in video.tags" :key="tag_id">
					<v-btn
						color="green lighten-2"
						class="mr-2"
						small
						:to="`/tags/${tag_id}`"
						@mousedown.stop
					>
						{{ tag_id }}
					</v-btn>
				</span> -->
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
	export default {
		name: 'VideoListVideo',
		props: ['video'],
	}
</script>
