document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        setupNavigation(data.navigation, data.items);
        renderItems(data.items, 'all');
    } catch (error) {
        console.error("Error loading data.json:", error);
    }
});

function setupNavigation(navCategories, items) {
    const navContainer = document.getElementById('nav-tabs');
    navContainer.innerHTML = '';

    navCategories.forEach((cat, index) => {
        const button = document.createElement('button');
        button.className = `nav-tab ${index === 0 ? 'active' : ''}`;
        button.textContent = cat.label;
        
        button.addEventListener('click', () => {
            // Update active state class on tabs
            document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Render filtered items
            renderItems(items, cat.category);
        });

        navContainer.appendChild(button);
    });
}

function renderItems(items, category) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    const filtered = category === 'all' 
        ? items 
        : items.filter(item => item.category === category);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <span class="card-badge">${item.badge}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        container.appendChild(card);
    });
}