<!-- 项目 Git 地址：git@github.com:rick-peng-li/employee-leave-management-system-web.git -->

# 员工请假管理系统 Web

这是一个基于 MERN 思路实现的员工请假管理系统，包含前端客户端与后端服务端两个子项目。系统支持员工登录后发起请假申请、查看个人请假记录，也支持管理员查看全部申请、审批请假以及注册员工账号。

## 项目简介

该项目采用前后端分离架构：

- 前端负责登录、角色路由控制、员工端与管理员端页面展示
- 后端负责认证鉴权、请假业务处理、员工注册、审批流转与审计日志记录
- 数据层使用 MongoDB 存储用户、请假单与审计日志数据

## 核心功能

- 用户登录认证，登录成功后基于 JWT 进行接口访问鉴权
- 角色权限控制，区分管理员与员工访问能力
- 员工提交请假申请并查看自己的请假记录
- 管理员查看所有请假申请并进行批准或驳回
- 管理员注册员工账号
- 审批操作写入审计日志

## 技术架构

### 前端

- React 19
- React Router DOM
- Axios
- Bootstrap 5
- Create React App

### 后端

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT（jsonwebtoken）
- bcryptjs
- express-validator
- cors
- dotenv
- nodemon

## 架构说明

### 前端结构

前端位于 `client` 目录，主要由以下部分组成：

- `src/pages`：页面级组件，包括登录页、员工首页、管理员首页
- `src/components`：通用组件与受保护路由组件
- `src/services/api.js`：Axios 请求实例，统一注入 token
- `src/App.js`：前端路由入口，按角色区分访问页面

### 后端结构

后端位于 `server` 目录，采用常见的分层方式组织：

- `config`：数据库连接配置
- `controllers`：登录、请假、员工注册等业务逻辑
- `routes`：接口路由定义
- `middleware`：JWT 鉴权与角色权限控制
- `models`：用户、请假单、审计日志数据模型
- `validators`：请假参数校验
- `seed`：管理员和员工初始化脚本

## 目录结构

```text
employee-leave-management-system-web/
├─ client/
│  ├─ public/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ services/
│  └─ package.json
├─ server/
│  ├─ config/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ seed/
│  ├─ validators/
│  ├─ package.json
│  └─ server.js
└─ README.md
```

## 运行环境

建议使用以下环境：

- Node.js 18 及以上
- npm 9 及以上
- MongoDB 本地实例或可访问的 MongoDB 数据库

## 环境变量配置

后端需要在 `server` 目录下创建 `.env` 文件：

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/employee_leave_management
JWT_SECRET=your_jwt_secret
```

前端当前默认请求地址写在 `client/src/services/api.js` 中：

```js
baseURL: "http://localhost:5000"
```

如果后端服务地址发生变化，请同步修改该配置。

## 安装与启动

### 1. 启动后端

```bash
cd server
npm install
npm run dev
```

如果不使用 `nodemon`，也可以直接运行：

```bash
node server.js
```

默认启动地址：

```text
http://localhost:5000
```

### 2. 启动前端

```bash
cd client
npm install
npm start
```

默认访问地址：

```text
http://localhost:3000
```

## 初始化数据

项目提供了初始化脚本，便于快速生成测试账号。

### 初始化管理员账号

```bash
cd server
node seed/adminSeeder.js
```

### 初始化员工账号

```bash
cd server
node seed/employeeSeeder.js
```

## 主要接口说明

### 认证接口

- `POST /auth/login`：用户登录

### 请假接口

- `POST /leaves`：员工提交请假申请
- `GET /leaves/my-leaves`：员工查看自己的请假记录
- `GET /leaves/all`：管理员查看全部请假记录
- `PUT /leaves/:id/status`：管理员更新请假状态

### 员工管理接口

- `POST /employee/register`：管理员注册员工账号

## 权限设计

### 管理员

- 登录系统
- 查看所有请假记录
- 审批请假申请
- 注册员工账号

### 员工

- 登录系统
- 提交请假申请
- 查看个人请假记录

## 开发说明

- 后端通过 JWT 中间件校验登录状态
- 角色权限通过独立中间件进行控制
- 请假申请使用参数校验器校验请求内容
- 管理员审批后会写入审计日志集合
- `.env`、`node_modules`、构建产物等已加入忽略规则

## 注意事项

- 启动前请确保 MongoDB 服务可用
- 若前后端不在同一域名下运行，请确认后端跨域配置是否满足实际部署需求
- 若需要部署上线，建议将前端接口地址改为环境变量管理
