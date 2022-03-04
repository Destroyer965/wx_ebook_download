<template>
	<view class="comments">
		<uni-card class="comments-card">
			<view class="comments-top">
				<view class="comments-number">评论&nbsp;<text>({{count}}条)</text></view>
				<view class="comments-btn" @click.stop="writeComment">
					<text class="icon"></text>
					<text class="icon icon-bi">写评论</text>
				</view>
			</view>
			<view>
				<view class="comments-box" v-if="!isempty">
					<view class="comments-item" v-for="(item,index) of comments" :key="item.id">
						<view class="comments-item-top">
							<image class="comment-useravatar" :src="item.reviewer.avatar">
							</image>
							<view class="comments-item-top-right">
								<text class="comment-username my-font-size-22">{{item.reviewer.username}}</text>
								<uni-dateformat class="comments-time my-font-14-gray" :date="item.gmtCreat"
									threshold="[60000, 3600000]"></uni-dateformat>
							</view>

						</view>
						<view class="comments-item-content">
							<text class="comment-usercontent my-font-16">{{item.content}}</text>
						</view>
						<view class="comments-item-bottom">
							<view class="comments-item-bottom-right">
								<view class="comment-thumbsup my-font-14-gray" @click="thumbsup(index,item.id)">
									<uni-icons :color="item.isSelected?'red':'#C0C0C0'" size=20 type="hand-up">
									</uni-icons>
									<text class="comment-num">{{item.likeNum || 0}}</text>
								</view>
								<view class="comment-replay my-font-14-gray" @click.stop="replay(index,item.id)">
									<uni-icons color="#C0C0C0" size=20 type="chatbubble"></uni-icons>
									<text class="replay">回复</text>
								</view>
							</view>
						</view>
						<view class="comments-item-children" v-if="item.subComments">
							<view class="children-item" v-for="(child,index) of item.subComments" :key="index">
								<text class="reply-name">{{child.reviewer.username}}</text>
								<text>:</text>
								<text class="reply-text">{{child.content}}</text>
							</view>
						</view>
					</view>
					<slot name="loading"></slot>
				</view>
				<view v-else class="empty-comments" v-else>
					<image src="https://wx-ebook-download.oss-cn-chengdu.aliyuncs.com/image/img_data_3x.jpg"></image>
					<view>暂无评论</view>
				</view>
			</view>

		</uni-card>
	</view>
</template>

<script>
	export default {
		props: {
			'comments': {
				type: Array,
				required: true,

			},
			'total':{
				type:Number,
				default:0
			},
			'count':{
				type:Number,
				default:0
			},
			'isempty':{
				type:Boolean
			},
			'query': {
				type: Object
			},
			'iconColor': {
				type: String,
				default: '#C0C0C0'
			},


		},
		name: "book-comments",
		data() {
			return {};
		},
		methods: {
			writeComment() {
				this.$emit('writeComment')
			},
			thumbsup(index, id) {
				this.$emit('thumbsup', index, id)
			},
			replay(index, id) {
				this.$emit('replay', index, id)
			}
		},
	}
</script>
<style>
</style>
<style lang="scss">
	.isSelected {
		color: red;
	}

	.comments {
		width: 100%;

		.comments-card {
			display: block;
			width: 95%;
			margin: 0 auto;
			padding-bottom: 10px;
			border-radius: 10rpx;
			background-color: #fff;

			.empty-comments {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				image {
					height: 200px;
				}
			}

			.comments-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 50px;

				.comments-number {
					margin: 15rpx 0 0 20rpx;
				}

				.comments-btn {
					display: flex;
					width: 100px;
					border-radius: 50rpx;
					justify-content: center;
					align-items: center;
					height: 35px;
					margin: 15rpx 20rpx 0 0;
					background: linear-gradient(to right, #fa709a 0%, #fee140 100%);

					.icon {
						font-family: iconfont;
					}
				}
			}

			.comments-box {
				height: 100%;
				padding-bottom: 70px;
				position: relative;
				.loading {
					position: absolute;
					left: 0;
					width: 100%;
					bottom: 60px;
				}
				.comments-item {
					width: 95%;
					margin: 0 auto;
					margin-bottom: 15px;
				}

				.comments-item-top {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 100%;
					height: 50px;


					image {
						width: 85rpx;
						height: 85rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.comments-item-top-right {
						@extend.align-center;
						justify-content: center;
						align-items: flex-start;
						flex-direction: column;
					}
				}

				.comments-item-content {
					margin: 10rpx 0 10rpx 120rpx;

					.comment-usercontent {}
				}

			}

			.comments-item-bottom-right {
				display: flex;
				justify-content: flex-end;

				.comment-thumbsup {
					margin-right: 20rpx;
					@extend .align-center;

					.comment-num {
						margin-left: 10rpx;
					}
				}

				.comment-replay {
					margin-right: 20rpx;
					@extend .align-center;

					.replay {
						margin-left: 10rpx;
					}
				}
			}

			.comments-item-children {
				margin: 10rpx 20rpx 0 120rpx;
				background-color: $my-bg-color;
				border-radius: 10rpx;

				.children-item {
					padding: 10rpx 0 10rpx 20rpx;

					.reply-name {
						font-size: 16px;
						color: #2092ee;
					}

					.reply-text {
						margin-left: 10rpx;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>
