<template>
	<view class="search-advice-list">
		<view class="search-advice-item" v-for="(item,index) in searchContext" :key="index">
			<text class="search-advice-item-text">{{item.title}}</text>
			<uni-icons size="14" class="search-advice-item-icon" type="right"></uni-icons>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			'searchContext':{
				type:Array
			}
		},
		name: "seach-advice-list",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.search-advice-list {
		width: 100%;
		height: auto;
		background-color: #fff;

		.search-advice-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid $my-bg-color;
			height: 50px;
			width: 95%;
			margin: 0 auto;

			.search-advice-item-text {
				font-size: 14px;
			}
		}
	}
</style>
