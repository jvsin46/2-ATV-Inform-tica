const storyData = {
    start: {
        text: "Você acorda em sua cela, a luz é fraca e o barulho é intenso. Você precisa fugir. O que você faz?",
        options: [
            { text: "Tentar abrir a cela", next: "cell_open" },
            { text: "Esperar e observar", next: "wait_observe" }
        ]
    },
    cell_open: {
        text: "Você tenta abrir a cela e consegue! Você está fora da cela. Você vê um corredor à sua frente.",
        options: [
            { text: "Correr pelo corredor", next: "run_hall" },
            { text: "Esconder-se atrás de uma caixa", next: "hide_box" }
        ]
    },
    wait_observe: {
        text: "Você decide esperar e observar. Um guarda se aproxima. Você tem que agir rápido!",
        options: [
            { text: "Atacar o guarda", next: "attack_guard" },
            { text: "Fingir estar doente", next: "fake_sick" }
        ]
    },
    run_hall: {
        text: "Você corre pelo corredor e encontra uma porta de saída. Você escapa!",
        options: []
    },
    hide_box: {
        text: "Você se esconde atrás de uma caixa, mas acaba sendo encontrado. Os guardas levam Você de volta à cela.",
        options: []
    },
    attack_guard: {
        text: "Você ataca o guarda e consegue derrotá-lo. Aja rápido, você precisa fugir!",
        options: [
            { text: "Correr para a porta", next: "run_hall" },
            { text: "Pegar a chave do guarda", next: "take_key" }
        ]
    },
    fake_sick: {
        text: "Você finge estar doente, o guarda abre a cela e se distrai. Agora você pode fugir!",
        options: [
            { text: "Correr para a saída", next: "run_hall" },
            { text: "Voltar para a cela", next: "cell_open" }
        ]
    },
    take_key: {
        text: "Você pega a chave e consegue abrir a porta da cela. Agora você está livre!",
        options: []
    }
};

function renderStory(step) {
    const storyContainer = document.getElementById('story-container');
    storyContainer.innerHTML = '';
    
    const currentStep = storyData[step];
    if (!currentStep) return;

    const storyText = document.createElement('p');
    storyText.textContent = currentStep.text;
    storyContainer.appendChild(storyText);

    if (currentStep.options.length > 0) {
        currentStep.options.forEach(option => {
            const link = document.createElement('a');
            link.textContent = option.text;
            link.href = `?step=${option.next}`;
            link.onclick = (e) => {
                e.preventDefault();
                localStorage.setItem('lastStep', option.next);
                renderStory(option.next);
            };
            storyContainer.appendChild(link);
            storyContainer.appendChild(document.createElement('br'));
        });
    } else {

        const restartLink = document.createElement('a');
        restartLink.textContent = "Voltar ao Início";
        restartLink.href = "?step=start";
        restartLink.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem('lastStep'); 
            renderStory('start');
        };
        storyContainer.appendChild(restartLink);
    }
}

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const step = urlParams.get('step') || localStorage.getItem('lastStep') || 'start';
    renderStory(step);
}

document.addEventListener('DOMContentLoaded', init);
