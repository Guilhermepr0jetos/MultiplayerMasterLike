Este é um mapeador de portas de servidores baseado num método que eu desenvolvi (eu acho que fui o primeiro a ter essa ideia)

Baixe o app do site do Github em um ambiente Linux e execute esses passos:

1 - cd MultiplayerMasterLike

2 - node index3.js

3 - Você receberá o prompt: Você entrou no seu mapa do lac? Como o script está focado por enquanto no jogo Los Angeles Crimes online, ele faz a pergunta desse jeito, mas na verdade ele tá perguntando se você já iniciou o servidor do seu jogo

4 - Por enquanto estamos usando os servidores do app Android VPN.lat, e para quem está em outras plataformas procurem VPNs que aceitem compartilhamento de servidores por clientes conectados a VPN.

5 - O nome do servidor pode ser qualquer um, mas use um que seja fácil de identificar pro seu amigo

Após preencher as informações pedidas pelo nodejs, seu IP da interface da VPN será compartilhado na lista, é um IP local fornecido pela VPN. Você vai ficar "onço p na lista enquanto não fechar o servidor do jogo compartilhado, ou, fechar o processo do nodejs usando ctrl+c no ambiente Linux.

SOBRE ERROS DO PROGRAMA:

Ainda está em testes, mas se você seguiu os passos que estão aqui, e você está numa VPN que permite o compartilhamento servidores entre os clientes conectados e se o servidor que você está compartilhando for UDP provavelmente seu servidor vai estar na lista global

Se você fechar o ambiente Linux de sua preferência vai notar que o servidor ainda está online, isso acontece porque não achei uma maneira melhor de checar esses fechamentos se não escrever um arquivo de texto que registra se você ligou o servidor na última sessão e fechou o ambiente Linux, não encerrando o servidor na lista de servidores. Esse arquivo de texto é checado na próxima vez que você inicia o aplicativo.

ONDE VEJO OS SERVIDORES DOS MEUS AMIGOS:

aqui: www.serverlist.gameserv.xyz
