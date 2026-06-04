// ==========================================================================
// LÓGICA DE RECEPCIÓN (CORREGIDA PARA PANTALLAS MÓVILES)
// ==========================================================================

let citaSeleccionadaParaEntrega = null;
let canvas = null;
let ctx = null;
let dibujando = false;

function loginRecepcion() {
    document.getElementById('auth-recepcion').style.display = "none";
    document.getElementById('recepcion-content').style.display = "block";
    document.getElementById('recepcion-content').classList.add('fade-in');
    
    renderizarPedidosListos();
}

function renderizarPedidosListos() {
    const citas = db_getCitas();
    const container = document.getElementById('ready-orders-list');
    const mobileContainer = document.getElementById('ready-orders-list-mobile');
    
    container.innerHTML = "";
    mobileContainer.innerHTML = "";

    const listos = citas.filter(c => c.estado === "Listo para Entrega");

    if (listos.length === 0) {
        const noDataHTML = `<div style="text-align:center; color:var(--text-muted); padding:30px;">Esperando liberación de pedidos...</div>`;
        container.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:30px;">Esperando liberación de pedidos...</td></tr>`;
        mobileContainer.innerHTML = noDataHTML;
        return;
    }

    listos.forEach(cita => {
        // 1. Render para Computadora (Tabla)
        const tr = document.createElement('tr');
        tr.className = 'fade-in';
        tr.innerHTML = `
            <td style="font-weight:700; color:var(--brand-accent);">${cita.hora_cita} AM</td>
            <td><strong>${cita.cliente}</strong></td>
            <td><span style="font-family:monospace; background:#f1f5f9; padding:4px 8px; border-radius:4px; font-size:0.85rem;">${cita.ordenes.join(', ')}</span></td>
            <td><span class="badge badge-ready">Listo para Despacho</span></td>
            <td style="text-align: right;">
                <button class="btn btn-action-table btn-atender-d" style="background:var(--brand-accent);">Atender</button>
            </td>
        `;
        tr.querySelector('.btn-atender-d').addEventListener('click', (e) => {
            e.stopPropagation();
            abrirModuloFirma(cita.id_cita);
        });
        container.appendChild(tr);

        // 2. Render para Celular (Tarjetas de entrega)
        const mobileCard = document.createElement('div');
        mobileCard.className = 'mobile-order-card fade-in';
        mobileCard.innerHTML = `
            <div class="mobile-card-row">
                <span style="font-size: 1.1rem; font-weight:700; color:var(--brand-accent);">${cita.hora_cita} AM</span>
                <span class="badge badge-ready">Listo</span>
            </div>
            <div class="mobile-card-row">
                <span><strong>Cliente:</strong> ${cita.cliente}</span>
            </div>
            <div style="margin-bottom: 15px;">
                <label>Órdenes Listas:</label>
                <div style="font-family:monospace; background:#e6f4ea; color:#137333; padding:8px; border-radius:4px; font-size:0.9rem;">${cita.ordenes.join(', ')}</div>
            </div>
            <button class="btn btn-success btn-mobile-full btn-atender-m" style="background:var(--brand-accent);">Atender Entrega</button>
        `;
        mobileCard.querySelector('.btn-atender-m').addEventListener('click', (e) => {
            e.stopPropagation();
            abrirModuloFirma(cita.id_cita);
        });
        mobileContainer.appendChild(mobileCard);
    });
}

// Inicialización dinámica y responsiva del área de firma
function inicializarCanvasFirma() {
    canvas = document.getElementById('signature-canvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    // CORRECCIÓN RESPONSIVA: Ajustar el ancho real del lienzo al contenedor del celular
    const contenedorFirma = canvas.parentElement;
    canvas.width = contenedorFirma.clientWidth - 40; // Resta el padding interno
    canvas.height = 220; // Altura fija cómoda para el dedo

    // Ajustes de trazo estilizado
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Limpiar listeners previos para evitar duplicación de trazos
    const nuevoCanvas = canvas.cloneNode(true);
    canvas.parentNode.replaceChild(nuevoCanvas, canvas);
    canvas = nuevoCanvas;
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Eventos de Mouse
    canvas.addEventListener('mousedown', (e) => { dibujando = true; trazar(e); });
    canvas.addEventListener('mousemove', trazar);
    window.addEventListener('mouseup', () => { dibujando = false; ctx.beginPath(); });
    
    // Eventos de Pantalla Táctil (Celulares/Tablets)
    canvas.addEventListener('touchstart', (e) => { 
        dibujando = true; 
        trazarTouch(e.touches[0]); 
    }, { passive: false });
    
    canvas.addEventListener('touchmove', (e) => { 
        e.preventDefault(); // Evita que la pantalla se mueva mientras firmas
        trazarTouch(e.touches[0]); 
    }, { passive: false });
    
    canvas.addEventListener('touchend', () => { dibujando = false; ctx.beginPath(); });
}

function trazar(e) {
    if (!dibujando) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function trazarTouch(t) {
    if (!dibujando) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(t.clientX - rect.left, t.top - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(t.clientX - rect.left, t.top - rect.top);
}

function limpiarFirma() {
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function abrirModuloFirma(idCita) {
    citaSeleccionadaParaEntrega = idCita;
    
    // 1. Mostrar contenedor primero
    const signatureSection = document.getElementById('signature-section');
    signatureSection.style.display = "block";
    signatureSection.classList.add('fade-in');
    
    // 2. Inicializar dimensiones del Canvas ya que el contenedor es visible
    inicializarCanvasFirma();
    limpiarFirma();
    
    // 3. Scroll suave automático hacia el área de firma
    signatureSection.scrollIntoView({ behavior: 'smooth' });
}

function finalizarEntrega() {
    if (!citaSeleccionadaParaEntrega) return;

    const dataURL = canvas.toDataURL();
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    
    if (dataURL === blank.toDataURL()) {
        alert("La firma del cliente es requerida por auditoría interna para validar el despacho.");
        return;
    }

    const citas = db_getCitas();
    const citaIndex = citas.findIndex(c => c.id_cita === citaSeleccionadaParaEntrega);

    if (citaIndex !== -1) {
        citas[citaIndex].estado = "Entregado";
        citas[citaIndex].firma_token = dataURL; 
        db_saveCitas(citas);

        const ordenesCita = citas[citaIndex].ordenes;
        const orders = db_getOrders();
        orders.forEach(o => {
            if (ordenesCita.includes(o.id)) o.estado = "Entregado";
        });
        db_saveOrders(orders);

        alert("Entrega confirmada. El registro ha sido archivado con firma digital.");
        document.getElementById('signature-section').style.display = "none";
        citaSeleccionadaParaEntrega = null;
        renderizarPedidosListos();
    }
}