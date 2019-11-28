<template>
	<div class="zh-row">
		<div class="zh-col-8">
			<div class="media" v-for="(article, index) in articles" :key="index">
				<div class="media-left">
					<p @click="toDetail(article.id)" class="gg">{{ article.title }}</p>
					<span class="zh-meta">{{ article.content }}</span>
					<p class="kk">
						<i class="iconfont" style="color: #e53935;">&#xe64a;</i>
						<span class="di">{{ article.diamond }}</span>
						<i class="iconfont">&#xe666;</i>
						<span class="jian">{{ article.likes }}</span>
						<i class="iconfont">&#xe630;</i>
						<span>{{ article.comments }}</span>
					</p>
				</div>

				<div class="media-right"><img :src="article.avatar" class="sub-title" /></div>
			</div>
		</div>
		<div class="zh-col-4">
			<h3>热门作者</h3>
			<div v-for="(user, index) in users" :key="index" class="row">
				<div class="zh-col-12 border box">
					<div class="flex-center-y">
						<router-link :to="{ path: '/user' + user.id }"><img :src="user.avatar" class="avatar-xs link" /></router-link>
						<p class="sub-title">{{ user.nickname }}</p>
					</div>
					<div class="flex-center-y">
						<p class="meta">{{ user.fans }}个粉丝</p>
						<p class="meta">写了{{ user.articles }}篇文章</p>
					</div>
					<div class="flex-center-y"><button class="zh-btn btn-follow">关注</button></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articles: [],
			users: []
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
	},
	methods: {
		toDetail(id) {
			this.$router.push('/article/detail/' + id);
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
.media-left {
	flex: 1 1 60%;
}
.media-right {
	flex: 1 1 30%;
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
	src: url('//at.alicdn.com/t/font_1434161_x6ye9jb8msd.eot');
	src: url('//at.alicdn.com/t/font_1434161_x6ye9jb8msd.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1434161_x6ye9jb8msd.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1434161_x6ye9jb8msd.woff') format('woff'), url('//at.alicdn.com/t/font_1434161_x6ye9jb8msd.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1434161_x6ye9jb8msd.svg#iconfont') format('svg');
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
