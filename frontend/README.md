# Frontend

Esse projeto foi geraldo com o [Angular CLI](https://github.com/angular/angular-cli) versão 11.1.2.

## Servidor de desenvolvimento

Execute `ng serve` para ligar o servidor e acesse: `http://localhost:4200/`. O app será ser atualizado automaticamente quando houverem alterações no código.

## Build

Execute `ng build` com a flag `--prod` para fazer o build do projeto, que será armazenado no diretório `/dist`.

## Rodando testes unitários

Rode `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

## Layout

O protótipo do projeto se encontra no [Figma](https://www.figma.com/file/Yt622NMSOTarvisaYTgX15/Floricultura-Divino-Charme).

## Checklist de funcionalidades

- [ ] o site deve funcionar na Web, Android e IOS.

- __Páginas públicas__

  ---
  - __Componentes__
    - __Navbar__
    - [x] navbar.
    - [x] footer
    - [ ] breadcrumbs.
    - [x] botão scroll-top.
  
  ---
  - __Página Home__
  - [x] deve ter navbar, footer e scroll-top button.
  - [x] deve ser responsivo.
  - [x] banner inicial.
  - [x] sessão de benefícios.
  - [x] categorias de produtos da loja.
  - [x] produtos em destaque.
  - [x] galeria de fotos.
  - [x] devem ter plantas de decoração.
  
  ---
  - __Página de Produtos__
    
    - __Componentes__
    - [x] card do produto.
    - [x] barra de filtros e pesquisa.
    - [ ] controles de paginação.

    - __Listagem de produtos__
    - [ ] deve ter navbar, footer, breadcrumb e scroll-top button.
    - [x] deve ser responsivo.
    - [x] deve receber e listar os produtos.
    - [ ] os produtos devem ser listados por paginação.

    - __Visualização do produto__
    - [ ] deve ter navbar, footer, breadcrumb e scroll-top button.
    - [ ] deve ser responsivo.
    - [ ] deve mostrar todas as informações do produto.
    - [ ] deve ter um botão de compra.
    - [ ] deve mostrar produtos relacionados.
  
  ---
  - __Página sobre__
  - [ ] deve ser responsivo.
  - [ ] deve ter navbar, footer e breadcrumb.
  
  ---
  - __Página de galeria de fotos__
  - [ ] deve ser responsivo.
  - [ ] deve ter navbar, footer, breadcrumb e scroll-top button.
  - [ ] deve listar as fotos da galeria via infinite-scroll.
  - [ ] deve ter a modal para visuação da foto em tela cheia.

  - __Página de contato__
  - [ ] deve ter navbar, footer, breadcrumb e scroll-top button.
  - [ ] deve ter o formulário de contato.
  - [ ] deve ter as informações de contato e links para redes sociais.
  - [ ] deve ter os mapas (e link para google maps) com as localizações das lojas.

---
- __Painel admnistrador__
- [ ] deve ser acessado somente por usuários autenticados (administradores do site).
  
  ---
  - __Componentes__
  - [x] navbar admin.
  - [ ] footer admin.

  ---
  - __Autenticação__
  - [ ] deve ser responsivo.
  - [x] deve ter um formulário de login.
  - [ ] deve ter um formulário para recuperar senha.

  ---
  - __Catálogo__

    - __Componentes__
    - [x] card de produto.
    - [ ] card de categoria e subcategoria.
    - [ ] navbar de navegação na página de catálogo.
    - [ ] controles de paginação.

  - __Listagem de produtos__
  - [ ] deve ser responsivo.
  - [ ] deve ter paginação.
  - [ ] deve ter controles para filtragem de produtos

  ...


