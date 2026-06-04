function loginEmpresa() {
    const user = document.getElementById('user-empresa').value.trim();
    if (!user) return;

    document.getElementById('company-login').style.display = "none";
    document.getElementById('monitor-section').style.display = "block";
    document.getElementById('monitor-section').classList.add('fade-in');

    renderizarColaOperaciones();
    setInterval(renderizarColaOperaciones, 3000); // Sincronización continua cada 3 segundos
}

function renderizarColaOperaciones() {
    const citas = db_getCitas();
    const tbody = document.getElementById('queue-container');
    const mobileContainer = document.getElementById('queue-container-mobile');
    
    tbody.innerHTML = "";
    mobileContainer.innerHTML = "";

    const colaPendientes = citas
        .filter(c => c.estado === "Pendiente")
        .sort((a, b) => a.timestamp_entrada - b.timestamp_entrada);

    const indicator = document.getElementById('refresh-indicator');
    indicator.innerText = `Sincronizado: ${new Date().toLocaleTimeString()}`;

    if (colaPendientes.length === 0) {
        const noDataHTML = `<div style="text-align:center; color:var(--text-muted); padding:30px;">No existen citas pendientes.</div>`;
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:30px;">No existen citas pendientes.</td></tr>`;
        mobileContainer.innerHTML = noDataHTML;
        return;
    }

    colaPendientes.forEach(cita => {
        const fechaFormateada = new Date(cita.timestamp_entrada).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // 1. Render para Computadora (Tabla)
        const tr = document.createElement('tr');
        tr.className = 'fade-in';
        tr.innerHTML = `
            <td style="font-weight:700; color:var(--brand-accent);">${cita.hora_cita} AM</td>
            <td><strong>${cita.cliente}</strong></td>
            <td><span style="font-family:monospace; background:#f1f5f9; padding:4px 8px; border-radius:4px; font-size:0.85rem;">${cita.ordenes.join(', ')}</span></td>
            <td>${fechaFormateada}</td>
            <td><span class="badge badge-pending">En Preparación</span></td>
            <td style="text-align: right;">
                <button class="btn btn-action-table" data-id="${cita.id_cita}">Completar</button>
            </td>
        `;
        tr.querySelector('.btn-action-table').addEventListener('click', () => completarOrden(cita.id_cita));
        tbody.appendChild(tr);

        // 2. Render para Celular (Tarjetas independientes)
        const mobileCard = document.createElement('div');
        mobileCard.className = 'mobile-order-card fade-in';
        mobileCard.innerHTML = `
            <div class="mobile-card-row">
                <span style="font-size: 1.1rem; font-weight:700; color:var(--brand-accent);">${cita.hora_cita} AM</span>
                <span class="badge badge-pending">En Preparación</span>
            </div>
            <div class="mobile-card-row">
                <span><strong>Cliente:</strong> ${cita.cliente}</span>
                <span style="font-size:0.8rem; color:var(--text-muted);">${fechaFormateada}</span>
            </div>
            <div style="margin-bottom: 15px;">
                <label>Órdenes:</label>
                <div style="font-family:monospace; background:#f1f5f9; padding:8px; border-radius:4px; font-size:0.9rem;">${cita.ordenes.join(', ')}</div>
            </div>
            <button class="btn btn-success btn-mobile-full btn-completar-m">Marcar Completo</button>
        `;
        mobileCard.querySelector('.btn-completar-m').addEventListener('click', () => completarOrden(cita.id_cita));
        mobileContainer.appendChild(mobileCard);
    });
}

function completarOrden(idCita) {
    console.log("Cerrando orden e impulsando a recepción: ", idCita);
    const citas = db_getCitas();
    const citaIndex = citas.findIndex(c => c.id_cita === idCita);

    if (citaIndex !== -1) {
        // Cambiamos el estado para que el módulo de recepción lo detecte
        citas[citaIndex].estado = "Listo para Entrega";
        db_saveCitas(citas);
        
        // Refrescamos la pantalla inmediatamente
        renderizarColaOperaciones();
    }
}