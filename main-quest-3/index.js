function toggleDevice() {
    const container = document.getElementById('app-container');
    const btn = document.getElementById('device-toggle');

    if (container.classList.contains('mobile-view')) {
        container.classList.remove('mobile-view');
        btn.innerText = "Switch to Mobile View";
    } else {
        container.classList.add('mobile-view');
        btn.innerText = "Switch to Desktop View";
    }
}

function toggleMenu() {
    document.getElementById("dropdown-menu").classList.toggle("show");
}

// Close the menu if user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.user-avatar')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
