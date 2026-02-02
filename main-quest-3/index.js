function toggleDevice() {
    const container = document.getElementById('app-container');
    const btn = document.querySelector('.toggle-btn');

    if (container.classList.contains('mobile-view')) {
        container.classList.remove('mobile-view');
        btn.innerText = "Switch to Mobile View";
    } else {
        container.classList.add('mobile-view');
        btn.innerText = "Switch to Desktop View";
    }
}