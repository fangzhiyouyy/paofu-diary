import { useState, useRef, useEffect } from 'react'
import { useDailyStore } from '../stores/dailyStore'
import { useCycleStore } from '../stores/cycleStore'
import { chatWithPaofu } from '../api/deepseek'
import './ChatWidget.css'

interface Msg { role: 'user' | 'paofu'; text: string }

export function ChatWidget() {
  const { record, behaviors } = useDailyStore()
  const { currentPhase } = useCycleStore()
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const send = async () => {
    const text = input.trim()
    if (!text || typing) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])
    setTyping(true)

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' as const : 'assistant' as const,
      content: m.text,
    }))

    const reply = await chatWithPaofu(text, record, behaviors, currentPhase, history)
    setTyping(false)
    setMessages(prev => [...prev, { role: 'paofu', text: reply }])
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <div style={{ fontSize: 40, marginBottom: 8 }}>🐾</div>
            <div>泡芙在听~ 问我什么都可以！</div>
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>比如：我今天状态怎么样？适合运动吗？</div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.role}`}>{m.text}</div>
        ))}
        {typing && (
          <div className="chat-bubble typing">
            <div className="dots"><span /><span /><span /></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="和泡芙说点什么…"
          autoComplete="off"
        />
        <button onClick={send} disabled={typing}>➤</button>
      </div>
    </div>
  )
}
