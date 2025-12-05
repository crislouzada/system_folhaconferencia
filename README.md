# Sistema de Conferência de Folha de Pagamento

Sistema web para análise e comparação de folhas de pagamento a partir de arquivos Excel (XLSX).

## 🚀 Funcionalidades

- **Upload de arquivos XLSX** com dados de folha de pagamento
- **Extração automática** de informações da empresa (nome, CNPJ, período)
- **Detecção inteligente** de funcionários e eventos
- **Consolidação** de duplicatas (quebras de página)
- **Filtros automáticos** (remove empresas LTDA, ME, EPP, etc)
- **Visualização transposta** com eventos em linhas e referências em colunas
- **Comparação** de valores calculados vs informados
- **Interface moderna** com sidebar e tabelas responsivas

## 📋 Requisitos

- Python 3.11+
- Flask 3.1.0
- Pandas 2.3.3
- openpyxl 3.1.5

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/crislouzada/system_folhaconferencia.git
cd system_folhaconferencia
```

2. Crie um ambiente virtual:
```bash
python3 -m venv .venv
source .venv/bin/activate  # No Windows: .venv\Scripts\activate
```

3. Instale as dependências:
```bash
pip install flask pandas openpyxl flask-cors
```

## 🚀 Uso

1. Inicie o servidor:
```bash
python server.py
```

2. Abra o arquivo `index_v2.html` no navegador

3. Faça upload do arquivo XLSX de folha de pagamento

4. Selecione um funcionário na lista lateral

5. Visualize os eventos e compare valores

## 📊 Formato do Arquivo

O sistema espera arquivos XLSX com a seguinte estrutura:

- **Linhas 0-2**: Informações da empresa (Empresa, CNPJ, Competência)
- **Linha 6**: Cabeçalhos das colunas
- **Demais linhas**: Dados de funcionários e eventos

### Colunas detectadas:
- Coluna 0: Código do evento
- Coluna 4: Descrição do evento
- Coluna 17: Referência (período)
- Coluna 20: Valor calculado
- Coluna 23: Valor informado

## 🔍 Recursos Técnicos

### Backend (server.py)
- Conversão precisa de valores brasileiros (4.077,32 → 4077.32)
- Conversão de horas com minutos (220:30 → 220.5)
- Detecção de padrão de funcionário: `NÚMERO - NOME`
- Consolidação por ID de funcionário
- Estruturação transposta para comparação

### Frontend (index_v2.html + app_v2.js)
- Upload via drag-and-drop ou clique
- Cabeçalho com informações da empresa
- Lista lateral de funcionários
- Seleção por clique (sem checkboxes)
- Tabela de eventos com scroll horizontal
- Layout responsivo com CSS Grid

## 📝 Estrutura do Projeto

```
systemFolhaConferencia/
├── server.py          # Backend Flask (processamento XLSX)
├── index_v2.html      # Interface HTML
├── app_v2.js          # Lógica JavaScript
├── README.md          # Este arquivo
├── .gitignore         # Arquivos ignorados
└── .venv/             # Ambiente virtual (não versionado)
```

## 🛠️ Tecnologias

- **Backend**: Python + Flask + Pandas + openpyxl
- **Frontend**: HTML5 + CSS3 Grid + JavaScript ES6+
- **Arquitetura**: Client-server com API REST

## 📄 Licença

MIT

## 👤 Autor

Cristiano Louzada (@crislouzada)

3. **Carregue um arquivo** de relatório de folha:
   - Clique em "Selecionar Arquivo" ou
   - Arraste e solte o arquivo na área de upload

4. **Analise os resultados**:
   - Visualize as informações da empresa
   - Confira o resumo do relatório
   - Analise a tabela comparativa
   - Use os filtros para buscar eventos específicos

### Usando o VS Code (Live Server)

Se você estiver usando o VS Code, pode usar a extensão **Live Server**:

1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito no arquivo `index.html`
3. Selecione "Open with Live Server"
4. O navegador abrirá automaticamente com o sistema

## 📂 Estrutura do Projeto

```
systemFolhaConferencia/
├── index.html              # Estrutura HTML principal
├── styles.css              # Estilos e design system
├── app.js                  # Lógica JavaScript
├── exemplo_movimentos.csv  # Arquivo de exemplo para testes
└── README.md              # Esta documentação
```

## 📋 Formato do Arquivo

### Estrutura Esperada

O arquivo deve conter:

1. **Cabeçalho** (linhas iniciais) com:
   - Nome da empresa
   - CNPJ
   - Data de emissão
   - Hora

2. **Tabela de dados** com as colunas:
   - `Referencia` ou `Competência` (ex: 07/2025)
   - `Codigo` ou `Cód. Evento` (ex: 001)
   - `Evento` ou `Nome do Evento` (ex: Salário)
   - `Valor Calculado`
   - `Valor Informado`

### Exemplo de CSV

```csv
Empresa: EXEMPLO LTDA
CNPJ: 12.345.678/0001-99
Data emissão: 04/12/2025
Hora: 14:30

Referencia,Codigo,Evento,Valor Calculado,Valor Informado
07/2025,001,Salário,15000.00,15000.00
07/2025,002,Horas Extras 50%,2500.50,2500.50
08/2025,001,Salário,15500.00,15500.00
08/2025,002,Horas Extras 50%,3200.00,3100.00
```

## 🎨 Design System

O sistema utiliza um design system completo com:

- **Variáveis CSS** para cores, espaçamentos e tipografia
- **Componentes reutilizáveis** (cards, botões, badges)
- **Layout responsivo** que funciona em desktop e mobile
- **Cores semânticas** para indicar status (positivo/negativo)
- **Animações suaves** para melhor experiência do usuário

### Paleta de Cores

- **Primary**: Azul (#2563eb) - Elementos principais
- **Accent**: Roxo (#7c3aed) - Destaques e ações
- **Positive**: Verde (#16a34a) - Valores positivos
- **Negative**: Vermelho (#dc2626) - Valores negativos

## 🔧 Tecnologias Utilizadas

### Bibliotecas Externas (via CDN)

- **SheetJS (xlsx)** v0.18.5 - Leitura de arquivos Excel
- **PapaParse** v5.4.1 - Parsing de arquivos CSV

### Tecnologias Core

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com variáveis e grid/flexbox
- **JavaScript (ES6+)** - Lógica de processamento

## 📊 Lógica de Processamento

### Fluxo de Dados

1. **Upload**: Arquivo carregado via FileReader API
2. **Parsing**: Detecção automática de formato e parsing
3. **Extração**: Separação de cabeçalho e dados tabulares
4. **Normalização**: Conversão para estrutura intermediária
5. **Agrupamento**: Eventos agrupados por código/nome
6. **Cálculos**: Diferenças calculadas entre referências
7. **Renderização**: Exibição em tabela analítica

### Cálculo de Diferenças

Para cada evento, o sistema:
1. Coleta todos os valores de todas as referências
2. Identifica o valor **máximo**
3. Identifica o valor **mínimo**
4. Calcula: `Diferença = Máximo - Mínimo`
5. Aplica formatação e cores baseadas no resultado

## 🎯 Funcionalidades Avançadas

### Filtros

- **Busca por texto**: Filtra eventos por código ou nome
- **Base de cálculo**: Escolha entre valor calculado ou informado
- **Limpar filtros**: Reset rápido dos filtros aplicados

### Exportação

- Exporta a tabela processada em formato CSV
- Mantém a estrutura e formatação dos dados
- Nome do arquivo inclui timestamp

### Interface

- **Tabela com scroll horizontal**: Para muitas referências
- **Colunas fixas**: Código e nome sempre visíveis
- **Destaque visual**: Valores positivos/negativos coloridos
- **Contador de eventos**: Mostra quantos eventos estão visíveis

## 🐛 Tratamento de Erros

O sistema inclui:
- Validação de tipos de arquivo
- Tratamento de erros de parsing
- Mensagens claras para o usuário
- Logs detalhados no console (para debug)
- Fallbacks para dados ausentes

## 💡 Dicas de Uso

1. **Teste com o arquivo de exemplo**: Use `exemplo_movimentos.csv` para testar
2. **Verifique o console**: Abra o DevTools para ver logs detalhados
3. **Formatos de valores**: Aceita tanto `1234.56` quanto `1.234,56`
4. **Múltiplas referências**: Não há limite de referências que podem ser processadas
5. **Exportação**: Use para salvar análises e compartilhar resultados

## 🔒 Privacidade

- ✅ **100% local**: Todo processamento ocorre no navegador
- ✅ **Sem upload**: Nenhum dado é enviado para servidores
- ✅ **Sem armazenamento**: Dados não são salvos no navegador
- ✅ **Seguro**: Perfeito para dados sensíveis de folha

## 📱 Responsividade

O sistema se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Tabela com scroll horizontal
- **Mobile**: Interface otimizada para telas menores

## 🚀 Performance

- **Processamento rápido**: Milhares de linhas processadas em segundos
- **Memória eficiente**: Uso otimizado de recursos do navegador
- **Renderização inteligente**: Apenas elementos visíveis são processados

## 🛠️ Desenvolvimento

### Estrutura do Código

- **Modular**: Funções separadas por responsabilidade
- **Comentado**: Documentação inline em português
- **ES6+**: Uso de features modernas do JavaScript
- **Padrões**: Seguindo boas práticas de desenvolvimento front-end

### Personalização

Você pode customizar:
- **Cores**: Altere as variáveis CSS em `:root`
- **Layout**: Modifique classes CSS
- **Parsing**: Ajuste funções de extração de dados
- **Cálculos**: Personalize lógica de diferenças

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais e profissionais.

## 👨‍💻 Autor

Desenvolvido como exemplo de aplicação front-end sênior com:
- HTML5 semântico e acessível
- CSS3 com design system profissional
- JavaScript puro com padrões modernos
- Foco em UX e performance

---

**Desenvolvido com ❤️ usando HTML5, CSS3 e JavaScript puro**
