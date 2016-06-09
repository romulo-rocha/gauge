# Teste de Desenvolvimento para Gauge

A representa��o gr�fica inicia-se com uma tabela, inicialmente composta por todos os usu�rios pelo maior n�mero de itera��es (de todas as marcas) ao menor. � poss�vel filtrar os dados que aparecem na tabela e a quantidade total de itera��es de acordo com a marca selecionada em 'Filter brands'. Ao clicar em um usu�rio, um lightbox abrir-se-� com algumas informa��es adicionais sobre o respectivo usu�rio e um gr�fico ilustrativo com uma an�lise de detalhes das itera��es.

### Version
1.0.0

### Tecnologias

Algumas tecnologias usadas:

* [AngularJS] - Para modularizar e organizar o c�digo
* [Twitter Bootstrap] - Para o design visual
* [Gulp] - Cria��o de workflow para front-end
* [jQuery] - Duh

### Instala��o

� necess�rio rodar a pasta 'dev' em um servidor local devido a uma requisi��o HttpRequest dos arquivos JSON da aplica��o.
Os arquivos CSS e Javascript inseridos na p�gina foram minificados. Basta acessar a pasta 'dev/assets/**' e voc� poder� visualizar os arquivos n�o minificados - eles est�o nomeados sem ".min".

- A pasta DEV/ASSETS/APP serve para armazenar os arquivos da aplica��o (m�dulo AngularJS);
- A pasta CSS cont�m apenas arquivos minificados. Para visualizar o c�digo fonte do CSS, entre na pasta DEV/ASSETS/SCSS. O arquivo com o CSS principal da p�gina est� em 'layout/_main.scss'.