<template>
	<view class="problem-feedback" :style="{height: wh + 'px'}">
		<view class="problem-option">
			<view class="problem-option-head">
				<text class="problem-option-head-text">问题和意见</text>
			</view>
			<view class="uni-textarea">
				<textarea class="textarea" placeholder="请详细描述你的问题和意见..."></textarea>
			</view>
		</view>
		<view class="problem-option">
			<view class="problem-option-head">
				<text class="problem-option-head-text">图片(选填，提供问题截图，总大小10M以下)</text>
			</view>
			<view class="uni-textarea">
				<uni-file-picker title="最多选择九张图片" v-model="imageValue" fileMediatype="image" file-extname="png,jpg"
					:limit="9" mode="grid" @select="select" @progress="progress" @success="success" @fail="fail">
				</uni-file-picker>
			</view>
		</view>
		<view class="problem-option">
			<view class="problem-option-head">
				<text class="problem-option-head-text">QQ/微信</text>
			</view>
			<view class="uni-input">
				<input placeholder="(选填,方便我们联系你)" />
			</view>
		</view>
		<button type="primary" class="submit">提交</button>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				wh: 0,
				imageValue: []
			};
		},
		onLoad() {
			// 获取当前设备信息
			let sys = uni.getSystemInfoSync();
			this.wh = sys.windowHeight;
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
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: '问题反馈'
			});
		},
	}
</script>

<style lang="scss" scoped>
	.problem-feedback {
		width: 100%;
		height: 100%;
		background-color: $my-bg-color;

		.problem-option {
			width: 100%;

			.problem-option-head {
				display: flex;
				justify-content: space-between;
				width: 95%;
				margin: 0 auto;
				padding: 10px 0 10px 0;

				.problem-option-head-text {
					font-size: 14px;
					color: #898989;
				}
			}

			.uni-textarea {
				width: 100%;
				background-color: #fff;

				.textarea {
					text-indent: 10px;
					padding-top: 10px;
				}

			}

			.uni-input {
				height: 30px;
				background-color: #fff;
				display: flex;
				align-items: center;
				padding-left: 10px;

			}
		}

		.submit {
			width: 95%;
			margin: 30px auto;
			background-color: $my-color-base;
		}
	}
</style>
