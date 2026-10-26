# 專案狀態

> 最後更新：2026/10/26

## 本次修改進度

- 已完成閱讀體驗調整：Noto Sans TC 優先、字級與對比提升、按鈕點擊區域調整、卡片優先使用作品截圖；WinForms 截圖使用完整呈現。
- 詳細頁新增條件式「下載 Windows 版」；GitHub 原始碼、版本紀錄及 Demo 分開顯示，外部網址限合法 HTTPS。
- 作品圖片路徑會套用 Vite `BASE_URL`，外部 HTTPS 圖片維持原網址。
- 瀏覽器視覺驗證：待人工驗收；本次不啟動瀏覽器自動化。
- 本次變更尚未 Commit 或 Push；目前 Git 寫入受沙箱 `.git` 唯讀限制。

## 目前進度

- 第一版作品集網站已建立，提供首頁、作品列表、作品詳細頁與關於我。
- 作品資料由 `src/data/projects.json` 管理，TypeScript 型別與 Service 層提供查詢、關鍵字搜尋、分類及排序。
- 已加入 HashRouter、GitHub Pages 根網站／Repository 子路徑 base 設定，以及 GitHub Actions 部署工作流程。
- GitHub Actions 工作流程已加入 `npm test`，只有測試及建置成功後才會上傳、部署 `dist/`。
- 初始作品為 ApPerformanceDiagnosticTool、DbInitializerTool、SSLCertMonitor、SearchElmahForm。版本、更新日期、截圖及公開連結維持未填。

## GitHub 同步設定進度

- 已新增根目錄 `AGENTS.md`，規範文件同步、diff 檢查、測試、繁體中文 commit、安全同步及部署狀態回報。
- 已由官方 npm registry 安裝相依套件並產生 `package-lock.json`；`npm ci --no-audit --no-fund` 乾淨安裝通過。
- 本次 `npm test` 通過 8/8，涵蓋作品查詢、下載按鈕顯示條件、HTTPS 驗證與圖片路徑。
- 本次 `npm run build` 通過，TypeScript 與 Vite 6.4.5 建置完成。
- GitHub Repository `delayer-pixnet/SoftwarePortfolio` 為公開存放庫，遠端 `main` 與本機 HEAD 目前同為 `ceb4e19`。
- 本機 `origin` 指向該 Repository。GitHub connector 可讀取 Repository 與 Actions 狀態；本機 Git 沙箱曾拒絕建立 `.git/index.lock`，依專案規範停止 Git 寫入，Commit、Push 與本次部署仍待在可寫入 `.git` 的本機 PowerShell 完成。
- Vite 建置已分別驗證 `delayer-pixnet/SoftwarePortfolio` 產生 `/SoftwarePortfolio/assets/`，以及 `delayer-pixnet/delayer-pixnet.github.io` 產生 `/assets/`。
- Pages workflow 設有 `contents: read`、`pages: write`、`id-token: write`，部署 job 依賴 build job；部署狀態以本次提交對應的 Actions run 為準。

## 驗證狀態

- 套件安裝：`package-lock.json` 已由 `npm install` 產生；`npm ci --no-audit --no-fund` 通過。
- 自動化測試：`npm test` 通過，3 個測試檔、8 項測試。
- 正式建置：`npm run build` 通過，TypeScript 與 Vite 建置完成。
- GitHub Pages 部署：本次變更尚待提交與 Push；完成後需以該提交對應的 GitHub Actions run 確認建置與部署結果。舊版成功紀錄不代表本次變更已部署。
- 桌面與手機版：RWD 樣式已調整；1440、768、390 px 瀏覽器視覺驗證待人工驗收。

## 後續步驟

1. 以 1440、768、390 px 完成瀏覽器視覺人工驗收。
2. 核對作品資料，取得正式版本、日期、截圖與 Release Asset 後再更新 JSON。

新增作品操作請參閱 `README.md`。
