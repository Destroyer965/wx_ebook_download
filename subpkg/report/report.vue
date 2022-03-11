<template>
	<view class="problem-feedback">
		<uni-notice-bar class="notice-bar" showIcon="true" color="red" 
			text="您的举报将会在第一时间受理,若举报成功,会第一时间告知处理结果,请尽量提交完整的举报描述及材料"></uni-notice-bar>
		<uni-combox label="举报理由" :candidates="candidates" placeholder="请选择举报理由" v-model="reportReason"></uni-combox>
		<view class="problem-option">
			<view class="problem-option-head">
				<text class="problem-option-head-text">举报描述</text>
			</view>
			<view class="uni-textarea report-reason">
				<textarea class="textarea" placeholder="请详细描述举报理由..."></textarea>
			</view>
		</view>
		<view class="problem-option">
			<view class="problem-option-head">
				<text class="problem-option-head-text">图片(选填，提供举报截图)</text>
			</view>
			<view class="uni-textarea">
				<uni-file-picker title="最多选择四张图片" v-model="imageValue" fileMediatype="image" file-extname="png,jpg,jpeg"
					:limit="4" mode="grid" :image-styles="imgStyle" @select="select" @progress="progress"
					@success="success" @fail="fail">
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
		<button  type="primary" class="submit">提交</button>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				imageValue: [],
				candidates: ["色情低俗", "违法犯罪", "涉嫌欺诈", "造谣传谣", "垃圾广告", "谩骂，人身攻击"],
				reportReason: '',
				imgStyle: {
					"height": 85, // 边框高度
					"width": 85 // 边框宽度
				}
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
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: '举报'
			});
		},
	}
</script>

<style lang="scss" scoped>
	.problem-feedback {
		width: 100%;
		height: 100%;

		.notice-bar {
			position: static;
			top: 0;
			left: 0;
		}

		.problem-option {
			width: 100%;

			.report-reason {
				background-color: #F1F0F3 !important;
			}

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
				width: 95%;
				margin: 0 auto;
				background-color: #fff;

				.textarea {
					text-indent: 10px;
					padding-top: 10px;
				}

			}

			.uni-input {
				height: 35px;
				background-color: #F1F0F3;
				display: flex;
				align-items: center;
				padding-left: 10px;

			}
		}

		.submit {
			width: 95%;
			margin: 70px auto;

			background-color: #FD2C54;
		}
	}

	/deep/ .uni-file-picker__container {
		justify-content: space-between;
	}

	/deep/ .uni-file-picker__header {
		width: 100%;
		margin: 0 auto;
	}

	/deep/ .icon-del-box {
		width: 20px;
		height: 20px;
	}

	/deep/ .uni-file-picker__container {
		width: 100%;

	}

	/deep/ .uni-combox__label.data-v-06b292c9 {
		font-size: 14px;
		color: #898989;
	}

	/deep/ .uni-combox.data-v-06b292c9 {
		border: none;
	}
</style>
