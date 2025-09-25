const quiz = {
    perguntas: [
        {p: "Impacto da IA no mercado de trabalho?", a: ["Substitui empregos", "Cria oportunidades", "Transforma o trabalho", "Ced o para avaliar"]},
        {p: "IA superinteligente?", a: ["Ameaça existencial", "Evolução natural", "Precisa regulação", "Distante, sem preocupação"]},
        {p: "Maior impacto positivo?", a: ["Saúde", "Educação", "Meio ambiente", "Arte"]},
        {p: "Privacidade com IA?", a: ["Preocupado com vigilância", "Confio em regulação", "Conveniência vale sacrifício", "Sem preocupações"]},
        {p: "Prioridade ética em IA?", a: ["Transparência", "Prevenir viés", "Proteção maliciosa", "Valores humanos"]}
    ],
    atual: 0, respostas: [], el: {},
    init() {
        this.el.p = document.querySelector('.texto-pergunta');
        this.el.a = document.querySelectorAll('.alternativa');
        this.el.r = document.querySelector('.texto-resultado');
        this.el.res = document.querySelector('.caixa-resultado');
        this.el.cont = document.querySelector('.contador-perguntas span');
        this.el.perg = document.querySelector('.caixa-perguntas');
        this.el.alt = document.querySelector('.caixa-alternativas');
        this.toggle = document.getElementById('toggle-mode');
        this.loadTheme();
        this.show();
        this.toggle.addEventListener('click', () => this.switchTheme());
        this.el.a.forEach((b, i) => b.addEventListener('click', () => this.next(i)));
    },
    show() {
        if (this.atual >= this.perguntas.length) return this.result();
        const q = this.perguntas[this.atual];
        this.el.p.textContent = q.p;
        this.el.a.forEach((b, i) => b.textContent = q.a[i]);
        this.el.cont.textContent = `Pergunta ${this.atual + 1} de ${this.perguntas.length}`;
        this.el.perg.style.animation = 'none';
        setTimeout(() => this.el.perg.style.animation = 'fadeInUp 0.5s ease forwards', 10);
    },
    next(i) {
        this.respostas.push(i);
        this.atual++;
        this.show();
    },
    result() {
        this.el.perg.style.display = 'none';
        this.el.alt.style.display = 'none';
        this.el.cont.parentElement.style.display = 'none';
        const score = this.respostas.reduce((s, v) => s + v, 0);
        const max = (this.perguntas.length - 1) * 3;
        const pct = (score / max) * 100;
        let msg = pct < 25 ? "Visão cautelosa: Preocupado com riscos, valioso para equilíbrio." :
                  pct < 50 ? "Visão equilibrada: Reconhece benefícios e desafios, realista." :
                  pct < 75 ? "Visão otimista: Confiante no potencial positivo, essencial para inovação." :
                  "Visão extremamente positiva: Vê IA como força transformadora benéfica.";
        this.el.r.textContent = msg;
        this.el.res.classList.add('show');
    },
    switchTheme() {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        this.toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    },
    loadTheme() {
        const saved = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);
        this.toggle.textContent = saved === 'dark' ? '☀️' : '🌙';
    }
};

document.addEventListener('DOMContentLoaded', () => quiz.init());