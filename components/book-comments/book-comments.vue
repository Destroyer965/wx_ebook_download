<template>
	<view class="comments">
		<uni-card class="comments-card">
			<view class="comments-top">
				<view class="comments-number">评论&nbsp;<text>({{number}}条)</text></view>
				<view class="comments-btn" @click.stop="writeComment">
					<text class="icon"></text>
					<text class="icon icon-bi" >写评论</text>
				</view>
			</view>
			<view class="comments-box">
				<view class="comments-item" v-for="(item,index) of commentUserinfo" :key="item.id">
					<view class="comments-item-top">
						<image class="comment-useravatar" :src="item.useravatar">
						</image>
						<view class="comments-item-top-right">
							<text class="comment-username my-font-size-22">{{item.username}}</text>
							<text class="comments-time my-font-14-gray">{{item.userCommentsTime}}</text>
						</view>

					</view>
					<view class="comments-item-content">
						<text class="comment-usercontent my-font-16">{{item.userCommentsContent}}</text>
					</view>
					<view class="comments-item-bottom">
						<view class="comments-item-bottom-right">
							<view class="comment-thumbsup my-font-14-gray">
								<uni-icons color="#C0C0C0" size=20 type="hand-up" @click="thumbsup"></uni-icons>
								<text class="comment-num">{{item.userCommentNum}}</text>
							</view>
							<view class="comment-replay my-font-14-gray" @click="replay">
								<uni-icons color="#C0C0C0" size=20 type="chatbubble"></uni-icons>
								<text class="replay">回复</text>
							</view>
						</view>
					</view>
					<view class="comments-item-children" v-if="item.children">
						<view class="children-item" v-for="(child,index) of item.children" :key="child.id">
							<text class="reply-name">{{child.username}}</text>
							<text>:</text>
							<text class="reply-text">{{child.commnentText}}</text>
						</view>
					</view>
				</view>
			</view>
		</uni-card>
	
	</view>
</template>

<script>
	export default {
		props: {
			'commentUserinfo': {
				type: Array,
				required: true,
			}
		},
		name: "book-comments",
		data() {
			return {
				number: 0
			};
		},
		methods: {
			writeComment() {
				this.$emit('writeComment')
			},
			thumbsup() {
				console.log('点赞')
			},
			replay() {
				console.log('评论')
			},
			
			
		}
	}
</script>
<style>
	@import url("/static/fonts/iconfont.css");
</style>
<style lang="scss">
	.comments {
		width: 100%;

		.comments-card {
			display: block;
			width: 95%;
			margin: 0 auto;
			padding-bottom: 10px;
			border-radius: 10rpx;
			background-color: #fff;

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

				.comments-item{
					margin-bottom: 15px;
				}
				.comments-item-top {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 100%;
					height: 50px;


					image {
						width: 100rpx;
						height: 140rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.comments-item-top-right {
						@extend.align-center;
						justify-content: center;
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
