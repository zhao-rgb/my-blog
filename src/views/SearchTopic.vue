<template>
	<div class="row">
		<div v-for="(item, index) in topics" :key="index" class="zh-col-12">
			<div class="zh-media-wraaper zh-shadow">
				<div class="zh-media-left">
					<img :src="item.logo" class="avatar-lg link" />
					<p>{{ item.topicName }}</p>
				</div>
				<div class="zh-media-middle">
					<p>{{ item.description.slice(0, 30) }}</p>
					<p>
						<span class="meta gutter">{{ item.articles }}篇文章</span>
						<span class="meta gutter">{{ item.follows }}人关注</span>
					</p>
				</div>
				<div class="zh-media-right"><button class="btn btn-lg btn-rd warning-fill">关注</button></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			topics: [],
			keywords: ''
		};
	},
	created() {
		this.keywords = this.$route.query.keywords;
		console.log(this.keywords);
		this.axios
			.get(this.GLOBAL.baseUrl + '/topic/', {
				params: {
					keywords: this.keywords
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.topics = res.data.data;
			});
	},
	methods: {}
};
</script>

<style></style>
