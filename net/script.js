// Global script for language toggle, quickview modal, and utilities

// apply language from storage or default
(function(){
  const langSelects = document.querySelectorAll('#languageSelect');
  const saved = localStorage.getItem('em_lang') || 'en';
  // set all selects
  langSelects.forEach(s => {
    s.value = saved;
    s.addEventListener('change', (e) => {
      setLanguage(e.target.value);
      localStorage.setItem('em_lang', e.target.value);
    });
  });

  // gather translatable elements and set initial language
  setLanguage(saved);
})();

function setLanguage(lang){
  const trans = document.querySelectorAll('[data-en]');
  trans.forEach(el=>{
    const text = el.getAttribute('data-' + lang);
    if(text !== null) el.textContent = text;
  });
}

// Quick view modal
function openQuickView(btn){
  // read data from button attributes
  const modal = document.getElementById('quickViewModal');
  const title = btn.getAttribute('data-title-en');
  const desc = btn.getAttribute('data-desc-en');
  const title_hi = btn.getAttribute('data-title-hi');
  const desc_hi = btn.getAttribute('data-desc-hi');

  const lang = localStorage.getItem('em_lang') || 'en';
  document.getElementById('qvTitle').textContent = (lang === 'hi' && title_hi) ? title_hi : title;
  document.getElementById('qvDesc').textContent = (lang === 'hi' && desc_hi) ? desc_hi : desc;

  // translations on the modal's buttons (they have data-en/data-hi)
  setLanguage(localStorage.getItem('em_lang') || 'en');

  modal.setAttribute('aria-hidden', 'false');
}

function closeQuickView(){
  const modal = document.getElementById('quickViewModal');
  modal.setAttribute('aria-hidden', 'true');
}

// smooth scroll helper (used from index page)
function scrollToEvents(){
  const el = document.getElementById('events');
  if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

// small utility: format date (optional)
function niceDate(iso){
  if(!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString();
}
