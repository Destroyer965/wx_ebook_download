<template>
	 <view style="width: 100%;">
	        <web-view :src="webUrl"></web-view>
	    </view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl:''
			};
		},
		onLoad(option){
			this.webUrl = option.url		}
	}
</script>

<style lang="scss">

</style>
