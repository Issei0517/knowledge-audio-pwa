export type Chapter = {
  id: string;
  label: string;
  title: string;
  startSec: number;
  summary: string;
  points: string[];
};

export type MapNode = {
  title: string;
  note: string;
  tone: "blue" | "green" | "orange" | "purple" | "slate";
};

export type Narration = {
  id: string;
  title: string;
  author: string;
  durationSec: number;
  audioSrc: string;
  description: string;
  coverNote: string;
  chapters: Chapter[];
  mapCenter: string;
  mapNodes: MapNode[];
};

export const narrations: Narration[] = [
  {
    id: "simple-rules",
    title: "シンプルルール",
    author: "知識太郎",
    durationSec: 1211,
    audioSrc: "./audio/シンプルルール_2倍速20-40分_2026-05-03.wav",
    description:
      "迷う時間を減らし、すぐ動ける判断基準を作るための音声です。仕事、学習、生活改善に使えます。",
    coverNote: "迷いを減らし、行動を増やす",
    mapCenter: "シンプルルール",
    mapNodes: [
      { title: "条件", note: "いつ、どんな時に使うかを決める", tone: "blue" },
      { title: "行動", note: "次に取る行動を小さくする", tone: "green" },
      { title: "例外", note: "無理な日でも崩れない形にする", tone: "purple" },
      { title: "見直し", note: "使ったあとで直していく", tone: "orange" }
    ],
    chapters: [
      {
        id: "intro",
        label: "導入",
        title: "シンプルルールとは何か",
        startSec: 0,
        summary:
          "シンプルルールは、複雑な状況で毎回ゼロから考え直さないための短い判断基準です。雑に決めることではなく、迷いを減らして行動しやすくするための道具だと説明します。",
        points: ["単純化", "判断基準", "迷いを減らす"]
      },
      {
        id: "ch1",
        label: "第1章",
        title: "人間は全部を計算して決めていない",
        startSec: 133,
        summary:
          "人は、時間、情報、注意力に限りがある中で判断しています。だから現実では、すべてを比べるより、状況に合った短いルールを使う方がうまくいくことがあります。",
        points: ["限定合理性", "注意力の限界", "判断の工夫"]
      },
      {
        id: "ch2",
        label: "第2章",
        title: "良いシンプルルールは、考える量を減らす",
        startSec: 302,
        summary:
          "良いルールは、見る情報、比べる選択肢、覚えておくことを減らします。その分、本当に考えるべきことに力を残せます。ただし、減らしすぎると大事な情報を落とすので注意が必要です。",
        points: ["情報を減らす", "迷いを減らす", "減らしすぎ注意"]
      },
      {
        id: "ch3",
        label: "第3章",
        title: "もし〇〇なら、△△する",
        startSec: 454,
        summary:
          "「もしこの状況になったら、この行動をする」と先に決めると、行動に移りやすくなります。気合いに頼るより、条件と行動をセットにする方が続けやすいという内容です。",
        points: ["条件", "行動", "実行意図"]
      },
      {
        id: "ch4",
        label: "第4章",
        title: "チェックリストは、忘れないためのシンプルルール",
        startSec: 548,
        summary:
          "専門家でも忘れることがあります。チェックリストは、記憶力に頼らず大事な確認を抜けにくくする仕組みです。仕事や生活にも小さく応用できます。",
        points: ["確認", "忘れ防止", "仕組み化"]
      },
      {
        id: "ch5",
        label: "第5章",
        title: "シンプルルールの落とし穴",
        startSec: 668,
        summary:
          "短いルールは便利ですが、どんな場面でも正しいわけではありません。状況に合わないルール、例外が多すぎるルール、見直されないルールは失敗しやすいと説明します。",
        points: ["過信しない", "相性を見る", "例外を決める"]
      },
      {
        id: "ch6",
        label: "第6章",
        title: "自分用のシンプルルールを作る方法",
        startSec: 780,
        summary:
          "自分用のルールは、目的、条件、行動、例外、見直し日で作ります。最初から完璧にせず、小さく試して直すことで使えるルールに育てます。",
        points: ["目的", "例外", "小さく試す"]
      },
      {
        id: "summary",
        label: "まとめ",
        title: "少なく、具体的に、見直せる",
        startSec: 982,
        summary:
          "シンプルルールは、自分を縛るものではなく、疲れた時の自分を助けるものです。少なく、具体的に、あとから見直せる形にすることが大事です。",
        points: ["少なく", "具体的", "見直せる"]
      }
    ]
  },
  {
    id: "memory-methods",
    title: "科学的に記憶に残る暗記方法",
    author: "知識太郎",
    durationSec: 1204,
    audioSrc: "./audio/科学的に記憶に残る暗記方法_2倍速20-40分_2026-05-03.wav",
    description:
      "試験勉強、資格勉強、語学、仕事の知識定着に使える暗記方法を、科学的な根拠に沿って整理した音声です。",
    coverNote: "思い出す練習で、記憶を残す",
    mapCenter: "暗記方法",
    mapNodes: [
      { title: "思い出す練習", note: "答えを見る前に頭から出す", tone: "blue" },
      { title: "間隔復習", note: "少し忘れてから復習する", tone: "green" },
      { title: "交互学習", note: "似たものを混ぜて見分ける", tone: "orange" },
      { title: "意味づけ", note: "なぜそうなるか説明する", tone: "purple" },
      { title: "睡眠", note: "休む時間も暗記の一部にする", tone: "slate" }
    ],
    chapters: [
      {
        id: "intro",
        label: "導入",
        title: "覚えたつもりと思い出せるは違う",
        startSec: 0,
        summary:
          "暗記で危ないのは、見れば分かる状態を、思い出せる状態だと勘違いすることです。読み返しやマーカーだけでは不十分で、実際に思い出せるかを確認します。",
        points: ["読み返し注意", "確認", "長期記憶"]
      },
      {
        id: "ch1",
        label: "第1章",
        title: "最優先は思い出す練習",
        startSec: 130,
        summary:
          "記憶に残したいなら、答えを見る前に頭から取り出す練習を増やします。白紙再現や小テストは、評価ではなく学習そのものとして役立ちます。",
        points: ["検索練習", "白紙再現", "答え合わせ"]
      },
      {
        id: "ch2",
        label: "第2章",
        title: "復習は間隔を空ける",
        startSec: 336,
        summary:
          "一度に詰め込むより、少し忘れたころに思い出す方が長く残りやすくなります。長く覚えたいものほど、復習の間隔を少しずつ空けます。",
        points: ["分散学習", "間隔", "長期記憶"]
      },
      {
        id: "ch3",
        label: "第3章",
        title: "似たものは混ぜて練習する",
        startSec: 501,
        summary:
          "同じ種類だけを続けると、使う方法を見分ける力が育ちにくいことがあります。似た問題を混ぜて練習し、違いを言葉にする章です。",
        points: ["交互学習", "見分ける", "問題演習"]
      },
      {
        id: "ch4",
        label: "第4章",
        title: "意味づけと自己説明",
        startSec: 620,
        summary:
          "丸暗記だけではなく、なぜそうなるのかを自分の言葉で説明します。すでに少し知っている内容ほど、意味づけで記憶につながりやすくなります。",
        points: ["なぜ", "説明", "理解"]
      },
      {
        id: "ch5",
        label: "第5章",
        title: "画像、場所、例を使う",
        startSec: 724,
        summary:
          "図、場所法、具体例は暗記の助けになります。ただし万能ではありません。覚える目的に合う時だけ、補助として使うのが現実的です。",
        points: ["視覚化", "場所法", "補助"]
      },
      {
        id: "ch6",
        label: "第6章",
        title: "睡眠と休憩は暗記の一部",
        startSec: 808,
        summary:
          "寝る前の短い復習や、勉強の間の休憩は記憶に関わります。勉強していない時間も、記憶を整える時間として扱います。",
        points: ["睡眠", "休憩", "寝る前復習"]
      },
      {
        id: "summary",
        label: "まとめ",
        title: "1週間の暗記メニューに落とし込む",
        startSec: 900,
        summary:
          "覚えるには、読み続けるより思い出す練習へ切り替えます。間隔を空け、混ぜて練習し、自分の言葉で説明する流れにまとめます。",
        points: ["1週間", "習慣化", "実践"]
      }
    ]
  }
];
