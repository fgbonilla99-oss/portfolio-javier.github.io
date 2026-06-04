// ==========================================================================
// CORE / GLOBAL STATE MANAGER (BASE DE DATOS SIMULADA LOCALSTORAGE)
// ==========================================================================

// Estructura semilla de Órdenes de Producción Activas en Fábrica
const defaultOrders = [
    { id: "ORD-8840", cliente: "CLI-1024", descripcion: "Persiana Honeycomb 1.5'' Blanca", estado: "Production" },
    { id: "ORD-8841", cliente: "CLI-1024", descripcion: "Cortina Enrollable Gris Oscuro", estado: "Production" },
    { id: "ORD-8842", cliente: "CLI-1024", descripcion: "Mecanismo Automatizado Somfy", estado: "Production" },
    { id: "ORD-9012", cliente: "CLI-5520", descripcion: "Persiana Celular Blackout Gris", estado: "Production" },
    { id: "ORD-9255", cliente: "CLI-3044", descripcion: "Toldo Proyección Exterior Beige", estado: "Production" }
];

// Inicialización controlada de almacenamiento en memoria local
if (!localStorage.getItem('sys_orders')) {
    localStorage.setItem('sys_orders', JSON.stringify(defaultOrders));
}
if (!localStorage.getItem('sys_citas')) {
    localStorage.setItem('sys_citas', JSON.stringify([]));
}

// Interfaces de Abstracción de Datos (CRUD Local)
function db_getOrders() { return JSON.parse(localStorage.getItem('sys_orders')); }
function db_getCitas() { return JSON.parse(localStorage.getItem('sys_citas')); }
function db_saveOrders(data) { localStorage.setItem('sys_orders', JSON.stringify(data)); }
function db_saveCitas(data) { localStorage.setItem('sys_citas', JSON.stringify(data)); }