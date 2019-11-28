<template>
		<div class="zh-container border">
			<h3>题:{{ article.title }}</h3>
			<div class="box">
					<img :src="getImages(article.avatar)" class="avatar-xs">
					<span class="media gutter">{{ article.nickname }}</span>
					<span class="media gutter">发表于{{ article.publishTime.date.year }}年{{ article.publishTime.date.month }}月{{ article.publishTime.date.day }}日</span>
			</div>
			<div class="container-right">
				<div class="tu">
					<span>热度{{ article.diamond }}评论数{{ article.comments }}喜欢{{ article.likes }}</span>
				</div>
				<div class="card"><p v-html="text"></p></div>
			</div>
		</div>
</template>

<script>
export default {
	data() {
		return {
			articleDetail: null,
			article: null,
			text: null
		};
	},
	created() {
		//获取网页地址url
		var query = window.location.href;
		//锁定到最后一个"/"的位置
		var begin = query.lastIndexOf('/') + 1;
		//取出地址中最后的id值
		var articlesId = query.substring(begin);
		//获取对应文章的详细内容
		this.axios.get('http://localhost:8080/api/article/detail/' + articlesId).then(res => {
			console.log(res.data.data);
			this.articleDetail = res.data.data;
			this.article = this.articleDetail[0];
			this.text = this.articleDetail[0].text;
		});
	},
	methods: {
		// 解决403图片缓存问题
		getImages(_url) {
			if (_url) {
				let _u = _url.substring(8);
				return 'https://images.weserv.nl/?url=' + _u;
			}
		}
	},
	computed: {}
};
</script>

<style scoped>
.box{
		height: 50px;
		line-height: 50px;
	}
.container-b {
	display: flex;
	flex-wrap: wrap;
}
</style>
