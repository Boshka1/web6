document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsDiv = document.getElementById('options');
    const propertiesDiv = document.getElementById('properties');
    const optionSelect = document.getElementById('optionSelect');
    const propertyCheckbox = document.getElementById('propertyCheckbox');
    const totalPriceDisplay = document.getElementById('totalPrice');

    const prices = {
        type1: 100, // цена за единицу для типа 1
        type2: 200, // цена за единицу для типа 2
        type3: 300  // цена за единицу для типа 3
    };

    function updateVisibility() {
        const selectedType = document.querySelector('input[name="serviceType"]:checked').value;

        optionsDiv.classList.add('hidden');
        propertiesDiv.classList.add('hidden');

        if (selectedType === 'type1') {
            // Тип 1: ничего не показываем
        } else if (selectedType === 'type2') {
            // Тип 2: показываем только опции
            optionsDiv.classList.remove('hidden');
        } else if (selectedType === 'type3') {
            // Тип 3: показываем только свойства
            propertiesDiv.classList.remove('hidden');
        }

        calculateTotalPrice();
    }

    function calculateTotalPrice() {
        const quantity = parseInt(quantityInput.value) || 0; // Учитываем случай, если поле пустое
        const selectedType = document.querySelector('input[name="serviceType"]:checked').value;

        // Проверка на отрицательное количество
        if (quantity < 1) {
            totalPriceDisplay.textContent = 0; // Устанавливаем цену в 0, если количество отрицательное
            return;
        }

        let pricePerUnit = prices[selectedType];

        if (selectedType === 'type2' && optionSelect.value === 'option2') {
            pricePerUnit += 50; // Дополнительная стоимость для опции 2
        }

        if (selectedType === 'type3' && propertyCheckbox.checked) {
            pricePerUnit += 30; // Дополнительная стоимость для свойства
        }

        const totalPrice = pricePerUnit * quantity;
        totalPriceDisplay.textContent = totalPrice;
    }

    quantityInput.addEventListener('input', function() {
        // Убедимся, что количество не меньше 1
        if (this.value < 1) {
            this.value = 1; // Устанавливаем значение на 1, если меньше
        }
        calculateTotalPrice();
    });

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateVisibility();
            calculateTotalPrice();
        });
    });
    
    optionSelect.addEventListener('change', calculateTotalPrice);
    propertyCheckbox.addEventListener('change', calculateTotalPrice);

    // Инициализация
    quantityInput.value = ''; // Убираем начальное количество
    updateVisibility();
});