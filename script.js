document.getElementById('seedForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const serverSeed = document.getElementById('serverSeed').value;
    const clientSeed1 = document.getElementById('clientSeed1').value;
    const clientSeed2 = document.getElementById('clientSeed2').value;
    const clientSeed3 = document.getElementById('clientSeed3').value;
    
    const combinedSeed = serverSeed + clientSeed1 + clientSeed2 + clientSeed3;
    
    // Perform SHA512 hash
    const hashBuffer = new TextEncoder().encode(combinedSeed);
    crypto.subtle.digest('SHA-512', hashBuffer).then(hash => {
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        const hexResult = hashHex.slice(0, 14);
        const decimalResult = BigInt('0x' + hexResult).toString();
        
        const finalResult = (parseInt(decimalResult) / Math.pow(10, 12)).toFixed(2);
        
        // Classification
        let classification = '';
        if (finalResult < 2.00) {
            classification = 'Azul';
            document.getElementById('classification').className = 'blue';
        } else if (finalResult < 10.00) {
            classification = 'Roxo';
            document.getElementById('classification').className = 'purple';
        } else {
            classification = 'Rosa';
            document.getElementById('classification').className = 'pink';
        }
        
        // Display Results
        document.getElementById('hashResult').textContent = 'Hash SHA512: ' + hashHex;
        document.getElementById('hexResult').textContent = 'Hex: ' + hexResult;
        document.getElementById('decimalResult').textContent = 'Decimal: ' + decimalResult;
        document.getElementById('finalResult').textContent = 'Resultado: ' + finalResult;
        document.getElementById('classification').textContent = 'Classificação: ' + classification;
    });
});

// Function to fetch current time and display protection message
function fetchTimeAndProtection() {
    const siteUrl = 'https://www.placard.co.mz/player-portal/';
    
    // Fetch current time
    fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
        .then(response => response.json())
        .then(data => {
            const currentTime = new Date(data.datetime);
            document.getElementById('time').textContent = 'Horário das Entradas: ' + currentTime.toLocaleTimeString();
            document.getElementById('protection').textContent = 'Proteção Ativada - ' + siteUrl;
        });
}

// Call fetchTimeAndProtection on page load
window.onload = function() {
    fetchTimeAndProtection();
};