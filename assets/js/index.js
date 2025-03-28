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
    document.getElementById("contactForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const nome = formData.get("Nome");
        const email = formData.get("Email");
        const telefone = formData.get("Telefone");
        const assunto = formData.get("Assunto");
        const mensagem = formData.get("Message");

        // Configurar payload do e-mail
        const emailData = {
            sender: { name: "Cliente Entrando em Contato pelo Site", email: "lucasmatheussouza53@gmail.com" },
            to: [{ email: "glaucomarcelo@aconsel.net", name: "Dr.Glauco Marcelo Marques" }],
            subject: assunto,
            htmlContent: `
                <h2>Informações preenchidas pelo cliente!</h2>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${telefone}</p>
                <p><strong>Mensagem:</strong> ${mensagem}</p>
            `,
        };

        try {
            const response = await fetch("https://api.brevo.com/v3/smtp/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "api-key": "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", 
                },
                body: JSON.stringify(emailData),
            });

            if (response.ok) {
                showAlert(); 
                this.reset(); 
            }
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error); 
        }
    });

    function showAlert() {
        var alerta = document.getElementById('Alerta');
        if (alerta) {
            alerta.style.display = 'flex'; 
            alerta.classList.add('active'); 

            setTimeout(hideAlert, 8000);
        }
    }

    function hideAlert() {
        var alerta = document.getElementById('Alerta');
        if (alerta) {
            alerta.classList.remove('active');
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 500); 
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");

    menuIcon.addEventListener("click", function (event) {
        navbar.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
            navbar.classList.remove("active");
        }
    });
});

function hideAlert() {
    var alerta = document.getElementById('Alerta');
    if (alerta) {
        alerta.classList.remove('active'); 
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 500);
    }
}

var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #8D6E63}";
        document.body.appendChild(css);
    };

