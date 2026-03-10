// script.js – shared utilities for Adiba-Amonova IELTS platform

document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === location.href) link.classList.add('active');
});

function formatSize(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}

function fileLabel(name = '') {
  const ext = name.split('.').pop().toLowerCase();
  return { html:'HTML', pdf:'PDF', mp3:'MP3', wav:'WAV', m4a:'M4A', ogg:'OGG', zip:'ZIP', doc:'DOC', docx:'DOCX' }[ext] || ext.toUpperCase();
}

function showToast(msg, type = 'info') {
  const t = document.createElement('div');
  t.className = `alert alert-${type}`;
  t.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:999;min-width:260px;box-shadow:0 8px 32px rgba(0,20,60,0.5);animation:fadeIn .3s ease;';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

function loadAnnouncements(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const ann = JSON.parse(localStorage.getItem('adiba_announcements') || '[]');
  if (!ann.length) { el.style.display = 'none'; return; }
  el.innerHTML = ann.map(a => `
    <div class="announcement-bar">
      <div class="ann-icon">📢</div>
      <div><div class="ann-title">${a.title}</div><div class="ann-body">${a.body}</div></div>
    </div>`).join('');
}

async function loadFilesFromBucket(bucketName, listEl, emptyMsg) {
  listEl.innerHTML = `<div class="loading-spinner"><div class="spinner"></div><span>Loading tests…</span></div>`;
  try {
    const { data, error } = await _sb.storage.from(bucketName).list('', {
      limit: 200, offset: 0, sortBy: { column: 'created_at', order: 'desc' }
    });
    if (error) throw error;
    const files = (data || []).filter(f => f.name !== '.emptyFolderPlaceholder');
    if (!files.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-icon">📂</div><h3>No tests yet</h3><p>${emptyMsg}</p></div>`;
      return;
    }
    listEl.innerHTML = files.map((file, i) => {
      const { data: { publicUrl } } = _sb.storage.from(bucketName).getPublicUrl(file.name);
      return `
        <a href="${publicUrl}" target="_blank" class="test-item">
          <div class="test-item-left">
            <div class="test-num">${String(i+1).padStart(2,'0')}</div>
            <div>
              <div class="test-name">${file.name.replace(/\.[^.]+$/,'').replace(/[-_]/g,' ')}</div>
              <div class="test-date">${formatDate(file.created_at)} · ${formatSize(file.metadata?.size)}</div>
            </div>
          </div>
          <span class="test-badge">${fileLabel(file.name)}</span>
        </a>`;
    }).join('');
  } catch (err) {
    listEl.innerHTML = `<div class="empty-state"><div class="empty-icon">⚠️</div><h3>Could not load tests</h3><p>${err.message}</p></div>`;
  }
}
