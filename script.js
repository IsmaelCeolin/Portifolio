// ===== FUNCIONALIDADES GERAIS =====

// DOMContentLoaded - Garante que o código só execute após o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    // ===== MENU RESPONSIVO =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        // Alterna a classe 'active' no menu
        navMenu.classList.toggle('active');
        
        // Animação do hamburger para X
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fechar o menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelectorAll('span')[0].style.transform = 'none';
            hamburger.querySelectorAll('span')[1].style.opacity = '1';
            hamburger.querySelectorAll('span')[2].style.transform = 'none';
        });
    });
    
    // ===== TEMA CLARO/ESCURO =====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Verifica se há preferência salva no localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        // Alterna a classe no body
        document.body.classList.toggle('dark-theme');
        
        // Alterna o ícone
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // ===== VALIDAÇÃO DO FORMULÁRIO =====
    const form = document.getElementById('form-contato');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');
    const nomeError = document.getElementById('nome-error');
    const emailError = document.getElementById('email-error');
    const mensagemError = document.getElementById('mensagem-error');
    
    // Elementos do modal
    const modal = document.getElementById('modal-confirmacao');
    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    
    // Função para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Função para mostrar erro
    function mostrarErro(elemento, mensagem) {
        elemento.textContent = mensagem;
        elemento.style.opacity = '1';
    }
    
    // Função para limpar erro
    function limparErro(elemento) {
        elemento.textContent = '';
        elemento.style.opacity = '0';
    }
    
    // Validação em tempo real
    nomeInput.addEventListener('input', function() {
        if (this.value.trim().length < 2) {
            mostrarErro(nomeError, 'Nome deve ter pelo menos 2 caracteres');
        } else {
            limparErro(nomeError);
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (!validarEmail(this.value)) {
            mostrarErro(emailError, 'Por favor, insira um email válido');
        } else {
            limparErro(emailError);
        }
    });
    
    mensagemInput.addEventListener('input', function() {
        if (this.value.trim().length < 10) {
            mostrarErro(mensagemError, 'Mensagem deve ter pelo menos 10 caracteres');
        } else {
            limparErro(mensagemError);
        }
    });
    
    // Submissão do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio real
        
        // Validação final
        let valido = true;
        
        if (nomeInput.value.trim().length < 2) {
            mostrarErro(nomeError, 'Nome é obrigatório (mínimo 2 caracteres)');
            valido = false;
        }
        
        if (!validarEmail(emailInput.value)) {
            mostrarErro(emailError, 'Email inválido');
            valido = false;
        }
        
        if (mensagemInput.value.trim().length < 10) {
            mostrarErro(mensagemError, 'Mensagem é obrigatória (mínimo 10 caracteres)');
            valido = false;
        }
        
        // Se tudo estiver válido, simula o envio
        if (valido) {
            // Limpa os campos
            form.reset();
            limparErro(nomeError);
            limparErro(emailError);
            limparErro(mensagemError);
            
            // Mostra o modal de confirmação
            modal.style.display = 'flex';
        }
    });
    
    // Fechar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    modalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // ===== DESTACAR LINK ATIVO NO MENU =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function highlightMenu() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Adiciona classe ativa inicialmente ao link da primeira seção
    if (window.location.hash) {
        const activeLink = document.querySelector(`.nav-menu a[href="${window.location.hash}"]`);
        if (activeLink) activeLink.classList.add('active');
    } else {
        navLinks[0].classList.add('active');
    }
    
    window.addEventListener('scroll', highlightMenu);
    
    // ===== ANIMAÇÃO DE APARIÇÃO AO SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observa todos os elementos com a classe 'animate-on-scroll'
    document.querySelectorAll('.portfolio-item, .formacao-item, .info-card').forEach(el => {
        observer.observe(el);
    });
    
    // ===== CONSOLE LOG PARA DESENVOLVIMENTO =====
    console.log('Portfólio carregado com sucesso!');
    console.log('Desenvolvido por [Seu Nome]');
    console.log('Tecnologias: HTML5, CSS3, JavaScript Vanilla');
});

// ===== FUNÇÃO PARA VALIDAR EMAIL (também disponível globalmente) =====
function validarEmailGlobal(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}