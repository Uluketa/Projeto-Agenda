const validator = require('validator');

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    reinicializaErros() {
        let parErro = document.querySelectorAll(".msg-erro");
        if (parErro.length) {
            for (let para of parErro) {
                const parent = para.parentElement;
                parent.removeChild(para)
            }
        }
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.reinicializaErros();
            this.validate(e);
        })
    }

    criaParagrafo(mensagem) {
        const p = document.createElement('p');
        p.innerText = mensagem;
        p.style.color = 'red';
        p.className = 'msg-erro'
        return p;
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        if (!validator.isEmail(emailInput.value)) {
            const parent = emailInput.parentElement;
            parent.appendChild(this.criaParagrafo('O email inserido não é válido'));
            error = true;
        }

        if (passwordInput.value < 3 || passwordInput.value > 50) {
            const parent = passwordInput.parentElement;
            parent.appendChild(this.criaParagrafo('A senha deve ter entre 3 a 50 caracteres'));
            error = true;
        }

        if (!error) el.submit();
    }
}