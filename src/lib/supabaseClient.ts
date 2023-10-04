import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_SECRET } from '$env/static/private';
import type { Database } from './database.types.ts'

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_SECRET)