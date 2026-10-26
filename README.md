# SoftwarePortfolio

以 React、TypeScript、Vite 與 Tailwind CSS 建置的個人軟體作品集，支援 GitHub Pages 靜態託管，作品資料集中於 `src/data/projects.json`。目前內容以台灣繁體中文呈現，包含首頁、作品篩選與搜尋、作品詳細頁及關於我。

## 開發環境

- Node.js 20 或更新版本
- npm

## 本機操作

```powershell
npm ci
npm run dev
```

開發伺服器會顯示本機網址。執行正式建置與測試：

```powershell
npm test
npm run build
npm run preview
```

正式建置輸出至 `dist/`。網站使用 HashRouter，網址中的 `#` 路徑可避免 GitHub Pages 子路徑重新整理時發生 404。

## GitHub Pages 部署

1. 將專案推送至 GitHub 的 `main` 分支。
2. 開啟 Repository 的 **Settings → Pages**。
3. 在 **Build and deployment** 的 **Source** 選擇 **GitHub Actions**。
4. 等待 Actions 的「部署至 GitHub Pages」工作完成，從 Pages 設定頁開啟網站。

工作流程位於 `.github/workflows/deploy.yml`，每次推送至 `main` 都會安裝鎖定套件、執行建置並部署。Vite 會依 `GITHUB_REPOSITORY` 設定 base：`使用者名稱.github.io` 個人根網站使用 `/`，一般 Repository 網站使用 `/<Repository 名稱>/`。使用 `npm run dev` 或本機建置時採用 `/`。

## 新增或更新作品

1. 在 `src/data/projects.json` 新增一個作品物件，依照既有作品填寫必要欄位：`id`、`slug`、`name`、`summary`、`category`、`technologies`、`version`、`updatedAt`、`features`、`screenshots`、`status`、`featured`、`links`。
2. `category` 使用 `WinForms`、`WPF`、`Web`、`其他` 其中之一；未知版本或日期填 `null`，未知清單填空陣列。
3. 截圖放入 `public/images/projects/`，資料填入相對網站根路徑，例如 `/images/projects/example.png`，並提供 `alt` 替代文字。畫面圖片會延遲載入；本機圖片會自動套用 Vite `BASE_URL`，HTTPS 外部圖片維持原網址。卡片優先顯示截圖，WinForms 截圖完整呈現，不裁切圖片內容。
4. 只填寫已核實的 `links.github`、`links.releases`、`links.demo`、`links.download`。未設定或不是合法 HTTPS 的連結不會顯示，也不要以示意網址替代。
5. `links.github` 顯示「GitHub 原始碼」，`links.releases` 顯示「版本紀錄」，`links.demo` 顯示線上 Demo，`links.download` 顯示「下載 Windows 版」。直接下載網址應指向已發布 GitHub Release Asset（例如 ZIP）；瀏覽器會直接開啟該資產網址，不使用跨網域 `download` 屬性。
6. 建議使用小寫英文與連字號建立唯一 `slug`，之後可用 `/#/projects/<slug>` 開啟作品詳細頁。

部署前執行 `npm test` 與 `npm run build`，確認作品資料正確。

## 技術架構

- `src/data/projects.json`：作品內容唯一資料來源。
- `src/types/project.ts`：作品欄位與分類型別。
- `src/services/IProjectService.ts`、`ProjectService.ts`：作品搜尋、分類、排序、精選與代稱查詢。
- `src/App.tsx`：首頁、作品列表、作品詳細頁、關於我與導覽。
- `src/styles.css`：RWD 樣式與 Tailwind CSS 基礎設定。
- `.github/workflows/deploy.yml`：GitHub Pages 自動建置與部署。

## 隱私

此專案是純靜態網站，不使用後端、資料庫或登入系統。公開前請檢查作品 JSON、截圖與文件，避免放入 Token、密碼、內部系統位址或其他機敏資訊。所有版本、日期及外部連結需由維護者核實後再填入。
