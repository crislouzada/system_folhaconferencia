/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SISTEMA DE CONFERÊNCIA DE FOLHA V2.0
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Funcionalidades:
 * - Upload de arquivos (CSV, TXT, XLSX, XLS) via Python backend
 * - Lista de funcionários com checkboxes
 * - Visualização de eventos por funcionário e referência
 * - Interface moderna e responsiva
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// ESTADO GLOBAL DA APLICAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

const AppState = {
    rawData: null,              // Dados brutos do arquivo
    parsedData: null,           // Dados parseados
    funcionarios: [],           // Lista de funcionários
    selectedEmployee: null,     // Funcionário selecionado
    selectedEmployees: new Set() // IDs dos funcionários selecionados (checkboxes)
};

// ═══════════════════════════════════════════════════════════════════════════
// INICIALIZAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

const API_BASE_URL = window.location.origin;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sistema de Conferência de Folha V2.0 inicializado');
    
    setupEventListeners();
    checkPythonServer();
});

/**
 * Configura todos os event listeners
 */
function setupEventListeners() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    // Click no upload area
    uploadArea.addEventListener('click', () => fileInput.click());
    
    // Drag & drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
}

/**
 * Verifica se o servidor Python está rodando
 */
async function checkPythonServer() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            console.log('✅ Servidor Python está rodando');
        }
    } catch (e) {
        console.warn('⚠️ Servidor Python não detectado. Verifique o container Docker.');
    }
}

/**
 * Atualiza as informações da empresa no cabeçalho
 */
function updateCompanyInfo(companyInfo) {
    const section = document.getElementById('companyInfoSection');
    
    if (!companyInfo || Object.keys(companyInfo).length === 0) {
        section.classList.add('hidden');
        return;
    }
    
    // Atualizar nome da empresa
    if (companyInfo.name) {
        const nameDiv = document.querySelector('#companyName div');
        nameDiv.textContent = companyInfo.name;
    }
    
    // Atualizar CNPJ
    if (companyInfo.cnpj) {
        const cnpjDiv = document.querySelector('#companyCnpj div');
        cnpjDiv.textContent = companyInfo.cnpj;
    }
    
    // Atualizar período
    if (companyInfo.period) {
        const periodDiv = document.querySelector('#companyPeriod div');
        periodDiv.textContent = companyInfo.period;
    }
    
    section.classList.remove('hidden');
}

// ═══════════════════════════════════════════════════════════════════════════
// PROCESSAMENTO DE ARQUIVO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Processa o upload do arquivo
 */
async function handleFileUpload(file) {
    console.log('📤 Arquivo selecionado:', file.name);
    
    showStatus('Processando arquivo...', 'info');
    
    try {
        // Enviar para servidor Python
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${API_BASE_URL}/parse-excel`, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (!result.success) {
            // Mostrar erro com detalhes
            let errorMsg = result.message || 'Erro ao processar arquivo';
            
            if (result.suggestion) {
                errorMsg += '\n\n' + result.suggestion;
            }
            
            if (result.errorCode === 'EMPTY_SHEETS') {
                errorMsg = '⚠️ Arquivo sem planilhas válidas\n\n' +
                          'O arquivo está vazio ou corrompido.\n\n' +
                          '💡 SOLUÇÃO:\n' +
                          '1. Abra o arquivo no Excel\n' +
                          '2. Verifique se há dados\n' +
                          '3. Salve como: CSV UTF-8 ou XLSX válido\n' +
                          '4. Tente fazer upload novamente';
            } else if (result.errorCode === 'CORRUPTED_FILE') {
                errorMsg = '⚠️ Arquivo corrompido\n\n' +
                          '💡 SOLUÇÃO:\n' +
                          '1. Abra o arquivo no Excel\n' +
                          '2. Selecione todos os dados (Cmd+A)\n' +
                          '3. Copie (Cmd+C)\n' +
                          '4. Crie novo arquivo e cole\n' +
                          '5. Salve como CSV UTF-8';
            }
            
            throw new Error(errorMsg);
        }
        
        console.log('✅ Arquivo processado:', result);
        
        // Processar dados (passar o resultado completo, não só result.data)
        processData(result);
        
        showStatus('Arquivo processado com sucesso!', 'success');
        
    } catch (error) {
        console.error('❌ Erro:', error);
        showStatus('Erro: ' + error.message, 'error');
    }
}

/**
 * Processa os dados recebidos do servidor
 * O servidor já retorna estrutura transposta otimizada
 */
function processData(result) {
    console.log('🔄 Processando resposta do servidor...', result);
    
    if (!result) {
        throw new Error('Resposta vazia do servidor');
    }
    
    // Verificar se temos dados estruturados
    if (result.structured && result.structured.employees) {
        console.log('✅ Usando estrutura otimizada do servidor');
        
        AppState.funcionarios = result.structured.employees;
        AppState.parsedData = result.structured;
        
        console.log(`👥 ${AppState.funcionarios.length} funcionários processados`);
        console.log(`📅 Referências globais: ${result.structured.allReferences.join(', ')}`);
        
        // Atualizar informações da empresa
        if (result.structured.companyInfo) {
            updateCompanyInfo(result.structured.companyInfo);
        }
        
        // Log de amostra
        if (AppState.funcionarios.length > 0) {
            const sample = AppState.funcionarios[0];
            console.log(`📊 Amostra - ${sample.id} - ${sample.name}:`);
            console.log(`   Referências: ${sample.references.join(', ')}`);
            console.log(`   Eventos: ${sample.events.length}`);
            if (sample.events.length > 0) {
                console.log(`   Primeiro evento: ${sample.events[0].code} - ${sample.events[0].description}`);
            }
        }
        
    } else if (result.data) {
        // Fallback: processar no cliente
        console.warn('⚠️  Servidor não retornou estrutura otimizada, processando no cliente...');
        AppState.rawData = result.data;
        AppState.funcionarios = groupByEmployee(result.data);
    } else {
        throw new Error('Dados inválidos: sem estrutura nem dados brutos');
    }
    
    if (AppState.funcionarios.length === 0) {
        throw new Error('Nenhum funcionário detectado no arquivo. Verifique se o formato está correto (padrão: "NÚMERO - NOME")');
    }
    
    // Selecionar todos por padrão
    AppState.funcionarios.forEach(emp => {
        AppState.selectedEmployees.add(emp.id);
    });
    
    // Renderizar interface
    renderEmployeeList();
    
    // Mostrar área de conteúdo
    document.getElementById('mainContent').classList.add('active');
    
    showStatus(`✅ ${AppState.funcionarios.length} funcionários carregados com sucesso!`, 'success');
}

/**
 * Agrupa dados por funcionário com estrutura transposta para comparativo
 */
function groupByEmployee(data) {
    const employees = [];
    const headers = data[0];
    
    console.log('📋 Cabeçalhos:', headers);
    
    // Detectar colunas
    const colIndexes = {
        ref: findColumnIndex(headers, ['referencia', 'referência', 'ref', 'competencia']),
        code: findColumnIndex(headers, ['codigo', 'código', 'cod', 'cód']),
        desc: findColumnIndex(headers, ['nome', 'descrição', 'descricao', 'historico']),
        calc: findColumnIndex(headers, ['calculado', 'valor calculado', 'calc']),
        info: findColumnIndex(headers, ['informado', 'valor informado', 'inf'])
    };
    
    console.log('🗺️ Índices das colunas:', colIndexes);
    
    let currentEmployee = null;
    const employeePattern = /^(\d+)\s*-\s*(.+)$/;
    
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        
        // Verificar se é linha de funcionário
        let employeeMatch = null;
        for (let colIdx = 0; colIdx < row.length; colIdx++) {
            const value = String(row[colIdx] || '').trim();
            employeeMatch = value.match(employeePattern);
            if (employeeMatch) {
                break;
            }
        }
        
        if (employeeMatch) {
            // Nova linha de funcionário
            const [, id, name] = employeeMatch;
            
            currentEmployee = {
                id: id.trim(),
                name: name.trim(),
                eventsMap: new Map(), // Map<eventKey, Map<ref, {calc, info}>>
                references: new Set()
            };
            
            employees.push(currentEmployee);
            console.log(`👤 Funcionário: ${currentEmployee.id} - ${currentEmployee.name}`);
            
        } else if (currentEmployee && row[colIndexes.code]) {
            // Linha de evento
            const ref = String(row[colIndexes.ref] || '').trim();
            const code = String(row[colIndexes.code] || '').trim();
            const desc = String(row[colIndexes.desc] || '').trim();
            const calc = parseValue(row[colIndexes.calc]);
            const info = parseValue(row[colIndexes.info]);
            
            if (code && ref) {
                // Chave única do evento (código + descrição)
                const eventKey = `${code}|||${desc}`;
                
                // Adicionar referência ao set
                currentEmployee.references.add(ref);
                
                // Obter ou criar Map de valores por referência para este evento
                if (!currentEmployee.eventsMap.has(eventKey)) {
                    currentEmployee.eventsMap.set(eventKey, new Map());
                }
                
                const refMap = currentEmployee.eventsMap.get(eventKey);
                refMap.set(ref, {
                    calculated: calc,
                    informed: info
                });
            }
        }
    }
    
    // Converter estrutura para formato transposto
    employees.forEach(emp => {
        emp.references = Array.from(emp.references).sort();
        emp.events = convertToTransposedEvents(emp.eventsMap, emp.references);
        delete emp.eventsMap; // Limpar estrutura temporária
    });
    
    return employees;
}

/**
 * Converte eventos para formato transposto (uma linha por evento, colunas por referência)
 */
function convertToTransposedEvents(eventsMap, references) {
    const events = [];
    
    eventsMap.forEach((refMap, eventKey) => {
        const [code, description] = eventKey.split('|||');
        
        const event = {
            code,
            description,
            valuesByRef: {}
        };
        
        // Para cada referência, adicionar valores
        references.forEach(ref => {
            const values = refMap.get(ref) || { calculated: 0, informed: 0 };
            event.valuesByRef[ref] = values;
        });
        
        events.push(event);
    });
    
    // Ordenar por código
    events.sort((a, b) => {
        const codeA = parseInt(a.code) || 0;
        const codeB = parseInt(b.code) || 0;
        return codeA - codeB;
    });
    
    return events;
}

/**
 * Parse de valor com tratamento robusto de formatos
 */
function parseValue(value) {
    if (!value) return 0;
    
    const str = String(value).trim();
    
    // Se parece com hora (220:00, 12:30, etc)
    if (/^\d+:\d+$/.test(str)) {
        const [hours, minutes] = str.split(':').map(Number);
        return hours + (minutes / 60);
    }
    
    // Remover símbolos de moeda e espaços
    let cleaned = str.replace(/[R$\s]/g, '');
    
    // Substituir vírgula por ponto (formato brasileiro)
    cleaned = cleaned.replace(',', '.');
    
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
}

/**
 * Encontra índice de coluna baseado em possíveis nomes
 */
function findColumnIndex(headers, possibleNames) {
    for (let i = 0; i < headers.length; i++) {
        const header = String(headers[i] || '').toLowerCase().trim();
        if (possibleNames.some(name => header.includes(name.toLowerCase()))) {
            return i;
        }
    }
    return -1;
}

// ═══════════════════════════════════════════════════════════════════════════
// RENDERIZAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Renderiza lista de funcionários
 */
function renderEmployeeList() {
    const container = document.getElementById('employeeList');
    const count = document.getElementById('employeeCount');
    
    container.innerHTML = '';
    count.textContent = AppState.funcionarios.length;
    
    AppState.funcionarios.forEach(employee => {
        const totalEvents = employee.events.length;
        
        const item = document.createElement('div');
        item.className = 'employee-item';
        if (AppState.selectedEmployee && AppState.selectedEmployee.id === employee.id) {
            item.classList.add('selected');
        }
        
        item.innerHTML = `
            <div class="employee-info">
                <div class="employee-id">${employee.id}</div>
                <div class="employee-name">${employee.name}</div>
            </div>
            <div class="employee-count">(${totalEvents} eventos)</div>
        `;
        
        // Click para selecionar
        item.addEventListener('click', () => {
            selectEmployee(employee);
        });
        
        container.appendChild(item);
    });
}

/**
 * Seleciona um funcionário para visualização
 */
function selectEmployee(employee) {
    AppState.selectedEmployee = employee;
    
    // Atualizar UI - remover seleção de todos
    document.querySelectorAll('.employee-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Adicionar seleção ao item clicado
    // Buscar pelo ID do funcionário no conteúdo
    document.querySelectorAll('.employee-item').forEach(item => {
        const idElement = item.querySelector('.employee-id');
        if (idElement && idElement.textContent === employee.id) {
            item.classList.add('selected');
        }
    });
    
    // Renderizar detalhes
    renderEmployeeDetails(employee);
}

/**
 * Renderiza os detalhes do funcionário selecionado com TABELA TRANSPOSTA
 * USA dados já estruturados do servidor Python
 */
function renderEmployeeDetails(employee) {
    const container = document.getElementById('detailsContent');
    
    const references = employee.references || [];
    const events = employee.events || [];
    
    if (events.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Nenhum evento encontrado para este funcionário</p>
            </div>
        `;
        return;
    }
    
    // Usar totais calculados pelo servidor
    const totals = employee.totals || calculateTotalsByReference(events, references);
    
    container.innerHTML = `
        <div class="details-header">
            <h2>${employee.id} - ${employee.name}</h2>
            <p class="details-subtitle">
                ${references.length} referência(s) | ${events.length} evento(s) | Modo: Comparativo de Folha
            </p>
        </div>
        
        <div class="comparative-table-container">
            ${renderComparativeTable(events, references, totals)}
        </div>
        
        <div class="summary-section">
            ${renderSummaryCards(totals, references)}
        </div>
    `;
}

/**
 * Renderiza tabela comparativa transposta
 * FORMATO: Uma linha por evento, colunas por referência
 */
function renderComparativeTable(events, references, totals) {
    // Cabeçalhos de referências
    const refColumns = references.map(ref => `
        <th colspan="2" class="ref-header">${ref}</th>
    `).join('');
    
    const refSubColumns = references.map(() => `
        <th class="sub-header">Calculado</th>
        <th class="sub-header">Informado</th>
    `).join('');
    
    const hasDiffColumn = references.length > 1;
    
    // Linhas de eventos
    const eventRows = events.map(event => {
        const valueCells = references.map(ref => {
            const values = event.values[ref] || { calculated: 0, informed: 0, difference: 0 };
            const hasDiff = Math.abs(values.difference || 0) > 0.01;
            
            return `
                <td class="event-value">${formatValue(values.calculated)}</td>
                <td class="event-value ${hasDiff ? 'has-diff' : ''}">${formatValue(values.informed)}</td>
            `;
        }).join('');
        
        // Variação entre primeira e última referência
        let variationCell = '';
        if (hasDiffColumn) {
            const firstRef = references[0];
            const lastRef = references[references.length - 1];
            const firstCalc = event.values[firstRef]?.calculated || 0;
            const lastCalc = event.values[lastRef]?.calculated || 0;
            const variation = lastCalc - firstCalc;
            const variationPercent = firstCalc !== 0 ? (variation / firstCalc * 100) : 0;
            
            variationCell = `
                <td class="event-value variation-cell ${variation >= 0 ? 'value-positive' : 'value-negative'}">
                    ${formatValue(variation)}
                    ${Math.abs(variationPercent) > 0.01 ? `<br><small>(${variationPercent.toFixed(1)}%)</small>` : ''}
                </td>
            `;
        }
        
        return `
            <tr class="event-row">
                <td class="event-code">${event.code}</td>
                <td class="event-description">${event.description}</td>
                ${valueCells}
                ${variationCell}
            </tr>
        `;
    }).join('');
    
    // Linha de totais
    const totalCells = references.map(ref => {
        const total = totals[ref] || { calculated: 0, informed: 0, difference: 0 };
        const hasDiff = Math.abs(total.difference || 0) > 0.01;
        
        return `
            <td class="total-value">${formatValue(total.calculated)}</td>
            <td class="total-value ${hasDiff ? 'has-diff-total' : ''}">${formatValue(total.informed)}</td>
        `;
    }).join('');
    
    let totalVariationCell = '';
    if (hasDiffColumn) {
        const firstRef = references[0];
        const lastRef = references[references.length - 1];
        const firstTotal = totals[firstRef] || { calculated: 0 };
        const lastTotal = totals[lastRef] || { calculated: 0 };
        const variation = lastTotal.calculated - firstTotal.calculated;
        const variationPercent = firstTotal.calculated !== 0 ? 
            (variation / firstTotal.calculated * 100) : 0;
        
        totalVariationCell = `
            <td class="total-value variation-cell ${variation >= 0 ? 'value-positive' : 'value-negative'}">
                <strong>${formatValue(variation)}</strong>
                ${Math.abs(variationPercent) > 0.01 ? `<br><small>(${variationPercent.toFixed(1)}%)</small>` : ''}
            </td>
        `;
    }
    
    return `
        <table class="comparative-table">
            <thead>
                <tr class="header-row-1">
                    <th rowspan="2" style="width: 80px;">Código</th>
                    <th rowspan="2" style="min-width: 250px;">Descrição do Evento</th>
                    ${refColumns}
                    ${hasDiffColumn ? `<th rowspan="2" class="diff-header">Variação<br>Calc.</th>` : ''}
                </tr>
                <tr class="header-row-2">
                    ${refSubColumns}
                </tr>
            </thead>
            <tbody>
                ${eventRows}
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td colspan="2"><strong>TOTAL</strong></td>
                    ${totalCells}
                    ${totalVariationCell}
                </tr>
            </tfoot>
        </table>
    `;
}

/**
 * Calcula totais por referência
 */
function calculateTotalsByReference(events, references) {
    const totals = {};
    
    references.forEach(ref => {
        totals[ref] = { calculated: 0, informed: 0 };
    });
    
    events.forEach(event => {
        references.forEach(ref => {
            const values = event.valuesByRef[ref];
            if (values) {
                totals[ref].calculated += values.calculated;
                totals[ref].informed += values.informed;
            }
        });
    });
    
    return totals;
}

/**
 * Renderiza cards de resumo
 */
function renderSummaryCards(totals, references) {
    const cards = references.map(ref => {
        const total = totals[ref];
        const diff = total.calculated - total.informed;
        const diffPercent = total.calculated !== 0 ? (diff / total.calculated * 100) : 0;
        
        return `
            <div class="summary-card">
                <div class="summary-ref">📅 ${ref}</div>
                <div class="summary-row">
                    <span class="summary-label">Calculado:</span>
                    <span class="summary-value">${formatValue(total.calculated)}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Informado:</span>
                    <span class="summary-value">${formatValue(total.informed)}</span>
                </div>
                <div class="summary-row ${Math.abs(diff) > 0.01 ? 'has-difference' : ''}">
                    <span class="summary-label">Diferença:</span>
                    <span class="summary-value ${diff >= 0 ? 'positive' : 'negative'}">
                        ${formatValue(diff)}
                        ${Math.abs(diffPercent) > 0.01 ? ` (${diffPercent.toFixed(2)}%)` : ''}
                    </span>
                </div>
            </div>
        `;
    }).join('');
    
    return `<div class="summary-cards">${cards}</div>`;
}

/**
 * Formata valor com inteligência (moeda ou horas)
 */
function formatValue(value) {
    if (value === 0) return '-';
    
    // Se for valor grande (provavelmente moeda)
    if (Math.abs(value) >= 10) {
        return formatCurrency(value);
    }
    
    // Se for valor pequeno (provavelmente horas)
    if (Math.abs(value) < 10 && value % 1 !== 0) {
        const hours = Math.floor(value);
        const minutes = Math.round((value - hours) * 60);
        return `${hours}:${String(minutes).padStart(2, '0')}`;
    }
    
    return formatCurrency(value);
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILIDADES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Formata valor como moeda
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Mostra mensagem de status
 */
function showStatus(message, type = 'info') {
    const status = document.getElementById('uploadStatus');
    status.textContent = message;
    status.className = `status-${type}`;
    status.classList.remove('hidden');
    
    if (type === 'success') {
        setTimeout(() => {
            status.classList.add('hidden');
        }, 3000);
    }
}

/**
 * Seleciona todos os funcionários
 */

console.log('✅ app_v2.js carregado');
