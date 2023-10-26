### 计算机
计算机组成：CPU，硬盘，内存，网卡，
1946年2月14第一台计算机问世

### linux系统组成
Linux系统内核（提供调度cpu，调度内存，文件系统，调度网络通讯，IO等）
系统级应用程序（可理解为出厂自带程序，可供用户快速上手操作系统。比如文件管理器，音乐播放等）

### linux
安装方式：真机，虚拟机（vmware workstation， Oracle）

### 命令大全
#### cat concatenate ：连接文件并打印到标准输出设备上
-n = --number 对所有输出的行数编号
-b = --number-nonblank 和-n相似，不过对于空白行不编号     
-s = --squeeze-blank 将多行转为一行  squeeze压榨，挤出，塞入
-v = --show-nonprinting 使用^和M-符号，除了LFD和TAB之外
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


 ### shell
 #! /bin/bash 中#！告诉系统这个脚本用什么解释器来执行，即哪种shell， echo用于向窗口输出文本

### shell变量名
ROOT
LD_JA
_var
var2

for file in $(ls /etc) 将/etc下目录的文件名循环出来

使用定义过的变量，在变量名前面加美元符号：
echo $your_name
echo ${your_name} 花括号可选，加是为了帮助解释器识别变量的边界
for skill in Ada Coffe Action Java; do
  echo "I am good at ${skill}Script"
done
给skill加花括号解释器就会吧$skillScript当成一个变量
已被定义过的变量可以重新定义

使用readonly可以将变量变成只读，

#！/bin/bash
muyUrl="https://www.google.com"
readonly muUrl

删除变量：unset myUrl
unset不能删除只读变量

变量类型
  局部变量
  环境变量
  shell变量
- Shell字符串：

双引号：双引号里面可以有变量转义字符，单引号里面的变量是无效的

双引号可以拼接字符串


- 获取字符串长度
string="abcd"
echo ${#string} 输出4

- 提取子字符串
string="root is a great user"
echo ${string:1:4} 输出oot

- 查找字符串
echo `expr index "$string" io` 查找字符i或o的位置哪个先出现，输出1

- shell数组
bash支持一维数组，不支持多维数组，
array_name=(v1, v2,c3)
array_name[0]=v1

- 读取数组：${array_name[n]}获取数组中单个元素
- 获取数组长度： length=${#array_name[@]} 或者length=${#array_name[*]}

- shell注释
以#开头的就是注释，通过每行加一个#设置多行

- 多行注释： 将要注释代码用一对花括号括起来，定义成一个函数，没有其他地方调用就不会执行
:<<EOF
EOF
也可以:<<'   '其他符号去多行注释


- shell传递参数
$n, n代表一个数字
实例：向脚本传递三个参数分别输出。其中$0为执行的文件名包含路径
#!/bin/bash
# author:菜鸟教程

echo "shell 传递参数实例！“
echo "执行的文件名: $0"
echo "第一个参数为：$1"
echo "第二个参数为：$2"
echo "第三个参数为：$3"

$ chmod +x test.sh
$ ./test.sh 1 2 3
结果：
执行的文件名： ./test.sh
第一个参数为：1
第二个参数为：2
第三个参数为：3

$# 传递的参数个数
$* 传递的参数内容
$@ 传递的参数内容，
echo "-- \$* 演示 ---"
for i in "$*"; do
  echo $i
done

echo "---\$@ 演示 ---"
for i in "$@"; do
  echo $i
done

### shell运算符
加运算符：var=`expr 2 + 2`
echo "两数: $val"
数字和符号之间要有空格，完整表达式要放在``
算数运算符
+ `expr $a + $b` 结果为30
- `expr $a-$b` 结果为10
* / % = == != *号前面必须是反斜杠才能实现乘法
关系运算符
-eq 相等 
-ne 不相等
-gt 左边大于右边
-lt 左边小于
-ge大于等于
-le小于等于
a=10
b=20
if [$a -eq $b]
then
  echo "$a -eq $b: a等于b"
else 
  echo "$a -eq $b: a不等于b“
  
布尔运算符
！非运算
-o 或运算
-a 与运算
if [$a -lt 100 -a $b -gt 15]
then 
  echo "$a 小于100 且$b大于15"
逻辑运算符
&& ||
字符串运算符
= , !=：检测两个字符串是否相等, -z：检测长度是否为0, -n检测字符串长度是否不为0 , $检测字符串是否为空

文件测试运算符
-b file 检测文件是否是快设备文件 [-n $file] 
-c file 检测是否是字符设备文件
-d file 是否目录
-f file 是否是普通文件
-g 是否

### printf命令
%s输出一个字符串
%c输出一个字符
%d整型输出
%f输出实数
%-10s一个宽度为10个字符，任何字符都会被显示在10个字符宽度内，不足字段以空格填充，超出会全部显示
%-4.2f格式为小数，.2保留2位小数

### test命令
-gt -lt -eq, -ne, -ge, -le
!= = -z -   ；lklkkk

### 流程控制
if
then
fi

init=1
while(( $init<=5 ))
do
  echo $init
  let :init++"
done