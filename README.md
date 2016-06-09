# Teste de Desenvolvimento para Gauge

A representação gráfica inicia-se com uma tabela, inicialmente composta por todos os usuários pelo maior número de iterações (de todas as marcas) ao menor. É possível filtrar os dados que aparecem na tabela e a quantidade total de iterações de acordo com a marca selecionada em 'Filter brands'. Ao clicar em um usuário, um lightbox abrir-se-á com algumas informações adicionais sobre o respectivo usuário e um gráfico ilustrativo com uma análise de detalhes das iterações.

### Version
1.0.0

### Tecnologias

Algumas tecnologias usadas:

* [AngularJS] - Para modularizar e organizar o código
* [Twitter Bootstrap] - Para o design visual
* [Gulp] - Criação de workflow para front-end
* [jQuery] - Duh

### Instalação

É necessário rodar a pasta 'dev' em um servidor local devido a uma requisição HttpRequest dos arquivos JSON da aplicação.
Os arquivos CSS e Javascript inseridos na página foram minificados. Basta acessar a pasta 'dev/assets/**' e você poderá visualizar os arquivos não minificados - eles estão nomeados sem ".min".

- A pasta DEV/ASSETS/APP serve para armazenar os arquivos da aplicação (módulo AngularJS);
- A pasta CSS contém apenas arquivos minificados. Para visualizar o código fonte do CSS, entre na pasta DEV/ASSETS/SCSS. O arquivo com o CSS principal da página está em 'layout/_main.scss'.