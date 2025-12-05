# 📚 Documentação Completa - Sistema de Conferência de Folha de Pagamento

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Funcionalidades Principais](#funcionalidades-principais)
3. [Guia de Instalação](#guia-de-instalação)
4. [Como Usar - Passo a Passo](#como-usar---passo-a-passo)
5. [Entendendo a Interface](#entendendo-a-interface)
6. [Formato do Arquivo](#formato-do-arquivo)
7. [Perguntas Frequentes (FAQ)](#perguntas-frequentes-faq)
8. [Solução de Problemas](#solução-de-problemas)
9. [Recursos Técnicos](#recursos-técnicos)

---

## 🎯 Visão Geral

O **Sistema de Conferência de Folha de Pagamento** é uma ferramenta web que facilita a análise e comparação de dados de folha de pagamento extraídos de arquivos Excel.

### Para que serve?

- ✅ **Conferir** valores entre diferentes competências (meses)
- ✅ **Identificar** diferenças entre valores calculados e informados
- ✅ **Visualizar** todos os eventos de um funcionário de forma organizada
- ✅ **Comparar** múltiplos períodos lado a lado
- ✅ **Eliminar** duplicidades causadas por quebras de página

### Quem pode usar?

- Profissionais de Recursos Humanos
- Contadores e Assistentes Contábeis
- Gestores de Folha de Pagamento
- Auditores
- Qualquer pessoa que precise analisar folhas de pagamento

---

## 🚀 Funcionalidades Principais

### 1. **Upload Inteligente de Arquivos**
- Suporta arquivos `.xlsx` (Excel moderno)
- Aceita arrastar e soltar (drag & drop)
- Processa automaticamente ao fazer upload

### 2. **Extração Automática de Informações**
O sistema identifica e extrai automaticamente:
- 🏢 **Nome da empresa**
- 📋 **CNPJ**
- 📅 **Período de competência** (ex: 10/2025 até 11/2025)

### 3. **Detecção Inteligente de Funcionários**
- Reconhece o padrão: `NÚMERO - NOME DO FUNCIONÁRIO`
- Exemplo: `7 - ALEX BARBOZA DE MELO`
- **Consolida automaticamente** funcionários duplicados (quebras de página)
- **Filtra automaticamente** nomes de empresas (LTDA, ME, EPP, EIRELI, etc)

### 4. **Processamento de Valores**
Converte automaticamente diferentes formatos:
- **Valores monetários brasileiros**: `4.077,32` → `4077.32`
- **Horas com minutos**: `220:30` → `220.5 horas`
- **Percentuais**: `100,00%` → `100.0`

### 5. **Visualização Transposta**
Tabela otimizada para comparação:
- **Linhas**: Eventos (códigos e descrições)
- **Colunas**: Referências/Competências
- Facilita a comparação entre períodos

### 6. **Interface Moderna e Responsiva**
- Design limpo e profissional
- Sidebar com lista de funcionários
- Área principal para visualização de dados
- Scroll horizontal para muitas colunas

---

## 🔧 Guia de Instalação

### Pré-requisitos

Você precisa ter instalado em seu computador:
- **Python 3.11 ou superior** ([Download aqui](https://www.python.org/downloads/))
- Um navegador moderno (Chrome, Firefox, Safari ou Edge)

### Passo 1: Baixar o Sistema

```bash
# Clone o repositório
git clone https://github.com/crislouzada/system_folhaconferencia.git

# Entre na pasta
cd system_folhaconferencia
```

### Passo 2: Criar Ambiente Virtual

```bash
# Cria o ambiente virtual
python3 -m venv .venv

# Ativa o ambiente virtual
# No macOS/Linux:
source .venv/bin/activate

# No Windows:
.venv\Scripts\activate
```

💡 **Dica**: Você saberá que o ambiente está ativo quando aparecer `(.venv)` no início da linha do terminal.

### Passo 3: Instalar Dependências

```bash
pip install flask pandas openpyxl flask-cors
```

Isso instalará:
- **Flask**: Framework web (servidor)
- **Pandas**: Processamento de dados
- **openpyxl**: Leitura de arquivos Excel
- **flask-cors**: Comunicação entre navegador e servidor

### Passo 4: Verificar Instalação

```bash
python server.py
```

Se tudo estiver correto, você verá:

```
════════════════════════════════════════════════════════════════
🚀 SERVIDOR DE PROCESSAMENTO DE FOLHA DE PAGAMENTO V3.0
════════════════════════════════════════════════════════════════
✓ Reconhecimento inteligente de padrões
✓ Conversão precisa de valores decimais
✓ Estruturação transposta para comparativo
✓ Detecção automática de referências
════════════════════════════════════════════════════════════════
🌐 Servidor: http://localhost:5001
📡 Endpoint: POST /parse-excel
════════════════════════════════════════════════════════════════
```

✅ **Pronto!** O sistema está instalado e funcionando.

---

## 📖 Como Usar - Passo a Passo

### Passo 1: Iniciar o Servidor

1. Abra o terminal/prompt de comando
2. Navegue até a pasta do sistema
3. Ative o ambiente virtual (se ainda não estiver ativo)
4. Execute o comando:

```bash
python server.py
```

⚠️ **Importante**: Mantenha esta janela do terminal aberta enquanto usar o sistema!

### Passo 2: Abrir a Interface

1. Abra seu navegador
2. Navegue até a pasta do sistema
3. Abra o arquivo `index_v2.html`
   - No Mac: Clique com botão direito → Abrir com → Navegador
   - No Windows: Duplo clique no arquivo

### Passo 3: Fazer Upload do Arquivo

Você tem duas opções:

**Opção A - Arrastar e Soltar:**
1. Localize seu arquivo `.xlsx` no explorador de arquivos
2. Arraste-o para a área de upload (onde está escrito "📂 Selecionar Arquivo Excel")
3. Solte o arquivo

**Opção B - Selecionar Arquivo:**
1. Clique no botão "📂 Selecionar Arquivo Excel"
2. Navegue até seu arquivo
3. Clique em "Abrir"

### Passo 4: Visualizar as Informações da Empresa

Após o upload, automaticamente você verá:
- Nome da empresa
- CNPJ
- Período de competência

### Passo 5: Selecionar um Funcionário

1. Na barra lateral esquerda, você verá a lista de funcionários
2. Cada funcionário aparece com: **CÓDIGO - NOME**
3. Clique no nome do funcionário desejado
4. O funcionário selecionado ficará destacado em azul

### Passo 6: Analisar os Dados

Após selecionar um funcionário, você verá uma tabela com:
- **Coluna "Evento"**: Código e descrição do evento
- **Demais colunas**: Uma para cada referência/competência
- Cada célula mostra: `Calculado / Informado`

**Exemplo de leitura:**
```
Evento                          | 10/2025          | 11/2025
1 - HORAS NORMAIS              | 4077.32 / 220.00 | 4077.32 / 220.00
37 - COMISSOES                 | 626.63 / 626.63  | 500.50 / 500.50
```

Isso significa:
- Em **10/2025**, as horas normais tiveram valor calculado de **4077.32** e valor informado de **220.00**
- Em **11/2025**, as comissões foram de **500.50** (calculado e informado iguais)

---

## 🖥️ Entendendo a Interface

### Layout Geral

```
┌─────────────────────────────────────────────────────────┐
│  SISTEMA DE CONFERÊNCIA DE FOLHA                        │
│  ┌──────────────────────────────────────┐               │
│  │ 📂 Selecionar Arquivo Excel          │               │
│  └──────────────────────────────────────┘               │
├─────────────────────────────────────────────────────────┤
│  🏢 Empresa: 8 - EMBOL MAIS LTDA                        │
│  📋 CNPJ: 26.297.716/0001-96                            │
│  📅 Período: 10/2025 até 11/2025                        │
├──────────────┬──────────────────────────────────────────┤
│ FUNCIONÁRIOS │  DETALHES DO FUNCIONÁRIO                 │
│              │                                          │
│ 7 - ALEX     │  [Tabela de eventos]                     │
│              │                                          │
│ 44 - ALINE   │                                          │
│              │                                          │
│ 21 - DÓRA    │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

### Área de Upload

- **Localização**: Topo da página
- **Aparência**: Borda tracejada azul
- **Ações**: 
  - Clique para selecionar arquivo
  - Arraste e solte arquivo
- **Estado**: Muda de cor ao arrastar arquivo sobre ela

### Informações da Empresa

- **Localização**: Logo abaixo da área de upload
- **Conteúdo**: Empresa, CNPJ, Período
- **Visibilidade**: Oculta até que um arquivo seja processado

### Sidebar (Barra Lateral)

- **Localização**: Lado esquerdo
- **Largura**: 400 pixels
- **Conteúdo**: Lista de funcionários
- **Layout**: Código em destaque + Nome
- **Seleção**: Clique para selecionar (fundo azul)

### Área Principal

- **Localização**: Lado direito
- **Conteúdo**: Tabela de eventos do funcionário selecionado
- **Scroll**: Horizontal (se muitas colunas)
- **Formato**: Eventos em linhas, períodos em colunas

---

## 📄 Formato do Arquivo

### Estrutura Esperada

O sistema espera arquivos Excel (`.xlsx`) com a seguinte estrutura:

```
Linha 0: Empresa:    8 - EMBOL MAIS LTDA         Página:   1/5
Linha 1: CNPJ:       26.297.716/0001-96          Emissão:  04/12/2025
Linha 2: Competência: 10/2025  até  11/2025      Horas:    15:59:04
Linha 3: [em branco]
Linha 4: MOVIMENTOS
Linha 5: [em branco]
Linha 6: Código | Nome | ... | Referência | ... | Valor calculado | ... | Valor informado
Linha 7: Empregados
Linha 8: 7 - ALEX BARBOZA DE MELO
Linha 9: 1 | HORAS NORMAIS | ... | 10/2025 | ... | 4.077,32 | ... | 220:00
...
```

### Colunas Importantes

O sistema detecta automaticamente estas colunas:

| Posição | Nome              | Exemplo        | Descrição                    |
|---------|-------------------|----------------|------------------------------|
| 0       | Código            | `1`            | Código do evento             |
| 4       | Descrição         | `HORAS NORMAIS`| Nome do evento               |
| 17      | Referência        | `10/2025`      | Período/Competência          |
| 20      | Valor Calculado   | `4.077,32`     | Valor calculado pelo sistema |
| 23      | Valor Informado   | `220:00`       | Valor informado/real         |

### Exemplos de Valores Aceitos

**Valores Monetários:**
- `4.077,32` → Convertido para 4077.32
- `1.655,85` → Convertido para 1655.85
- `626,63` → Convertido para 626.63

**Horas (com minutos):**
- `220:00` → 220.0 horas
- `220:30` → 220.5 horas (30 minutos = 0.5 hora)
- `36:40` → 36.67 horas (40 minutos ≈ 0.67 hora)

**Percentuais:**
- `100,00%` → 100.0
- `50%` → 50.0

---

## ❓ Perguntas Frequentes (FAQ)

### 1. O sistema funciona offline?

**Não completamente.** Você precisa:
- ✅ Ter Python instalado
- ✅ Executar o servidor local (`python server.py`)
- ✅ Mas não precisa de internet para processar os arquivos

### 2. Posso processar vários arquivos ao mesmo tempo?

**Não.** O sistema processa um arquivo por vez. Para analisar outro arquivo:
1. Faça um novo upload
2. Os dados anteriores serão substituídos

### 3. Os dados ficam salvos no sistema?

**Não.** O sistema não salva nenhum dado:
- Os arquivos são processados na memória
- Quando você fecha o navegador, tudo é perdido
- Isso garante a privacidade dos seus dados

### 4. Por que alguns funcionários não aparecem na lista?

O sistema filtra automaticamente:
- ❌ Nomes que contêm: LTDA, ME, EPP, EIRELI, S.A, S/A, CIA
- ❌ Linhas que não seguem o padrão `NÚMERO - NOME`

**Motivo:** Evitar que nomes de empresas apareçam como funcionários.

### 5. O que significa "funcionário duplicado detectado"?

Quando a planilha tem quebra de página, o mesmo funcionário pode aparecer várias vezes. O sistema:
- 🔍 Detecta duplicatas pelo código (número)
- 🔄 Consolida todos os eventos daquele funcionário
- ✅ Mostra apenas uma vez na lista

### 6. Por que vejo valores diferentes (calculado vs informado)?

É normal! O sistema mostra **ambos** os valores:
- **Calculado**: Valor que o sistema de folha calculou
- **Informado**: Valor real que foi usado/pago

Isso permite:
- ✅ Identificar diferenças
- ✅ Conferir cálculos
- ✅ Detectar ajustes manuais

### 7. Posso exportar os dados processados?

**Atualmente não.** Esta funcionalidade está planejada para versões futuras. Por enquanto, você pode:
- 📸 Fazer screenshots
- 📋 Copiar manualmente os dados
- 🖨️ Imprimir a página (Ctrl+P / Cmd+P)

### 8. O sistema funciona com arquivos `.xls` (Excel antigo)?

**Não.** Apenas arquivos `.xlsx` (Excel 2007 ou superior). Para converter:
1. Abra o arquivo `.xls` no Excel
2. Clique em "Salvar Como"
3. Escolha formato "Excel Workbook (.xlsx)"

### 9. Posso usar em tablets ou celulares?

**Tecnicamente sim**, mas não é recomendado:
- 📱 A tabela é grande e difícil de visualizar em telas pequenas
- 🖥️ É melhor usar em computadores/notebooks
- ⚠️ Você ainda precisaria rodar o servidor Python

### 10. Como faço backup dos dados processados?

Como o sistema não salva dados, a melhor opção é:
- 💾 Manter os arquivos Excel originais em local seguro
- 📂 Organizar por data/período
- ☁️ Usar serviços de nuvem (Google Drive, Dropbox, etc)

---

## 🔧 Solução de Problemas

### Problema: "Servidor não está rodando"

**Sintomas:**
- Upload não funciona
- Aparece erro no console do navegador
- Nada acontece ao selecionar arquivo

**Solução:**
1. Verifique se o terminal com o servidor está aberto
2. Procure a mensagem: `🌐 Servidor: http://localhost:5001`
3. Se não estiver rodando, execute: `python server.py`
4. Recarregue a página no navegador (F5)

---

### Problema: "Erro ao processar arquivo"

**Sintomas:**
- Mensagem de erro após upload
- Dados não aparecem

**Soluções:**

**A) Verificar formato do arquivo:**
- ✅ Deve ser `.xlsx`
- ❌ Não pode ser `.xls`, `.csv`, `.txt`

**B) Verificar estrutura da planilha:**
- A primeira linha deve ter "Empresa:"
- A segunda linha deve ter "CNPJ:"
- A terceira linha deve ter "Competência:"

**C) Verificar se há dados:**
- A planilha não pode estar vazia
- Deve haver pelo menos um funcionário

---

### Problema: "Nenhum funcionário aparece"

**Sintomas:**
- Upload funciona
- Informações da empresa aparecem
- Lista de funcionários está vazia

**Causas e Soluções:**

**Causa 1: Formato incorreto dos nomes**
- ❌ Errado: `ALEX BARBOZA` (sem número)
- ❌ Errado: `7 ALEX BARBOZA` (sem hífen)
- ✅ Correto: `7 - ALEX BARBOZA`

**Causa 2: Todos são empresas**
- Verifique se os nomes contêm: LTDA, ME, EPP, EIRELI
- Estes são filtrados automaticamente

**Causa 3: Dados em posição errada**
- Os nomes devem estar na coluna correta
- Verifique se o arquivo segue o formato esperado

---

### Problema: "Valores aparecem estranhos"

**Sintomas:**
- Números muito grandes
- Valores com muitas casas decimais
- Horas convertidas incorretamente

**Soluções:**

**A) Valores monetários:**
- Verifique se usam vírgula como decimal: `4.077,32`
- Ponto é separador de milhar
- Vírgula é separador decimal

**B) Horas:**
- Use formato `HH:MM` (ex: `220:30`)
- Não use formato de célula "Hora" do Excel
- Use "Texto" ou "Geral"

**C) Percentuais:**
- Use formato `XX,XX%` (ex: `100,00%`)
- Ou simplesmente `100`

---

### Problema: "Funcionários duplicados"

**Sintomas:**
- Mesmo funcionário aparece várias vezes
- Dados aparecem repetidos

**Isso é normal!** 

O sistema **já consolida automaticamente**. Se você está vendo duplicatas:
1. Verifique se os códigos são realmente iguais
2. Funcionários com códigos diferentes (ex: `7` e `07`) são tratados como diferentes
3. Nomes diferentes mas código igual → Sistema consolida

---

### Problema: "Página lenta ou trava"

**Sintomas:**
- Demora muito para processar
- Navegador fica lento
- Tabela não carrega

**Causas e Soluções:**

**Causa 1: Arquivo muito grande**
- Arquivos com mais de 1000 funcionários podem ser lentos
- Considere dividir em arquivos menores

**Causa 2: Muitas referências**
- Muitos períodos/competências geram muitas colunas
- Isso é normal, aguarde o processamento

**Causa 3: Navegador sobrecarregado**
- Feche outras abas
- Reinicie o navegador
- Use Chrome para melhor performance

---

### Problema: "Não consigo instalar as dependências"

**Sintomas:**
- Erro ao executar `pip install`
- Mensagem de permissão negada

**Soluções:**

**A) Ambiente virtual não ativado:**
```bash
# Ative novamente
source .venv/bin/activate  # Mac/Linux
.venv\Scripts\activate     # Windows
```

**B) Permissões:**
```bash
# Tente com --user
pip install --user flask pandas openpyxl flask-cors
```

**C) Python desatualizado:**
```bash
# Verifique a versão
python --version

# Deve ser 3.11 ou superior
# Se não for, atualize o Python
```

**D) pip desatualizado:**
```bash
# Atualize o pip
python -m pip install --upgrade pip
```

---

## 🔬 Recursos Técnicos

### Arquitetura do Sistema

```
┌─────────────┐         ┌──────────────┐
│  Navegador  │ ◄─────► │   Servidor   │
│  (Frontend) │  HTTP   │   (Backend)  │
└─────────────┘         └──────────────┘
      │                        │
      │                        │
   HTML/CSS/JS              Python
   index_v2.html            server.py
   app_v2.js                Flask
                            Pandas
                            openpyxl
```

### Fluxo de Processamento

```
1. Usuário faz upload do arquivo
           ↓
2. Navegador envia para servidor (POST /parse-excel)
           ↓
3. Servidor lê arquivo Excel com openpyxl
           ↓
4. Pandas processa dados
           ↓
5. Sistema detecta funcionários e eventos
           ↓
6. Valores são convertidos (BR → decimal)
           ↓
7. Duplicatas são consolidadas
           ↓
8. Empresas são filtradas
           ↓
9. Dados são estruturados em formato JSON
           ↓
10. Servidor retorna JSON para navegador
           ↓
11. JavaScript renderiza interface
           ↓
12. Usuário visualiza dados
```

### Tecnologias Utilizadas

**Backend:**
- **Python 3.11**: Linguagem de programação
- **Flask 3.1.0**: Framework web (servidor HTTP)
- **Pandas 2.3.3**: Manipulação de dados tabulares
- **openpyxl 3.1.5**: Leitura de arquivos Excel

**Frontend:**
- **HTML5**: Estrutura da página
- **CSS3 Grid**: Layout responsivo
- **JavaScript ES6+**: Lógica e interatividade
- **Fetch API**: Comunicação com servidor

**Padrões:**
- **REST API**: Arquitetura de comunicação
- **JSON**: Formato de troca de dados
- **CORS**: Compartilhamento de recursos

### Estrutura de Arquivos

```
system_folhaconferencia/
│
├── server.py              # Servidor Flask + lógica de processamento
│   ├── parse_decimal_value()      # Converte valores brasileiros
│   ├── structure_payroll_data()   # Estrutura dados da folha
│   ├── detect_column_indices()    # Detecta colunas
│   └── convert_to_transposed()    # Cria estrutura transposta
│
├── index_v2.html          # Interface HTML
│   ├── <head>                     # Metadados e estilos
│   ├── <style>                    # CSS embutido
│   └── <body>                     # Estrutura da página
│
├── app_v2.js              # Lógica JavaScript
│   ├── handleFileSelect()         # Upload de arquivo
│   ├── uploadFile()               # Envia para servidor
│   ├── updateCompanyInfo()        # Atualiza cabeçalho
│   ├── renderEmployeeList()       # Renderiza funcionários
│   ├── selectEmployee()           # Seleciona funcionário
│   └── renderEmployeeDetails()    # Renderiza tabela
│
├── README.md              # Documentação básica
├── DOCUMENTACAO.md        # Este arquivo
├── .gitignore             # Arquivos ignorados pelo Git
└── .venv/                 # Ambiente virtual (não versionado)
```

### API Endpoints

**POST /parse-excel**
- **Descrição**: Processa arquivo Excel
- **Entrada**: Arquivo multipart/form-data
- **Saída**: JSON com dados estruturados
- **Exemplo de resposta**:
```json
{
  "structured": {
    "employees": [...],
    "allReferences": ["10/2025", "11/2025"],
    "companyInfo": {
      "empresa": "8 - EMBOL MAIS LTDA",
      "cnpj": "26.297.716/0001-96",
      "periodo": "10/2025 até 11/2025"
    }
  },
  "transposed": {...},
  "summary": {...}
}
```

**GET /health**
- **Descrição**: Verifica status do servidor
- **Saída**: `{"status": "ok"}`

### Performance

**Arquivos Testados:**
- ✅ 350 linhas: ~2 segundos
- ✅ 22 funcionários: ~2 segundos
- ✅ 266 eventos: ~2 segundos
- ✅ 2 referências: ~2 segundos

**Limites Recomendados:**
- Máximo 100 funcionários
- Máximo 12 referências (1 ano)
- Máximo 2000 linhas

### Segurança

**O sistema NÃO:**
- ❌ Salva arquivos no servidor
- ❌ Armazena dados em banco de dados
- ❌ Envia dados para internet
- ❌ Faz backup automático

**O sistema É:**
- ✅ Local (roda em sua máquina)
- ✅ Temporário (dados só na memória)
- ✅ Privado (ninguém mais acessa)

---

## 📞 Suporte

### Encontrou um bug?

1. Anote o que você estava fazendo
2. Tire um screenshot do erro
3. Verifique o console do navegador (F12 → Console)
4. Abra uma issue no GitHub

### Sugestões de melhorias?

Entre em contato através do GitHub:
- **Repositório**: https://github.com/crislouzada/system_folhaconferencia
- **Issues**: https://github.com/crislouzada/system_folhaconferencia/issues

---

## 📝 Notas de Versão

### v3.0 - Dezembro 2025
- ✅ Sistema completo funcional
- ✅ Backend Flask
- ✅ Interface moderna
- ✅ Consolidação de duplicatas
- ✅ Filtro de empresas
- ✅ Visualização transposta

---

**Desenvolvido com ❤️ por Cristiano Louzada**

*Última atualização: Dezembro de 2025*
