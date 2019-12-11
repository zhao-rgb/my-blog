<template>
	
	<div class="container">
	    <div class="row">
	        <div class="zh-col-4 " v-for="(user, index) in users" :key="index">
	            <div class="our-team">
	                <div class="pic">
	                    <p class="description">描述:{{user.introduction}}</p>
	                    <img :src="user.avatar" />
	                </div>
	                <h3 class="title">{{ user.nickname }}</h3>
	                <span class="post">生日:{{user.birthday.year}}年{{user.birthday.year}}月{{user.birthday.year}}日</span>
					<h3 class="title">{{user.articles}}篇文章，{{user.fans}}个粉丝</h3>
	                <ul class="social">
	                    <li><i class="iconfont" style="color: rgb(24, 172, 252)">&#xe616;</i></li>						
						<li><h3 @click="toDetail(user.id)" class="pointer">进入空间</h3></li>	
	                </ul>
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
			users: [],
			currentPage: 1,
			count: 6
		};
	},
	created() {
		this.axios
			.get(this.GLOBAL.baseUrl + '/user/', {
				params: {
					page: this.currentPage,
					count: this.count
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.users = res.data.data;
			});
	},
	methods: {
		loadMore() {
			this.currentPage = this.currentPage + 1;
			this.axios
				.get(this.GLOBAL.baseUrl + '/user/', {
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
		go(page) {
			window.location.href = page;
		},
		toDetail(id) {
			this.$router.push('/user/detail/' + id);
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
/* .card {
	width: 90%;
	height: 300px;
	 background-image: url(../assets/img/user.png); 
	background-size: 100%, 100%;
	margin-bottom: 50px;
	padding: 20px;
}
.card-head {
	height: 30%;
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.card-head img {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	margin-left: 20px;
}
.card-body {
	width: 80%;
	margin: 0 auto;
}
.card-body > p {
	line-height: 30px;
}
.card a {
	color: rgb(0, 98, 89);
	font-weight: 700;
} */
 .our-team{
     padding-bottom: 20px;
     text-align: center;
 }
 .our-team .pic{
     display: inline-block;
     width: 200px;
     height: 200px;
     border-radius: 50%;
     background: #ff595e;
     padding: 70px 20px 30px;
     margin-bottom: 20px;
     position: relative;
 }
 .our-team .description{
     font-size: 16px;
	 font-weight: 700;
     color: #fff;
 }
 .our-team .pic img{
     width: 101%;
     height: 101%;
     border-radius: 50%;
     position: absolute;
     top: -1px;
     left: -1px;
     transition: all 0.6s ease 0s;
 }
 .our-team:hover .pic img{
     transform: rotate(-120deg);
     transform-origin: 95% 40% 0;
 }
 .our-team .title{
     display: block;
     font-size: 20px;
     font-weight: 700;
     color: #7740ff;
     letter-spacing: 1px;
     margin-bottom: 5px;
 }
 .our-team .post{
     display: block;
     font-size: 15px;
     color: #333;
     text-transform: capitalize;
     margin-bottom: 10px;
     position: relative;
 }
 .our-team .post:after{
     content: "";
     width: 30px;
     height: 3px;
     background: #eee;
     margin: 0 auto;
     position: absolute;
     bottom: -10px;
     left: 0;
     right: 0;
 }
 .our-team .social{
     padding: 0;
     margin: 25px 0 0 0;
     list-style: none;
 }
 .our-team .social li{
     display: inline-block;
     margin-right: 5px;
 }
 .our-team .social li .iconfont{
     display: block;
     width: 35px;
     height: 35px;
     border-radius: 50%;
     line-height:35px;
     background: #7740ff;
     font-size: 15px;
     color: #fff;
 }  
 .our-team .social li .iconfont:hover{
     background: #ff595e;
 }
 @media only screen and (max-width: 990px){
     .our-team{ margin-bottom: 30px; }
 }
 @media only screen and (max-width: 767px){
     .our-team{ overflow: hidden; }
 }                
</style>
