/**
 * Environment configuration for local development
 * 
 * FOR LOCAL TESTING:
 * 1. Copy this file to env.local.js
 * 2. Fill in your Supabase credentials
 * 3. env.local.js is gitignored, safe to use
 * 
 * FOR PRODUCTION (Vercel):
 * These values are injected at build time from Vercel env vars
 */

// Default values (will be replaced by Vercel build, or overridden by env.local.js)
window.SUPABASE_URL = window.SUPABASE_URL || '__SUPABASE_URL__';
window.SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || '__SUPABASE_ANON_KEY__';
