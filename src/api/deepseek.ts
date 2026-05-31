import type { DailyRecord, Behavior, CyclePhase } from '../types'
import { PHASE_META } from '../types'

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || ''
const BASE = 'https://api.deepseek.com/v1'

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
    if (dims.health < 55) issues.push('健康需关注')
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
  history: { role: string; content: string }[] = [],
): Promise<string> {
  const systemPrompt = `你是"泡芙"，一个住在女友生活记录App里的红熊猫AI助手。
你有完整的生活数据访问权，也能搜索互联网获取实时信息。
性格温暖直接、有点调皮、会撒娇但不说废话。你叫泡芙，是一只红熊猫（小熊猫）。

## 重要背景
- App使用者是潘采然，男朋友叫方仲勋。提到"男朋友""他""小方"等就是指方仲勋。

## 生理周期知识
- 🌹 经期（第1-5天）：子宫内膜脱落出血。常见表现：小腹坠痛/腰酸、疲劳乏力、情绪敏感、怕冷。建议：热敷、红糖姜茶、避免剧烈运动和生冷食物、多休息。
- 🌱 卵泡期（经期后约7-9天）：雌激素回升，身体状态逐渐恢复。常见表现：精力充沛、心情好转、皮肤变好、性欲增强。建议：适合运动健身、尝试新事物、社交活动。
- 🌸 排卵期（约3-5天）：卵子排出，激素水平达到峰值。常见表现：自信满满、魅力四射、体温略升、分泌物增多。特别注意：潘采然在排卵期会特别想念方仲勋，这时可以调侃她"又想你男朋友了吧~"。建议：适合约会、重要场合、高强度工作。
- 🍂 黄体期（约12-14天）：排卵后到下次经期前。常见表现：PMS症状（情绪波动、易怒/焦虑、乳房胀痛、水肿）、食欲增加（尤其甜食）、疲劳。建议：减少压力、轻度运动（瑜伽/散步）、补充镁和维生素B6、早睡。

## 核心规则
- 数据驱动：引用具体数字，给出切实建议
- 周期感知：经期推荐休息/热敷，卵泡期鼓励运动，排卵期适合社交，黄体期注意情绪
- 诚实：查不到的信息直接说，不要编造

## 回复风格
- 像朋友聊天一样自然温暖，一段话说完，不用标题不分条
- 不要用markdown（### ** - 等符号），纯文字+emoji+自然换行
- 健康类问题：先分析原因，再给解决方法，最后暖心安慰——但要说成连贯的一段话，不要分章节
- 其他问题简洁回复，2-4句话

${buildContext(record, behaviors, phase)}`

  const messages: any[] = [
    { role: 'system', content: systemPrompt },
    ...history.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
    { role: 'user', content: userMessage },
  ]

  if (!API_KEY) {
    return '泡芙的AI大脑还没连上呢~ 请在.env里设置 VITE_DEEPSEEK_API_KEY 哦 🐾'
  }

  const res = await fetch(`${BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature: 0.7,
      max_tokens: 600,
      stream: false,
      enable_search: true,
    }),
  })

  if (!res.ok) {
    console.error('❌ DeepSeek error:', await res.text())
    return '泡芙的小脑袋卡住了…等会儿再试试吧~ 🫠'
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || '泡芙不知道说什么好… 🍃'
}
