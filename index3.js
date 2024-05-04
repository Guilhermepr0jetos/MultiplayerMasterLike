const dgram = require('dgram');
const readline = require('readline');
const os = require('os');
const axios = require('axios');

const PORT = 7777; // Porta do servidor UDP
const RETRY_INTERVAL = 3000; // Intervalo de tempo entre as tentativas (em milissegundos)
const SERVER_UP_DURATION = 10000; // Tempo que o servidor ficará ligado após ter sido criado com sucesso (em milissegundos)

// Defina a URL da API do Xano e sua chave de API
const xanoUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:o0Wi0NQ7/servers';

let nomeDoServer
let idDoServer

let xanoPutUrl

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
      const dadosParaAtualizar = {
       online: 'online',
       // Adicione mais campos conforme necessário
    };

    axios.put(xanoPutUrl, dadosParaAtualizar)
  .then((response) => {
    console.log('Resposta da API:', response.data);
  })
  .catch((error) => {
    console.error('Erro ao enviar solicitação PUT:', error);
  });

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
    //xanoPutUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:o0Wi0NQ7/servers/'+idDoServer
    const dadosParaAtualizar = {
       online: 'offline',
       // Adicione mais campos conforme necessário
    };

    axios.put(xanoPutUrl, dadosParaAtualizar)
  .then((response) => {
    console.log('Resposta da API:', response.data);
  })
  .catch((error) => {
    console.error('Erro ao enviar solicitação PUT:', error);
  });

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
    rl.question('Qual é o nome do servidor do VPN.lat onde você se conectou? ', (answer3) => {
    rl.question('Qual sera o nome do servidor? ', (answer2) => {
    // Verifica se a interface desejada existe
if (interfaces.hasOwnProperty(interfaceName)) {
  const addresses = interfaces[interfaceName];
  // Itera sobre os endereços da interface específica
  addresses.forEach((address) => {
    // Verifica se é um endereço IPv4 e não é interno
    if (address.family === 'IPv4' && !address.internal) {
      // Dados que você deseja enviar para o banco de dados
      const dadosParaEnviar = {
	nome: answer2,
	ip: address.address,
	VPN_latIDNAME: answer3,
      };
      axios.post(xanoUrl, dadosParaEnviar)
  .then((response) => {
    console.log('Resposta da API:', response.data);
    idDoServer = response.data.id
    xanoPutUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:o0Wi0NQ7/servers/'+idDoServer
    startServer();
    console.log(idDoServer)
  })
  .catch((error) => {
    console.error('Erro ao enviar dados para a API:', error);
  });
      console.log(`Endereço IPv4 da interface ${interfaceName}: ${address.address}`);
    }
  });
} else {
  console.log(`A interface ${interfaceName} não foi encontrada.`);
}
    nomeDoServer = answer2
    rl.close();
    });
    });
    //rl.close();
  } else if(answer !== "nao"){
    rl.close();
  }
  if(answer === "nao"){
    console.log("Verifique se você esta com o lac ativo no mapa especifico")
    rl.close();
  } else if(answer !== "sim"){
    rl.close();
  }
});
