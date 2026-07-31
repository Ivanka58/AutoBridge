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

// ===== ПЕЧАТАЮЩИЙСЯ ПУЗЫРЬ ПОДДЕРЖКИ =====
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

// Показываем поддержку при скролле
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

// ===== МОДАЛКИ =====
const modal = document.getElementById('carModal');
const closeBtn = document.querySelector('.close');
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

function openCarModal(img, title, desc) {
    document.getElementById('modalCarImg').src = img;
    document.getElementById('modalCarTitle').innerText = title;
    document.getElementById('modalCarDesc').innerHTML = desc;
    modal.style.display = 'flex';
}

// ===== КАЛЬКУЛЯТОР =====
const budgetSlider = document.getElementById('calcBudget');
const budgetDisplay = document.getElementById('budgetDisplay');
const calcPrice = document.getElementById('calcPrice');

budgetSlider.addEventListener('input', () => {
    const val = parseInt(budgetSlider.value);
    budgetDisplay.innerText = val.toLocaleString() + ' ₽';
    const country = document.getElementById('calcCountry').value;
    let multiplier = country === 'georgia' ? 1.0 : 1.3;
    let price = Math.round(val * multiplier / 500000) * 500000;
    calcPrice.innerText = 'от ' + price.toLocaleString() + ' ₽';
});

document.getElementById('calcCountry').addEventListener('change', () => {
    budgetSlider.dispatchEvent(new Event('input'));
});
budgetSlider.dispatchEvent(new Event('input'));

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
    carsData.forEach((car, index) => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.setAttribute('data-index', index);
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
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    const totalCards = carsData.length;
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

window.addEventListener('resize', () => {
    updateCarousel();
});

// ===== ЗАПУСК =====
renderCars();

console.log("🚀 AutoBridge — сайт готов к работе!");
