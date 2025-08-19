// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    const serviceTableBody = document.querySelector('#service-table tbody');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const grandTotalEl = document.getElementById('grand-total');
    const fuelSlider = document.getElementById('fuel-level');
    const fuelPercentage = document.getElementById('fuel-percentage');

    const TAX_RATE = 0.19; // 19% de impuesto (IVA en Chile)

    // --- FUNCIÓN PARA FORMATEAR NÚMEROS COMO MONEDA CHILENA ---
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(value);
    };

    // --- FUNCIÓN PRINCIPAL PARA CALCULAR TOTALES ---
    const calculateTotals = () => {
        let subtotal = 0;
        const rows = serviceTableBody.querySelectorAll('tr');

        // 1. Recorrer cada fila de la tabla para calcular el subtotal
        rows.forEach(row => {
            const quantityInput = row.querySelector('.quantity-input');
            const priceCell = row.querySelector('.price');
            const totalCell = row.querySelector('.total-price');

            const quantity = parseInt(quantityInput.value, 10) || 0;
            const price = parseInt(priceCell.dataset.price, 10) || 0;
            
            const rowTotal = quantity * price;
            totalCell.textContent = formatCurrency(rowTotal); // Actualiza el total de la fila
            
            subtotal += rowTotal; // Suma al subtotal general
        });

        // 2. Calcular impuesto y total final
        const tax = subtotal * TAX_RATE;
        const grandTotal = subtotal; // El subtotal ya incluye el impuesto según la imagen

        // 3. Actualizar los elementos en el DOM con los valores calculados
        subtotalEl.textContent = formatCurrency(grandTotal);
        taxEl.textContent = formatCurrency(tax);
        grandTotalEl.textContent = formatCurrency(grandTotal);
    };

    // --- MANEJADORES DE EVENTOS ---

    // Evento para recalcular cuando cambia una cantidad o se elimina un item
    serviceTableBody.addEventListener('input', (event) => {
        // Se activa si el cambio ocurrió en un input de cantidad
        if (event.target.classList.contains('quantity-input')) {
            calculateTotals();
        }
    });

    serviceTableBody.addEventListener('click', (event) => {
        // Se activa si el clic fue en un botón de eliminar (o en su ícono)
        if (event.target.closest('.remove-btn')) {
            event.target.closest('tr').remove(); // Elimina la fila de la tabla
            calculateTotals(); // Recalcula todo
        }
    });

    // Evento para actualizar el porcentaje del nivel de combustible
    fuelSlider.addEventListener('input', () => {
        fuelPercentage.textContent = `${fuelSlider.value}%`;
    });


    // --- INICIALIZACIÓN ---
    // Calcula los totales una vez al cargar la página para asegurar que los valores iniciales son correctos
    calculateTotals();
});