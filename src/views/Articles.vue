<template>
	<div>
	<h3 class="wbc">文章</h3>	
	<div class="rows">
		<div class="zh-col-3" v-for="(article, index) in articles" :key="index"> 
			<div class="middle flex flex-top-y">
				<div class="wrap border">
					<div class="front middle">
						<img :src="article.avatar" class="sub-titlee" alt="" />	
						<div class="a">
							<span class="title">标题:{{ article.title }}</span>
						</div>																
						<div class="b">
							<i class="iconfont" style="color: #e53935;">&#xe633;</i>
							<span class="di" style="color: white;">{{ article.diamond }}</span>
							<i class="iconfont" style="color: gray;">&#xe630;</i>
							<span class="jian" style="color: white;">{{ article.likes }}</span>
							<i class="iconfont">&#xe666;</i>
							<span style="color: white;">{{ article.comments }}</span>
						</div>
					</div>
					<div class="back middle">						
						<div class="contact-info">
							<span class="description">简介:{{ article.content.slice(0, 70) }}...</span>						
							<span @click="toDetail(article.id)" class="card-title pointer border" style="font-weight: 600;"><i class="iconfont">&#xe611;</i>阅读更多</span>				
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
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
		this.axios.get(this.GLOBAL.baseUrl + '/article/hot').then(res => {
			console.log(res.data.data);
			this.articles = res.data.data;
		});
	},

	methods: {
		toDetail(id) {
			this.$router.push('/article/detail/' + id);
		}
	},

	computed: {
		// 解决403图片缓存问题
		getImages(_url) {
			if (_url) {
				let _u = _url.substring(8);
				return 'https://images.weserv.nl/?url=' + _u;
			}
		}
	}
};
</script>

<style scoped>
	.iconfont{
		margin: 5px;
	}
.middle {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;	
}
.wrap {
	width: 300px;
	height: 450px;
	position: relative;
	padding-bottom: 20px;
	margin: 20px;
}
.front,
.back {
	border-radius: 5px;
	margin: 10px;
	width: 93%;
	height: 95%;
	position: absolute;
	background-size: cover;	
	backface-visibility: hidden;
	box-shadow: 0 0 10px #2c3e50;
	transition: 0.8s;
}
.front {
	transform: perspective(900px) rotateY(0deg);
}
.back {
	transform: perspective(900px) rotateY(180deg);
}
.wrap:hover .front {
	transform: perspective(900px) rotateY(-180deg);
}
.wrap:hover .back {
	transform: perspective(900px) rotateY(00deg);
}
.sub-titlee {
	width: 200px;
	height: 200px;
}
.rows {
	display: flex;
	flex-wrap: wrap;
	width: 95%;
	margin: auto;
}
.contact-info{
	display: flex;
	flex-direction: column;	
	align-items: center;
	margin: 20px;
}
.description{
	margin-top: 60px;
	line-height: 2em;
	font-weight: 600;
}
span{
	margin-bottom: 80px;
}
</style>
