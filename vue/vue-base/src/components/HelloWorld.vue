<template>
  <div class="hello">
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    function uploadFile(file) { var xhr = new XMLHttpRequest(); 
      // 上传进度事件监听 
      xhr.upload.addEventListener('progress', function(event) { 
        if (event.lengthComputable) { 
          var progress = Math.round((event.loaded / event.total) * 100); 
          // 计算上传进度百分比 
          var speed = event.loaded / ((event.timeStamp - startTime) / 1000); // 计算上传速度（字节每秒） console.log('上传进度：', progress + '%'); // 在控制台中显示上传进度 console.log('上传速度：', formatFileSize(speed) + '/s'); // 在控制台中显示上传速度 } }); // 文件上传完成的回调函数 xhr.onload = function() { console.log('文件上传完成'); }; // 初始化开始时间 var startTime = performance.now(); xhr.open('POST', 'upload-url'); xhr.send(file); } // 格式化文件大小（将字节数转换为可读格式） 
     formatFileSize(bytes) { 
      if (bytes === 0) return '0 Bytes'; 
      var k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'], i = Math.floor(Math.log(bytes) / Math.log(k)); 
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
