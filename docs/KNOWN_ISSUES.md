# 已知問題與待確認項目

## 待補資料

- 四個初始作品的版本與最後更新日期尚未核實，因此資料為 `null`，頁面會顯示「待補」或「待更新」。
- 尚無作品截圖或 Demo 公開連結；詳細頁會顯示畫面整理提示，未設定的外部連結會隱藏。SSLCertMonitor 已設定 GitHub、Releases 與固定 ZIP 下載網址；本次未從 GitHub 驗證該 Release Asset 是否已發布。
- 目前精選與最新更新是首頁的展示區塊；作品尚無更新日期時，最新清單會依名稱穩定排序，不代表實際更新先後。

## 待驗證環境

- 本機 Git 沙箱對 `.git` 唯讀；先前 `git add` 無法建立 `.git/index.lock`。依專案規範不執行其他 Git 寫入；請在可寫入此工作目錄 `.git` 的 PowerShell 依遠端同步檢查後完成 Commit、Push，並確認對應 Actions run。
- 瀏覽器視覺驗證尚未完成，1440、768、390 px 尺寸待人工驗收。這不阻擋文件更新、測試、Build 或 Git 流程。
- SSLCertMonitor 的 latest/download 網址已依需求設定為 `SSLCertMonitor-win-x64.zip`；其最新 Release 是否實際包含該 Asset 尚待確認。其他作品仍不得填入未核實的下載網址。
- 本次執行環境無法解析官方 npm registry：`npm ci --no-audit --no-fund` 回報 `ENOTFOUND registry.npmjs.org`，因此 `vitest` 與 `tsc` 不在可執行環境中；`npm test`、`npm run build` 均未通過。未停用 SSL 驗證或改用其他套件來源，待可連線環境重新執行 `npm ci` 與驗證。
- 樣式載入 Noto Sans TC 與 DM 字型作為輔助；離線時會退回 Microsoft JhengHei 與系統字型。
