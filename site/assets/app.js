
(() => {
  // Cursor glow
  const glow = document.querySelector('.cursor-glow');
  if (glow) {
    window.addEventListener('pointermove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, {passive:true});
  }

  // Tehran time
  const clock = document.querySelector('[data-clock]');
  const date = document.querySelector('[data-date]');
  const tick = () => {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone:'Asia/Tehran',
      hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false
    }).format(now);
    const d = new Intl.DateTimeFormat('en-US', {
      timeZone:'Asia/Tehran', weekday:'short', month:'short', day:'numeric'
    }).format(now);
    if (clock) clock.textContent = parts;
    if (date) date.textContent = d;
  };
  tick(); setInterval(tick, 1000);

  // Capability filters
  const modeBtns = document.querySelectorAll('[data-mode]');
  const cards = document.querySelectorAll('[data-cap]');
  modeBtns.forEach(btn => btn.addEventListener('click', () => {
    modeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const mode = btn.dataset.mode;
    cards.forEach(card => card.classList.toggle('hidden', mode !== 'all' && card.dataset.cap !== mode));
  }));

  // Terminal
  const output = document.querySelector('.term-output');
  const input = document.querySelector('.term-input');
  const commands = {
    help: `<span class="white">Available commands</span>
<span class="accent">about</span>       profile summary
<span class="accent">skills</span>      working toolkit
<span class="accent">experience</span>  professional history
<span class="accent">work</span>        selected projects
<span class="accent">contact</span>     email, phone, GitHub
<span class="accent">resume</span>      open resume page
<span class="accent">clear</span>       clear console`,
    about: `<span class="white">Mohammad Hossein Heydari</span>
Data Analyst & Machine Learning Engineer
M.Sc. Industrial Engineering — University of Tehran

I work across analytics, modeling, optimization,
business intelligence and practical digital products.`,
    skills: `<span class="white">ANALYZE</span>  Python · SQL Server · MySQL · Excel · Power BI · JMP · Minitab
<span class="white">MODEL</span>    GAMS · LINGO · Arena · Industrial Engineering
<span class="white">BUILD</span>    Microsoft Access · Website Design · WordPress · GitHub · Cloudflare`,
    experience: `<span class="white">2021 — 2025</span>
Data Analyst · Rasa Parvaz Giti Iran
Business and operational data analysis, analytical reporting
and decision-support work.

<span class="white">2025 — Present</span>
M.Sc. Industrial Engineering · University of Tehran`,
    work: `<span class="white">CASE 001</span>  mhheydari.ir — Personal Website
<span class="white">CASE 002</span>  Internal Software with Microsoft Access
<span class="white">NEXT</span>      Analytics & modeling case studies`,
    contact: `<span class="white">EMAIL</span>   m.hossein.heydari@ut.ac.ir
<span class="white">PHONE</span>   +98 914 693 9341
<span class="white">GITHUB</span>  github.com/heydari-moh-hos`,
  };

  function runCommand(raw) {
    if (!output) return;
    const cmd = (raw || '').trim().toLowerCase();
    if (!cmd) return;
    if (cmd === 'clear') { output.innerHTML = ''; return; }
    if (cmd === 'resume') { window.location.href = '/resume/'; return; }
    output.innerHTML = `<span class="accent">visitor@mh:~$</span> ${cmd}\n\n` + 
      (commands[cmd] || `Command not found: ${cmd}\nType <span class="accent">help</span> to see available commands.`);
  }

  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        runCommand(input.value);
        input.value = '';
      }
    });
  }
  document.querySelectorAll('[data-command]').forEach(btn => {
    btn.addEventListener('click', () => runCommand(btn.dataset.command));
  });

  // Copy helpers
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const old = btn.textContent;
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = 'Copied';
        setTimeout(() => btn.textContent = old, 1200);
      } catch {}
    });
  });

  // Reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.animate([
          {opacity:0, transform:'translateY(18px)'},
          {opacity:1, transform:'translateY(0)'}
        ], {duration:600, easing:'cubic-bezier(.2,.8,.2,1)', fill:'both'});
        obs.unobserve(e.target);
      }
    });
  }, {threshold:.08});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();


// =========================================================
// HOME V2 — theme system, nav state, mobile menu
// =========================================================
(() => {
  const root = document.documentElement;
  const THEME_KEY = 'mh-theme-mode';

  function tehranHour() {
    try {
      return Number(new Intl.DateTimeFormat('en-US', {
        timeZone:'Asia/Tehran',
        hour:'2-digit',
        hourCycle:'h23'
      }).format(new Date()));
    } catch {
      return new Date().getHours();
    }
  }

  function autoTheme() {
    const h = tehranHour();
    return (h >= 7 && h < 19) ? 'light' : 'dark';
  }

  function getMode() {
    return localStorage.getItem(THEME_KEY) || 'auto';
  }

  function applyTheme(mode, announce = false) {
    const theme = mode === 'auto' ? autoTheme() : mode;
    root.dataset.theme = theme;
    root.dataset.themeMode = mode;

    document.querySelectorAll('[data-theme-option]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeOption === mode);
      const check = btn.querySelector('.check');
      if (check) check.textContent = btn.dataset.themeOption === mode ? '✓' : '';
    });

    const label = document.querySelector('[data-theme-label]');
    if (label) {
      label.textContent = mode === 'auto'
        ? `AUTO · ${theme.toUpperCase()}`
        : mode.toUpperCase();
    }

    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-label', `Theme: ${mode}, currently ${theme}. Open theme menu.`);
      toggle.setAttribute('title', mode === 'auto'
        ? `Auto theme · ${theme} now · based on Tehran time`
        : `${theme} theme`);
    }

    if (announce) {
      const live = document.querySelector('[data-theme-live]');
      if (live) live.textContent = `Theme set to ${mode}. Current appearance: ${theme}.`;
    }
  }

  // Respect the pre-applied mode from <head>, then sync UI.
  applyTheme(getMode());

  // Re-check automatic theme periodically so it changes without reload.
  setInterval(() => {
    if (getMode() === 'auto') applyTheme('auto');
  }, 60 * 1000);

  const control = document.querySelector('.theme-control');
  const toggle = document.querySelector('[data-theme-toggle]');
  if (toggle && control) {
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const open = control.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('[data-theme-option]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.themeOption;
      localStorage.setItem(THEME_KEY, mode);
      applyTheme(mode, true);
      if (control) control.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (control && !control.contains(e.target)) {
      control.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Active desktop navigation
  const sectionIds = ['now','experience','capabilities','work','console','certificate','contact'];
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + visible.target.id));
    }, {rootMargin:'-35% 0px -55% 0px', threshold:[0,.1,.25,.5]});
    sections.forEach(s => navObserver.observe(s));
  }

  // Mobile navigation
  const menuBtn = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', e => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
