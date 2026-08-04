/* =========================================================
   SkyWayAuto — интерактив
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== НАВБАР: смена вида при скролле ===== */
  const nav = document.getElementById('siteNav');
  const onScrollNav = () => {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ===== МОБИЛЬНОЕ МЕНЮ ===== */
  const burger = document.getElementById('burgerBtn');
  const navMobile = document.getElementById('navMobile');
  burger.addEventListener('click', () => {
    const open = navMobile.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navMobile.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  /* ===== АКТИВНАЯ ССЫЛКА НАВБАРА ПО СКРОЛЛУ ===== */
  const sections = ['services', 'cars', 'process', 'geo', 'contacts']
    .map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = navLinks.find(l => l.getAttribute('href') === '#' + entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(sec => navObserver.observe(sec));
  }

  /* ===== ПЕЧАТАЮЩИЙСЯ СЛОГАН ===== */
  const slogans = [
    "🚗 Пригон авто из Грузии и Америки под ключ",
    "🔍 Полная проверка автомобиля перед покупкой",
    "📄 Растаможка и оформление документов",
    "🚛 Доставка по всей России и СНГ",
    "⚡ Срок пригона — от 5 дней"
  ];
  let sloganIndex = 0;
  const sloganEl = document.getElementById('typingSlogan');

  function typeSlogan(text, callback) {
    sloganEl.textContent = '';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        sloganEl.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 42);
      } else if (callback) {
        setTimeout(callback, 2200);
      }
    }
    typeChar();
  }
  function eraseSlogan(callback) {
    const text = sloganEl.textContent;
    let i = text.length;
    function eraseChar() {
      if (i > 0) {
        sloganEl.textContent = text.slice(0, i - 1);
        i--;
        setTimeout(eraseChar, 20);
      } else if (callback) callback();
    }
    eraseChar();
  }
  function rotateSlogan() {
    typeSlogan(slogans[sloganIndex], () => {
      eraseSlogan(() => {
        sloganIndex = (sloganIndex + 1) % slogans.length;
        rotateSlogan();
      });
    });
  }
  if (sloganEl) rotateSlogan();

  /* ===== МОДАЛКА ЗАКАЗА ===== */
  const orderModal = document.getElementById('orderModal');
  const openBtns = [document.getElementById('openOrderModalBtn'), document.getElementById('navOrderBtn')].filter(Boolean);
  const closeBtns = document.querySelectorAll('.close');
  openBtns.forEach(btn => btn.addEventListener('click', () => {
    orderModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }));
  function closeModal() {
    orderModal.style.display = 'none';
    document.body.style.overflow = '';
  }
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
  window.addEventListener('click', (e) => { if (e.target === orderModal) closeModal(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ===== ПОДДЕРЖКА (плавающая кнопка) ===== */
  const supportMsg = "Есть вопросы? Напишите нам!";
  const bubble = document.getElementById('supportBubble');
  const supportCircle = document.getElementById('supportCircle');
  let supportTyped = false;

  function typeSupport() {
    if (!bubble) return;
    bubble.textContent = '';
    let i = 0;
    function type() {
      if (i < supportMsg.length) {
        bubble.textContent += supportMsg.charAt(i);
        i++;
        setTimeout(type, 35);
      }
    }
    type();
  }

  if (supportCircle) {
    supportCircle.addEventListener('click', () => {
      window.open('https://t.me/Ivanka58', '_blank');
    });

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollY > docHeight * 0.35) {
        if (supportCircle.style.display !== 'block') {
          supportCircle.style.display = 'block';
          if (!supportTyped) { typeSupport(); supportTyped = true; }
        }
      } else {
        supportCircle.style.display = 'none';
      }
    }, { passive: true });
  }

  /* ===== СКРОЛЛ-РЕВИЛ АНИМАЦИИ ===== */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ===== ПРОГРЕСС ЛИНИИ ПРОЦЕССА ===== */
  const processSteps = document.querySelectorAll('.process-step');
  const processProgress = document.getElementById('processProgress');
  if ('IntersectionObserver' in window && processSteps.length && processProgress) {
    const total = processSteps.length;
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          const activeCount = document.querySelectorAll('.process-step.in-view').length;
          processProgress.style.width = ((activeCount / total) * 92) + '%';
        }
      });
    }, { threshold: 0.5 });
    processSteps.forEach(step => stepObserver.observe(step));
  }

  /* ===== КАТАЛОГ АВТО: рендер + фильтр по стране ===== */
  const grid = document.getElementById('carsGrid');
  const filterWrap = document.getElementById('carsFilter');
  const carsCountEl = document.getElementById('carsCount');
  let activeFilter = 'Все';

  if (grid && Array.isArray(window.carsData || carsData)) {
    const data = (typeof carsData !== 'undefined') ? carsData : [];
    if (carsCountEl) carsCountEl.textContent = data.length;

    // строим список фильтров по уникальным странам
    if (filterWrap) {
      const countries = ['Все', ...new Set(data.map(c => c.country))];
      filterWrap.innerHTML = countries.map(c =>
        `<button class="filter-chip${c === 'Все' ? ' active' : ''}" data-filter="${c}">${c}</button>`
      ).join('');
      filterWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-chip');
        if (!btn) return;
        activeFilter = btn.dataset.filter;
        filterWrap.querySelectorAll('.filter-chip').forEach(b => b.classList.toggle('active', b === btn));
        renderCars();
      });
    }

    function renderCars() {
      const filtered = activeFilter === 'Все' ? data : data.filter(c => c.country === activeFilter);
      grid.innerHTML = filtered.map(car => `
        <div class="car-card">
          <div class="car-media">
            <img src="${car.img}" alt="${car.name}" loading="lazy" onerror="this.src='car-placeholder.png'">
            <span class="car-country">${car.country}</span>
          </div>
          <div class="car-card-body">
            <h3>${car.name}</h3>
            <div class="year-mileage">${car.year} · ${car.mileage} км</div>
            <div class="engine-drive">${car.engine} · ${car.drive}</div>
            <div class="specs">${car.specs}</div>
            <div class="price-tag">${car.price}</div>
            <a href="tel:${car.phone}" class="car-phone">📞 ${car.phone}</a>
          </div>
        </div>
      `).join('');

      // анимация появления карточек
      requestAnimationFrame(() => {
        const cards = grid.querySelectorAll('.car-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('show'), i * 70);
        });
      });
    }

    renderCars();
  }

  /* ===== ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ ===== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 82;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
