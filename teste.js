// Definir uma função que será executada
function minhaFuncao() {
  console.log('Executando minha função...');
  // Simulando uma operação demorada
  setTimeout(() => {
    console.log('Minha função concluída.');
    // Encerrar o processo após a conclusão da função
    process.exit(0);
  }, 5000); // Tempo de simulação: 5 segundos
}

// Adicionar ouvinte para o sinal de interrupção (Ctrl + C)
process.on('SIGINT', () => {
  console.log('\nScript encerrado usando Ctrl + C');
  // Faça qualquer manipulação adicional necessária aqui
  process.exit(0); // Sai do processo Node.js
});

// Chamar a função
minhaFuncao();

