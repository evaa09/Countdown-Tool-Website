let countdownInterval; // Stores the countdown timer interval

// Event listener for selecting a date and starting the countdown
document.getElementById('dateInput').addEventListener('change', function() {
    clearInterval(countdownInterval); // Clear previous countdown
    startCountdown(new Date(this.value)); // Start a new countdown
});

// Function to start and update the countdown
function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) { // If countdown reaches 0, stop updating
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            clearInterval(countdownInterval);
            return;
        }

        // Calculate remaining time and update display
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('hours').innerText = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        document.getElementById('minutes').innerText = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
        document.getElementById('seconds').innerText = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
    }

    updateCountdown(); // Initial call to display correct time
    countdownInterval = setInterval(updateCountdown, 1000); // Update countdown every second
}

// Handle file upload for background image or video
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file
    if (!file) return;

    const url = URL.createObjectURL(file); // Create a URL for the file
    const background = document.getElementById('background');

    if (file.type.startsWith('video')) {
        background.src = url;
        background.style.display = 'block';
    } else if (file.type.startsWith('image')) {
        document.body.style.background = `url('${url}') center/cover no-repeat`;
        background.style.display = 'none';
    }
});

// Function to update text colors
function updateColors() {
    document.getElementById('days').style.color = document.getElementById('dayColorInput').value;
    document.getElementById('hours').style.color = document.getElementById('hourColorInput').value;
    document.getElementById('minutes').style.color = document.getElementById('minuteColorInput').value;
    document.getElementById('seconds').style.color = document.getElementById('secondColorInput').value;
}

// "Colour All" checkbox event listener
document.getElementById('colorAll').addEventListener('change', function() {
    if (this.checked) {
        let color = document.getElementById('dayColorInput').value;
        document.getElementById('hourColorInput').value = color;
        document.getElementById('minuteColorInput').value = color;
        document.getElementById('secondColorInput').value = color;
    }
    updateColors(); // Apply new colors
});

// Event listeners for color inputs
document.getElementById('dayColorInput').addEventListener('input', function() {
    if (document.getElementById('colorAll').checked) { // Sync all colors if "Colour All" is checked
        document.getElementById('hourColorInput').value = this.value;
        document.getElementById('minuteColorInput').value = this.value;
        document.getElementById('secondColorInput').value = this.value;
    }
    updateColors();
});

document.getElementById('hourColorInput').addEventListener('input', updateColors);
document.getElementById('minuteColorInput').addEventListener('input', updateColors);
document.getElementById('secondColorInput').addEventListener('input', updateColors);

// Event listener for changing the countdown text size
document.getElementById('sizeInput').addEventListener('input', function() {
    document.getElementById('countdown').style.fontSize = this.value + 'px';
});

updateColors(); // Initialize colors on page load
