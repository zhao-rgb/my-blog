<template>
	<div class="all">
		<div class="zh-container border row lab">
			<div class="zh-navs">
				<div class="zh-nav-bar zh-fx-between">
					<ul class="zh-list">
						<li><router-link to="/index">主页</router-link></li>
						<li>发现</li>
						<li>等你来答</li>
					</ul>
				</div>
			</div>

			<div class="zh-col-8 topi">
				<h1>题:{{ topicVo.topic.topicName }}</h1>
				<p>{{ topicVo.topic.description }}</p>
				<div class="o border-bottom">
					<span class="a borders">关注问题</span>
					<span class="a borders">写回答</span>
					<span class="a borders">邀请回答</span>
					<i class="iconfont">&#xe763;</i>
					<span class="">{{ topicVo.articleList[0].comments }}条评论</span>
					<i class="iconfont">&#xe63e;</i>
					<span>分享</span>
					<i class="iconfont">&#xe60e;</i>
					<span>举报</span>
				</div>
				<div class=" love zh-col-12 " v-for="(item, index) in topicVo.articleList" :key="index">
					<div class="zh-media-wraaper shadow">
						<div class="zh-media-left"><img :src="getImages(item.cover)" class="thumnail-xs" /></div>
						<div class="zh-media-middle">
							<p class="title" @click="toDetail(item.id)">{{ item.title }}</p>
							<hr />
							<p class="sub-title">{{ item.content }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="zh-col-4 topi">
				<p class="border-right">关注者</p>
				<span>{{ topicVo.topic.follows }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			topicVo: {}
		};
	},
	created() {
		//获取网页地址url
		var query = window.location.href;
		//锁定到最后一个"/"的位置
		var begin = query.lastIndexOf('/') + 1;
		//取出地址中最后的id值
		var topicsId = query.substring(begin);
		//获取对应文章的详细内容
		this.axios.get(this.GLOBAL.baseUrl + '/topics/detail/' + topicsId).then(res => {
			console.log(res.data.data);
			this.topicVo = res.data.data;
		});
	},
	methods: {
		getImages(_url) {
			if (_url) {
				let _u = _url.substring(8);
				return 'https://images.weserv.nl/?url=' + _u;
			}
		},
		toDetail(id) {
			this.$router.push('/article/detail/' + id);
		}
	},
	computed: {}
};
</script>

<style scoped>
.all {
	background-image: url(../assets/img/top.jpg);
	background-size: calc(100%);
}
.borders {
	border: 1px solid #008b8b;
	border-radius: 5px;
}
.a {
	margin-right: 50px;
}
.thumnail-xs {
	width: 150px;
	height: 150px;
	border-radius: 10px;
}
.love {
	display: flex;
	flex-flow: column;
	margin-top: 20px;
}
.zh-navs {
	height: 70px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	background-color: rgba(7, 84, 154);
	cursor: pointer;
}
li {
	margin-right: 70px;
}
.topi {
	margin-top: 70px;
	height: 800px;
}
@font-face {
	font-family: 'iconfont'; /* project id 1434161 */
	src: url('//at.alicdn.com/t/font_1434161_pmmy7iq9sj.eot');
	src: url('//at.alicdn.com/t/font_1434161_pmmy7iq9sj.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1434161_pmmy7iq9sj.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1434161_pmmy7iq9sj.woff') format('woff'), url('//at.alicdn.com/t/font_1434161_pmmy7iq9sj.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1434161_pmmy7iq9sj.svg#iconfont') format('svg');
}
.iconfont {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
	margin-right: 5px;
}
</style>
