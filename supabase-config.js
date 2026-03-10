// ──────────────────────────────────────────────────────────
// supabase-config.js  —  Replace with YOUR Supabase details
// Get these from: supabase.com → Your Project → Settings → API
// ──────────────────────────────────────────────────────────

const SUPABASE_URL      = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_PUBLIC_KEY';

const BUCKETS = {
  reading:   'reading-tests',
  listening: 'listening-tests',
  mock:      'mock-tests',
};

// Use a unique variable name to avoid conflict with the CDN's window.supabase
const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Alias so all pages can use either name
window._supabase = _sb;
