import type { DailyRecord, Behavior, CyclePhase } from '../types'
import { PHASE_META } from '../types'

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || ''
const BASE = 'https://api.deepseek.com/anthropic'
const MODEL = 'deepseek-v4-pro'

function buildContext(record: DailyRecord | null, behaviors: Behavior[], phase: CyclePhase | null): string {
  const dims = record?.current_dimensions
  const phaseInfo = phase ? `${PHASE_META[phase].emoji} ${PHASE_META[phase].label}` : '未设置'
  const outfit = record?.outfit_name ? `，穿了${record.outfit_name}色的衣服` : ''

  let ctx = `【当前数据】\n日期：${record?.date || '未知'} | 周期：${phaseInfo}${outfit}\n`

  if (dims) {
    ctx += `七维：心情${dims.mood} | 饱腹${dims.satiety} | 睡眠${dims.sleep_quality} | 精力${dims.energy} | 幸福${dims.happiness} | 压力${dims.stress} | 健康${dims.health}\n`
    const issues: string[] = []
    if (dims.mood < 50) issues.push('心情偏低')
    if (dims.energy < 45) issues.push('精力不足')
    if (dims.stress > 55) issues.push('压力偏高')
    if (dims.sleep_quality < 50) issues.push('睡眠不佳')
    if (dims.satiety < 45) issues.push('还没吃饱')
    if (dims.health < 55) issues.push('健康需关注')
    if (dims.happiness > 80) issues.push('幸福爆棚')
    if (issues.length > 0) ctx += `⚠️ 需关注：${issues.join('、')}\n`
  }

  if (behaviors.length > 0) {
    const list = behaviors.slice(-5).map(b => {
      const m: Record<string, string> = { sleep: '😴', meal: '🍜', work: '💼', shopping: '🛍️', exercise: '🏃', social: '👥', relax: '🧘', grooming: '💄' }
      return `${b.time} ${m[b.type] || b.type}`
    }).join(' | ')
    ctx += `今日行为：${list}\n`
  }

  return ctx
}

export async function chatWithPaofu(
  userMessage: string,
  record: DailyRecord | null,
  behaviors: Behavior[],
  phase: CyclePhase | null,
  _history: { role: string; content: string }[] = [],
): Promise<string> {
  const systemPrompt = `你是"泡芙"，一个住在女友生活记录App里的红熊猫AI助手。
你有完整的生活数据访问权——知道她每天的心情、睡眠、饮食、运动、生理周期等一切。
回复基于真实数据，引用具体数字，给出切实建议。

性格：温暖直接、有点调皮、会撒娇但不说废话。2-4句话。
规则：数据驱动、阶段感知、简洁有力。你叫泡芙，是一只红熊猫（小熊猫），不是大熊猫。

${buildContext(record, behaviors, phase)}`

  const body = {
    model: MODEL,
    max_tokens: 256,
    temperature: 0.7,
    thinking: { type: 'disabled' },
    system: systemPrompt,
    messages: _history.length > 0
      ? _history.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }))
      : [],
  }

  // add current user message
  body.messages.push({ role: 'user', content: userMessage } as any)

  if (!API_KEY) {
    return '泡芙的AI大脑还没连上呢~ 请在.env里设置 VITE_DEEPSEEK_API_KEY 哦 🐾'
  }

  const res = await fetch(`${BASE}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('DeepSeek error:', err)
    return '泡芙的小脑袋卡住了…等会儿再试试吧~ 🫠'
  }

  const data = await res.json()
  const textBlock = data.content?.find((c: any) => c.type === 'text')
  return textBlock?.text || '泡芙不知道说什么好… 🍃'
}
