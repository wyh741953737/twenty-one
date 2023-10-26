### child_process作用
衍生子进程，child_process.spawn提供

exec: 在node里执行shell命令，官方解释：衍生一个shell并在shell里执行命令

execSync：执行特定的程序shell，参数作为数组传入，不会被bash解释，因此安全性较高

区别就是参数传递的方式，还有安全性

spawn创建一个子进程来执行特定shell命令，用法和execFile类似，但是没有回调函数，只能通过监听事件来获取运行结果，属于异步，适用于子进程长时间运行情况

fork直接创建一个子进程，执行js脚本，fork会在父子进程间简历通信管道用于通信