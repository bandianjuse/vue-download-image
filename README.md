# vue-d-img-down

> 一个vue.js的directive，能够将html转化成图片并下载


## 安装


```sh
$ npm i vue-d-img-down --save
```

## 引入

```js
import ImageDownload from 'vue-d-img-down';

Vue.use(ImageDownload);
```

## 使用
```js
<div v-download-image> <!-- 添加 v-download-image 指令 -->

    <!-- 添加 a 标签 -->
    <a download data-html2canvas-ignore><i class="fa fa-download"></i></a>
    <!-- 点击这个链接可以将指令所在的html转成图片并下载 -->
    <!-- 添加 data-html2canvas-ignore 属性可以忽视标签转化 -->

    <div>HTML内容，将它转化成图片并下载</div>

    <!-- 不添加上面的链接会自动插入这个标签 -->
    <!--<a href="#" class="down-label" download data-html2canvas-ignore>下载</a>-->
</div>
```