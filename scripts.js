const materialSections = document.querySelectorAll('.material-section');

const materialIcons = {
    'Handle': 'icon-handle',
    'Hinges': 'icon-hinges',
    // ... define icons for other types
};

// Initialize the total price
let totalPrice = 0;

materialSections.forEach(section => {
    const addRowButton = section.querySelector('.add-row-btn');
    const removeRowButton = section.querySelector('.remove-row-btn');
    const tableBody = section.querySelector('tbody');

// add row 
    addRowButton.addEventListener('click', () => {
        const newRow = document.createElement('tr');

        const materialCell = document.createElement('td');
        const quantityCell = document.createElement('td');
        const priceCell = document.createElement('td');

        const materialData = {
            wood: {
                types: ['19mm Commercial', '19mm Waterproof', '18mm Commercial', '18mm Waterproof'],
                sizes: ['8 * 4', '6 * 3'],
                prices: [3800, 5000, 2800, 4000]
            },
            adhesive: {
                types: ['HeatX', 'Fevicol', 'Edge band tape'],
                sizes: ['1 kg', '2 kg', '3 kg'],
                prices: [1500, 500, 2500, 900]
            },
            screws: {
                types: ['Screws', 'Bolts', 'Nails'],
                sizes: ['2"','2 ½"','3"'],
                prices: [5, 10, 15]
            },
            attachments: {
                types: ['Handle', 'Hinges', 'Runner', 'Lock'],
                sizes: ['1 set', '2 sets', '1', '2'],
                prices: [3, 6, 4, 8]
            },
            mica: {
                types: ['Inside - 0.8"', 'Outside - 0.8"', 'Inside - 1"', 'Outside - 1"'],
                sizes: ['8 * 4'],
                prices: [20, 40, 30, 60]
            }
            // Add more material data
        };



        const materialType = section.dataset.material;
        const materialDropdown = createDropdown(materialData[materialType].types, materialIcons);
        const quantityDropdown = createDropdown(materialData[materialType].sizes);

        materialCell.appendChild(materialDropdown);
        quantityCell.appendChild(quantityDropdown);

        const editPriceButton = document.createElement('span');
        editPriceButton.textContent = '  ✎';
        editPriceButton.classList.add('edit-price');

        const priceText = document.createElement('span');
        priceText.textContent = materialData[materialType].prices[0];

        editPriceButton.addEventListener('click', () => {
            const newPrice = prompt('Enter new price:');
            if (newPrice !== null) {
                const oldPrice = parseFloat(priceText.textContent);
                priceText.textContent = newPrice;
                const newPriceFloat = parseFloat(newPrice);
                totalPrice = totalPrice - oldPrice + newPriceFloat; // Update total price
                updateTotalPrice();
            }
        });
        


        priceCell.appendChild(priceText);
        priceCell.appendChild(editPriceButton);

        // Update the total price
        const selectedPrice = parseFloat(priceText.textContent);
        totalPrice += selectedPrice;
        updateTotalPrice();
        
        // Inside addRowButton.addEventListener
        const numberCell = document.createElement('td');
        numberCell.textContent = 1; // Default quantity
        newRow.appendChild(numberCell);

        quantityDropdown.addEventListener('change', () => {
            const selectedPrice = parseFloat(priceText.textContent);
            const selectedQuantity = parseFloat(quantityDropdown.value);
            totalPrice -= selectedPrice * parseFloat(numberCell.textContent); // Deduct old total price
            numberCell.textContent = selectedQuantity;
            totalPrice += selectedPrice * selectedQuantity; // Add the new total price
            updateTotalPrice();
        });


        newRow.appendChild(materialCell);
        newRow.appendChild(quantityCell);
        newRow.appendChild(priceCell);

        tableBody.appendChild(newRow);
    });

    removeRowButton.addEventListener('click', () => {
        const rows = tableBody.querySelectorAll('tr');
        if (rows.length > 0) {
            const lastRow = rows[rows.length - 1];
            const priceCell = lastRow.querySelector('td:last-child');
            const removedPrice = parseFloat(priceCell.querySelector('span:first-child').textContent);
            totalPrice -= removedPrice;
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

// ... Your existing code ...

// ... Your existing code ...

// Adding the Download PDF button
// const downloadButton = document.createElement('button');
// downloadButton.textContent = 'Download PDF';
// downloadButton.className = 'download-pdf'; // Adding a class for styling

// Adding an event listener for the "Download PDF" button
/* downloadButton.addEventListener('click', () => {
    const element = document.querySelector('main');
    console.log="download button clicked";
    // Using html2pdf to generate the PDF
    html2pdf()
        .from(element)
        .save('Ashwin_Furniture.pdf');
});

// Inserting the Download PDF button after the main element
const mainElement = document.querySelector('main');
mainElement.insertAdjacentElement('afterend', downloadButton);

downloadButton.addEventListener('click', async () => {
    const element = document.querySelector('main');
    
    const pdfBlob = await html2pdf().from(element).outputPdf();
    const blobUrl = URL.createObjectURL(pdfBlob);
    
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'Ashwin_Furniture.pdf';
    a.click();
    
    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl);
});
 */