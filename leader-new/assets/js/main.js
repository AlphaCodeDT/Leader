/*
  Leader — main.js (authored from scratch)
  - Nav toggle
  - Scroll reveal animations (reduced-motion aware)
  - Simple lightbox
  - Data loaders for products.json and gallery.json
  - Contact form: WhatsApp fallback link and optional fetch submit
*/
(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', init);

  function init(){
    setupNav();
    setupReveal();
    setupLightbox();
    loadProductsIfNeeded();
    loadGalleryIfNeeded();
    setupContactForm();
  }

  function setupNav(){
    const toggle = $('.nav-toggle');
    if(!toggle) return;
    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('nav-open');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  function setupReveal(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = $$('.reveal');
    if(targets.length === 0) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.15});
    targets.forEach(el=>io.observe(el));
  }

  function setupLightbox(){
    const lb = $('#lightbox');
    if(!lb) return;
    const imgEl = $('img', lb);
    const closeBtn = $('button[data-close]', lb);
    document.addEventListener('click', (e)=>{
      const t = e.target;
      if(!(t instanceof Element)) return;
      const trigger = t.closest('[data-lightbox-src]');
      if(trigger){
        e.preventDefault();
        const src = trigger.getAttribute('data-lightbox-src');
        const alt = trigger.getAttribute('data-lightbox-alt') || '';
        if(src){
          imgEl.src = src;
          imgEl.alt = alt;
          lb.classList.add('open');
        }
      }
    });
    closeBtn?.addEventListener('click', ()=> lb.classList.remove('open'));
    lb.addEventListener('click', (e)=>{ if(e.target === lb) lb.classList.remove('open'); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') lb.classList.remove('open'); });
  }

  async function loadProductsIfNeeded(){
    const container = $('#products-grid');
    if(!container) return;
    try{
      const res = await fetch('/leader-new/assets/data/products.json', {cache:'no-cache'});
      const data = await res.json();
      renderProducts(container, data);
    }catch(err){
      console.error('Failed to load products.json', err);
    }
  }

  function renderProducts(container, products){
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    products.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'card reveal hover-float';
      card.innerHTML = `
        <div class="media">
          <img loading="lazy" src="${p.image.src}" alt="${p.image.alt}" width="640" height="360" srcset="${p.image.srcset||''}" sizes="(max-width:640px) 100vw, 50vw">
        </div>
        <div class="body">
          <h3>${p.name}</h3>
          <p>${p.oneLiner}</p>
          <a class="btn" href="/leader-new/products/${p.slug}.html" aria-label="View ${p.name} details">View details</a>
        </div>
      `;
      fragment.appendChild(card);
    });
    container.appendChild(fragment);
    setupReveal();
  }

  async function loadGalleryIfNeeded(){
    const container = $('#gallery-grid');
    if(!container) return;
    try{
      const res = await fetch('/leader-new/assets/data/gallery.json', {cache:'no-cache'});
      const data = await res.json();
      renderGallery(container, data);
    }catch(err){
      console.error('Failed to load gallery.json', err);
    }
  }

  function renderGallery(container, items){
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    items.forEach(g=>{
      const fig = document.createElement('figure');
      fig.className = 'card reveal';
      fig.innerHTML = `
        <div class="media">
          <img loading="lazy" src="${g.image.src}" alt="${g.image.alt}" width="640" height="360" data-lightbox-src="${g.image.src}" data-lightbox-alt="${g.caption}" srcset="${g.image.srcset||''}" sizes="(max-width:640px) 100vw, 33vw">
        </div>
        <figcaption class="body"><small>${g.caption}</small></figcaption>
      `;
      fragment.appendChild(fig);
    });
    container.appendChild(fragment);
    setupReveal();
  }

  function setupContactForm(){
    const form = $('#contact-form');
    if(!form) return;
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get('name')||'').toString().trim();
      const product = (fd.get('product')||'').toString().trim();
      const whatsappMsg = encodeURIComponent(`New Quote Request from ${name} - ${product}`);
      const waUrl = `https://wa.me/919822444542?text=${whatsappMsg}`;

      const action = form.getAttribute('action') || '#';
      if(action === '#'){
        window.open(waUrl, '_blank');
        form.reset();
        return;
      }

      try{
        const res = await fetch(action, { method: 'POST', body: fd });
        if(res.ok){
          window.open(waUrl, '_blank');
          form.reset();
        } else {
          window.open(waUrl, '_blank');
        }
      }catch(err){
        console.error('Submit failed, redirecting to WhatsApp', err);
        window.open(waUrl, '_blank');
      }
    });
  }
})();

