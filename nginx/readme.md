### Nginx介绍
具有高性能的HTTP和反向代理的WEB服务器

POP3（Post Offic Protocol 3）邮局协议的第三个版本
SMTP(Simple Mail Transfer Protocol) 简单邮件传输协议
IMAP(Internet Mail Access Protocol) 交互式邮件存储协议

正向代理：服务于客户端
反向代理：服务于服务器

## Nginx优点
1）速度快，并发高，（Nginx采用了多进程和I/O多路复用epoll的底层实现）
2）配置简单，扩展性强 （本身由很多模块组成，这些模块可通过配置文件的配置来添加
3）高可靠性，采用多进程模式运行，其中master主进程和N多个worker进行
4）热部署
## Nginx静态资源部署

#### 静态资源概述
#### 静态资源配置
#### 静态资源压缩
#### 静态资源跨越
#### 静态资源防盗链
#### 浏览器缓存


## Nginx后端服务器组的配置指令
#### 5个常用指令
#### Rewrite功能的配置
- 地址重写与地址转发
- rewrite规则
- if指令
- break指令
- rewrite指令
- rewrite_log指令
- set指令
- rewrite常用全局变量
#### Rewrite的使用
- 域名跳转
- 域名镜像
- 独立域名
- 目录字段添加/
- 目录合并
- 防盗链
## Nginx反向代理
- 什么是反向代理
- 反向代理配置语法
- 反向代理实战
- upstream+proxy_pass
- 安全隔离
- 基于原始IP地址阻止流量以及发放
## Nginx负载均衡

## Nginx缓存集成

## Nginx集群
## 高可用解决方案
- keepalived高可用服务介绍
- keepalived原理解析
- VRRP原理解析
- 高可用环境搭建
