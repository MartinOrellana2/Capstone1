document.addEventListener('DOMContentLoaded', () => {

    // --- 1. REFERENCIAS A ELEMENTOS DEL DOM ---
    // Seleccionamos los elementos clave de tu HTML
    const serviceTableBody = document.querySelector('#service-table tbody');
    const addRowLink = document.querySelector('.add-new-service');
    const subtotalCell = document.getElementById('subtotal');
    const taxCell = document.getElementById('tax');
    const grandTotalCell = document.getElementById('grand-total');

    const IVA_RATE = 0.19; // Tasa de impuesto (19% para el IVA en Chile)

    // Función para dar formato de moneda chilena (CLP)
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(value);
    };

    // --- 2. FUNCIÓN PRINCIPAL PARA CALCULAR TOTALES ---
    const calculateTotals = () => {
        let currentSubtotal = 0;

        // Iteramos sobre cada fila <tr> del tbody
        serviceTableBody.querySelectorAll('tr').forEach(row => {
            const quantityInput = row.querySelector('.quantity-input');
            const quantity = parseFloat(quantityInput.value) || 0;
            let price = 0;

            // Buscamos si la fila tiene un input para el precio (filas nuevas)
            const priceInput = row.querySelector('.price-input');
            if (priceInput) {
                // Si existe, tomamos el valor del input
                price = parseFloat(priceInput.value) || 0;
            } else {
                // Si no, es una fila original y tomamos el precio del atributo 'data-price'
                const priceCell = row.querySelector('.price');
                if (priceCell) {
                    price = parseFloat(priceCell.dataset.price) || 0;
                }
            }

            const rowTotal = quantity * price;
            // Actualizamos la celda "TOTAL" de la fila actual
            row.querySelector('.total-price').textContent = formatCurrency(rowTotal);
            
            // Sumamos al subtotal general
            currentSubtotal += rowTotal;
        });

        // Calculamos el impuesto basado en el subtotal
        const taxAmount = currentSubtotal * IVA_RATE;

        // Actualizamos los valores en el pie de la orden
        subtotalCell.textContent = formatCurrency(currentSubtotal);
        taxCell.textContent = formatCurrency(taxAmount);
        // Según tu HTML, el total y el subtotal muestran el mismo valor
        grandTotalCell.textContent = formatCurrency(currentSubtotal);
    };

    // --- 3. FUNCIÓN PARA AGREGAR UNA NUEVA FILA ---
    const addProductRow = () => {
        const newRow = document.createElement('tr');
        // Creamos la estructura HTML de la nueva fila, compatible con la tuya
        newRow.innerHTML = `
            <td><input type="text" class="description-input" placeholder="Nombre del servicio o producto"></td>
            <td><input type="number" class="quantity-input" value="1" min="1"></td>
            <td><input type="number" class="price-input" placeholder="Precio" min="0"></td>
            <td class="total-price">${formatCurrency(0)}</td>
            <td>
                <div class="action-icons">
                    <span class="material-symbols-outlined">more_vert</span>
                    <button class="remove-btn"><span class="material-symbols-outlined">remove_circle</span></button>
                </div>
            </td>
        `;
        // Agregamos la fila a la tabla
        serviceTableBody.appendChild(newRow);
    };

    // --- 4. MANEJO DE EVENTOS ---

    // Evento para el enlace "Agregar nuevo producto o servicio"
    addRowLink.addEventListener('click', (event) => {
        event.preventDefault(); // Evita que el enlace '#' recargue la página
        addProductRow();
    });

    // Evento delegado en el cuerpo de la tabla para manejar interacciones
    serviceTableBody.addEventListener('input', (event) => {
        // Si el cambio ocurre en un input de cantidad O de precio, recalculamos todo
        if (event.target.classList.contains('quantity-input') || event.target.classList.contains('price-input')) {
            calculateTotals();
        }
    });

    serviceTableBody.addEventListener('click', (event) => {
        // Buscamos si el clic fue en un botón para eliminar (o en su ícono interior)
        const removeButton = event.target.closest('.remove-btn');
        if (removeButton) {
            // Buscamos la fila padre <tr> y la eliminamos
            removeButton.closest('tr').remove();
            // Recalculamos el total después de eliminar
            calculateTotals();
        }
    });

    // --- 5. CÁLCULO INICIAL ---
    // Llama a la función una vez al cargar la página para calcular los totales de los items existentes.
    calculateTotals();

    

});