<template>
	<div class="all">
	<div class="rows">
		<div class="zh-col-8">
			<div class="carousel-wrap border">
				<transition-group tag="ul" class="slide-ul" name="slide">
					<li v-for="(item, index) in slideList" :key="index" v-show="index === currentIndex" @mouseenter="stop" @mouseleave="go">
						<a :href="item.url"><img :src="item.image" :alt="item.description" /></a>
					</li>
				</transition-group>
				<div class="carousel-items"><span v-for="(item, index) in slideList" :class="{ active: index === currentIndex }" @mouseover="change(index)"></span></div>
			</div>
			<h3 class="border-bottom">热门文章</h3>
			<div class="rows">
				<div class="zh-col-6" v-for="(article, index) in articles" :key="index">
					<div class="card zh-shadow flex flex-top-y">
						<div id="yidong"></div>
						<div class="card-image"><img :src="article.avatar" class="sub-titlee " alt="" /></div>
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
			<div class="row ">
				<h3>今日天气</h3>				
				<ul class="hot zh-col-12 border">
				<iframe src="http://i.tianqi.com/index.php?c=code&id=7&icon=1&num=3" frameborder="0" style="margin: 10% ">	
				</iframe>
				</ul>				
			</div>
			<h3 class="border-bottom">榜单作者</h3>
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
			<div class="col-12 cloud border-bottom">
				<h3>标签云</h3>
				<ul>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E6%8E%92%E7%89%88%E5%B7%A5%E5%85%B7&amp;tempid=8" target="_blank">排版工具</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E8%93%9D%E7%81%AF&amp;tempid=8" target="_blank">蓝灯</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E6%8E%A8%E5%B9%BF&amp;tempid=8" target="_blank">推广</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=SEO%E7%9F%A5%E8%AF%86&amp;tempid=8" target="_blank">SEO知识</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E7%BB%87%E6%A2%A6&amp;tempid=8" target="_blank">织梦</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E4%BC%98%E5%8C%96%E5%88%86%E6%9E%90&amp;tempid=8" target="_blank">优化分析</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=SEO%E8%B5%9A%E9%92%B1&amp;tempid=8" target="_blank">SEO赚钱</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E6%94%B6%E5%BD%95%E6%8A%80%E5%B7%A7&amp;tempid=8" target="_blank">收录技巧</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=SEO%E5%88%9B%E4%B8%9A&amp;tempid=8" target="_blank">SEO创业</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E7%AB%99%E9%95%BF%E5%B7%A5%E5%85%B7&amp;tempid=8" target="_blank">站长工具</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E7%BB%87%E6%A2%A6%E6%A8%A1%E6%9D%BF&amp;tempid=8" target="_blank">织梦模板</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E6%8A%80%E6%9C%AF&amp;tempid=8" target="_blank">技术</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=SEO&amp;tempid=8" target="_blank">SEO</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E9%98%BF%E9%87%8C%E4%BA%91&amp;tempid=8" target="_blank">阿里云</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E7%99%BE%E5%BA%A6%E6%8C%87%E6%95%B0&amp;tempid=8" target="_blank">百度指数</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E5%86%85%E9%A1%B5%E4%BC%98%E5%8C%96&amp;tempid=8" target="_blank">内页优化</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E6%94%B6%E5%BD%95%E6%8E%92%E5%90%8D&amp;tempid=8" target="_blank">收录排名</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E5%9D%9A%E6%8C%81%E7%99%BD%E5%B8%BD%E5%AD%90&amp;tempid=8" target="_blank">坚持白帽子</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E6%B8%97%E9%80%8F&amp;tempid=8" target="_blank">渗透</a>
					<a href="https://www.sdocos.com/e/tags/?tagname=%E5%93%81%E7%89%8C%E5%8F%A3%E7%A2%91&amp;tempid=8" target="_blank">品牌口碑</a>
				</ul>
			</div>		
			<div class="widget widget_links biaoqian">					
				<h3><span>友情链接</span></h3>
				<ul class="xoxo blogroll">
					<li><a href="http://www.yangqq.com" target="_blank">杨青个人博客</a></li>
					<li>
						<a
							href="https://zhangzifan.com"
							title="泪雪博客是一个专注网站 SEO 优化、网站 SEO 诊断、搜索引擎研究、网络营销推广、网站策划运营及站长类的独立自媒体原创博客"
							target="_blank"
						>
							泪雪博客
						</a>
					</li>
					<li>
						<a
							href="https://www.mochoublog.com"
							title="我希望我自己是一个产品经理，会产品的工程师。写代码不能不带业务的写，而做产品不能不考虑实际的胡乱设计，我想融合产品经理与开发，做一个融合的人。"
							target="_blank"
						>
							莫愁个人博客
						</a>
					</li>
					<li><a href="https://www.imwbq.com/" title="记录个人生活、工作和分享免费资源的个人主页（imwbq.com）" target="_blank">王保庆博客</a></li>
					<li><a href="http://www.tianshan277.com/" target="_blank">田珊珊个人博客</a></li>
					<li><a href="https://www.guojian945.com/" target="_blank">郭健博客</a></li>
					<li><a href="https://baijunyao.com/" target="_blank">白俊遥博客</a></li>
					<li><a href="https://www.zh30.com/" target="_blank">郑晓个人博客</a></li>
					<li><a href="http://www.sanshi30.cn/" target="_blank">Sanshi博客</a></li>
					<li><a href="https://guanchao.site/" target="_blank">时间里的博客</a></li>
					<li><a href="https://liaowei.info/" title="魔前一叩三千年、回首凡尘不做仙" target="_blank">路过一只大侠</a></li>
					<li><a href="http://blog.023xs.cn/" target="_blank">小张个人博客</a></li>
					<li><a href="https://www.ykblog.cn/" target="_blank">云柯博客</a></li>
					<li><a href="https://www.chenweiliang.com/" target="_blank">陈沩亮博客</a></li>
					<li><a href="http://www.xuluowuhen.com" target="_blank">暗影月色程序猿</a></li>
				</ul>
			</div>
		</div>
			
	</div>
	<div class="sss">
		 <div><a href="#top"><i class="iconfont shadow" style="font-size: 60px; color: red;">&#xe635;</i></a></div>
	</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articles: [],
			users: [],
			topic: [],
			slideList: [
				{
					url: '#',
					description: 'one',
					image: 'https://i0.hippopx.com/photos/965/674/437/balance-meditation-meditate-silent-thumb.jpg'
				},
				{
					url: '#',
					description: 'two',
					image: 'https://i0.hippopx.com/photos/856/151/610/panorama-sunrise-dawn-bled-thumb.jpg'
				},
				{
					url: '#',
					description: 'three',
					image: 'https://i0.hippopx.com/photos/97/409/72/youth-active-jump-happy-thumb.jpg'
				}
			],
			currentIndex: 0,
			timer: null
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
		go() {
			this.timer = setInterval(() => {
				this.autoPlay();
			}, 3000);
		},
		stop() {
			clearInterval(this.timer);
			this.timer = null;
		},
		change(index) {
			this.currentIndex = index;
		},
		autoPlay() {
			this.currentIndex++;
			if (this.currentIndex > this.slideList.length - 1) {
				this.currentIndex = 0;
			}
		},
		toDetail(id) {
			this.$router.push('/article/detail/' + id);
		},
		toDetailuser(id) {
			this.$router.push('/user/detail/' + id);
		},
		 backTop () {
					      const that = this
					      let timer = setInterval(() => {
					        let ispeed = Math.floor(-that.scrollTop / 5)
					        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
					        if (that.scrollTop === 0) {
					          clearInterval(timer)
					        }
					      }, 16)
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
	.hot{
		background-color: skyblue;
	}
	
.widget {
	margin-bottom: 25px;
	position: relative;
	overflow: hidden;
	background: #fff;
	-webkit-box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
	-moz-box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
	box-shadow: 0 2px 5px 0 rgba(146, 146, 146, 0.1);
	padding: 35px 30px;
}
.widget h3 {
	font-size: 18px;
	color: #282828;
	font-weight: 600;
	margin: 0;
	text-transform: uppercase;
	padding-bottom: 15px;
	margin-bottom: 25px;
	position: relative;
}
.widget_links a {
	color: black;
}
.widget_links ul li {
	display: inline-block;
	width: 48%;
	margin-top: 5px;
}
.card-tags {
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
		background: grey;
	}
	to {
		background: white;
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
