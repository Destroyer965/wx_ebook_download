<template>
	<view>
		<block v-for="(item,index) in bookClassifyInfo" :key="item.id">
			<navigator class="card-item" :url="item.bookurl">
				<image class="left-img" :src="item.bookimg"></image>
				<view class="right-box">
					<text class="item-title my-font-16">{{item.bookname}}</text>
					<text class="item-content my-font-14-gray">
						{{item.bookintroduction}}
					</text>
					<text class="item-publish my-font-14-gray">{{item.bookauthor}}</text>
				</view>
			</navigator>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			'bookClassifyInfo': {
				type: Array,
				required: true
			}
		},
		name: "book-card-item",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.card-item {
		@extend .align-center;
		height: 200rpx;
		width: 95%;
		margin: 0 auto;

		.left-img {
			width: 150rpx;
			height: 150rpx;
			border-radius: 10rpx;
		}

		.right-box {
			width: 300px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;

			.item-title {
				@extend .overflow-ellipsis;
				-webkit-line-clamp: 1;

			}

			.item-content {
				height: 85rpx;
				@extend .overflow-ellipsis;
				-webkit-line-clamp: 2;
			}
		}
	}
</style>
