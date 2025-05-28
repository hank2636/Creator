# Creator 攝影工作室預約網站


## 新環境安裝步驟

### 後端
下載 uv : 一個很好用的套件管理工具
```
curl -Ls https://astral.sh/uv/install.sh | sh
```

確認版本, 能看到版本代表已完成安裝
```
uv --version
```
進入後端資料夾中
```
cd backend
```
一行指令建立虛擬環境與所有套件
```
uv sync
```
成功建置完成, 先別急, 還要設定好 postgres

```
source .venv/bin/activate
```
```
fastapi dev app/main.py
```

### 前端

安裝 nvm , 因為等等要用 nvm 更新你的 Node.js

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

設置環境變數
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

有顯示版本代表成功安裝
```
nvm --version
```
安裝 Node.js 20
```
nvm install 20
```

看目前是否使用 v20 版本
```
which node
```

進入前端資料夾
```
cd frontend
```
安裝所需套件
```
npm install
```
啟動前端
```
npm run dev
```