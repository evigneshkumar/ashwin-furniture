const materialSections = document.querySelectorAll('.material-section');

const materialIcons = {
    'Handle': 'icon-handle',
    'Hinges': 'icon-hinges',
    // ... define icons for other types
};

// Initialize the total price
let totalPrice = 0.00;
let quantityDisplay; // Declare quantityDisplay globally accessible

materialSections.forEach(section => {
    const addRowButton = section.querySelector('.add-row-btn');
    const removeRowButton = section.querySelector('.remove-row-btn');
    const tableBody = section.querySelector('tbody');

    addRowButton.addEventListener('click', () => {
        const newRow = document.createElement('tr');

        const materialCell = document.createElement('td');
        const quantityCell = document.createElement('td');
        const priceCell = document.createElement('td');

        let quantityDisplay = document.createElement('span'); // Declare quantityDisplay here
        quantityDisplay.textContent = '1'; // Default quantity

        const materialData = {
            wood: {
                types: ['19mm Commercial', '19mm Waterproof', '18mm Commercial', '18mm Waterproof','12mm Commercial', '12mm Waterproof'],
                sizes: ['8 * 4', '6 * 3'],
                prices: [3200, 1920]
            },
            adhesive: {
                types: ['HeatX', 'Fevicol', 'Edge band tape'],
                sizes: ['1 kg', '1 m'],
                prices: [250, 10]
            },
            screws: {
                types: ['Screws', 'Bolts', 'Nails'],
                sizes: ['2"','2.5"','3"'],
                prices: [1000, 1250, 1500]
            },
            attachments: {
                types: ['Handle', 'Hinges', 'Runner', 'Lock', 'Mirror', 'Steel Basket'],
                sizes: ['1 set', '2 sets', '1', '2'],
                prices: [1300,100,12000,100]
            },
            mica: {
                types: ['Inside - 0.8"', 'Outside - 0.8"', 'Inside - 1"', 'Outside - 1"'],
                sizes: ['8 * 4', '6 * 3'],
                prices: [1200,600]
            }
            // Add more material data
        };
        //base
        const materialType = section.dataset.material;
        const materialDropdown = createDropdown(materialData[materialType].types, materialIcons);
        const sizeDropDown = createDropdown(materialData[materialType].sizes);

        materialCell.appendChild(materialDropdown);
        quantityCell.appendChild(sizeDropDown);

        const priceSpan = document.createElement('price-span'); // Create priceSpan for displaying price
        priceSpan.textContent = materialData[materialType].prices[0];
        priceCell.appendChild(priceSpan); // Attach priceSpan to priceCell


        const editPriceButton = document.createElement('span');
        editPriceButton.textContent = '  ✎';
        editPriceButton.classList.add('edit-price');

        editPriceButton.addEventListener('click', () => {
            const newPrice = prompt('Enter new price:');
            if (newPrice !== null) {
                const oldPrice = parseFloat(priceSpan.textContent);
                const newPriceFloat = parseFloat(newPrice);
                const selectedQuantity = parseFloat(quantityDisplay.textContent);

                // Calculate the total price change due to the price modification
                const priceChangeDueToPrice = (newPriceFloat - oldPrice) * selectedQuantity;

                // Update the total price
                totalPrice += priceChangeDueToPrice;
                updateTotalPrice();

                // Update the displayed price in the table
                priceSpan.textContent = newPriceFloat;
            }
        });

        priceCell.appendChild(editPriceButton);

        const originalPriceInput = document.createElement('input'); // Hidden input for original price
        originalPriceInput.type = 'hidden';
        originalPriceInput.value = materialData[materialType].prices[0];
        priceCell.appendChild(originalPriceInput);

        priceSpan.textContent = materialData[materialType].prices[0];
        priceCell.appendChild(priceSpan);
        newRow.appendChild(priceCell);


        // Update the total price
        const selectedPrice = parseFloat(priceSpan.textContent);
        totalPrice += selectedPrice;
        updateTotalPrice();

        
        // Inside addRowButton.addEventListener
        const numberCell = document.createElement('td');
        const quantityWrapper = document.createElement('div');
        quantityWrapper.classList.add('quantity-wrapper');

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', () => {
            updateQuantity(-1, priceSpan, quantityDisplay); // Pass priceSpan and quantityDisplay
            const rows = tableBody.querySelectorAll('tr');
            if (rows.length > 0) {
                const lastRow = rows[rows.length - 1];
                const selectedQuantity3 = parseFloat(lastRow.querySelector('td:first-child span').textContent);
                if(selectedQuantity3==0){
                    lastRow.remove();
                }
            }
        });

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () => {
            updateQuantity(1, priceSpan, quantityDisplay); // Pass priceSpan and quantityDisplay
        });

        quantityDisplay = document.createElement('span'); // Declare globally
        quantityDisplay.textContent = '1'; // Default quantity

        quantityWrapper.appendChild(minusButton);
        quantityWrapper.appendChild(quantityDisplay);
        quantityWrapper.appendChild(plusButton);

        numberCell.appendChild(quantityWrapper);
        newRow.appendChild(numberCell);


        sizeDropDown.addEventListener('change', () => {
            const selectedPrice = parseFloat(priceSpan.textContent); // Use the price for the specific row
            const selectedQuantity = parseFloat(sizeDropDown.value);
            const oldQuantity = parseFloat(quantityDisplay.textContent);
            const oldCharges = selectedPrice * oldQuantity;
            let selectedIndexOfMaterial;
            for(let i=0;i<materialData[materialType].sizes.length;i++){
                let text = materialData[materialType].sizes[i];
                if(materialType == "screws"){
                    let updatedScrewSize = selectedQuantity+"\"";
                 if(text==updatedScrewSize){
                    selectedIndexOfMaterial = i;
                 }
                }else if(text.startsWith(selectedQuantity)){
                    selectedIndexOfMaterial = i;
                }
            }
            priceSpan.textContent = materialData[materialType].prices[selectedIndexOfMaterial];
            priceCell.appendChild(priceSpan); 
            const newlyUpatedPrice = parseFloat(materialData[materialType].prices[selectedIndexOfMaterial]);
            const newCharges = newlyUpatedPrice * oldQuantity;
            totalPrice -= oldCharges;
            totalPrice += newCharges;
            updateTotalPrice();
    });

        newRow.appendChild(materialCell);
        newRow.appendChild(quantityCell);
        newRow.appendChild(priceCell);

        tableBody.appendChild(newRow);
    });

    // Inside your removeRowButton event listener
    removeRowButton.addEventListener('click', () => {
        const rows = tableBody.querySelectorAll('tr');
        if (rows.length > 0) {
            const lastRow = rows[rows.length - 1];
            const removedPrice = parseFloat(lastRow.querySelector('td:last-child price-span').textContent);
            const selectedQuantity1 = parseFloat(lastRow.querySelector('td:first-child span').textContent);
            if(selectedQuantity1>=1){
                totalPrice -= removedPrice;
            }
            updateTotalPrice();
            lastRow.remove();
        }
    });
});

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;
}

function createDropdown(options, icons = {}) {
    const dropdown = document.createElement('select');
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;

        if (icons[option]) {
            const iconElement = document.createElement('i');
            iconElement.classList.add('material-icon', icons[option]);
            optionElement.appendChild(iconElement);
        }

        dropdown.appendChild(optionElement);
    });
    return dropdown;
}

function updateQuantity(change, priceSpan, quantityDisplay) {
    const currentQuantity = parseFloat(quantityDisplay.textContent);
    const newQuantity = currentQuantity + change;
    const selectedPrice = parseFloat(priceSpan.textContent); // Use the displayed price, not the hidden input

    if (newQuantity >= 0) {
        const priceChange = selectedPrice * change;
        totalPrice += priceChange;
        updateTotalPrice();
        quantityDisplay.textContent = newQuantity;
    }
}
