import { createClient } from '@supabase/supabase-js';
import type { User, SymptomLog, Content, HealthTrendAlert } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// User operations
export async function createUser(user: Omit<User, 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('users')
    .insert([{
      ...user,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUser(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateUser(userId: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Symptom log operations
export async function createSymptomLog(log: Omit<SymptomLog, 'logId'>) {
  const { data, error } = await supabase
    .from('symptom_logs')
    .insert([{
      ...log,
      log_id: crypto.randomUUID(),
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getSymptomLogs(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from('symptom_logs')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// Content operations
export async function getContentByConditions(conditions: string[], isPremium = false) {
  let query = supabase
    .from('content')
    .select('*')
    .overlaps('relevant_conditions', conditions);

  if (!isPremium) {
    query = query.eq('is_premium', false);
  }

  const { data, error } = await query
    .order('published_date', { ascending: false })
    .limit(20);

  if (error) throw error;
  return data;
}

// Health trend alerts operations
export async function createHealthTrendAlert(alert: Omit<HealthTrendAlert, 'alertId'>) {
  const { data, error } = await supabase
    .from('health_trend_alerts')
    .insert([{
      ...alert,
      alert_id: crypto.randomUUID(),
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getHealthTrendAlerts(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from('health_trend_alerts')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function markAlertAsRead(alertId: string) {
  const { data, error } = await supabase
    .from('health_trend_alerts')
    .update({ is_read: true })
    .eq('alert_id', alertId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
