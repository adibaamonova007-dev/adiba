// ──────────────────────────────────────────────────────────
// supabase-config.js  —  Replace with YOUR Supabase details
// Get these from: supabase.com → Your Project → Settings → API
// ──────────────────────────────────────────────────────────

const SUPABASE_URL      = 'sb_publishable_gHPvHozJY_HGrFav4Rfv5A_cs8jcZx7';
const SUPABASE_ANON_KEY = 'sb_secret_aA4RzLkMb4yowCrZ1G5UXg_oBZe-5FQ';

const BUCKETS = {
  reading:   'reading-tests',
  listening: 'listening-tests',
  mock:      'mock-tests',
};

// Use a unique variable name to avoid conflict with the CDN's window.supabase
const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Alias so all pages can use either name
window._supabase = _sb;
