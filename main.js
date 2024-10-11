// Função principal do jogo
function iniciarJogo() {
    // Criação do mergulhador com suas características
    let nome = prompt("Digite o nome do mergulhador:");
    if (!nome) {
        alert("Nome inválido. O jogo será encerrado.");
        return;
    }
    let mergulhador = {
        nome: nome,
        oxigenio: 100,
        resistencia: 50,
        natacao: 30,
        perolas: 10,
    };
    let rodadas = 5;
    
    // Função para gerar um desafio submarino
    function gerarDesafio() {
        return {
            dificuldade: Math.floor(Math.random() * 30) + 10,
            recompensas: Math.floor(Math.random() * 20) + 5
        };
    }
    
    // Função para executar uma rodada
    function executarRodada() {
        let escolha = prompt(`Escolha uma ação:\n1 - Explorar\n2 - Reabastecer Oxigênio\n3 - Ver Status\n4 - Descansar\n5 - Buscar Pérolas`);

        if (escolha === "1") {
            // Chance de encontrar um desafio
            if (Math.random() > 0.4) {
                let desafio = gerarDesafio();
                alert("Você encontrou uma caverna subaquática!");
                while (desafio.dificuldade > 0 && mergulhador.oxigenio > 0) {
                    let acao = prompt(`Você quer:\n1 - Enfrentar a correnteza\n2 - Fugir`);
                    
                    if (acao === "1") {
                        // Teste de resistência
                        let desgaste = Math.floor(Math.random() * mergulhador.resistencia);
                        desafio.dificuldade -= desgaste;
                        alert(`Você enfrentou a correnteza e diminuiu a dificuldade em ${desgaste}! Dificuldade restante: ${desafio.dificuldade}`);
                        if (desafio.dificuldade > 0) {
                            let perdaOxigenio = Math.floor(Math.random() * 20);
                            mergulhador.oxigenio -= perdaOxigenio;
                            alert(`A correnteza te empurrou e você perdeu ${perdaOxigenio} de oxigênio! Oxigênio atual: ${mergulhador.oxigenio}`);
                        }
                    } else if (acao === "2") {
                        alert("Você fugiu da caverna, mas perdeu 15 de oxigênio!");
                        mergulhador.oxigenio -= 15;
                        break;
                    }
                }
                if (mergulhador.oxigenio <= 0) {
                    alert("Você perdeu o fôlego! Jogo reiniciado.");
                    iniciarJogo();
                    return;
                }
                if (desafio.dificuldade <= 0) {
                    alert("Você superou o desafio e encontrou um baú de tesouros!");
                    mergulhador.perolas += desafio.recompensas;
                }
            } else {
                alert("Você nadou por águas tranquilas e não encontrou nada.");
            }
        } else if (escolha === "2") {
            let oxigenioRecuperado = Math.floor(Math.random() * 20) + 10;
            mergulhador.oxigenio = Math.min(100, mergulhador.oxigenio + oxigenioRecuperado);
            alert(`Você subiu à superfície e recuperou ${oxigenioRecuperado} de oxigênio! Oxigênio atual: ${mergulhador.oxigenio}`);
        } else if (escolha === "3") {
            alert(`Status de ${mergulhador.nome}:\nOxigênio: ${mergulhador.oxigenio}\nResistência: ${mergulhador.resistencia}\nHabilidades de Natação: ${mergulhador.natacao}\nPérolas: ${mergulhador.perolas}`);
        } else if (escolha === "4") {
            let descanso = Math.floor(Math.random() * 10) + 5;
            let habilidadeRecuperada = Math.floor(Math.random() * 10) + 5;
            mergulhador.oxigenio = Math.min(100, mergulhador.oxigenio + descanso);
            mergulhador.natacao = Math.min(100, mergulhador.natacao + habilidadeRecuperada);
            alert(`Você descansou e recuperou ${descanso} de oxigênio e ${habilidadeRecuperada} de habilidades de natação!`);
        } else if (escolha === "5") {
            let recursoEncontrado = Math.random();
            if (recursoEncontrado > 0.7) {
                let perolasEncontradas = Math.floor(Math.random() * 15) + 5;
                mergulhador.perolas += perolasEncontradas;
                alert(`Você encontrou ${perolasEncontradas} pérolas! Agora você tem ${mergulhador.perolas} pérolas.`);
            } else {
                alert("Você procurou, mas não encontrou nada útil.");
            }
        }
        
        if (mergulhador.oxigenio <= 0) {
            alert("Você não conseguiu subir à superfície a tempo. Fim de jogo.");
            return false;
        }
        return true;
    }
    
    alert(`Mergulhador: ${mergulhador.nome}\nIniciando a missão...`);
    while (rodadas > 0) {
        if (!executarRodada()) {
            break;
        }
        rodadas--;
    }
    
    if (mer
