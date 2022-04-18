# 株式会社ゆめみ コードチェック課題
都道府県別の総人口推移グラフを表示するSPA(Single Page Application)を構築せよ

## 本番環境URL
https://total-population-graph.vercel.app

## 環境
- Next.js 12.1.5
- TypeScript 4.6.3
- react-chartjs-2 4.1.0

## 意識したこと
- 必要最低限のコードにして、開発スピードを重視した
- 都道府県一覧はビルド時に取得し、高速でページを表示させるようにした
- キャッシュを使用し、無駄なリクエストを無くした
- できる限りパフォーマンスを向上させた

![image](https://user-images.githubusercontent.com/65057976/163805655-e7aa8517-a1bf-489e-8c13-0e3fb693086f.png)
