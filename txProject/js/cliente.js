// ==========================================================================
// LÓGICA DEL MÓDULO CLIENTE
// ==========================================================================

let clientSessionId = "";

function buscarOrdenes() {
    const inputClient = document.getElementById('client-number').value.trim().toUpperCase();
    const errorMsg = document.getElementById('login-error');
    
    if (!inputClient) return;

    const allOrders = db_getOrders();
    const filtered = allOrders.filter(o => o.cliente === inputClient && o.estado === "Produccion");

    if (filtered.length === 0) {
        errorMsg.style.display = "block";
        return;
    }

    errorMsg.style.display = "none";
    clientSessionId = inputClient;

    const container = document.getElementById('orders-list');
    container.innerHTML = "";

    // Inyección de componentes interactivos premium
    filtered.forEach(order => {
        container.innerHTML += `
            <div class="checkbox-tile" id="tile-${order.id}" onclick="seleccionarTarjeta('${order.id}')">
                <input type="checkbox" id="chk-${order.id}" value="${order.id}" style="display:none;">
                <div class="tile-content">
                    <span class="order-id">${order.id}</span>
                    <span class="order-desc">${order.descripcion}</span>
                </div>
            </div>
        `;
    });

    document.getElementById('login-section').style.display = "none";
    document.getElementById('orders-section').style.display = "block";
    document.getElementById('orders-section').classList.add('fade-in');
}

// Manejo moderno de la selección de tarjetas
function seleccionarTarjeta(id) {
    const tile = document.getElementById(`tile-${id}`);
    const checkbox = document.getElementById(`chk-${id}`);
    
    checkbox.checked = !checkbox.checked;
    
    if (checkbox.checked) {
        tile.classList.add('selected');
    } else {
        tile.classList.remove('selected');
    }
}

function regresarLogin() {
    document.getElementById('orders-section').style.display = "none";
    document.getElementById('login-section').style.display = "block";
    document.getElementById('login-section').classList.add('fade-in');
}

function agendarCita() {
    const timeInput = document.getElementById('pickup-time').value;
    const timeError = document.getElementById('time-error');
    const selectedBoxes = document.querySelectorAll('#orders-list input[type="checkbox"]:checked');
    
    if (selectedBoxes.length === 0) {
        alert("Debe seleccionar al menos una orden para proceder.");
        return;
    }

    if (timeInput < "09:00" || timeInput > "14:00") {
        timeError.style.display = "block";
        return;
    }
    timeError.style.display = "none";

    const selectedOrderIds = Array.from(selectedBoxes).map(cb => cb.value);
    const citas = db_getCitas();

    const nuevaCita = {
        id_cita: "CIT-" + Math.floor(1000 + Math.random() * 9000),
        cliente: clientSessionId,
        ordenes: selectedOrderIds,
        hora_cita: timeInput,
        timestamp_entrada: Date.now(),
        estado: "Pendiente"
    };

    citas.push(nuevaCita);
    db_saveCitas(citas);

    const orders = db_getOrders();
    orders.forEach(o => {
        if (selectedOrderIds.includes(o.id)) {
            o.estado = "En Cita"; 
        }
    });
    db_saveOrders(orders);

    alert(`¡Cita programada con éxito!\nCódigo de Cita: ${nuevaCita.id_cita}`);
    location.reload();
}