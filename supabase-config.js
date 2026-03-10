// ──────────────────────────────────────────────────────────
// supabase-config.js  —  Replace with YOUR Supabase details
// Get these from: supabase.com → Your Project → Settings → API
// ──────────────────────────────────────────────────────────

const SUPABASE_URL      = 'https://tjhacfawxelnnmugizqs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqaGFjZmF3eGVsbm5tdWdpenFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNjI0MzMsImV4cCI6MjA4ODczODQzM30.wQGflZ-IldBg8kgSsRrWZ607d5bSRa3iB9gkT0VS4yA';

const BUCKETS = {
  reading:   'reading-tests',
  listening: 'listening-tests',
  mock:      'mock-tests',
};

// Use a unique variable name to avoid conflict with the CDN's window.supabase
const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Alias so all pages can use either name
window._supabase = _sb;
