const display = document.getElementById('display');
const historyList = document.getElementById('history');
const historyContainer = document.getElementById('historyContainer');
let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

// Gestion des événements clavier
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') appendToDisplay(e.key);
    if (['+', '-', '*', '/'].includes(e.key)) appendToDisplay(e.key);
    if (e.key === 'Enter') calculateResult();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
});

// Afficher/masquer l'historique
function toggleHistory() {
    historyContainer.classList.toggle('visible');
}

// Ajouter une valeur à l'affichage
function appendToDisplay(value) {
    display.value += value;
    display.classList.remove('error');
}

// Effacer l'affichage
function clearDisplay() {
    display.value = '';
    display.classList.remove('error');
}

// Supprimer le dernier caractère
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculer le résultat
function calculateResult() {
    try {
        const expression = display.value.replace(/×/g, '*');
        const result = eval(expression);
        
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Erreur de calcul');
        }
        
        display.value = result;
        addToHistory(`${expression} = ${result}`);
    } catch (error) {
        display.classList.add('error');
        display.value = 'Erreur';
        setTimeout(clearDisplay, 1000);
    }
}

// Ajouter une entrée à l'historique
function addToHistory(entry) {
    history.unshift(entry);
    if (history.length > 3) history.pop(); // Garder seulement 3 entrées
    localStorage.setItem('calcHistory', JSON.stringify(history));
    updateHistoryDisplay();
}

// Mettre à jour l'affichage de l'historique
function updateHistoryDisplay() {
    historyList.innerHTML = history
        .map(entry => `<li>${entry}</li>`)
        .join('');
}

// Initialiser l'historique au chargement
updateHistoryDisplay();