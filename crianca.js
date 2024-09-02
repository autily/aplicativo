document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.menu-btn');
  const sideMenu = document.getElementById('sideMenu');
  const closeBtn = document.getElementById('closeBtn');

  menuBtn.addEventListener('click', function() {
      sideMenu.classList.toggle('open');
  });

  closeBtn.addEventListener('click', function() {
      sideMenu.classList.remove('open');
  });

  const searchButton = document.querySelector('.search .menu-item');
  searchButton.addEventListener('click', function(e) {
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
});
