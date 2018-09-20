# vue-directive-pdf-download

> 一个vue.js的directive，能够将html转化成pdf和图片并下载


## 安装


```sh
$ npm i vue-directive-pdf-download --save
```

## 引入

```js
import PdfDownload from 'vue-directive-pdf-download';

Vue.use(PdfDownload);
```

## 使用
### v-download-image
> 将指令内的DOM转化成图片并下载
```js
<div v-download-image="{ title: '我下载的图片' }"> <!-- 添加 v-download-image 指令 -->

    <!-- 添加 a 标签 -->
    <a download data-html2canvas-ignore><i class="fa fa-download"></i></a>
    <!-- 点击这个链接可以将指令所在的html转成图片并下载 -->
    <!-- 添加 data-html2canvas-ignore 属性可以忽视标签转化 -->

    <div>HTML内容，将它转化成图片并下载</div>

    <!-- 不添加上面的链接会自动插入这个标签 -->
    <!--<a href="#" class="down-label" download data-html2canvas-ignore>下载</a>-->
</div>
```

### v-download-pdf
> 将指令内的DOM转化成图片并下载为PDF

```js
<div v-download-pdf="{ title: '我下载的PDF' }"> <!-- 添加 v-download-pdf 指令 -->

    <!-- 添加标签 -->
    <i class="fa fa-download" download data-html2canvas-ignore></i>
    <!-- 点击标签可以将指令所在的html转成图片并下载为PDF -->
    <!-- 添加 data-html2canvas-ignore 属性可以忽视标签转化 -->

    <div style="display: none" recessive>隐藏的内容，打印到pdf里</div>
    <!-- 添加 recessive 属性可以隐藏的内容,但会打印到pdf里 -->

    <div>HTML内容，将它转化成图片并下载为PDF</div>

    <!-- 不添加上面的标签会自动插入这个标签 -->
    <!--<div class="down-label" download data-html2canvas-ignore>下载PDF</div>-->
</div>
```