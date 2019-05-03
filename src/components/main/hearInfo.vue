<template>
	<div class="hearInfo">
		<div class="cover-top">
			每天资讯
		</div>
		<div class="cover-bottom"></div>
		<div class="cover-img"></div>
		<iframe src="http://m.wufazhuce.com/one/2420" width="375" height="800" frameborder="0"></iframe>
	</div>
</template>

<script>
	export default{
		name:"hearinfo"
		
	}
</script>

<style scoped>
	.hearInfo{
		margin-top: 5px;
		border-top: 1px solid #F8F8F9;
		width: 100%;
		position: relative;
	}
	.cover-top{
		
		background: #FFFFFF;
		height: 50px;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		font-size: 21px;
		text-align: center;
		color: #444444;
		line-height: 50px;
	}
	/*.cover-left{
		background: #FFFFFF;
		height: 50px;
		width: 100px;
		position: absolute;
		top: 0;
		right:0;
		
	}*/
	.cover-bottom{
		
		background: #FFFFFF;
		height: 50px;
		width: 100px;
		position: absolute;
		bottom: 0;
		left: calc(50% - 50px);
		
	}
	.cover-img{
		
		height: 500px;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		
	}
</style>