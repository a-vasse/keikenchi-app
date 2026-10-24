export const PREFECTURES = [
  ["Hokkaido", "北海道", 11, 0], ["Aomori", "青森", 10, 1], ["Akita", "秋田", 10, 2], ["Iwate", "岩手", 11, 2],
  ["Yamagata", "山形", 9, 3], ["Miyagi", "宮城", 11, 3], ["Niigata", "新潟", 8, 4], ["Fukushima", "福島", 10, 3],
  ["Fukui", "福井", 6, 5], ["Ishikawa", "石川", 6, 4], ["Toyama", "富山", 7, 4], ["Nagano", "長野", 8, 5],
  ["Gunma", "群馬", 9, 4], ["Tochigi", "栃木", 10, 4], ["Ibaraki", "茨城", 11, 4],
  ["Hyogo", "兵庫", 4, 6], ["Kyoto", "京都", 5, 6], ["Shiga", "滋賀", 6, 6], ["Gifu", "岐阜", 7, 5],
  ["Yamanashi", "山梨", 9, 5], ["Saitama", "埼玉", 10, 5], ["Tokyo", "東京", 10, 6], ["Chiba", "千葉", 11, 5],
  ["Osaka", "大阪", 5, 7], ["Nara", "奈良", 6, 7], ["Mie", "三重", 7, 7], ["Aichi", "愛知", 7, 6],
  ["Shizuoka", "静岡", 8, 6], ["Kanagawa", "神奈川", 9, 6], ["Wakayama", "和歌山", 6, 8],
  ["Tottori", "鳥取", 3, 6], ["Shimane", "島根", 2, 6], ["Okayama", "岡山", 4, 7], ["Hiroshima", "広島", 3, 7],
  ["Yamaguchi", "山口", 2, 7], ["Kagawa", "香川", 5, 9], ["Tokushima", "徳島", 5, 10], ["Ehime", "愛媛", 4, 9],
  ["Kochi", "高知", 4, 10], ["Fukuoka", "福岡", 1, 8], ["Oita", "大分", 2, 9], ["Saga", "佐賀", 0, 8],
  ["Kumamoto", "熊本", 1, 9], ["Miyazaki", "宮崎", 2, 10], ["Kagoshima", "鹿児島", 1, 10], ["Nagasaki", "長崎", 0, 9],
  ["Okinawa", "沖縄", 0, 11],
].map(([id, ja, col, row]) => ({ id, ja, col, row }));

export const LEVELS = [
  { ja: "未踏", en: "Never been", desc: "Haven't even brushed past it" },
  { ja: "通過", en: "Passed through", desc: "By train or car, or a ferry that docked there. Flying over doesn't count" },
  { ja: "接地", en: "Transfered", desc: "Changed trains, or stopped off at a rest stop" },
  { ja: "訪問", en: "Walked around", desc: "Explored on foot, but never stayed overnight" },
  { ja: "宿泊", en: "Stayed overnight/Long term commute", desc: "Stayed at least overnight, or commuted there regularly" },
  { ja: "居住", en: "Lived there", desc: "Lived there, including stays of about 3 months or more" },
];

export const MAX_LEVEL = LEVELS.length - 1;
export const MAX_SCORE = PREFECTURES.length * MAX_LEVEL; // 235
