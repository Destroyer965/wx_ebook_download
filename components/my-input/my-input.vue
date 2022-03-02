<template>
	<view class="my-input" @click.stop="myinput">
		<view class="my-input-top">
			<input :auto-focus="true" confirm-type="send" maxlength="255"  v-model.trim="inputValue" cursor-spacing="20" class="input"  placeholder="输入评论..." />
			<text  class="send" @click="send">发布</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-input",
		data() {
			return {
				inputValue:''
			};
			
		},
		methods:{
			myinput(){
				this.$emit('myinput')
			},
			send(){
				this.$emit('send',this.inputValue)
			}
		}
	}
</script>

<style lang="scss">
	@import url("/static/fonts/iconfont.css");

	.my-input {
		width: 100%;
		height: 70px;
		padding: 10px 0;
		background-color: #fff;
		box-shadow: 11px 14px 17px 2px rgba(0,0,0,0.55);
		.my-input-top {
			display: flex;
			justify-content: space-between;
			align-content: center;
			width: 95%;
			height: 35px;
			margin: 0 auto;

			.input {
				flex: 5;
				height: 35px;
				padding-left: 20px;
		
				background-color: $my-bg-color;
				border-radius: 20px;
			}

			.send {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;

			}
		}
	}
</style>
