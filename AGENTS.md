# SoftwarePortfolio 專案協作規範

本文件僅適用於 `SoftwarePortfolio` 專案及其子目錄。

## 每次程式修改

- 每次 Codex 完成程式修改後，更新 `docs/PROJECT_STATUS.md` 與 `docs/KNOWN_ISSUES.md`，如實記錄完成項目、驗證結果與未解問題。
- 檢查完整 Git diff 與未追蹤檔案，排除 Token、密碼、私鑰、內部系統資訊，以及暫存、相依套件與建置輸出。不得提交 `node_modules/`、`dist/`、快取或暫存檔。
- 執行與變更相符的必要測試和 `npm run build`。只回報實際執行且通過的檢查；不得臆測成功。

## Git 提交與同步

- 只有在必要測試與建置均通過、變更已檢視且確有專案修改時，才自動建立 Git commit 並推送至 `origin/main`，不必逐次詢問。
- Commit message 使用台灣繁體中文，簡潔摘要本次功能或修正。
- 提交前確認身處 `main` 且工作樹變更範圍符合本次任務；只加入本次必要檔案，不得提交無關檔案。
- 嚴禁 force push、重設或覆蓋遠端提交、以強制方式消除衝突。
- 推送前安全同步遠端 `origin/main`：先取得遠端最新提交，再以一般 fast-forward 更新；若本機與遠端分歧，只有在可安全保留雙方提交時才進行一般整合。任何衝突或無法安全整合的狀況立即停止並回報，不可強行覆蓋。
- 若測試或建置失敗，停止 commit 與 push 並回報原因。若失敗原因是本機 npm 網路阻擋，明確記錄限制，不得宣稱測試或建置已驗證成功。
- 推送後檢查 GitHub Actions 工作流程狀態。只有 Actions 建置與 Pages 部署皆成功，才能回報網站已更新；失敗或仍在執行時要明確說明狀態。

## GitHub Pages

- GitHub Actions 負責安裝、測試、建置及部署；Pages 必須部署通過檢查的 `dist/` 產物。
- CI 任一步驟失敗時不得發布新版。
- GitHub Repository、Actions 或 Pages 需要尚未授權的互動時，完成其他可行工作後，清楚指出所需的使用者操作。

## 完成回報

回報 Commit SHA、Push 結果、Actions 建置／部署狀態及網站網址。未完成或未驗證者標示為待處理，不得宣稱成功。
