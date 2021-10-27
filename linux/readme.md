### 计算机
计算机组成：CPU，硬盘，内存，网卡，
1946年2月14第一台计算机问世

### linux
安装方式：真机，虚拟机（vmware workstation， Oracle）




### 命令大全
#### cat concatenate ：连接文件并打印到标准输出设备上
-n = --number 对所有输出的行数编号
-b = --number-nonblank 和-n相似，不过对于空白行不编号
-s = --squeeze-blank 将多行转为一行  squeeze压榨，挤出，塞入
-v = --show-nonprinting 使用^和M-符号，出了LFD和TAB之外
-E = --show-ends 每行结束处显示$
-T = --show-tabs 将TAB字符显示为^|
-e = -vE选项
-t = -vT选项
-A = --show-all = -vET
实例：
- 将textfile1文档内容加上行号后输入textfile2文档里
  cat -n textfile1 > textfile2
- 将textfile1和textfile2文档内容加上行号（空白行不加）之后将内容附加到textfile3
  cat -b textfile1 textfile2 >> textfile3
- 清空/etc/test.txt文档内容
  cat /dev/null > etc/test.test.txt
- 使用cat制作镜像文件，例如制作软盘的镜像文件，将软盘放好后输入
  cat /dev/fd0 > OUTFILE(镜像文件名)
- 将image file（IMG_FILE指的是镜像文件）写入到软盘 输入
  cat IMG_FILE > /dev/fd0

#### chattr 改变文件属性
可改变存在ext2文件系统上的文件或者目录属性，这些属性有8种模式：
a：让文件或者目录仅供附加用途
b: 不更新文件或者目录的最后存取时间
c：将文件或者目录压缩后存放
d：将文件或者目录排除在倾倒操作之外
i：不得任意更改文件或者目录
s：保密性删除文件或目录
S: 即时更新文件或者目录
u：预防意外删除

-R 递归处理 recursion recursive
-v 版本编号，设置文件或者目录版本
-V 显示指令执行过程
+<属性> 开启文件或者目录的该属性
-<属性> 关闭文件或者目录的该属性
=<属性> 指定文件或者目录的该属性

实例：
- 使用chattr防止系统中某个关键文件被修改
 chattr +i /etc/resolv.conf
 lsattr /etc/resolv.conf 会显示 ----i------- /etx/resolv.conf
- 让某个文件只能往里面追加数据，但不能删除，适用于各种日志文件
 chattr +a /var/log/message