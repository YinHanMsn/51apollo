/*
* YinHan，邮箱 yinhanmsn@sian.com
* 说明
* 51apollo.com是基于wordpress创建的，在获取文章内容需要URL的字段按照一定格式
*/

export const BASE_URL = 'http://www.51apollo.com';

//获取文章列表
export const GET_LIST_FOR_ID = '/api/core/get_category_posts/?id=';
export const GET_LIST_INCLUDE = '&include=title,author,date';

//获取文章详情
export const GET_CONTENT_DETAIL = '/api/get_post/?post_id='
export const GET_CONTENT_INCLUDE = '&include=title,author,date,content,url'

//获取评论
export const GET_CONTENT_INCLUDE_COMMENT = '&include=comments'
