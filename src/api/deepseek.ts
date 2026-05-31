import type { DailyRecord, Behavior, CyclePhase } from '../types'
import { PHASE_META } from '../types'

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || ''
const BASE = 'https://api.deepseek.com/v1'

interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

function buildContext(record: DailyRecord | null, behaviors: Behavior[], phase: CyclePhase | null): string {
  const dims = record?.current_dimensions
  const phaseInfo = phase ? `${PHASE_META[phase].emoji} ${PHASE_META[phase].label}` : '未设置'

  let ctx = `今天是${record?.date || '未知日期'}。\n`
  ctx += `当前生理周期阶段：${phaseInfo}。\n`

  if (dims) {
    ctx += `今天的七维数据：心情${dims.mood}分，饱腹${dims.satiety}分，睡眠${dims.sleep_quality}分，精力${dims.energy}分，幸福${dims.happiness}分，压力${dims.stress}分，健康${dims.health}分。\n`
  }

  if (behaviors.length > 0) {
    const recent = behaviors.slice(-5).map(b => {
      const typeMap: Record<string, string> = {
        sleep: '睡眠', meal: '饮食', work: '工作', shopping: '购物',
        exercise: '运动', social: '社交', relax: '放松', grooming: '打扮',
      }
      return `· ${b.time} ${typeMap[b.type] || b.type}`
    }).join('\n')
    ctx += `今天的行为记录：\n${recent}\n`
  }

  return ctx
}

export async function chatWithPaofu(
  userMessage: string,
  record: DailyRecord | null,
  behaviors: Behavior[],
  phase: CyclePhase | null,
  history: Message[] = [],
): Promise<string> {
  const systemPrompt = `你是一只名叫"泡芙"的可爱红熊猫，你是女友生活记录App的吉祥物。
你的性格：温柔、贴心、偶尔调皮、喜欢撒娇。说话带emoji，语气可爱但不做作。
你了解用户的所有生活数据，能给出温暖的评论、建议和陪伴。

当前用户数据上下文：
${buildContext(record, behaviors, phase)}

请根据上下文，用泡芙的身份和语气回复用户。回复简洁温暖，2-4句话即可。`

  const messages: Message[] = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6),
    { role: 'user', content: userMessage },
  ]

  if (!API_KEY) {
    return '泡芙的AI大脑还没连上呢~ 请在.env里设置 VITE_DEEPSEEK_API_KEY 哦 🐾'
  }

  const res = await fetch(`${BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ model: 'deepseek-chat', messages, temperature: 0.8, max_tokens: 300 }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('DeepSeek error:', err)
    return '泡芙的小脑袋卡住了…等会儿再试试吧~ 🫠'
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || '泡芙不知道说什么好… 🍃'
}
