<!--
 * @Description: 
 * @Author: yourName
 * @Date: 2022-12-08 10:07:24
 * @LastEditors: wunihong
 * @LastEditTime: 2022-12-08 14:39:10
-->
<!-- 
网络相关：fetch开头缓存检查，connect开头tcp链接，domain开头dns请求，request/response http请求和响应
dom加载相关：dom开头
onload事件相关：load开头
常用性能指标计算公式：
DNS查询消耗：domainLookupEnd-domainLookupStart
TCP链接耗时：connectEnd-connectStart
请求耗时：requestEnd-requestStart
dom解析耗时：domComplate-domInteractive
白屏时间：domloading-fetchStart
domready时间：domContentLoadedEventEnd - fetchStart
onload时间：loadEventEnd -fetchStart
静态资源统计api：performance.getEntries返回一个数组包含所有js，css，img等静态资源加载的数据，duration表示加载时长


加载优化：减少http请求（合并css，js），缓存一切可缓存资源（所有静态资源在服务端设置缓存，尽量使用长缓存）使用外联样式和脚本
          压缩代码减少资源体积，服务端设置gzip压缩，
          首屏加载：
          按需加载（会导致重绘影响渲染性能）滚动加载，预加载，异步加载第三方资源
执行优化：
          头部内联样式和脚本会阻塞页面渲染，样式用link引入放头部，脚本用异步加载放尾部，
渲染优化：
    设置viewport，viewport可加速页面渲染，减少dom节点，尽量使用c3动画，requestAnimation代替setTimeout
    减少dom操作，高频事件使用防抖节流，
样式优化：
    不滥用float，float渲染时计算量较大，尽量少使用。
    不要过多的fon-size，影响css树的效率，值为0时不要任何单位（为了浏览器兼容性和性能）
    display：inline后不要使用margin,padding，float宽高。
    display: block后不要使用vertial-align
    display:inline-block后不要使用float
脚本优化：
    减少回流重绘，避免不必要的dom操作，尽量使用class而不是style，尽量用id选择器，是最快的，缓存.length的值，尽量使用事件代理，避免批量绑定事件，
代码优化

 -->