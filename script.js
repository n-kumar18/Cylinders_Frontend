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

    receiveSubmit.addEventListener('click', async () =>{
        const serialNo = receiveSerialNo.value;
        const weight = receiveWeight.value;

        // Send data to the server to handle receiving cylinder
        await fetch('http://localhost:3000/receive-cylinder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ serialNo, weight }),
        })
        .then((response) => {
            // console.log('Response:', response); // Add this line
            return response.json();
        })
        .then((data) => {
            // console.log('Data:', data); // Add this line
            receiveMessage.textContent = data.message;
            receiveSerialNo.value = '';
            receiveWeight.value = '';
        })
        .catch((error) => {
            console.error('Error:', error); // Add this line
        });
        
    });

    returnSubmit.addEventListener('click', async () => {
        const serialNo = returnSerialNo.value;
        const weight = returnWeight.value;

        // Send data to the server to handle returning cylinder
        await fetch('http://localhost:3000/return-cylinder', {
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