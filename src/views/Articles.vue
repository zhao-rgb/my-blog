<template>
	<div class="rows">
		<div class="zh-col-4" v-for="(article, index) in articles" :key="index">
			<!-- <div class="card zh-shadow flex flex-top-y"> -->
			<!-- <div class="card-image">
						<img :src="article.avatar" class="sub-titlee " alt="" />
						<span @click="toDetail(article.id)" class="card-title pointer">{{ article.title }}</span>
					</div>
					<div class="card-content article-content">
						<div class="content">
							
							<span>{{ article.content.slice(0, 50) }}...</span>
						</div>
					</div>
					<div class="card-tags">
							<i class="iconfont" style="color: #e53935;">&#xe633;</i>
							<span class="di">{{ article.diamond }}</span>
							<i class="iconfont" style="color: #e53935;">&#xe630;</i>
							<span class="jian">{{ article.likes }}</span>
							<i class="iconfont">&#xe666;</i>
							<span>{{ article.comments }}</span>
					</div> -->
			<div class="middle zh-shadow flex flex-top-y">
				<div class="wrap">
					<div class="front middle">
						<img :src="article.avatar" class="sub-titlee " alt="" />
						<span class="o border" style="color: white; text-align: center;margin: 30px;padding: 30px; background-color: rgb(40,44,53);">标题:{{ article.title }}</span>
						<div class="b">
							<i class="iconfont" style="color: #e53935;">&#xe633;</i>
							<span class="di" style="color: white;">{{ article.diamond }}</span>
							<i class="iconfont" style="color: #e53935;">&#xe630;</i>
							<span class="jian" style="color: white;">{{ article.likes }}</span>
							<i class="iconfont">&#xe666;</i>
							<span style="color: white;">{{ article.comments }}</span>
						</div>
					</div>
					<div class="back middle">						
						<div class="contact-info">
							<span style="color: white; text-align: center;padding: 20px; background-color: rgb(40,44,53); line-height: 30px;">简介:{{ article.content.slice(0, 70) }}...</span>						
							<span @click="toDetail(article.id)" class="card-title pointer border"><i class="iconfont">&#xe611;</i>阅读更多</span>				
						</div>
					</div>
				</div>
			</div>

			<!-- </div> -->
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
	.card-title{
	color: whitesmoke;
	 font-size: 18px; 
	font-weight: 700;
	}
.middle {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.wrap {
	width: 350px;
	height: 500px;
	position: relative;
	padding-bottom: 20px;
	margin: 20px;
}
.front,
.back {
	width: 100%;
	height: 100%;
	position: absolute;
	background: url(../assets/img/5.jpg);
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
.back .contact-info a {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	font-size: 20px;
	text-decoration: none;
	color: #2c3e50;
	border-radius: 50%;
}
.back .contact-info a:hover {
	color: white;
	background-color: #2c3e50;
}
.wrap:hover .front {
	transform: perspective(900px) rotateY(-180deg);
}
.wrap:hover .back {
	transform: perspective(900px) rotateY(00deg);
}

.card-image {
	width: 100%;
	height: 55%;
}
.sub-titlee {
	font-size: 15px;
	color: rgba(0, 0, 0, 0.6);
	width: 100%;
	height: 65%;
}
.o {
	height: 25%;
}
.b {
	height: 10%;
}
.rows {
	display: flex;
	flex-wrap: wrap;
}
.card {
	display: flex;
	flex-wrap: wrap;
	width: 60%;
	height: 520px;
	background-size: 100%, 100%;
	margin-bottom: 20px;
	padding: 20px;
}
.content {
	height: 20%;
}

.gg {
	cursor: pointer;
}

.di {
	margin-right: 15px;
}

.jian {
	margin-right: 15px;
}
.kk {
	padding-top: 125px;
}
.box {
	display: flex;
	justify-content: space-around;
	height: 70px;
	padding: 10px;
}
.btn-follow {
	background-color: #42c02e;
	font-weight: 400;
	font-size: 15px;
	color: #fff;
	padding: 5px 0;
	width: 80px;
	height: 30px;
	border-radius: 40px;
	display: inline-block;
	text-align: center;
}
.contact-info{
	display: flex;
	flex-direction: column;	
	align-items: center;
	margin: 10px;
}
span{
	margin-bottom: 130px;
}
</style>
