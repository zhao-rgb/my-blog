<template>
	<div>
	<div class="row">
	<div class="box zh-col-3" v-for="(topic, index) in topics" :key="index">
	    <img :src="topic.logo"/>
	    <div class="box-content">
	        <h3 class="title">专题:{{ topic.topicName }}</h3>
	        <p class="description">
	            <p>描述:{{ topic.description }}</p>
	            <p>{{ topic.articles }}篇文章，{{ topic.follows }}人关注</p>
	        </p>
	        <a class="read pointer" @click="toDetail(topic.id)" >Read More</a>
	    </div>
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
		this.axios
			.get(this.GLOBAL.baseUrl + '/topic/', {
				params: {
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
		loadMore() {
			this.currentPage = this.currentPage + 1;
			this.axios
				.get(this.GLOBAL.baseUrl + '/topic/', {
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
						this.topics.splice(this.currentPage * this.count, 0, temp[i]);
					}
					console.log(this.topics.length);
				});
		},
		go(page) {
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
	.row{
		margin-top: 80px;
	}
	.box{
	    background: #fff;
	    box-shadow: 0 0 5px #bababa;
	    text-align: center;
	    overflow: hidden;
	    position: relative;
		padding: 10px;
		margin-right: 10px;
		margin-bottom: 10px;
		width: 150px;
		height: 400px;
	}
	.box img{
	    width: 100%;
	    height: auto;
	    transition: all 0.4s ease-in-out 0.2s;
	}
	.box:hover img{
	    transform: scale(0);
	    transition-delay: 0s;
	}
	.box-content{
	    width: 100%;
	    height: 100%;
	    background: #425770;
	    color: #fff;
	    padding: 30px;
	    position: absolute;
	    top: 0;
	    left: 0;
	    opacity: 0;
	    transform: scale(0) rotate(-180deg);
	    transition: all 0.4s ease-in 0s;
		margin-bottom: 20px;
	}
	.box:hover .box-content{
	    opacity: 1;
	    transform: scale(1) rotate(0deg);
	    transition-delay: 0.2s;
	}
	.box .title{
	    font-size: 20px;
	    font-weight: 800;
	    border-bottom: 1px solid #334a65;
	    padding-bottom: 10px;
	    margin-top: 0;
	    text-transform: capitalize;
	}
	.box .description{
	    font-size: 13px;
	    font-style: italic;
	    line-height: 20px;
	    margin-bottom: 30px;
	}
	.box .read{
		margin-top: 100px;
	    display: inline-block;
	    font-size: 14px;
	    color: #fff;
	    background: #132d4d;
	    padding: 7px 20px;
	    text-transform: capitalize;
	}
	@media only screen and (max-width: 990px){
	    .box{ margin-bottom: 20px; }
	}
	@media only screen and (max-width: 479px){
	    .box .box-content{ padding: 20px; }
	}
	@media only screen and (max-width: 359px){
	    .box .box-content{ padding: 10px; }
	}                    
</style>
