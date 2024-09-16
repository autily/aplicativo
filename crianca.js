document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const sideMenu = document.getElementById('sideMenu');
    const closeBtn = document.getElementById('closeBtn');

    if (menuBtn && sideMenu && closeBtn) {
        menuBtn.addEventListener('click', function () {
            sideMenu.classList.toggle('open');
        });

        closeBtn.addEventListener('click', function () {
            sideMenu.classList.remove('open');
        });
    }

    const searchButton = document.querySelector('.search .menu-item');
    if (searchButton) {
        searchButton.addEventListener('click', function (e) {
            e.preventDefault(); // Evitar o comportamento padrão do link

            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const headings = document.querySelectorAll('h1');

            // Remove o destaque anterior
            headings.forEach(h1 => h1.classList.remove('highlight'));

            headings.forEach(h1 => {
                // Verificar se o termo de busca está no texto do h1
                if (h1.textContent.toLowerCase().includes(searchTerm) && searchTerm !== '') {
                    // Adicionar a classe de destaque
                    h1.classList.add('highlight');

                    // Remover a classe de destaque após 2 segundos
                    setTimeout(() => {
                        h1.classList.remove('highlight');
                    }, 2000); // 2000 milissegundos = 2 segundos
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.search-icon');

    if (searchButton) {
        searchButton.addEventListener('click', function (e) {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const headings = document.querySelectorAll('h1');

            // Remove o destaque anterior
            headings.forEach(h1 => h1.classList.remove('highlight'));

            headings.forEach(h1 => {
                if (h1.textContent.toLowerCase().includes(searchTerm) && searchTerm !== '') {
                    h1.classList.add('highlight');
                    setTimeout(() => {
                        h1.classList.remove('highlight');
                    }, 2000);
                }
            });
        });
    }
});

// Função para abrir o drawer de perfil
function openProfileDrawer() {
    document.getElementById("profileDrawer").classList.add("open");
}

// Função para fechar o drawer de perfil
function closeProfileDrawer() {
    document.getElementById("profileDrawer").classList.remove("open");
}

// Detectar cliques fora do drawer para fechá-lo
document.addEventListener('click', function (event) {
    const profileDrawer = document.getElementById("profileDrawer");
    const isClickInsideDrawer = profileDrawer.contains(event.target);
    const isProfileIconClicked = event.target.closest('.fa-user');

    // Fechar o drawer se o clique for fora dele e ele estiver aberto
    if (!isClickInsideDrawer && !isProfileIconClicked && profileDrawer.classList.contains('open')) {
        closeProfileDrawer();
    }
});

// Adicionar evento de fechamento ao clicar no "X"
document.querySelector('.close-btn').addEventListener('click', closeProfileDrawer);

let lastScrollTop = 0;
const bottomMenu = document.querySelector('.bottom-menu');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Se está descendo, esconde o menu
        bottomMenu.classList.add('hidden');
    } else {
        // Se está subindo, mostra o menu
        bottomMenu.classList.remove('hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Evita valores negativos
});
