<template>
	<view class="write-friend-circle" >
		<view class="wirte-box">
			<textarea confirm-type="send" maxlength=200 class="textarea" placeholder="分享你的故事..."></textarea>
			<uni-file-picker class="file-picker" :limit="9" v-model="imageValue" fileMediatype="image" mode="grid"
				@select="select" @progress="progress" @success="success" @fail="fail" />
			<view class="tag">
				<view class="add-loaction" @click="addLocation">
					<uni-icons class="add-loaction-icon" type="location"></uni-icons>
					<text v-if="location" class="add-loaction-text">{{location}}</text>
					<text v-else class="add-loaction-text">添加地点</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				location: ''
			};
		},
		onLoad() {
		},
		methods: {
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
				console.log(imageValue)
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			addLocation() {
				console.log(1);
				uni.showActionSheet({
					alertText: 'heloo'
				})
				uni.chooseLocation({
					success: res => {
						this.location = res.name
					}
				});
			}
		}
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
				height: 100px;
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
