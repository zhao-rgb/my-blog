A<template>	
	<div class="rows">	
		<div class="zh-col-8">
			<h3 class="border-bottom">热门文章</h3>
			<div class="rows">
				<div class="zh-col-6" v-for="(article, index) in articles" :key="index">
					<div class="card zh-shadow flex flex-top-y">
						<div id="yidong"></div>
						<div class="card-image">
							<img :src="article.avatar" class="sub-titlee " alt="" />							
						</div>
						<div class="card-content article-content">
							<span @click="toDetail(article.id)" class="zh-title pointer">标题:{{ article.title }}</span>
							<div class="content">
								<span class="zh-sub-title">{{ article.content.slice(0, 50) }}...</span>
							</div>
						</div>
						<div class="card-tags">
							<i class="iconfont" style="color: #e53935;">&#xe633;</i>
							<span class="di">{{ article.diamond }}</span>
							<i class="iconfont" style="color: #e53935;">&#xe630;</i>
							<span class="jian">{{ article.likes }}</span>
							<i class="iconfont">&#xe666;</i>
							<span>{{ article.comments }}</span>
						</div>
					
					</div>
					
				</div>
			</div>
		</div>

		<div class="zh-col-4 ">
			<h3 class="border-bottom">热门作者</h3>
			<div v-for="(user, index) in users" :key="index" class="row">
				<div class="zh-col-12 border box">
					<div class="flex-center-y"><img :src="user.avatar" class="avatar-xs bian" @click="toDetailuser(user.id)" /></div>
					<div class="flex-center-y">
						<p class="sub-title">{{ user.nickname }}</p>
						<p class="meta">{{ user.fans }}个粉丝</p>
						<p class="meta">写了{{ user.articles }}篇文章</p>
					</div>
					<div class="flex-center-y"><button class="zh-btn btn-follow">关注</button></div>
				</div>
			</div>
			<div class="biaoqian">
				<span>
					我们不停的翻弄着回忆，却再也找不回那时的自己 人生，是一场盛大的遇见。若你懂得，就请珍惜。 无论下多久的雨，最后都会有彩虹；无论你多么悲伤，要相信幸福在前方等候.
				</span>
			</div>
			
			
			<div class="music-size">			
				<video controls="" autoplay="" name="media"><source src="http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a" type="audio/mp4" /></video>
			</div>
			
			
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articles: [],
			users: [],
			topic: []
		};
	},
	created() {
		this.axios.get('http://localhost:8080/api/article/hot').then(res => {
			console.log(res.data.data);
			this.articles = res.data.data;
		});
		this.axios.get(this.GLOBAL.baseUrl + '/user/hot').then(res => {
			// console.log(res.data.data);
			this.users = res.data.data;
		});
		this.axios.get(this.GLOBAL.baseUrl + '/topic/hot').then(res => {
			// console.log(res.data.data);
			this.topic = res.data.data;
		});
	},
	methods: {
		toDetail(id) {
			this.$router.push('/article/detail/' + id);
		},
		toDetailuser(id) {
			this.$router.push('/user/detail/' + id);
		},
	
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
	.card-tags{
		margin-left: 60px;
	}	
	#yidong {
		border: 1px solid white;
		width: 10px;
		height: 10px;
		border-radius: 10px;
		position: relative;
		animation: move 5s infinite;
	}
	@keyframes move {
		0% {
			top: 0%;
			left: 0%;
			background: red;
		}
		25% {
			top: 0%;
			left: 100%;
			background: blue;
		}
		50% {
			top: 95%;
			left: 100%;
			background: yellow;
		}
		75% {
			top: 90%;
			left: -4%;
			background: green;
		}
		100% {
			top: 0px;
			left: -4%;
			background: deeppink;
		}
	}



.bian {
	cursor: pointer;
	-webkit-transition: width 2s, height 2s, -webkit-transform 2s;
	transition: width 2s, height 2s, transform 2s;
}
.bian:hover {
	-webkit-transform: rotate(360deg);
	transform: rotate(360deg);
}

.biaoqian {
	width: 100%;
	height: 200px;
	/* background: red; */
	position: relative;
	animation: mymove 5s infinite;
	-webkit-animation: mymove 5s infinite;
}
@keyframes mymove {
	0% {
		top: 0px;
	}
	25% {
		top: 200px;
	}
	75% {
		top: 50px;
	}
	100% {
		top: 100px;
	}
	from {
		background: #008000;
	}
	to {
		background: #555555;
	}
}

@-webkit-keyframes mymove {
	0% {
		top: 0px;
	}
	25% {
		top: 200px;
	}
	75% {
		top: 50px;
	}
	100% {
		top: 100px;
	}
	/* from {background: red;} */
}

.card-image {
	width: 100%;
	height: 55%;
	overflow: hidden;
	position: relative;
}
.sub-titlee {
	font-size: 15px;
	color: rgba(0, 0, 0, 0.6);
	width: 100%;
}
.rows {
	display: flex;
	flex-wrap: wrap;
}
.card {
	display: flex;
	flex-wrap: wrap;
	width: 80%;
	height: 420px;
	background-size: 100%, 100%;
	margin: 20px;
	padding: 20px;
	background-color: gainsboro;
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
@font-face {
	font-family: 'iconfont'; /* project id 1434161 */
	src: url('//at.alicdn.com/t/font_1434161_q5oz7ze3vja.eot');
	src: url('//at.alicdn.com/t/font_1434161_q5oz7ze3vja.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1434161_q5oz7ze3vja.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1434161_q5oz7ze3vja.woff') format('woff'), url('//at.alicdn.com/t/font_1434161_q5oz7ze3vja.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1434161_q5oz7ze3vja.svg#iconfont') format('svg');
}

.iconfont {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
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
</style>
