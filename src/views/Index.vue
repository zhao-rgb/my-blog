<template>
	<div class="zh-row">
		<div class="zh-col-8">
			<div class="media" v-for="(article, index) in articles" :key="index">
				<div class="media-left">
					<p @click="toDetail(article.id)" class="gg">{{ article.title }}</p>
					<span class="zh-meta">{{ article.content }}</span>
				</div>

				<div class="media-right">
					<img :src="article.avatar" class="sub-title" />
				</div>
			</div>
		</div>
		<div class="zh-col-2"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articles: []
		};
	},
	created() {
		this.axios.get('http://localhost:8080/api/articles/hot').then(res => {
			console.log(res.data.data);
			this.articles = res.data.data;
		});
	},
	methods: {
		toDetail(id) {
				this.$router.push('/article/detail/' + id)
			}
	},
	computed: {
		// 解决403图片缓存问题
				getImages(_url) {
					return 'https://images.weserv.nl/?url=' + _url;
				}
	}
};
</script>

<style scoped>
.media {
		display: flex;
		align-items: stretch;
		justify-content: flex-start;
		border-bottom: 1px solid #ddd;
		border-radius: 5px;
		background-color: #fff;
		margin-bottom: 5px;
		padding-top: 5px;		
	}
.media-left{
		flex: 1 1 60%;
		
}
.media-right{
	
	flex: 1 1 30%;
}
.gg{
	cursor: pointer;
}
</style>
