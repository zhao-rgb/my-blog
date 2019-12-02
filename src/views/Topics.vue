<template>
	<div class="container">
		<div class="media-wraaper ">
			<div class="zh-col-4" v-for="(topic, index) in topics" :key="index">
				<div class="media-left">
					<img :src="topic.logo" class="bl-avatar-normal" @click="toDetail(topic.id)" />
					<h2 class="pointer">{{ topic.name }}</h2>
				</div>
				<div class="media-middle">
					<p>{{ topic.description }}</p>
					<button class="guan">关注</button>
					<p class="kk">
						<span class="di">{{ topic.articles }}篇文章</span>
						<span class="jian">{{ topic.follows }}人关注</span>
					</p>
				</div>
				<!-- <div class="media-right"><a :href="item.homepage" class="link" @click="go(item.homepage)">专题主页</a></div> -->
			</div>
		</div>
		<div class="row"><button class="btn btn-lg btn-rd dark-fill" @click="loadMore">点击加载更多</button></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			topics: [],
			currentPage: 1,
			count: 6
			
		};
	},
	created() {
		this.axios.get(this.GLOBAL.baseUrl + '/topic/',{
			params:{
				page: this.currentPage,
				count: this.count
			}
		})
		.then(res => {
						console.log(res.data.data.length);
						this.topics = res.data.data;
					});
	},
	methods: {
		loadMore(){
			this.currentPage = this.currentPage + 1;
			this.axios
			          .get(this.GLOBAL.baseUrl + '/topic/',{
				params: {
					page: this.currentPage,
					count: this.count
				}
			})
			.then(res =>{
				console.log(res.data.data.length);
				let temp = [];
				temp = res.data.data;
				for(var i = 0; i< temp.length; i++){
					this.topics.splice(this.currentPage*this.count,0,temp[i]);
				}
				console.log(this.topics.length);
			});
		},
		go(page){
			window.location.href = page;
		},
		toDetail(id) {
			this.$router.push('/topic/detail/' + id);
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
.media {
	width: 300px;
}

.media-wraaper {
	display: flex;
	flex-wrap: wrap;
	flex: 1 1 33.3%;
}

.guan {
	height: 30px;
	width: 50px;
	margin-left: 50px;
	background-color: yellow;
	border-radius: 30%;
}

.jian {
	margin-left: 30px;
}
</style>
