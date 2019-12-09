<template>
	<div>
		<!-- <div class="zh-navv"> -->
		<!-- <div class="example">
			<img src="../assets/img/2.jpg">
			<h1>我不养猫，我只养你</h1>			
		</div> -->
		<!-- </div> -->
		<div class="all">
			<div class="zh-navs">
				<div class="zh-nav-bar zh-fx-between">
					<ul class="zh-list">
						<li><router-link to="/index">主页</router-link></li>
						<li>发现</li>
						<li>等你来答</li>
						
					</ul>
					
				</div>
			</div>
			<div class="zh-containers border">
				<h3>题:{{ article.title }}</h3>
				<div class="box">
					<img :src="getImages(article.avatar)" class="avatar-xs" @click="toDetail(article.userId)" />
					<span class="media gutter">{{ article.nickname }}</span>
					<span class="media gutter">发表于{{ article.publishTime.date.year }}年{{ article.publishTime.date.month }}月{{ article.publishTime.date.day }}日</span>
				</div>
				<div class="container-right">
					<div class="tu">
						<i class="iconfont" >&#xe633;</i>
						<span class="di">{{ article.diamond }}</span>
						<i class="iconfont" >&#xe630;</i>
						<span class="jian">{{ article.likes }}</span>
						<i class="iconfont">&#xe666;</i>
						<span>{{ article.comments }}</span>
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
		},
		toDetail(id) {
			this.$router.push('/user/detail/' + id);
		}
	},
	computed: {}
};
</script>

<style scoped>
	.card{
		text-indent: 2em;
		font-weight: 700;
	}
	h3{
		text-align: center;
	}
.zh-navs {
	height: 70px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	background-color: rgba(7,84,154);
	cursor: pointer;
}
li{
	margin-left: 60px;
}
.all {
	background-image: url(../assets/img/top.jpg);
	background-size: calc(100%);
}
.box {
	height: 50px;
	line-height: 50px;
	text-align: center;
}
.container-b {
	display: flex;
	flex-wrap: wrap;
}

.zh-containers {
	width: 80%;
	margin: auto;
	margin-top: 70px;
	/* background-color: rgba(234, 234, 234); */
}
.di {
	margin-right: 15px;
}

.jian {
	margin-right: 15px;
}
.tu{
	text-align: center;
}
@font-face {
  font-family: 'iconfont';  /* project id 1434161 */
  src: url('//at.alicdn.com/t/font_1434161_q5oz7ze3vja.eot');
  src: url('//at.alicdn.com/t/font_1434161_q5oz7ze3vja.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1434161_q5oz7ze3vja.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1434161_q5oz7ze3vja.woff') format('woff'),
  url('//at.alicdn.com/t/font_1434161_q5oz7ze3vja.ttf') format('truetype'),
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
</style>
