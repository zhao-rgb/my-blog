<template>
	<div class="writearticle border">
		<div class="c">
			<span style="color: white;">作者ID: {{ this.user.id }}</span>
			<div class="con">
				<div class="con-head">
					<input type="text" placeholder="标题:" v-model="writeArticle.title" />
					<input type="text" placeholder="简介:" v-model="writeArticle.content" />
					<input type="text" placeholder="专题ID:" v-model="writeArticle.topicId" />
					<!-- <input type="text" placeholder="输入图片地址:" v-model="writeArticle.cover"> -->
					<input type="file" @change="changeAvatar($event)" id="fileBox" />
				</div>
				<div class="con-body">
					<textarea rows="10" cols="30" placeholder="内容:" v-model="writeArticle.text"></textarea>
					<button v-on:click="release">发布</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user')),
			userVo: {
				user: {},
				articleList: {}
			},
			writeArticle: {
				topicId: '',
				userId: '',
				title: '',
				content: '',
				cover: '',
				diamond: 0,
				comments: 0,
				likes: 0,
				text: ''
			}
		};
	},
	created() {
		var query = window.location.href;
		//锁定到最后一个"/"的位置
		var begin = query.lastIndexOf('/') + 1;
		//取出地址中最后的id值
		var usersId = query.substring(begin);
		this.axios.get(this.GLOBAL.baseUrl + '/detail/' + usersId).then(res => {
			console.log(res.data.data);
			this.userVo = res.data.data;
		});
	},
	methods: {
		getImages(_url) {
			if (_url) {
				let _u = _url.substring(8);
				return 'https://images.weserv.nl/?url=' + _u;
			}
		},
		changeAvatar: function() {
			var _this = this;
			let formData = new FormData();
			alert(event.target.files[0].name);
			formData.append('file', event.target.files[0]);
			this.$http({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/upload',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				data: formData,
				processData: false,
				contentType: false
			}).then(uploadFileRes => {
				console.log(uploadFileRes.data.data);
				_this.cover = uploadFileRes.data.data;
				this.release(_this.cover);
			});
		},
		release(cover) {
			if (this.writeArticle.text == '' || this.writeArticle.text == '' || this.writeArticle.content == '' || this.writeArticle.topicId == '') {
				alert('类容不能为空');
				return;
			}
			this.writeArticle.userId = this.user.id;
			this.writeArticle.cover = cover;
			alert(cover)
			this.axios.post(this.GLOBAL.baseUrl + '/article/new', this.writeArticle).then(res => {
				this.user.articles++;
			});
			alert('发布成功');
		}
	}
};
</script>
<style>
.writearticle {
	background-image: url(../assets/img/4.jpg);
	width: 100%;
	height: 800px;
}
.c {
	margin-top: 40px;
	margin-left: 400px;
}
.con .con-head {
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
}
.con .con-head input {
	width: 500px;
	height: 40px;
	margin-top: 20px;
}
.con .con-body {
	width: 500px;
	height: 40px;
	margin-top: 20px;
}
.con .con-body textarea {
	width: 800px;
	height: 100px;
	margin-top: 30px;
	margin-bottom: 30px;
}
.con .con-body button {
	width: 100px;
	height: 40px;
	background-color: orange;
}
.all {
	background-image: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1152000485,3169834010&fm=26&gp=0.jpg');
	background-size: calc(100%);
}
</style>
