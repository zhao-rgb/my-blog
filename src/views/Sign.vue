<template>
	<div class="full main-color">
		<div class="login-box">
			<div class="tab">
				<span class="tab-item" :class="{ active: isActive }" @click="changeTab">登 录</span>
				<span class="tab-item" :class="{ active: !isActive }" @click="changeTab">注 册</span>
			</div>

			<div class="tab-box" v-if="show && selected === 0">
				<input type="text" placeholder="请输入手机号/邮箱" v-model="userDto.mobile" />
				<input type="password" placeholder="请输入6-16位密码" minlength="6" maxlength="16" v-model="userDto.password" />
				<div class="code-box">
					<input type="text" placeholder="请输入验证码" v-model="userDto.code" />
					<div class="img"><img ref="codeImg" @click="refresh()" style="cursor: pointer;" /></div>
				</div>
				<input type="submit" class="login-btn" value="登录" @click="signIn(userDto)" />
				<span class="span-tab" @click="changeTab">没有账号，立即前往注册</span>
			</div>

			<div class="tab-box" v-if="show && selected === 1">
				<input type="text" placeholder="请设置用户名" v-model="userDto.nickname" />
				<input type="password" placeholder="请设置6-16位密码" minlength="6" maxlength="16" v-model="userDto.password" />
				<input type="password" placeholder="请确认密码" minlength="6" maxlength="16" v-model="pwd2" />
				
				<input
						type="tel"
					placeholder="请绑定手机号"
					minlength="11"
					maxlength="11"
					v-model="userDto.mobile"
					:disabled="yzmDisabled"
					@input.prevent="checkLength"
				/>
				<div class="code-box">
					<input type="text" placeholder="请输入验证码" v-model="userDto.code" />
					<div class="img"><img ref="codeImg" @click="refresh()" style="cursor: pointer;" /></div>
				</div>
				<input type="submit" class="regist-btn" value="注册" @click="register(userDto)" />
			</div>

			<div class="line-box" v-if="show && selected === 0">
				<span class="line"></span>
				<span class="login-3rd">第三方登录</span>
				<span class="line"></span>
			</div>

			<div class="icon-box" v-if="show && selected === 0">
				<i class="iconfont" style="color: rgb(24, 172, 252)">&#xe626;</i>
				<i class="iconfont" style="color: rgb(103, 204, 121)">&#xe6c3;</i>
			</div>
		<!-- 	<div>
				<div class="message" v-if="pop">
					<h1>{{ info }}</h1>
				</div>
				<div class="msg-box" v-if="popPlus">
					<p>{{ info }}</p>
				</div>
			</div> -->
		</div>

		<router-link to="/" class="back">返回</router-link>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userDto: {
				mobile: '',
				password: '',
				code: ''
			},		
			codeDisabled: true,		
			info: '',
			isActive: true,
			show: true,
			selected: 0,			
			status: '',
			yzmDisabled: false,
			user: null,		
			token: ''
		};
	},
	created() {
		this.axios.get(this.GLOBAL.baseUrl + '/code', { responseType: 'blob' }).then(res => {
			var img = this.$refs.codeImg;
			let url = window.URL.createObjectURL(res.data);
			img.src = url;
			console.log(res.headers);
			// 取得后台通过响应头返回的sessionId的值
			this.token = res.headers['access-token'];
			console.log(this.token);
		});
	},
	methods: {
		// signIn(userDto) {
		// 	this.axios.post('http://localhost:8080/api/sign-in', JSON.stringify(this.userDto)).then(response => {
		// 		if (response.data.msg == '登录成功') {
		// 			// 将后台的用户信息存入本地存储
		// 			localStorage.user = JSON.stringify(response.data.data);
		// 			// 路由跳转
		// 			alert('登录成功');
		// 			this.$router.push('/');
		// 		} else {
		// 			alert('密码错误');
		// 		}
		// 	});
		// },
		signIn(userDto) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/sign-in',
				data: JSON.stringify(this.userDto),
				headers: {
					'Access-Token': this.token
				}
			}).then(res => {
				if (res.data.msg === '登录成功') {
					alert('登录成功');
					localStorage.setItem('user', JSON.stringify(res.data.data));
					this.$router.push('/');
				} else {
					alert(res.data.msg);
					this.userDto.code = '';
					alert('密码错误');
				}
			});
		},
		refresh() {
			this.axios.get(this.GLOBAL.baseUrl + '/code', { responseType: 'blob' }).then(res => {
				console.log(res);
				var img = this.$refs.codeImg;
				let url = window.URL.createObjectURL(res.data);
				img.src = url;
			});
		},
		changeTab: function() {
			this.isActive = !this.isActive;
			this.selected = this.selected == 0 ? 1 : 0;
		},
		checkLength() {
			if (Number(this.userDto.mobile) && this.userDto.mobile.length == 11) {
				this.codeDisabled = false;
				return true;
			} else {
				return false;
			}
		},
		clear() {
			// alert("我进入到了clear()方法中");
			this.userDto.nickname = '';
			this.userDto.mobile = '';
			this.userDto.password = '';
			this.pwd2 = '';
			this.status = '';
			this.codeDisabled = true;
		},	
		register(userDto) {		
			if (this.userDto.nickname == '' ) {
				alert('用户名不能为空');
				return;
			}
			if (this.userDto.password == '' || this.pwd2 == '') {				
				alert('密码不能为空');
				return;
			}
			if (this.userDto.password  != this.pwd2 ) {
				alert('两次密码不一样');
				return;
			}
			if (this.userDto.mobile == '') {
				
				alert('手机号不能为空');
				return;
			}
			if (!/^1[34578]\d{9}$/.test(this.userDto.mobile)) {			
				alert('手机号码格式错误');
				this.userDto.mobile = '';
				return;
			}
			// 注册信息完全符合要求则进行下面注册操作
			this.axios.post('http://localhost:8080/api/register', JSON.stringify(this.userDto)).then(response => {
				if (response.data.msg == '注册成功') {
					alert('注册成功');
					// 将后台的用户信息存入本地存储
					localStorage.user = JSON.stringify(response.data.data);
					// 路由跳转				
				}
			});
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/register',
				data: JSON.stringify(this.userDto),
				headers: {
					'Access-Token': this.token
				}
			}).then(res => {
				if (res.data.msg === '注册成功') {
					alert('注册成功');
					localStorage.setItem('user', JSON.stringify(res.data.data));			
				} 
			});
		}
	}
};
</script>

<style scoped>
.back {
		color: black;
		position: absolute;
		top: 1%;
		left: 1%;
	}
.full {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(241,248,233);
	/* 图片全屏 */
	background-size: calc(100%);
}
/* 第三方图标 */
@font-face {
	font-family: 'iconfont'; /* project id 1474541 */
	src: url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.eot');
	src: url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.woff') format('woff'), url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.svg#iconfont') format('svg');
}
.iconfont {
	font-family: 'iconfont' !important;
	font-size: 40px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
.login-box {
	background-color: #ffffff;
	width: 400px;
	height: 550px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	padding: 10px;
	position: relative;
}
/* 顶部div */
.tab {
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	height: 10%;
	background-color: rgb(236, 239, 241);
	border-radius: 10px;
	margin-bottom: 10px;
}
.tab-item {
	cursor: pointer;
	margin-right: 10px;
	flex: 0 0 80px;
	text-align: center;
	line-height: 38px;
}
.active {
	color: rgb(165,214,167);
	font-weight: 600;
	border-bottom: 2px solid rgb(165,214,167);
}
/* 中间div */
.tab-box {
	height: 78%;
	/* background-color: #00897B; */
	color: #eee;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 10px;
}
/* 文本框 */
input {
	margin: 5%;
	width: 87%;
	height: 40px;
	border-radius: 10px;
	font-size: 25px;
	font-weight: 600;
	font-family: '楷体';
	outline: none;
	border: none;
	background-color: #eeeeee;
}
/* 登录和注册按钮 */
.regist-btn,
.login-btn {
	background-color: rgb(165,214,167);
	cursor: pointer;
	width: 200px;
	margin-top: 20px;
}
.regist-btn:hover,
.login-btn:hover {
	cursor: pointer;
	background-color: rgb(165,214,167);
}
/* 没有账号的情况 */
.span-tab {
	margin-top: 5%;
	cursor: pointer;
	color: rgb(113, 156, 252);
}
.span-tab:hover {
	color: #00bbdd;
}
/* 注册界面的div */
.tab-box .tel-box {
	width: 87%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-radius: 10px;
	border: 1px dashed #eeeeee;
}
/* 验证码和手机号外部的div */
.tel-code-box {
	display: flex;
	flex-direction: column;
}
.regist {
	background-color: rgb(227, 242, 253);
	cursor: pointer;
}
.regist:hover {
	background-color: rgb(187, 222, 251);
}
/* 第三方登录div */
.line-box {
	width: 80%;
	margin: 0 auto;
	margin-bottom: 4%;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.line {
	border-bottom: 3px solid #9b9b9b;
	flex: 0 0 33%;
}
.login-3rd {
	font-size: 20px;
	font-weight: 400px;
	font-family: '楷体';
}
/* 第三方登录的图标div */
.icon-box {
	cursor: pointer;
	width: 50%;
	margin: 0 auto;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.code-box {
	display: flex;
	align-items: center;
	padding-right: 23px;
	padding-left: 8px;
}
.img {
	height: 40px;
	width: 200px;
}
</style>