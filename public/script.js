// ---------- Mobile side menu ----------
const menu = document.getElementById('menu');
document.getElementById('openMenu').addEventListener('click', () => menu.classList.add('open'));
document.getElementById('closeMenu').addEventListener('click', () => menu.classList.remove('open'));
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.classList.remove('open')));

// ---------- Tabs (Skills / Experience / Education) ----------
document.querySelectorAll('.tab-link').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-link').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ---------- Projects from the database ----------
const projectsBox = document.getElementById('projects');
const gradients = [
  'linear-gradient(135deg,#2447f5,#12b886)',
  'linear-gradient(135deg,#7a3cff,#2447f5)',
  'linear-gradient(135deg,#12b886,#14213d)'
];

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

async function loadProjects() {
  try {
    const res = await fetch('/api/projects');
    if (!res.ok) throw new Error('bad response');
    const projects = await res.json();
    if (!projects.length) {
      projectsBox.innerHTML = '<p class="muted">No projects yet. Run <code>npm run seed</code> to add some.</p>';
      return;
    }
    projectsBox.innerHTML = projects.map((p, i) => {
      const bg = p.image
        ? `background-image:url('${encodeURI(p.image)}')`
        : `background:${gradients[i % gradients.length]}`;
      const tech = (p.tech || []).map((t) => `<span>${escapeHtml(t)}</span>`).join('');
      const link = p.link ? `<a href="${encodeURI(p.link)}" target="_blank" rel="noopener">View project</a>` : '';
      return `
        <article class="project">
          <div class="project-img" style="${bg}">${p.image ? '' : escapeHtml(p.title.charAt(0))}</div>
          <div class="project-info">
            <h3>${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(p.description)}</p>
            <div class="tech">${tech}</div>
            ${link}
          </div>
        </article>`;
    }).join('');
  } catch (err) {
    projectsBox.innerHTML = '<p class="muted">Projects could not be loaded. Please refresh the page.</p>';
  }
}
loadProjects();

// ---------- Contact form -> /api/contact -> MongoDB ----------
const form = document.getElementById('contactForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  msg.className = '';
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || 'Something went wrong.');
    msg.textContent = 'Message sent successfully';
    form.reset();
  } catch (err) {
    msg.className = 'error';
    msg.textContent = err.message;
  }
  setTimeout(() => { msg.textContent = ''; msg.className = ''; }, 5000);
});