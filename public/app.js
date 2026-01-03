const API_BASE_URL = '/api/food-items';

// DOM Elements
const form = document.getElementById('foodItemForm');
const itemsList = document.getElementById('foodItemsList');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const formTitle = document.getElementById('formTitle');
const submitButton = document.getElementById('submitButton');
const cancelButton = document.getElementById('cancelButton');
const editItemIdInput = document.getElementById('editItemId');
const nameInput = document.getElementById('name');
const quantityInput = document.getElementById('quantity');
const expirationDateInput = document.getElementById('expirationDate');

// Utility: Calculate days until expiration
const getDaysUntilExpiration = (expirationDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(expirationDate);
    expDate.setHours(0, 0, 0, 0);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// Utility: Format date for display
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
};

// Check if item is expired
const isExpired = (expirationDate) => {
    const daysUntil = getDaysUntilExpiration(expirationDate);
    return daysUntil < 0;
};

// Check if item expires within 3 days (but not expired)
const isExpiringSoon = (expirationDate) => {
    const daysUntil = getDaysUntilExpiration(expirationDate);
    return daysUntil >= 0 && daysUntil <= 3;
};

// Show error message
const showError = (message) => {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 5000);
};

// Fetch all food items
const fetchFoodItems = async () => {
    try {
        loading.style.display = 'block';
        itemsList.style.display = 'none';
        
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch food items');
        }
        
        const items = await response.json();
        displayFoodItems(items);
    } catch (error) {
        showError(`Error: ${error.message}`);
        itemsList.innerHTML = '<div class="empty-state"><p>Failed to load food items. Please try again.</p></div>';
    } finally {
        loading.style.display = 'none';
        itemsList.style.display = 'grid';
    }
};

// Display food items
const displayFoodItems = (items) => {
    if (items.length === 0) {
        itemsList.innerHTML = '<div class="empty-state"><p>No food items yet. Add your first item above!</p></div>';
        return;
    }

    itemsList.innerHTML = items.map(item => {
        const expired = isExpired(item.expirationDate);
        const expiringSoon = isExpiringSoon(item.expirationDate);
        const daysUntil = getDaysUntilExpiration(item.expirationDate);
        
        let itemClass = 'food-item';
        if (expired) {
            itemClass += ' expired';
        } else if (expiringSoon) {
            itemClass += ' expiring-soon';
        }
        
        let statusText = '';
        if (daysUntil < 0) {
            statusText = `<span style="color: #e74c3c; font-weight: bold;">Expired ${Math.abs(daysUntil)} day(s) ago</span>`;
        } else if (daysUntil === 0) {
            statusText = '<span style="color: #ff9800; font-weight: bold;">Expires today!</span>';
        } else if (daysUntil === 1) {
            statusText = '<span style="color: #ff9800; font-weight: bold;">Expires tomorrow!</span>';
        } else if (daysUntil <= 3) {
            statusText = `<span style="color: #ff9800; font-weight: bold;">Expires in ${daysUntil} days</span>`;
        } else {
            statusText = `Expires in ${daysUntil} days`;
        }

        return `
            <div class="${itemClass}">
                <div class="item-info">
                    <div class="item-name">${escapeHtml(item.name)}</div>
                    <div class="item-details">
                        <div class="item-detail">
                            <strong>Quantity:</strong> ${item.quantity}
                        </div>
                        <div class="item-detail">
                            <strong>Expiration:</strong> ${formatDate(item.expirationDate)}
                        </div>
                        <div class="item-detail">
                            ${statusText}
                        </div>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-edit" onclick="editFoodItem('${item.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteFoodItem('${item.id}')">Delete</button>
                </div>
            </div>
        `;
    }).join('');
};

// Escape HTML to prevent XSS
const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// Reset form to add mode
const resetFormToAddMode = () => {
    editItemIdInput.value = '';
    form.reset();
    formTitle.textContent = 'Add New Food Item';
    submitButton.textContent = 'Add Item';
    cancelButton.style.display = 'none';
};

// Handle form submission (create or update)
const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const quantity = parseInt(formData.get('quantity'));
    const expirationDate = formData.get('expirationDate');
    const editItemId = editItemIdInput.value;

    if (!name || !quantity || !expirationDate) {
        showError('Please fill in all fields');
        return;
    }

    try {
        const url = editItemId ? `${API_BASE_URL}/${editItemId}` : API_BASE_URL;
        const method = editItemId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                quantity,
                expirationDate,
            }),
        });

        if (!response.ok) {
            let errorMessage = `Failed to ${editItemId ? 'update' : 'add'} food item`;
            try {
                const error = await response.json();
                errorMessage = error.error || errorMessage;
            } catch (e) {
                // If response is not JSON, use status text
                errorMessage = response.statusText || errorMessage;
            }
            throw new Error(errorMessage);
        }

        // Reset form
        resetFormToAddMode();
        
        // Refresh the list
        await fetchFoodItems();
    } catch (error) {
        showError(`Error: ${error.message}`);
    }
};

// Edit food item - populate form with item data
const editFoodItem = async (id) => {
    try {
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch food items');
        }
        
        const items = await response.json();
        const item = items.find(i => i.id === id);
        
        if (!item) {
            showError('Food item not found');
            return;
        }

        // Populate form with item data
        editItemIdInput.value = item.id;
        nameInput.value = item.name;
        quantityInput.value = item.quantity;
        
        // Format date for input (YYYY-MM-DD)
        const expirationDate = new Date(item.expirationDate);
        const year = expirationDate.getFullYear();
        const month = String(expirationDate.getMonth() + 1).padStart(2, '0');
        const day = String(expirationDate.getDate()).padStart(2, '0');
        expirationDateInput.value = `${year}-${month}-${day}`;
        
        // Update form UI for edit mode
        formTitle.textContent = 'Edit Food Item';
        submitButton.textContent = 'Update Item';
        cancelButton.style.display = 'block';
        
        // Scroll to form
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
        showError(`Error: ${error.message}`);
    }
};

// Cancel edit mode
const cancelEdit = () => {
    resetFormToAddMode();
};

// Delete food item
const deleteFoodItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete food item');
        }

        // Refresh the list
        await fetchFoodItems();
    } catch (error) {
        showError(`Error: ${error.message}`);
    }
};

// Make functions available globally
window.deleteFoodItem = deleteFoodItem;
window.editFoodItem = editFoodItem;

// Event listeners
form.addEventListener('submit', handleFormSubmit);
cancelButton.addEventListener('click', cancelEdit);

// Initialize: Fetch food items on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchFoodItems();
});

