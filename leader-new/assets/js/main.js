/* Leader site JS — fresh ES6, no template code copied. */
(function(){
  const qs = (s, r=document)=>r.querySelector(s);
  const qsa = (s, r=document)=>Array.from(r.querySelectorAll(s));

  // Sticky header + scroll state
  const header = qs('.site-header');
  const onScroll = () => {
    if(!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Accessible drawer menu
  const drawer = qs('#mobile-drawer');
  const btnOpen = qs('#nav-open');
  const btnClose = qs('#nav-close');
  const toggleDrawer = (open) => {
    if(!drawer) return;
    const isOpen = open ?? drawer.getAttribute('aria-hidden') === 'true';
    drawer.setAttribute('aria-hidden', String(!isOpen));
    if(isOpen){ qs('#drawer-first')?.focus(); }
  };
  btnOpen?.addEventListener('click', ()=>toggleDrawer(true));
  btnClose?.addEventListener('click', ()=>toggleDrawer(false));
  drawer?.addEventListener('click', (e)=>{ if(e.target === drawer) toggleDrawer(false); });
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') toggleDrawer(false); });

  // Scroll-reveal animations (reduced motion aware)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced){
    const io = new IntersectionObserver((entries)=>{
      for(const entry of entries){
        if(entry.isIntersecting){ entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      }
    }, {rootMargin:'0px 0px -10% 0px'});
    qsa('.reveal, .hero-media').forEach(el=>io.observe(el));
  }

  // Utility: fetch JSON helper
  async function loadJSON(path){
    const res = await fetch(path, {credentials:'same-origin'});
    if(!res.ok) throw new Error('Failed to load '+path);
    return res.json();
  }

  // Populate product highlights on Home and Products grid
  async function mountProducts(){
    const listEl = qs('[data-products]');
    if(!listEl) return;
    const data = await loadJSON('./products.json');
    listEl.innerHTML = data.products.map(p=>`
      <article class="card reveal" data-cat="${p.category}">
        <a href="./products/${p.slug}.html" class="card-media" aria-label="${p.name}">
          <img src="${p.image}" alt="${p.alt}" loading="lazy"/>
        </a>
        <div class="card-body">
          <span class="badge">${p.badge || 'Renewable'}</span>
          <h3>${p.name}</h3>
          <p>${p.short}</p>
          <div class="cluster" style="margin-top:12px">
            <a class="btn btn-brand" href="./products/${p.slug}.html">Explore</a>
            <a class="btn btn-ghost" href="./contact.html?product=${encodeURIComponent(p.name)}">Get Quote</a>
          </div>
        </div>
      </article>
    `).join('');
  }
  mountProducts().catch(console.warn);

  // Portfolio masonry + filters + lightbox
  async function mountGallery(){
    const grid = qs('[data-gallery]');
    if(!grid) return;
    const data = await loadJSON('./gallery.json');
    const build = (items)=>{
      grid.innerHTML = items.map(i=>`
        <figure class="masonry-item reveal" data-cat="${i.category}">
          <a class="img-popup" href="${i.srcLarge}" data-gall="leader-gallery" aria-label="Open image">
            <img src="${i.src}" alt="${i.alt}" loading="lazy" srcset="${i.srcset||''}" sizes="(max-width:640px) 100vw, 33vw"/>
          </a>
          <figcaption style="padding:8px 2px">${i.caption}</figcaption>
        </figure>
      `).join('');
      // Lightbox init (Venobox)
      try { new VenoBox({ selector: '.img-popup', numeration:true, infinigall:true }); } catch(err) { /* vendor optional */ }
    };
    build(data.items);
    // Filters
    const filterBar = qs('[data-filterbar]');
    filterBar?.addEventListener('click', (e)=>{
      const btn = e.target.closest('button[data-filter]');
      if(!btn) return;
      const f = btn.getAttribute('data-filter');
      qsa('button[data-filter]', filterBar).forEach(b=>b.classList.remove('btn-brand'));
      btn.classList.add('btn-brand');
      qsa('[data-cat]', grid).forEach(el=>{
        el.style.display = (f==='all' || el.getAttribute('data-cat')===f) ? '' : 'none';
      });
    });
  }
  mountGallery().catch(console.warn);

  // Testimonials slider (optional vendor)
  try{
    if(typeof Swiper !== 'undefined' && document.querySelector('.testimonials-swiper')){
      /* eslint-disable no-undef */
      new Swiper('.testimonials-swiper', {
        loop:true,
        spaceBetween:24,
        slidesPerView:1,
        pagination:{ el: '.swiper-pagination', clickable:true },
        navigation:{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints:{ 640:{slidesPerView:1}, 1024:{slidesPerView:2} }
      });
      /* eslint-enable */
    }
  }catch(err){/* ignore */}

  // Contact form validation + mailto/WhatsApp fallback
  const form = qs('#contact-form');
  form?.addEventListener('submit', (e)=>{
    const required = qsa('[data-required="true"]', form);
    let ok = true;
    for(const field of required){
      if(!field.value.trim()) { ok = false; field.setAttribute('aria-invalid','true'); field.closest('.field')?.querySelector('.error')?.remove();
        const div = document.createElement('div'); div.className='error'; div.textContent='This field is required.'; field.closest('.field')?.append(div);
      }
    }
    if(!ok){ e.preventDefault(); return; }
    // Build fallback message
    const name = qs('[name=name]', form)?.value||'';
    const phone = qs('[name=phone]', form)?.value||'';
    const email = qs('[name=email]', form)?.value||'';
    const address = qs('[name=address]', form)?.value||'';
    const product = qs('[name=product]', form)?.value||'';
    const area = qs('[name=area]', form)?.value||'';
    const message = qs('[name=message]', form)?.value||'';
    const summary = `Lead Request — ${product}\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}\nRoof area: ${area} m²\nMessage: ${message}`;
    // If backend absent, open mailto and WhatsApp
    if(form.getAttribute('action')==='#'){
      e.preventDefault();
      const mailHref = `mailto:leaderpowers99@gmail.com?subject=${encodeURIComponent('Quick Quote — '+product)}&body=${encodeURIComponent(summary)}`;
      const waHref = `https://wa.me/919822444552?text=${encodeURIComponent(summary)}`;
      window.open(mailHref, '_blank');
      window.open(waHref, '_blank');
    }
  });

  // Helper: preselect product in contact via URL
  const url = new URL(location.href);
  const pre = url.searchParams.get('product');
  if(pre){ const sel = qs('select[name=product]'); if(sel){ sel.value = pre; }}
})();

