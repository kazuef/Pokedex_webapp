# ベースイメージ
FROM node:20

# 作業ディレクトリを作成
WORKDIR /app

# 必要なファイルをコピー
COPY package.json ./
COPY . .

# 依存関係のインストール
RUN npm install

# ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]