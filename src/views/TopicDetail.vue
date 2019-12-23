<template>
	<div class="all">	
      <div class="ss-container">
		  <div class="row">
			<div class="zh-col-6 topi">
				<div class="topi-head">
					<div class="left">
						<h1>{{ topicVo.topic.topicName }}</h1>
						<span>{{ topicVo.topic.follows}}人关注</span>
						<span>{{topicVo.topic.articles}}篇文章</span>
					</div>
					<div class="right">						
						<button class="tg">投稿</button>
						<button class="gz">关注</button>
					</div>
					</div>
					<div class="topi-body">
						<h3 class="wz">最新文章</h3>
						<div class=" love zh-col-12 " v-for="(item, index) in topicVo.articleList" :key="index">
								<div class="zh-media-wraaper bordert">
									<div class="zh-media-left"><img :src="getImages(item.cover)" class="thumnail-xs" /></div>
									<div class="zh-media-middle">
									<p class="title" >{{ item.title }}</p>
									<hr/>
									<p class="sub-title">{{ item.content }}</p>
									<div class="card-tags">
										<i class="iconfont" style="color: #e53935;">&#xe633;</i>
										<span class="di">{{ item.diamond }}</span>
										<i class="iconfont" style="color: #e53935;">&#xe630;</i>
										<span class="jian">{{ item.likes }}</span>
										<i class="iconfont">&#xe666;</i>
										<span>{{ item.comments }}</span>
									</div>
									<span @click="toDetail(item.id)" class="card-title  bordert rm " style="font-weight: 600;cursor: pointer;"><i class="iconfont">&#xe611;</i>阅读更多</span>
									</div>								
								</div>
						</div>
					</div>
				</div>
			<div class="zh-col-4">
				<div class="border-bottom o">
						<span class="a borders">提问题</span>
						<span class="a borders">写回答</span>
						<span class="a borders">邀请回答</span>
						<i class="iconfont">&#xe763;</i>
						<span class="">{{ topicVo.articleList[0].comments }}条评论</span>
						<i class="iconfont">&#xe63e;</i>
						<span>分享</span>
						<i class="iconfont">&#xe60e;</i>
						<span>举报</span>
				</div>
				<h3 class="wz">相关信息</h3>
				<div class="r">
					<ul>
						<li><p>描述:{{ topicVo.topic.description }}</p></li>						
					</ul>
					<div class="adm border">
						<h3>管理员</h3>
						<img :src="getImages(topicVo.admin.avatar)" class="avatar-lg" />
						<h3 @click="toUserDetail(topicVo.admin.id)" class="pointer">进入主页>>></h3>
					</div>
				</div>
				<h3>分享到</h3>
				<div class="share">					
					<i class="iconfont" style="color: rgb(81,195,50);">&#xe600;</i>
					<i class="iconfont" style="color: rgb(48,165,221);">&#xe73e;</i>
					<i class="iconfont" style="color: rgb(232,34,2);">&#xe65a;</i>
					<i class="iconfont" style="color: rgb(102,102,102);">&#xe86d;</i>
				</div>
			</div>
		</div>
		</div>
		<router-link to="/topic" class="back"><i class="iconfont" style="color: black">&#xe607;</i>返回</router-link>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user')),
			topicVo: {},
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
		},
		toUserDetail(id) {
			this.$router.push('/user/detail/' + id);
		}
	},
	computed: {}
};
</script>
<style scoped>
	.back {
		color: black;
		position: absolute;
		top: 1%;
		left: 1%;
	}
	.ss-container{
		width: 90%;
		margin: auto;
		height: 800px;
	}
.borders {
	border: 1px solid #008b8b;
	border-radius: 5px;
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
	position: relative;
}
.topi-head{
	padding: 30px;
	display: flex;
	flex-wrap: nowrap;
}
.left span{
	opacity: 0.5;
	line-height: 70px;
	font-size: 14px;
}
.right{
	margin-left: 300px;
}
.gz{
	-webkit-tap-highlight-color: transparent;
	font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
	box-sizing: border-box;
	text-decoration: none;
	display: inline-block;
	text-align: center;
	vertical-align: middle;
	touch-action: manipulation;
	cursor: pointer;
	background-image: none;
	border: 1px solid transparent;
	white-space: nowrap;
	user-select: none;
	border-radius: 40px;
	color: #fff;
	background-color: #42c02e;
	font-weight: 400;
	line-height: normal;
	border-color: #42c02e;
	float: right;
	margin: 23px 0 23px 16px;
	font-size: 15px;
	padding: 8px 0;
	width: 100px;
}
.tg{
	-webkit-tap-highlight-color: transparent;
	font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
	box-sizing: border-box;
	text-decoration: none;
	display: inline-block;
	text-align: center;
	vertical-align: middle;
	touch-action: manipulation;
	cursor: pointer;
	white-space: nowrap;
	user-select: none;
	font-weight: 400;
	line-height: normal;
	border-radius: 40px;
	background: none;
	border: 1px solid rgba(59,194,29,.7);
	color: #42c02e!important;
	float: right;
	margin: 23px 0 23px 16px;
	font-size: 15px;
	padding: 8px 0;
	width: 90px;
}
.wz{
	color: #333;
	font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
	line-height: 20px;
	display: inline-block;
	padding: 8px 0;	
	border-bottom: 2px solid #646464;
}
.card-tags{
	position: absolute;
	bottom: 10%;
}
.rm{
	position: absolute;
	bottom: 10%;
	right: 10%;
}
.o{
	margin-top: 50px;
}
.adm{
	padding: 10px;
	position: relative;
	margin-bottom: 30px;
}
.pointer{
	position: absolute;
	bottom: 40%;
	right: 10%;
}
.share{
	margin-top: 20px;
}
.share .iconfont{	
	margin: 20px;
	font-size: 30px;
}
</style>
