function calcularPerdas() {
    // Obter valores iniciais
    const txInicial = parseFloat(document.getElementById('tx').value) || 0;
    const rxInicial = parseFloat(document.getElementById('rx').value) || 0;
    const frequencia = parseFloat(document.getElementById('frequencia').value) || 0;
    const cabos = parseFloat(document.getElementById('cabos').value) || 0;
    const tipoCabo = document.getElementById('tipo-cabo').value;
  
    // Validar frequência
    if (frequencia < 1.9 || frequencia > 1000) {
      alert("A frequência deve estar entre 1.90 MHz e 1000 MHz.");
      return;
    }
  
    // Fator de ajuste de perda por frequência e tipo de cabo (em dB/metro)
    const perdaCaboPorMetro = calcularPerdaCabo(frequencia, tipoCabo);
  
    // Perdas de cabo (ajustadas pela frequência e tipo de cabo)
    const perdaCabo = cabos * perdaCaboPorMetro;
  
    // Calcular sinais finais
    const txFinal = txInicial + perdaCabo;
    const rxFinal = rxInicial - perdaCabo;
  
    // Exibir resultado
    document.getElementById('txFinal').textContent = `TX Final: ${txFinal.toFixed(2)} dBmV`;
    document.getElementById('rxFinal').textContent = `RX Final: ${rxFinal.toFixed(2)} dBmV`;
    document.getElementById('resultado').style.display = 'block';
  }
  
  // Função para calcular a perda de cabo por metro com base na frequência e tipo de cabo
  function calcularPerdaCabo(frequencia, tipoCabo) {
    const atenuacao = {
      rg6: {
        1.90: 1.90,
        55: 5.25,
        83: 6.40,
        187: 9.35,
        211: 10.00,
        250: 10.82,
        300: 11.64,
        350: 12.63,
        400: 13.61,
        450: 14.43,
        500: 15.09,
        550: 16.08,
        600: 16.73,
        750: 18.54,
        865: 20.01,
        1000: 21.49
      },
      rg11: {
        1.90: 1.25,
        55: 3.15,
        83: 3.87,
        187: 5.74,
        211: 6.23,
        250: 6.72,
        300: 7.38,
        350: 7.94,
        400: 8.53,
        450: 9.02,
        500: 9.51,
        550: 9.97,
        600: 10.43,
        750: 11.97,
        865: 13.05,
        1000: 14.27
      }
    };
  
    // Frequências disponíveis
    const frequenciasDisponiveis = Object.keys(atenuacao[tipoCabo]).map(Number).sort((a, b) => a - b);
  
    // Encontrar a frequência mais próxima
    let freqMaisProxima = frequenciasDisponiveis[0];
    for (const freq of frequenciasDisponiveis) {
      if (Math.abs(freq - frequencia) < Math.abs(freqMaisProxima - frequencia)) {
        freqMaisProxima = freq;
      }
    }
  
    // Obter a atenuação para a frequência mais próxima
    return atenuacao[tipoCabo][freqMaisProxima] / 100;
  }