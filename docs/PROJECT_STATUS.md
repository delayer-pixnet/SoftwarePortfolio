# 專案狀態

> 最後更新：2026/10/26

## 目前進度

- 第一版作品集網站已建立，提供首頁、作品列表、作品詳細頁與關於我。
- 作品資料由 `src/data/projects.json` 管理，TypeScript 型別與 Service 層提供查詢、關鍵字搜尋、分類及排序。
- 已加入 HashRouter、GitHub Pages 根網站／Repository 子路徑 base 設定，以及 GitHub Actions 部署工作流程。
- GitHub Actions 工作流程已加入 `npm test`，只有測試及建置成功後才會上傳、部署 `dist/`。
- 初始作品為 ApPerformanceDiagnosticTool、DbInitializerTool、SSLCertMonitor、SearchElmahForm。版本、更新日期、截圖及公開連結維持未填。

## GitHub 同步設定進度

- 已新增根目錄 `AGENTS.md`，規範文件同步、diff 檢查、測試、繁體中文 commit、安全同步及部署狀態回報。
- 已由官方 npm registry 安裝相依套件並產生 `package-lock.json`；`npm ci --no-audit --no-fund` 乾淨安裝通過。
- `npm test` 通過 3/3；修正測試中不符合實際 `zh-Hant-TW` 名稱排序的期望值，未修改 Service 排序邏輯。
- `npm run build` 通過，Vite 6.4.5 正式建置成功。
- GitHub Repository `delayer-pixnet/SoftwarePortfolio` 已建立為公開存放庫，預設分支為 `main`，GitHub 回報帳號具有 admin、maintain、push 權限；目前 Repository 大小為 0。
- 本機未安裝 `gh`；目前 `main` 尚無初始 commit，也沒有 `origin`。
- 執行 `git add` 時，沙箱因 `.git` 唯讀而拒絕建立 `.git/index.lock`；因此目前無法在此環境暫存或建立 commit。
- 尚未設定本機 `origin`、建立初始 commit、Push 或觸發 Actions；GitHub connector 僅提供讀取能力，無法代替本機 Git 寫入或 Push。
- GitHub API 確認 Repository 尚無 branches 且 Actions 執行數為 0；Pages 設定與部署尚未建立／驗證。
- Vite 建置已分別驗證 `delayer-pixnet/SoftwarePortfolio` 產生 `/SoftwarePortfolio/assets/`，以及 `delayer-pixnet/delayer-pixnet.github.io` 產生 `/assets/`。
- Pages workflow 已設 `contents: read`、`pages: write`、`id-token: write`，部署 job 依賴 build job；Repository 建立後仍須在 Pages 設定選擇 GitHub Actions。

## 驗證狀態

- 套件安裝：`package-lock.json` 已由 `npm install` 產生；`npm ci --no-audit --no-fund` 通過。
- 自動化測試：`npm test` 通過，1 個測試檔、3 項測試。
- 正式建置：`npm run build` 通過，TypeScript 與 Vite 建置完成。
- GitHub Pages 部署：workflow 設定已檢視，但尚未在 GitHub Repository 啟用或執行驗證。
- 桌面與手機版：已提供 RWD 樣式，尚待實際瀏覽器視覺驗收。

## 後續步驟

1. 在 GitHub 帳號 `delayer-pixnet` 建立公開且空白的 `SoftwarePortfolio` Repository；不要初始化 README、`.gitignore` 或 License。
2. 將 Repository URL 提供給 Codex，設定 `origin` 並確認遠端 `main` 狀態後安全推送。
3. 在 Repository Settings → Pages 選擇 GitHub Actions，等待 Actions 建置與部署成功。
4. 開啟部署網址，檢查圖片路徑、手機版排版與所有頁面導覽。
5. 核對作品摘要及功能描述，並在取得正式資料後更新版本、日期、截圖與外部連結。

新增作品操作請參閱 `README.md`。
