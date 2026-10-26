# 已知問題與待確認項目

## 待補資料

- 四個初始作品的版本與最後更新日期尚未核實，因此資料為 `null`，頁面會顯示「待補」或「待更新」。
- 尚無作品截圖、GitHub Repository、Releases 或 Demo 公開連結；詳細頁會顯示畫面整理提示，未設定的外部連結會隱藏。
- 目前精選與最新更新是首頁的展示區塊；作品尚無更新日期時，最新清單會依名稱穩定排序，不代表實際更新先後。

## 待驗證環境

- 本機 Git 沙箱對 `.git` 唯讀；先前 `git add` 無法建立 `.git/index.lock`。依專案規範不執行其他 Git 寫入；請在可寫入此工作目錄 `.git` 的 PowerShell 依遠端同步檢查後完成 Commit、Push，並確認對應 Actions run。
- 瀏覽器視覺驗證尚未完成，1440、768、390 px 尺寸待人工驗收。這不阻擋文件更新、測試、Build 或 Git 流程。
- 目前沒有已核實的 Release Asset；不得為 SSLCertMonitor 或其他作品填入假下載網址。
- npm registry 的一般沙箱網路受限；已在允許的網路權限下從官方 registry 安裝並以 `npm ci` 驗證鎖定檔，未停用 SSL 驗證或改用其他套件來源。
- 樣式載入 Noto Sans TC 與 DM 字型作為輔助；離線時會退回 Microsoft JhengHei 與系統字型。
