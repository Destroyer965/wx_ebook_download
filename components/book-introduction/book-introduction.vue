<template>
	<view class="book-introduction-card">
		<view class="book-introduction">
			<image @click="reviewImage(bookimg)" :src="bookimg" mode="" class="left-image"></image>
			<view class="right-introduction">
				<view class="book-name">{{bookname}}</view>
				<view class="book-author">作者:{{bookauthor}}</view>
				<view class="book-publisher">出版社:{{bookpublisher}}</view>
				<view class="book-isbn">ISBN编号:{{bookisbn}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			'bookimg': {
				type: String,
				default: 'xxx'
			},
			'bookname': {
				type: String,
				default: 'xxx'
			},
			'bookpublisher': {
				type: String,
				default: 'xxx'
			},
			'bookauthor': {
				type: String,
				default: 'xxx'
			},
			'bookisbn': {
				type: String,
				default: 'xxx'
			},
		},

		name: "book-introduction",
		data() {
			return {

			}
		},
		methods: {
			reviewImage(imgsrc) {
				let imgs = [];
				imgs.push(imgsrc);
				uni.previewImage({
					current: 0,
					urls: imgs,
					// 长按保存图片
					longPressActions: {
						itemList: ['保存图片'],
						success: data => {
							uni.saveImageToPhotosAlbum({
								filePath: payUrl,
								success: function() {
									uni.showToast({
										icon: 'success',
										title: '保存成功'
									})
								},
								fail: (err) => {
									uni.showToast({
										icon: 'none',
										title: '保存失败，请重新尝试'
									})
								}
							});
						},
						fail: (err) => {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.book-introduction-card {
		width: 100%;
		height: 210rpx;

		.book-introduction {
			display: flex;
			flex: 1;
			align-items: center;
			width: 95%;
			height: 100%;
			margin: 0 auto;


			image {
				width: 150rpx;
				height: 190rpx;
				border-radius: 10rpx;
			}

			.right-introduction {
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				width: 500rpx;
				height: 100%;
				margin-left: 50rpx;


				.book-name {
					font-weight: 800;
				}

				.book-publisher {
					font-size: 28rpx;
					color: #acacad;
				}

				.book-author {
					font-size: 28rpx;
					color: #acacad;
				}

				.book-isbn {
					font-size: 28rpx;
					color: #acacad;
				}
			}
		}
	}
</style>
