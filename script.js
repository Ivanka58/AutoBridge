// ===== ТЕМА =====
const toggle = document.getElementById('themeToggle');
const tooltip = document.getElementById('themeTooltip');
let themeTimeout;

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        showTooltip('Светлая тема');
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        showTooltip('Тёмная тема');
    }
});

function showTooltip(text) {
    tooltip.textContent = text;
    tooltip.classList.add('show');
    clearTimeout(themeTimeout);
    themeTimeout = setTimeout(() => {
        tooltip.classList.remove('show');
    }, 2000);
}

// ===== ПЕЧАТАЮЩИЙСЯ СЛОГАН =====
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
    sloganEl.innerHTML = '';
    let i = 0;
    function typeChar() {
        if (i < text.length) {
            sloganEl.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeChar, 45);
        } else if (callback) callback();
    }
    typeChar();
}

function rotateSlogan() {
    typeSlogan(slogans[sloganIndex], () => {
        sloganIndex = (sloganIndex + 1) % slogans.length;
        setTimeout(rotateSlogan, 5000);
    });
}
rotateSlogan();

// ===== МОДАЛКА ЗАКАЗА =====
const orderModal = document.getElementById('orderModal');
const openOrderBtn = document.getElementById('openOrderModalBtn');
const closeBtns = document.querySelectorAll('.close');

openOrderBtn.onclick = () => orderModal.style.display = 'flex';
closeBtns.forEach(btn => btn.onclick = () => orderModal.style.display = 'none');
window.onclick = (e) => { if (e.target === orderModal) orderModal.style.display = 'none'; };

// ===== ПОДДЕРЖКА =====
const supportMsg = "Есть вопросы? Напишите нам!";
const bubble = document.getElementById('supportBubble');
let supportTyped = false;

function typeSupport() {
    if (!bubble) return;
    bubble.innerHTML = '';
    let i = 0;
    function type() {
        if (i < supportMsg.length) {
            bubble.innerHTML += supportMsg.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }
    type();
}

document.getElementById('supportCircle').addEventListener('click', () => {
    window.open('https://t.me/Ivanka58', '_blank');
});

window.addEventListener('scroll', () => {
    const el = document.getElementById('supportCircle');
    const scrollY = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    if (scrollY > docHeight * 0.5) {
        if (el.style.display !== 'block') {
            el.style.display = 'block';
            if (!supportTyped) { typeSupport(); supportTyped = true; }
        }
    } else {
        el.style.display = 'none';
    }
});

// ===== КАРУСЕЛЬ =====
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
let cardsPerView = 1;

function getCardsPerView() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
}

function renderCars() {
    track.innerHTML = '';
    carsData.forEach((car) => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <img src="${car.img}" alt="${car.name}" onerror="this.src='car-placeholder.png'">
            <div class="car-card-body">
                <h3>${car.name}</h3>
                <div class="year-mileage">${car.year} • ${car.mileage} км</div>
                <div class="engine-drive">${car.engine} • ${car.drive}</div>
                <div class="specs">${car.specs}</div>
                <div class="price-tag">${car.price}</div>
                <a href="tel:${car.phone}" class="car-phone">📞 ${car.phone}</a>
            </div>
        `;
        track.appendChild(card);
    });
    updateCarousel();
}

function updateCarousel() {
    cardsPerView = getCardsPerView();
    const totalCards = carsData.length;
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    const cardWidth = track.querySelector('.car-card')?.offsetWidth + 25 || 325;
    const offset = currentIndex * (cardWidth);
    track.style.transform = `translateX(-${offset}px)`;
    prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
    nextBtn.style.display = currentIndex >= maxIndex ? 'none' : 'flex';
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) { currentIndex--; updateCarousel(); }
});

nextBtn.addEventListener('click', () => {
    const totalCards = carsData.length;
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    if (currentIndex < maxIndex) { currentIndex++; updateCarousel(); }
});

window.addEventListener('resize', updateCarousel);
renderCars();
