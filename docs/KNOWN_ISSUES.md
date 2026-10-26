# 已知問題與待確認項目

## 待補資料

- 四個初始作品的版本與最後更新日期尚未核實，因此資料為 `null`，頁面會顯示「待補」或「待更新」。
- 尚無作品截圖、GitHub Repository、Releases 或 Demo 公開連結；詳細頁會顯示畫面整理提示，未設定的外部連結會隱藏。
- 目前精選與最新更新是首頁的展示區塊；作品尚無更新日期時，最新清單會依名稱穩定排序，不代表實際更新先後。

## 待驗證環境

- 本機一般執行環境無法解析 `registry.npmjs.org` 與 `github.com`，未設定 Proxy；提高 npm 命令網路權限後，已安全連線官方 npm registry 並完成套件安裝、`npm ci`、測試及建置，未停用 SSL 驗證或改用其他套件來源。
- 本機未安裝 GitHub CLI `gh`。GitHub connector 已確認公開 Repository `delayer-pixnet/SoftwarePortfolio` 存在，預設分支為 `main`，帳號有 push 權限；connector 不提供 Git Push 功能。
- Repository 已建立且 GitHub 回報大小為 0；本機尚未設定 `origin`，也未執行首次 Push。
- GitHub API 目前回報沒有 branch 或 Actions run；需要首次 Push 才會觸發 `main` 工作流程。Pages 設定與網址尚未驗證。
- 執行 `git add` 遭沙箱拒絕，錯誤為無法建立 `.git/index.lock`；目前 `.git` 目錄唯讀，故未暫存或建立本機 commit。需在允許 Git 寫入的執行環境完成首次提交與 Push。
- 尚無 `origin` 或 GitHub Repository，因此未建立首次 Git commit、未 Push，也沒有 Actions 執行結果或 Pages 實際網址。
- Workflow 已設定 `contents: read`、`pages: write`、`id-token: write`，並要求 deploy job 等待 build job；仍須待 Repository 建立後由 GitHub 實際驗證。
- GitHub Pages 尚未以真實 Repository 部署；請在 Pages 設定選擇 GitHub Actions，並確認 workflow 部署完成。
- 尚未完成實際桌面與手機瀏覽器視覺檢查。
- 樣式載入 Noto Sans TC 與 DM 字型作為輔助；離線時會退回 Microsoft JhengHei 與系統字型。
