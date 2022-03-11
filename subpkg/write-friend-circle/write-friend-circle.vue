<template>
	<view class="write-friend-circle">
		<view class="wirte-box">
			<textarea confirm-type="send" v-model.trim="inputValue" @confirm="confirmHandler" maxlength=200
				class="textarea" placeholder="分享你的故事..."></textarea>
			<uni-file-picker class="file-picker" :limit="9" :imageValue="imageValue" fileMediatype="image"
				file-extname="png,jpg,jpeg" auto-upload="true" mode="grid" @select="select" @progress="progress"
				@success="success" @fail="fail" @delete="del" />
			<view class="tag">
				<view class="add-loaction" @click="addLocation">
					<uni-icons class="add-loaction-icon" type="location"></uni-icons>
					<text v-if="location" class="add-loaction-text">{{location}}</text>
					<text v-else class="add-loaction-text">添加地点</text>
				</view>
			</view>
		</view>
		<button @click="addCircle">发表</button>
	</view>
</template>

<script>
	import {
		addCircleFriend
	} from '../../utils/api.js'
	import uploadImage from '../../js_sdk/yushijie-ossutil/ossutil/uploadFile.js';
	export default {
		data() {
			return {
				imageValue: [],
				uploadImg: [],
				location: '',
				// 经度
				latitude: 0,
				//纬度
				longitude: 0,
				inputValue: ''
			};
		},
		onLoad() {},
		methods: {
			//发布
			async confirmHandler(e) {
				if (this.imageValue.length === 0 && this.inputValue.length === 0) {
					uni.showToast({
						title: '请输入',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title: '正在发布'
				})
				let imgList = this.imageValue
				let data = {
					contentText: this.inputValue,
					location: this.location,
					longitude: this.longitude,
					latitude: this.latitude,
					imgList
				}
				let res = await addCircleFriend(data)
				for (let i = 0; i < this.imageValue.length; i++) {
					//显示消息提示框
					uni.showLoading({
						mask: true
					})
					let date = new Date();
					//存储文件夹
					let folder = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
					//上传图片
					uploadImage(this.imageValue[i], 'circle-friends/' + folder + "/",
						result => {
							uni.hideLoading();
						}, err => {
							//上传失败
							console.log(JSON.stringify(err));
						})
				}
				uni.hideLoading();
				uni.showToast({
					title: '发布成功'
				})
				setTimeout(() => {
					uni.navigateBack({
						key: -1,
					})
				}, 2000)
			},

			// 选择文件后触发	
			select(e) {
				this.imageValue = [...(Array.from(this.imageValue)), ...e.tempFilePaths]
			},
			// 文件从列表移除时触发
			del(e) {
				this.imageValue = this.delItem(this.imageValue, e.tempFilePath)
			},
			//根据指定元素删除组数中的元素
			delItem(arr, val) {
				for (let i = 0; i < arr.length; i++) {
					if (val === arr[i]) {
						arr.splice(i, 1)
						return arr;
					}
				}
			},
			//发布
			addCircle() {
				//输入内容为空
				if (this.imageValue.length === 0 && this.inputValue.length === 0) {
					uni.showToast({
						title: '请输入',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title: '正在发布'
				})
				let loading = false
				let promise = new Promise((resolve) => {
					for (let i = 0; i < this.imageValue.length; i++) {
						//显示消息提示框
						uni.showLoading({
							mask: true
						})
						let date = new Date();
						//存储文件夹
						let folder = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
						//上传图片
						uploadImage(this.imageValue[i], 'circle-friends/' + folder + "/",
							result => {
								this.uploadImg.push(result)
								uni.hideLoading();
								//上传完毕
								if(i>=this.imageValue.length-1){
									resolve()
								}
								
							}, err => {
								//上传失败
								console.log(JSON.stringify(err));
							})
					}

				})
				promise.then(res => {
					let imgList = this.uploadImg;
					let data = {
						contentText: this.inputValue,
						location: this.location,
						longitude: this.longitude,
						latitude: this.latitude,
						imgList:JSON.stringify(imgList)
					}
					console.log(data)
					addCircleFriend(data)
					uni.hideLoading();
					uni.showToast({
						title: '发布成功'
					})
					setTimeout(() => {
						uni.navigateBack({
							key: -1,
						})
					}, 2000)
				})

			},
			//添加位置
			addLocation() {
				uni.showActionSheet({
					alertText: 'hello'
				})
				//选择位置
				uni.chooseLocation({
					success: res => {
						//	经度
						this.latitude = res.latitude
						//纬度
						this.longitude = res.longitude
						//地点名称
						this.location = res.name
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	.write-friend-circle {
		width: 100%;
		height: 100%;
		background-color: $my-bg-color;
		overflow: hidden;

		.wirte-box {
			width: 100%;
			height: auto;
			background-color: #fff;
			margin-top: 10px;
			overflow: hidden;
			padding-bottom: 20px;

			.textarea {
				width: 95%;
				height: auto;
				min-height: 100px;
				margin: 10px auto 0;
			}

			.textarea-placeholder {
				color: #C0C0C0;
				font-size: 16px;
			}

			.file-picker {
				.uni-file-picker__container {
					width: 95%;

					.file-picker__box-content {
						background-color: #F7F7F7 !important;

						.icon-add {
							background-color: #717171;
						}
					}
				}
			}

			.tag {
				display: flex;
				width: 95%;
				margin: 0 auto;

				.add-loaction {
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 10px;
					height: 30px;
					border-radius: 20px;
					background-color: #F7F7F7;

					.add-loaction-icon {

						margin-right: 5px;
					}

					.add-loaction-text {
						font-size: 12px;
						color: #717171;
					}
				}
			}
		}
	}
</style>
