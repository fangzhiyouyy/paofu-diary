import type { CyclePhase } from '../types'

const QUOTES_BY_MOOD: Record<string, string[]> = {
  high: [
    '今天元气满满！泡芙准备好和你一起征服世界啦~ 🎋',
    '状态超棒的！泡芙的尾巴都翘到天上去了~ ☀️',
    '充满电！今天没有什么能难倒你~ ⚡',
    '泡芙感觉今天会有好事发生！✨',
  ],
  good: [
    '还不错的一天呢，泡芙在窗边晒太阳等你~ ☀️',
    '心情晴转多云转晴～泡芙一直在这里哦 🌤️',
    '平淡美好的一天，像竹子一样清甜~ 🎋',
    '泡芙正在摇摆尾巴，节奏刚刚好~ 🎵',
  ],
  neutral: [
    '普普通通也是美好，泡芙陪你慢慢来~ 🍃',
    '今天适合放空，泡芙帮你站岗~ 🐾',
    '不慌不忙，泡芙泡杯茶等你~ 🍵',
    '每一天都值得被记录，哪怕只是发呆~ 📝',
  ],
  low: [
    '今天好像有点低气压…泡芙把最软的肚子借你靠靠 💤',
    '泡芙把尾巴分你一半，暖暖的~ 🧣',
    '没关系，泡芙已经准备好热水袋了~ ♨️',
    '今天的主题是：允许自己不完美~ 🤍',
  ],
  critical: [
    '没关系，泡芙已经把自己卷成小饭团了，随时给你充电 🍙',
    '今天辛苦了…泡芙把所有的竹子都给你~ 🎋💚',
    '泡芙正在用尾巴帮你挡掉全世界的烦恼~ 🛡️',
    '不想说话也没关系，泡芙就这样静静陪着你~ 🌙',
  ],
}

const COLOR_QUOTES: Record<string, string> = {
  '#E53935': '哇！今天火力全开~ 🔥',
  '#FB8C00': '橘色系的你像小太阳一样温暖~ 🧡',
  '#FDD835': '向日葵色的你！泡芙被阳光照到了~ 🌻',
  '#EC407A': '甜甜的粉色系，泡芙也变成棉花糖啦~ 🍬',
  '#F06292': '樱花般的颜色，泡芙要给你撒花瓣~ 🌸',
  '#1E88E5': '像天空一样清澈的颜色呢~ ☁️',
  '#00ACC1': '清新的薄荷感！泡芙感觉自己在海边~ 🌊',
  '#43A047': '是竹子的颜色！泡芙最喜欢了~ 🎋',
  '#8E24AA': '神秘又浪漫，泡芙的尾巴都在抖~ 💜',
  '#2D2D2D': '经典永不过时，优雅满分~ 🖤',
  '#F5F5F5': '纯白无瑕，今天的你闪闪发光~ 🤍',
}

const PHASE_EXTRA: Record<CyclePhase, string> = {
  menstrual:  ' 记得对自己温柔一点哦~ ♨️',
  follicular: ' 新阶段新开始！🌱',
  ovulation:  ' 今天的你格外耀眼~ ✨',
  luteal:     ' 慢慢来，泡芙帮你守着~ 🍂',
}

export function generateQuote(
  moodValue: number,
  phase: CyclePhase | null,
  outfitHex: string | null,
): string {
  let bucket: string
  if (moodValue >= 80) bucket = 'high'
  else if (moodValue >= 60) bucket = 'good'
  else if (moodValue >= 40) bucket = 'neutral'
  else if (moodValue >= 20) bucket = 'low'
  else bucket = 'critical'

  const pool = QUOTES_BY_MOOD[bucket]
  const base = pool[Math.floor(pseudoRandom() * pool.length)]

  let extra = ''
  if (outfitHex && COLOR_QUOTES[outfitHex.toUpperCase()]) {
    extra = ' ' + COLOR_QUOTES[outfitHex.toUpperCase()]
  }
  if (phase && PHASE_EXTRA[phase]) {
    extra += PHASE_EXTRA[phase]
  }

  return base + extra
}

function pseudoRandom(): number {
  const today = new Date().toISOString().split('T')[0]
  const hash = today.split('').reduce((a, c) => a + c.charCodeAt(0) * 31, 0)
  return ((hash * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff
}
