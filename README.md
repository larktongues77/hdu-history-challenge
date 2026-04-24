# 杭电校史大闯关

> 杭州电子科技大学校史知识答题闯关游戏

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://你的用户名.github.io/hdu-history-challenge/)

## 项目介绍

「杭电校史大闯关」是一款以杭州电子科技大学70年校史为主题的答题闯关网页游戏。玩家需要依次回答19道精心设计的校史选择题，从1956年建校一路闯关到2026年70周年校庆，最终解锁「杭电校史达人」称号。

## 游戏特色

- **19道关卡**：涵盖杭电从创建、更名、改制到发展的全部关键历史节点
- **倒计时系统**：每题限时15秒，紧张刺激
- **生命值机制**：初始3颗心，答错扣1心，归零则游戏结束
- **计分系统**：基础分100分 + 时间奖励 + 连击奖励
- **称号系统**：根据得分解锁「杭电萌新→学子→骨干→精英→校史达人」五级称号
- **通关庆祝**：全部通关后触发烟花特效，颁发电子证书

## 技术栈

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion（页面动效）
- Canvas Confetti（庆祝特效）

## 本地运行

```bash
# 克隆仓库
git clone https://github.com/你的用户名/hdu-history-challenge.git
cd hdu-history-challenge

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署到 GitHub Pages

### 方式一：GitHub Actions 自动部署（推荐）

本项目已配置 GitHub Actions 工作流，推送代码到 `main` 分支后会自动构建并部署。

1. 在仓库 **Settings** → **Pages** 中，将 Source 设为 **GitHub Actions**
2. 推送代码到 `main` 分支
3. 等待 Actions 完成，访问 `https://你的用户名.github.io/hdu-history-challenge/`

### 方式二：手动上传

1. 执行 `npm run build` 生成 `dist/` 文件夹
2. 将 `dist/` 内的所有文件上传到仓库根目录
3. 在 **Settings** → **Pages** 中，将 Source 设为 **Deploy from a branch**，选择 `main` 分支

## 题目内容

| 关卡 | 年份 | 知识点 |
|------|------|--------|
| 1 | 1956年 | 学校前身创建 |
| 2 | 1958年 | 第一次更名 |
| 3 | 1958年 | 下放地方更名 |
| 4 | 1961年 | 调整为机械工业学校 |
| 5 | 1962年 | 中央回收隶属变更 |
| 6 | 1963年 | 划归第四机械工业部 |
| 7 | 1965年 | 更名为无线电工业管理学校 |
| 8 | 1970年 | 学校改厂 |
| 9 | 1973年 | 恢复办校 |
| 10 | 1980年 | 建立杭州电子工业学院 |
| 11 | 2000年 | 省部共建 |
| 12 | 2003年 | 杭州出版学校并入 |
| 13 | 2004年 | 更名为杭州电子科技大学 |
| 14 | 2007年 | 国防科工委共建 |
| 15 | 2009年 | 博士学位授予权立项 |
| 16 | 2015年 | 浙江省重点建设高校 |
| 17 | 2017年 | 研究生推免单位 |
| 18 | 2023年 | 浙江省高水平大学建设 |
| 19 | 70周年 | 校训「笃学力行、守正求新」 |

## 项目结构

```
src/
├── data/
│   └── questions.ts      # 19道校史题目数据
├── hooks/
│   └── useGame.ts        # 游戏状态管理逻辑
├── pages/
│   ├── HomeScreen.tsx    # 首页界面
│   ├── GameScreen.tsx    # 答题界面
│   └── ResultScreen.tsx  # 结算界面
├── types/
│   └── game.ts           # TypeScript类型定义
├── App.tsx               # 主组件
└── main.tsx              # 入口文件

public/
├── bg-game.jpg           # 游戏背景
├── emblem.png            # 校徽装饰
└── certificate-bg.jpg    # 证书背景
```

## 开源协议

MIT License

---

杭州电子科技大学 · 1956-2026
