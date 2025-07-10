# ガチャアキラ Python フロントエンド

Python バックエンドと連携するように設計された、ガチャシステム用の React フロントエンドアプリケーションです。

## 特徴

- **React 19**: 最新の React バージョンを使用したモダンなフロントエンド開発。
- **Vite**: 高速な開発サーバーと効率的なバンドル。
- **Tailwind CSS**: ユーティリティファーストの CSS フレームワークで、素早いスタイリングを実現。
- **Python バックエンド連携**: `http://localhost:8000/gacha` で動作する Python バックエンドと通信します。
- **ガチャ結果表示**: ガチャ結果を動的な視覚効果（花火）とともに表示します。
- **包括的なテスト**: Vitest と React Testing Library を使用したコンポーネントとユーティリティの単体テスト。
- **CORS 処理**: Cross-Origin Resource Sharing (CORS) の問題を処理するために Vite プロキシを設定済みです。

## はじめに

### 前提条件

- Node.js と npm (または yarn/pnpm)
- `http://localhost:8000` で動作する Python バックエンドアプリケーション。

### インストール

プロジェクトの依存関係をインストールします。

```bash
npm install
```

### 開発

Hot Module Replacement (HMR) を使用して開発サーバーを起動します。

```bash
npm run dev
```

アプリケーションは `http://localhost:5173` で利用可能になります。

### テストの実行

テストスイートを実行します。

```bash
npm run test
```

## バックエンド情報

このフロントエンドは、`http://localhost:8000` で動作する Python バックエンドを想定しています。ガチャのエンドポイントは `http://localhost:8000/gacha` で、`result` キーを持つ JSON オブジェクト（例: `{ "result": "A" }`）を返す必要があります。

## スタイリング

このテンプレートはスタイリングに [Tailwind CSS](https://tailwindcss.com/) を使用しています。`tailwind.config.js` と `src/styles.css` を変更して、外観をカスタマイズできます。
