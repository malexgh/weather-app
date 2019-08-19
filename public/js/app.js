console.log('Client js');

const addressForm = document.querySelector('form');
const addressInput = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');
addressForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'Loading...';
    message2.textContent = '';
    const address = addressInput.value;
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
                return;
            }
            message1.textContent = data.location;
            message2.textContent = data.forecast;
        });
    });
});
