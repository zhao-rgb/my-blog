<template>
	<div>
		<div class="container">
			<div class="container-left">
				<div class="img"><img :src="getImages(articleDetail.cover)" alt="" /></div>

				<div class="container-right">
					<div class="tu">
						<p>题:{{ articleDetail.title }}</p>
						<h5>发表于{{ articleDetail.publishTime.date.year }}年{{ articleDetail.publishTime.date.month }}月{{ articleDetail.publishTime.date.day }}日</h5>
						<span>热度{{ articleDetail.diamond }}评论数{{ articleDetail.comments }}喜欢{{ articleDetail.likes }}</span>
					</div>

					<div class="card"><p v-html="text"></p></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articleDetail: null,
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
			this.articleDetail = res.data.data;
			this.text = this.articleDetail.text;
		});
	},
	methods: {
		getImages(_url) {
			return 'https://images.weserv.nl/?url=' + _url;
		}
	},
	computed: {}
};
</script>

<style></style>
