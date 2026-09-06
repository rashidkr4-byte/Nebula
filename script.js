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
    if (!navContainer) return;
    navContainer.innerHTML = '';

    navCategories.forEach((cat, index) => {
        if (cat.url) {
            const link = document.createElement('a');
            link.href = cat.url;
            link.className = 'nav-tab';
            link.style.textDecoration = 'none';
            link.textContent = cat.label;
            navContainer.appendChild(link);
        } else {
            const button = document.createElement('button');
            button.className = `nav-tab ${index === 0 ? 'active' : ''}`;
            button.textContent = cat.label;
            
            button.addEventListener('click', () => {
                document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderItems(items, cat.category);
            });

            navContainer.appendChild(button);
        }
    });
}

function renderItems(items, category) {
    const container = document.getElementById('cards-container');
    if (!container) return;
    container.innerHTML = '';

    const filtered = category === 'all' 
        ? items 
        : items.filter(item => item.category === category);

    filtered.forEach(item => {
        const card = document.createElement('a');
        card.href = `bot.html?id=${item.id}`;
        card.className = 'card';
        card.style.textDecoration = 'none';
        card.style.display = 'block';
        card.innerHTML = `
            <span class="card-badge">${item.badge}</span>
            <h3 style="color: var(--text-main);">${item.title}</h3>
            <p>${item.description}</p>
        `;
        container.appendChild(card);
    });
}