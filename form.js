document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value || '',
        phonenumber: document.getElementById('phonenumber').value.trim(),
    };

    // Basic validation
    if (!data.name || !data.email || !data.password || !data.gender || !data.phonenumber) {
        alert('Please fill all fields.');
        return;
    }
    if (!/^\d{10}$/.test(data.phonenumber)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    fetch('https://script.google.com/macros/s/AKfycbwt763Jxys-2kNAgggExSXjPbTZGdogIZ7MBCeigJ6EjsDLW8pCDGfa0iL9f-TjCr-JyA/exec', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.result === 'success') {
            alert('Registration data saved successfully!');
            event.target.reset();
        } else {
            alert('Error saving data.');
        }
    })
    .catch(error => alert('Request failed: ' + error.message));
});
