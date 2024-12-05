const dgram = require('dgram');
const readline = require('readline');
const os = require('os');
const axios = require('axios');

const PORT = 7777; // Porta do servidor UDP
const RETRY_INTERVAL = 3000; // Intervalo de tempo entre as tentativas (em milissegundos)
const SERVER_UP_DURATION = 10000; // Tempo que o servidor ficará ligado após ter sido criado com sucesso (em milissegundos)

// Defina a URL da API do Xano e sua chave de API
const xanoUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:o0Wi0NQ7/servers';

let server = null;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Nome da interface de rede desejada
const interfaceName = 'tun0';

// Obtém a lista de interfaces de rede
const interfaces = os.networkInterfaces();

function startServer() {
  // Criando um novo socket UDP
  server = dgram.createSocket('udp4');

  // Evento 'error' é disparado quando há um erro
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error('Erro: Porta já em uso. Tentando novamente em alguns minutos...');
      
      setTimeout(startServer, RETRY_INTERVAL);
    } else {
      console.error(`Erro no servidor: ${err.stack}`);
    }
  });

  // Evento 'message' é disparado quando dados são recebidos
  server.on('message', (msg, rinfo) => {
    console.log(`Mensagem recebida do cliente: ${msg} de ${rinfo.address}:${rinfo.port}`);
  });

  // Evento 'listening' é disparado quando o servidor começa a escutar
  server.on('listening', () => {
    const address = server.address();
    console.log(`Servidor UDP está escutando em ${address.address}:${address.port}`);

    // Definindo temporizador para desligar o servidor após um tempo
    setTimeout(() => {
      console.log('Desligando o servidor...');
      server.close();
      //startServer();
    }, SERVER_UP_DURATION);
  });

  // Ligando o servidor ao endereço e porta especificados
  server.bind(PORT); // Porta pode ser qualquer número válido
}

// Inicia o servidor
rl.question('Você entrou no seu mapa do lac? (escreva sim ou nao) ', (answer) => {
  if(answer === "sim"){
    rl.question('Qual sera o nome do servidor? ', (answer) => {
    startServer();
    rl.close();
  
  });
  if(answer === "nao"){
    rl.close();
  } else{
    rl.close();
  }
});
