    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                slowScrollTo(targetSection.offsetTop, 700);
            }
        });
    });

    function slowScrollTo(targetPosition, duration) {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }


    document.addEventListener("DOMContentLoaded", function () {
        const menuIcon = document.getElementById("menu-icon");
        const navbar = document.querySelector(".navbar");

        menuIcon.addEventListener("click", function () {
            navbar.classList.toggle("active");
        });
    });


    function setFormSubmitted() {
        sessionStorage.setItem("formSubmitted", "true"); // Usa sessionStorage para manter o valor apenas até fechar o navegador
    }
    
    function checkFormSubmission() {
        console.log("Verificando envio do formulário...");
    
        if (sessionStorage.getItem("formSubmitted") === "true") {
            console.log("Exibindo pop-up de sucesso");
            showAlert();
            sessionStorage.removeItem("formSubmitted"); // Remove o status após exibir o pop-up
        }
    }
    
    function showAlert() {
        var alerta = document.getElementById('Alerta');
        if (alerta) {
            alerta.style.display = 'flex'; // Exibe o alerta
            alerta.classList.add('active'); // Adiciona classe de exibição
    
            // Fecha automaticamente após 8 segundos
            setTimeout(hideAlert, 8000);
        }
    }
    
    function hideAlert() {
        var alerta = document.getElementById('Alerta');
        if (alerta) {
            alerta.classList.remove('active'); // Inicia a animação de fechamento
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 500); // Aguarda a conclusão da animação antes de ocultar completamente
        }
    }
    
    // Fecha o alerta manualmente ao clicar no botão de fechar
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.custom-alerta .close').forEach(icon => {
            icon.addEventListener('click', hideAlert);
        });
    
        checkFormSubmission(); // Verifica se o formulário foi enviado ao carregar a página
    });
    