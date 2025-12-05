# 🆘 Ajuda Rápida - Sistema de Conferência de Folha

## ⚡ Início Rápido (3 Passos)

### 1️⃣ Iniciar Servidor
```bash
python server.py
```
✅ Aguarde mensagem: `🌐 Servidor: http://localhost:5001`

### 2️⃣ Abrir Interface
- Abra o arquivo `index_v2.html` no navegador

### 3️⃣ Fazer Upload
- Arraste seu arquivo `.xlsx` para a área de upload
- OU clique em "📂 Selecionar Arquivo Excel"

**Pronto!** 🎉

---

## 📱 Interface - Guia Visual

```
╔═══════════════════════════════════════════════════════════╗
║  📂 ÁREA DE UPLOAD (clique ou arraste arquivo aqui)       ║
╠═══════════════════════════════════════════════════════════╣
║  🏢 Empresa: [nome]  📋 CNPJ: [cnpj]  📅 Período: [data] ║
╠════════════════╦══════════════════════════════════════════╣
║  FUNCIONÁRIOS  ║  DADOS DO FUNCIONÁRIO SELECIONADO        ║
║                ║                                          ║
║  7 - ALEX      ║  Tabela com eventos e valores           ║
║  44 - ALINE    ║  por competência                        ║
║  21 - DÓRA     ║                                          ║
║                ║  [Scroll horizontal →]                   ║
╚════════════════╩══════════════════════════════════════════╝
```

---

## 🎯 Como Fazer...

### ✅ Selecionar um Funcionário
1. Olhe a lista à esquerda
2. Clique no nome desejado
3. O funcionário ficará com fundo azul
4. Os dados aparecerão à direita

### ✅ Ver Dados de Outro Funcionário
- Basta clicar em outro nome na lista

### ✅ Processar Outro Arquivo
- Faça upload de novo arquivo
- Os dados anteriores serão substituídos

### ✅ Ver Todas as Colunas
- Role horizontalmente (mouse ou trackpad)
- Use as setas ← → do teclado

### ✅ Copiar Dados
- Selecione com o mouse
- Ctrl+C / Cmd+C
- Cole onde quiser

---

## ⚠️ Problemas Comuns

### ❌ "Nada acontece ao fazer upload"

**SOLUÇÃO:**
1. Verifique se o servidor está rodando
2. Procure no terminal: `🌐 Servidor: http://localhost:5001`
3. Se não estiver, execute: `python server.py`
4. Recarregue a página (F5)

---

### ❌ "Lista de funcionários vazia"

**CAUSAS:**

**1. Formato incorreto:**
- ❌ Errado: `ALEX BARBOZA`
- ✅ Certo: `7 - ALEX BARBOZA`

**2. Todos são empresas:**
- Sistema remove nomes com: LTDA, ME, EPP
- Isso é intencional!

**3. Arquivo com estrutura diferente:**
- Use arquivo seguindo o formato padrão

---

### ❌ "Valores estranhos / incorretos"

**VERIFIQUE:**

**Valores monetários:**
- Use: `4.077,32` (ponto = milhar, vírgula = decimal)

**Horas:**
- Use: `220:30` (formato HH:MM)
- Não use formato "Hora" do Excel

**Percentuais:**
- Use: `100,00%` ou simplesmente `100`

---

### ❌ "Erro ao instalar dependências"

**SOLUÇÃO:**
```bash
# 1. Ative o ambiente virtual
source .venv/bin/activate  # Mac/Linux
.venv\Scripts\activate     # Windows

# 2. Atualize o pip
python -m pip install --upgrade pip

# 3. Instale novamente
pip install flask pandas openpyxl flask-cors
```

---

## 💡 Dicas Úteis

### 📊 Lendo a Tabela

```
Evento                    | 10/2025          | 11/2025
1 - HORAS NORMAIS        | 4077.32 / 220.00 | 4100.00 / 220.00
                                ↑        ↑
                          Calculado  Informado
```

- **Primeiro valor** (antes da barra): Calculado pelo sistema
- **Segundo valor** (depois da barra): Informado/Real

---

### 🔍 Identificando Diferenças

**Valores iguais** → Tudo certo ✅
```
626.63 / 626.63
```

**Valores diferentes** → Verificar! ⚠️
```
92.83 / 4.00
```
Pode indicar:
- Ajuste manual
- Erro de cálculo
- Situação especial

---

### 🚀 Melhorando Performance

**Se estiver lento:**
- ✂️ Divida arquivos muito grandes
- 🔄 Feche outras abas do navegador
- 💻 Use Google Chrome
- 🧹 Limpe cache do navegador

---

## 🎓 Termos Importantes

| Termo | Significado |
|-------|-------------|
| **Competência** | Período/mês da folha (ex: 10/2025) |
| **Referência** | Mesmo que competência |
| **Evento** | Cada tipo de lançamento (salário, hora extra, etc) |
| **Calculado** | Valor que o sistema calculou |
| **Informado** | Valor real usado/pago |
| **Transposto** | Visualização com linhas e colunas invertidas |
| **Consolidar** | Juntar dados duplicados |

---

## 📋 Checklist Antes de Usar

Antes de processar seu arquivo, verifique:

- [ ] Python 3.11+ instalado
- [ ] Dependências instaladas (Flask, Pandas, etc)
- [ ] Servidor rodando (`python server.py`)
- [ ] Arquivo no formato `.xlsx`
- [ ] Arquivo segue estrutura esperada
- [ ] Funcionários no formato `NÚMERO - NOME`
- [ ] Navegador moderno (Chrome recomendado)

---

## 🔗 Links Úteis

- **📚 Documentação Completa**: Veja `DOCUMENTACAO.md`
- **💻 Repositório GitHub**: https://github.com/crislouzada/system_folhaconferencia
- **🐛 Reportar Bug**: https://github.com/crislouzada/system_folhaconferencia/issues

---

## 📞 Precisa de Mais Ajuda?

### Documentação Detalhada
Leia o arquivo `DOCUMENTACAO.md` para:
- Explicações detalhadas de cada funcionalidade
- Perguntas frequentes (FAQ) extenso
- Soluções de problemas avançadas
- Detalhes técnicos do sistema

### Suporte GitHub
- Abra uma **Issue** descrevendo seu problema
- Inclua screenshots se possível
- Descreva o que você estava fazendo

---

**🚀 Dica Final**: Mantenha seus arquivos Excel originais sempre salvos em local seguro. O sistema não faz backup automático!

---

*Ajuda rápida criada em Dezembro/2025*
