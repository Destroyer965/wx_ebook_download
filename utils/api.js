import request from "./request.js"
//登录
export function login(data) {
	return request({
		url: '/auth/login',
		method: 'POST',
		data
	})
}
//登录
export function logout() {
	return request({
		url: '/auth/logout',
		method: 'DELETE',
	})
}
// 获取用户信息
export function getUserInfo() {
	return request({
		url: '/user/userinfo',
		method: 'GET',
	})
}
//获取轮播图
export function banner() {
	return request({
		url: '/system/banner',
		method: 'GET',
	})
}
//获取图书分类
export function category(param) {
	return request({
		url: '/book/categoryList?pageNo=' + param.pageNo + '&pageSize=' + param.pageSize,
		method: 'GET',
	})
}
//获取图书推荐列表
export function recommendedList(param) {
	return request({
		url: '/book/recommendedList?pageNo=' + param.pageNo + '&pageSize=' + param.pageSize,
		method: 'GET'
	})
}
//按照图书分类id分页查询图书
export function getBookByCategoryId(param) {
	return request({
		url: '/book/category?categoryId=' + param.categoryId + '&pageNo=' + param.pageNo + '&pageSize=' + param
			.pageSize,
		method: 'GET',
	})
}
//根据图书id查询图书信息
export function getBookById(param) {
	return request({
		url: '/book/' + param,
		method: 'GET',
	})
}
//根据用户id查询用户收藏列表
export function getCollectionById(param) {
	return request({
		url: '/collection/select?pageNo=' + param.pageNo + "&pageSize=" + param.pageSize,
		method: 'GET',
	})
}
//根据用户id和图书id查询该用户是否收藏该图书
export function getCollectionByUserAndBookID(param) {
	return request({
		url: '/collection/' + param,
		method: 'GET',
	})
}
// 根据用户id图书id添加收藏记录
export function addCollection(param) {
	return request({
		url: '/collection/add/' + param,
		method: 'PUT',
	})
}
// 根据用户id图书id删除收藏记录
export function delCollection(param) {
	return request({
		url: '/collection/del/' + param,
		method: 'DELETE',
	})
}

//根据图书id查询图书评论列表
export function getCommentList(param,data) {
	return request({
		url: '/book/comments/' + param,
		data,
		method: 'GET',
	})
}

//根据图书id发布图书评论
export function addComment(data) {
	return request({
		url: '/book/comments/publish',
		data,
		method: 'POST',
	})
}
//根据图书评论获取点赞总数
export function likedCount(param) {
	return request({
		url: '/user/liked/count/'+param,
		method: 'GET',
	})
}
// 查看用户是否对该评论点赞
export function isLiked(param) {
	return request({
		url: '/user/isliked/'+param,
		method: 'GET',
	})
}
// 对图书评论点赞
export function liked(param) {
	return request({
		url: '/user/liked/'+param,
		method: 'GET',
	})
}
// 根据评论id查询评论信息
export function commentById(param) {
	return request({
		url: '/book/comment/'+param,
		method: 'GET',
	})
}
// 根据评论id查询回复信息
export function replayByParentId(data) {
	return request({
		url: '/book/comments/replay/',
		method: 'POST',
		data
	})
}
// 根据评论id查询评论数量
export function commentCountById(param) {
	return request({
		url: '/book/comment/count/'+param,
		method: 'GET',
	})
}
//下载
export function download(param){
	return request({
		url: '/book/download/'+param,
		method: 'GET',
	})
}
//模糊查询图书
export function fuzzyQueryBook(param){
	return request({
		url: '/book/search/'+param,
		method: 'GET',
	})
}
//添加搜索录
export function addSearchHistory(param){
	return request({
		url: '/book/search/'+param,
		method: 'POST',
	})
}
//删除收藏记录
export function delSearchHistory(){
	return request({
		url: '/book/search',
		method: 'DELETE',
	})
}

//查询搜索记录
export function querySearchHistory(){
	return request({
		url: '/book/query/search',
		method: 'GET',
	})
}

//查询搜索排行榜
export function querySearchrank(){
	return request({
		url: '/book/searchrank',
		method: 'GET',
	})
}
//根据分类条件查询图书
export function queryBookByCondition(param){
	return request({
		url: '/book/conditions/'+param.id+'/'+param.name+'/'+param.sort,
		method: 'GET',
	})
}
//根据用户id查询下载记录
export function queryDownloadHistory(data){
	return request({
		url: '/download/history',
		method: 'GET',
		data
	})
}
//根据用户id添加下载记录
export function addDownloadHistory(param){
	return request({
		url: '/download/history/'+param,
		method: 'PUT',
	})
}
//根据用户id删除下载记录
export function delDownloadHistory(param){
	return request({
		url: '/download/history/'+param,
		method: 'DELETE',
	})
}
// 签到
export function registration(){
	return request({
		url: '/user/signIn',
		method: 'PUT'
	})
}
// 用户一天内是否第一次进入
export function firstinto(){
	return request({
		url: '/user/firstinto',
		method: 'GET'
	})
}
//发表读友圈
export function addCircleFriend(data){
	return request({
		url:'/readcircle/add',
		method:'POST',
		data
	})
}
//上传图片
export function uploadImg(data){
	return request({
		url:'/upload/img',
		method:'POST',
		data
	})
}
//查询读友圈列表
export function queryReadcircle(param){
	return request({
		url:'/readcircle/selectpage?pageNo='+param.pageNo+"&pageSize="+param.pageSize,
		method:'GET',
	})
}