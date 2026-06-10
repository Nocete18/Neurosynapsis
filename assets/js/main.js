// ==========================================================================
//  BARRA DE ROLAGEM MENU SUPERIOR (HEADER) 
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.nav-links');
    let isDown = false;
    let startX;
    let scrollLeft;
    
    let startXClick;
    let startYClick;
    const clickThreshold = 6; 

    //  Clicou e segurou
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;

        startXClick = e.pageX;
        startYClick = e.pageY;
    });

    //  Quando o mouse SE MOVE (Apenas se o botão estiver pressionado)
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return; // Se não estiver com o clique pressionado, ignora 
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; 
        slider.scrollLeft = scrollLeft - walk;
    });

    //  Soltou o clique EM CIMA do menu
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'pointer';
    });

    //  Se o usuário arrastar o mouse para FORA do menu desliga arrasto
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'pointer';
    });

    //  Se o usuário soltar o clique em qualquer lugar da tela
    window.addEventListener('mouseup', () => {
        if (isDown) {
            isDown = false;
            slider.style.cursor = 'pointer';
        }
    });

    // Permite o arrasto da NavBar caso click seja encima de botão, evita arrasto fantasma do botão
    slider.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    //  Controle fino evitar cliques falsos durante o arrasto
    slider.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            const deltaX = Math.abs(e.pageX - startXClick);
            const deltaY = Math.abs(e.pageY - startYClick);

            // Evita ativação do botão caso a intenção seja arrastar
            if (deltaX > clickThreshold || deltaY > clickThreshold) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });
});

// ==========================================================================
//  CARROSSEL AUTOMÁTICO DO HERO
// ==========================================================================
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;
const slideInterval = 5000; // Tempo por foto no carrossel (em ms)

function nextSlide() {
    // Remove a classe ativa do slide atual
    slides[currentSlide].classList.remove('active');
    
    // Avança para o próximo slide e volta pro zero quando chega ao fim
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Adiciona a classe ativa no novo slide
    slides[currentSlide].classList.add('active');
}

// Inicia o temporizador automático do carrossel
if(slides.length > 0) {
    setInterval(nextSlide, slideInterval);
}