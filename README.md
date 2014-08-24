VanishNode
----------
## 介绍
VanishNode 是一款采用 Node.js/Redis 编写的轻量级的跨平台图片缓存系统，配置简单、稳定高效，它适合于图片附件、图片采集缓存，支持自定义大小的图片压缩与压缩。

## 安装部署 ##

    // install node npm redis-server libvips-dev
    // run redis-server
    $ npm install
    $ vim config.js
    // edit config.js file as yours
    $ node vanish.js

## 使用教程

**获取加密链接**

加密链接的 Node.js 加密/解密方法在工程的 urlcrypt.js 中，其加密原理为：

 1. 将URL字符串倒序排序
 2. 转换为Base64字符串
 3. 再将生成的Base64字符串倒序
 4. 最后将该字符串urlencode编码

解密则反转以上操作

**图片请求**
第一次请求，服务器将会向请求中的URL下载该图片，以保证再一次请求能够节省服务器流量与提高访问速度

GET请求如下：

    GET http://localhost/{url_token}/{image_new_size}.jpg
或者

    GET http://localhost/{image_new_size}/{url_token}.jpg
以上任意一种方法均能成功请求图片，其中：

> {image_new_size}：图片压缩宽度，允许的值可以在config.js内设置
> {url_token}：经过加密后的URL字符串

## License

Copyright (c) 2014 Plutonium

Licensed under the GPL v3; you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.gnu.org/copyleft/gpl.html.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.