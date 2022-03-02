<template>
	<view class="book-nav">
		<view class="left">
			<view class="left-item" @click="itemClick" v-for="item in options">
				<uni-icons :type="item.icon" :color="item.color" :size="item.size"></uni-icons>
				<view :style="{color: item.color}">{{item.text}}</view>
			</view>
		</view>
		<view class="right" >
			<view class="left-btn btn" @click="readOnline">
				在线阅读
			</view>
			<view class="right-btn btn" @click="download">
				下载
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-book-nav",
		props: {
			options: {
				type: Array,
				default: []
			},
			buttonGroup: {
				type: Array
			}
		},
		data() {
			return {

			};
		},
		methods:{
			itemClick(){
				this.$emit('itemClick')
			},
			readOnline(){
				this.$emit('readOnline')
			},
			download(){
				this.$emit('download')
			}
			
		}
	}
</script>

<style lang="scss">
	.book-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 60px;
		background-color: #fff;

		.left {
			flex: 1;

			.left-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 40px;
				font-size: 12px;
			}
		}

		.right {
			display: flex;
			align-items: center;
			flex: 3;

			.btn {
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				height: 40px;
				border: 1px solid #38C16E;
			}

			.left-btn {
				background-color: #fff;
				color: #38C16E;
				border-top-left-radius: 20px;
				border-bottom-left-radius: 20px;
			}

			.right-btn {
				background-color: #38C16E;
				color: #fff;
				border-top-right-radius: 20px;
				border-bottom-right-radius: 20px;
			}
		}
	}
</style>
