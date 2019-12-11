<template>
	<div class="row">
		<div v-for="(item, index) in articles" :key="index" class="zh-col-12">
			<div class="zh-media-wraaper zh-shadow m">
				<div class="zh-media-left">
					<img :src="item.avatar" class="avatar-lg link" />
					<p>{{ item.nickname }}</p>
					<strong>来自</strong>
					<p>{{ item.topicName }}</p>
				</div>
				<div class="zh-media-middle">
					<p @click="toDetail(item.id)" class="pointer">
						<!-- <span>{{ item.id }}</span> -->
						{{ item.title }}
					</p>
					<p class="sub-title link">{{ item.summary }}</p>
					<p>
						<span class="meta">{{ item.comments }}评论</span>
						<span class="meta">{{ item.likes }}喜欢</span>
					</p>
				</div>
				<div class="zh-media-right"><img :src="item.thumbnail" class="thumnail-xs" /></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articles: [],
			keywords: ''
		};
	},
	created() {
		this.keywords = this.$route.query.keywords;
		console.log(this.keywords);
		this.axios
			.get(this.GLOBAL.baseUrl + '/article/', {
				params: {
					keywords: this.keywords
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.articles = res.data.data;
			});
	},
	methods: {
		toDetail(id) {
			this.$router.push('/article/detail/' + id);
		}
	}
};
</script>

<style></style>
