import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// 调试：打印 Supabase 配置状态
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase 未配置。请复制 .env.example 为 .env 并填入你的 Supabase 项目信息。')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
