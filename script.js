document.addEventListener('DOMContentLoaded', () => {
    const receiveButton = document.getElementById('receiveButton');
    const returnButton = document.getElementById('returnButton');
    const receiveForm = document.getElementById('receiveForm');
    const returnForm = document.getElementById('returnForm');
    const receiveSerialNo = document.getElementById('receiveSerialNo');
    const receiveWeight = document.getElementById('receiveWeight');
    const returnSerialNo = document.getElementById('returnSerialNo');
    const returnWeight = document.getElementById('returnWeight');
    const receiveSubmit = document.getElementById('receiveSubmit');
    const returnSubmit = document.getElementById('returnSubmit');
    const receiveMessage = document.getElementById('receiveMessage');
    const returnMessage = document.getElementById('returnMessage');

    receiveButton.addEventListener('click', () => {
        receiveForm.style.display = 'block';
        returnForm.style.display = 'none';
    });

    returnButton.addEventListener('click', () => {
        returnForm.style.display = 'block';
        receiveForm.style.display = 'none';
    });

    receiveSubmit.addEventListener('click', () => {
        const serialNo = receiveSerialNo.value;
        const weight = receiveWeight.value;

        // Send data to the server to handle receiving cylinder
        fetch('https://cylinders.onrender.com/receive-cylinder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ serialNo, weight }),
        })
        .then((response) => response.json())
        .then((data) => {
            receiveMessage.textContent = data.message;
            receiveSerialNo.value = '';
            receiveWeight.value = '';
        });
    });

    returnSubmit.addEventListener('click', () => {
        const serialNo = returnSerialNo.value;
        const weight = returnWeight.value;

        // Send data to the server to handle returning cylinder
        fetch('https://cylinders.onrender.com/return-cylinder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ serialNo, weight }),
        })
        .then((response) => response.json())
        .then((data) => {
            returnMessage.textContent = data.message;
            returnSerialNo.value = '';
            returnWeight.value = '';
        });
    });
});