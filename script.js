// ==================== SCRIPT.JS ====================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ✨ تولید ذرات Bokeh طلایی بسیار ریز و کند
    const bokehContainer = document.getElementById('particles');
    if (bokehContainer) {
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // موقعیت و اندازه کاملاً تصادفی اما بسیار کوچک
            const size = Math.random() * 3 + 1; // بین 1 تا 4 پیکسل
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDelay = `${Math.random() * 35}s`;
            particle.style.animationDuration = `${25 + Math.random() * 20}s`;
            
            bokehContainer.appendChild(particle);
        }
    }

    // 2. ✨ پارالاکس ملایم پس‌زمینه Hero هنگام اسکرول
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            // حرکت بسیار آهسته (فقط چند پیکسل) برای ایجاد عمق
            heroBg.style.transform = `translateY(${scrolled * 0.15}px)`;
        });
    }

    // 3. ✨ ظاهر شدن نرم کارت‌ها هنگام اسکرول (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
                revealObserver.unobserve(entry.target); // فقط یک بار اجرا شود
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. ✨ شمارش آرام اعداد در بخش گواهی‌ها/آمار
    const statNumbers = document.querySelectorAll('.cert-item strong, .why-card h4');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.innerText;
                // استخراج عدد از متن (مثلاً "+15" یا "65")
                const match = text.match(/\d+/);
                if (match) {
                    const targetNum = parseInt(match[0]);
                    const prefix = text.split(match[0])[0];
                    const suffix = text.split(match[0])[1];
                    
                    let current = 0;
                    const duration = 2000; // 2 ثانیه طول بکشد
                    const stepTime = Math.abs(Math.floor(duration / targetNum));
                    
                    const timer = setInterval(() => {
                        current++;
                        el.innerText = `${prefix}${current}${suffix}`;
                        if (current >= targetNum) clearInterval(timer);
                    }, stepTime > 50 ? 50 : stepTime); // حداقل سرعت خواندن
                    
                    countObserver.unobserve(el); // فقط یک بار شمارش شود
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => countObserver.observe(el));
});

