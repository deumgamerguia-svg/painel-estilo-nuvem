# Painel 1 · Bella Lash

Página responsiva baseada na imagem fornecida: capa de cílios, logo circular, fundo rosa, três cartões de serviços e navegação inferior translúcida. O desenho do aparelho e os ícones de status do celular não fazem parte da página.

## Executar

`npm install` e `npm run dev`. Para gerar produção: `npm run build`.

Também pode ser servida como página estática, sem instalar dependências, preservando as rotas `/bella-lash/` para os arquivos de `public/bella-lash/`.

## Copiar para o Agenda Agora

- `index.html`: estrutura da página.
- `src/style.css`: aparência e responsividade.
- `src/panel.js`: serviços, navegação e demonstração de agendamento.
- `public/bella-lash/`: imagens recortadas da referência fornecida.

Copie as imagens para a pasta pública do seu projeto. Adapte a estrutura HTML ao componente do framework usado pelo SaaS e importe o CSS. Em `src/panel.js`, substitua o array `services` pelos dados do estabelecimento e as operações `localStorage` pela API da agenda existente. Cada serviço deve fornecer `durationMinutes` (duração em minutos). O renderizador compartilhado sempre mostra esse campo abaixo do preço em todos os cartões do catálogo.

## Comportamento atual

Os botões Agendar abrem nome, data e horário. A aba Meus agendamentos lista e permite cancelar os horários salvos neste navegador. É uma demonstração local: não há login, backend, disponibilidade real, sincronização, cobrança nem confirmação pelo estabelecimento. A barra inferior tem cantos arredondados nos quatro lados e apenas Início e Meus agendamentos.

As fotos foram extraídas do print; para maior resolução, substitua pelos arquivos originais mantendo as mesmas proporções.

## Duração dos serviços

Valores de exemplo, ajustáveis no array `services`: extensão 120 min, manutenção 60 min e remoção 30 min. Substitua pelos tempos reais do estabelecimento ao integrar.
