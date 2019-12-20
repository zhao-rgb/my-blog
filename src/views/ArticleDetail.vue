<template>
	<div>
		<div class="all">
			<!-- <div class="zh-navs">
				<div class="zh-nav-bar zh-fx-between">
					<ul>
						<li><router-link to="/index"><i class="iconfont">&#xe616;</i>主页</router-link></li>					
					</ul>
					<div class="changeBox">
						<router-link to="/sign" v-if="this.user === null" class="sgin">去登录</router-link>
						<img :src="this.user.avatar" class="zh-avatar" v-if="this.user !== null" @click="toUserDetail(user.id)" />
						<p @click="logout()" v-if="this.user !== null" class="tui">退出</p>
					</div>
				</div>
			</div> -->
			<div class="zh-containers border">
				<div class="hader">
					<h3>标题:{{ article.title }}</h3>
					<!-- <i class="iconfont" style="color:grey; font-size: 25px;float: right; margin: 20px;" @click="dels(article.id,article.userId)">&#xe612;</i>-->
					</div>							 
				<div class="box">
					<img :src="getImages(article.avatar)" class="avatar-xs" @click="toDetail(article.userId)" />
					<span class="media gutter">{{ article.nickname }}</span>
					<span class="media gutter">发表于{{ article.publishTime.date.year }}年{{ article.publishTime.date.month }}月{{ article.publishTime.date.day }}日</span>
				</div>
				<div class="container-right">
					<div class="tu">
						<i class="iconfont">&#xe633;</i>
						<span class="di">{{ article.diamond }}</span>
						<i class="iconfont pointer" @click="addlike()">&#xe60c;</i>
						<i class="iconfont pointer" @click="jlike()">&#xe645;</i>
						<span class="jian">{{ article.likes }}</span>
						<a href="#viewcontainer"><i class="iconfont pointer">&#xe666;</i></a>
						<span>{{ article.comments }}</span>
					</div>
					<div class="card"><p v-html="text"></p></div>
				</div>
			</div>
			<div id="viewcontainer">
				<fieldset>
					<legend>评论</legend>
					<div class="border">
						<textarea
							rows="10"
							cols="30"
							placeholder="发表评论:"
							v-model="writeComment.content"
							style="width: 80%;height: 200px;margin-left: 100px;margin-top: 20px;margin-bottom: 20px;"
						></textarea>
						<button
							class="zh-btn-large shadow"
							@click="release"
							v-on:click="changeshow()"
							style="margin-left: 600px;margin-bottom: 20px;width: 200px;height: 40px;background-color: orange;"
						>
							发布
						</button>
					</div>
					<div class="nav-item border" v-for="(item, index) in comment" :key="index">
						<div class="card-left ">
							<img :src="item.author.avatar" class="avatar-xs bian" />
							<button class="del" @click="del(item.comment.id,item.comment.userId)" v-if="item.comment.userId === user.id">删除</button>
						</div>
						<div class="card-right ">
							<p class="cz-sub-title">{{ item.author.nickname }}</p>
							<p class="border">{{ item.comment.content }}</p>
							<p class="cz-meta">
								{{ item.comment.createTime.date.year }}年{{ item.comment.createTime.date.month }}月{{ item.comment.createTime.date.day }}日
								{{ item.comment.createTime.time.hour }}:{{ item.comment.createTime.time.minute }}:{{ item.comment.createTime.time.second }}
							</p>
						</div>
					</div>
					<div class="row"><button class="btn btn-lg btn-rd dark-fill" @click="loadMore">点击加载更多</button></div>
				</fieldset>
			</div>
		</div>		
	</div>
</template>
<script>
export default {
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user')),
			comment: [],
            currentPage: 1,
            count: 3,
			articleDetail: null,
			article: null,
			text: null,

			writeComment: {
				articleId: 0,
				userId: 0,
				content: ''
			},
			like: {
				userId: '',
				articleId: ''
			},
			show: 'true'
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
	    this.axios
			.get('http://localhost:8080/api/comment/' + articlesId , {
				params: {
					page: this.currentPage,
					count: this.count
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.comment = res.data.data;
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
		loadMore() {
			this.currentPage = this.currentPage + 1;
			this.axios
				.get(this.GLOBAL.baseUrl + '/comment/'+ articlesId, {
					params: {
						page: this.currentPage,
						count: this.count
					}
				})
				.then(res => {
					console.log(res.data.data.length);
					let temp = [];
					temp = res.data.data;
					for (var i = 0; i < temp.length; i++) {
						this.users.splice(this.currentPage * this.count, 0, temp[i]);
					}
					console.log(this.users.length);
				});
		},
		toDetail(id) {
			this.$router.push('/user/detail/' + id);
		},
		toUserDetail(id) {
			this.$router.push('/user/person/' + id);
		},
		//发评论
		release() {
			if (this.writeComment.content == '') {
				alert('类容不能为空');
				return;
			}
			var query = window.location.href;
			var begin = query.lastIndexOf('/') + 1;
			var articlesId = query.substring(begin);
			this.writeComment.articleId = articlesId;
			this.writeComment.userId = this.user.id;
			this.axios.post(this.GLOBAL.baseUrl + '/comment', this.writeComment).then(res => {
				this.article.comments++;
			});
			alert('评论成功')
		},
		del(id,id2) {
			if(id2 !==this.user.id){
				alert("不能删")
				return;
			}
			alert(id);
			this.axios.delete(this.GLOBAL.baseUrl + '/comments/delete?id='+id+'&articleId='+this.article.id).then(res => {
				this.article.comments--;
			});
			alert('删除评论成功');
		},
		changeshow() {
			this.show = !this.show;
		},
		addlike() {
			// this.like.userId = this.user.id;
			// this.like.articleId = this.article.id;
			this.axios.post(this.GLOBAL.baseUrl + '/like?userId='+this.user.id+'&articleId='+this.article.id).then(res => {
				console.log(res.data.code)
				if(res.data.code == 50004){
					alert('已关注')
				}else{
				   this.article.likes++;
				   alert('关注成功');
				}
			});		
		},
		jlike(){			
			this.axios.delete(this.GLOBAL.baseUrl + '/like?userId='+this.user.id+'&articleId='+this.article.id).then(res => {
				console.log(res.data.code)			
				if(res.data.code == 50004){
					alert('已经取消关注了')
				}else{
					this.article.likes--;
					alert('取消关注成功')
				}
			});
		},
		dels(id,id1){
			if(id1 !==this.user.id){
				alert("不能删")
				return;
			}
			alert(id)
			this.axios.delete(this.GLOBAL.baseUrl + '/article/delete?id='+id+'&userId='+this.user.id).then(res => {
				this.user.articles--;
			});
			alert('删除文章成功');
		}
	
	},
	computed: {}
};
</script>
<style scoped>
.del {
	width: 50px;
	height: 25px;
	background: red;
	font-size: 14px;
	font-family: '微软雅黑';
	color: #fff;
	float: right;
	margin-top: 10px;
	margin-right: 10px;
}
.nav-item {
	margin: 10px;
}
.cz-sub-title {
	display: flex;
	align-content: flex-start;
	font-size: 16px;
	font-weight: 600;
}
.card-right .border {
	margin: 10px;
}
.cz-meta {
	display: flex;
	justify-content: flex-end;
}
.border {
	display: flex;
	flex-direction: column;
}

.card {
	text-indent: 2em;
	font-weight: 700;
}
h3 {
	text-align: center;
}
/* .zh-navs {
	height: 70px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;	
	background-color: wheat;
	cursor: pointer;
} */
li {
	margin-left: 60px;
}
.all {
	width: 100%;
	margin: auto;
	background-color: white;
}
.box {
	height: 50px;
	line-height: 0px;
	text-align: center;
}
.container-b {
	display: flex;
	flex-wrap: wrap;
}

.zh-containers {
	width: 80%;
	margin: auto;
	margin-top: 0px;
	/* background-color: rgba(234, 234, 234); */
}
.di {
	margin-right: 15px;
}

.jian {
	margin-right: 15px;
}
.tu {
	text-align: center;
}
@font-face {
  font-family: 'iconfont';  /* project id 1434161 */
  src: url('//at.alicdn.com/t/font_1434161_kd5b1n3pcwp.eot');
  src: url('//at.alicdn.com/t/font_1434161_kd5b1n3pcwp.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1434161_kd5b1n3pcwp.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1434161_kd5b1n3pcwp.woff') format('woff'),
  url('//at.alicdn.com/t/font_1434161_kd5b1n3pcwp.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1434161_kd5b1n3pcwp.svg#iconfont') format('svg');
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
