const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.quest-card');
// Lấy các phần tử
const modal = document.getElementById('modalOverlay');
const btnOpen = document.getElementById('btnOpenModal');
const btnClose = document.getElementById('btnCloseModal');
const btnPost = document.getElementById('btnPostQuest');
const questFeed = document.getElementById('questFeed');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Xử lý trạng thái Active của nút
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // 2. Lấy giá trị filter
        const filterValue = button.getAttribute('data-target');

        // 3. Lọc danh sách Card
        cards.forEach(card => {
            const cardLocation = card.getAttribute('data-location');

            if (filterValue === 'all' || filterValue === cardLocation) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});


// Mở Modal
btnOpen.onclick = () => {
    modal.style.display = 'flex';
};

// Đóng Modal
btnClose.onclick = () => {
    modal.style.display = 'none';
};

// Xử lý đăng Quest
btnPost.onclick = () => {
    const topic = document.getElementById('topicInput').value;
    const locValue = document.getElementById('locationInput').value;
    const locText = document.getElementById('locationInput').options[document.getElementById('locationInput').selectedIndex].text;
    const members = document.getElementById('memberInput').value;

    if (!topic || !members) {
        alert("Bạn điền thiếu thông tin rồi kìa!");
        return;
    }

    // Tạo Card mới
    const newCard = document.createElement('div');
    newCard.className = 'quest-card';
    newCard.setAttribute('data-location', locValue);
    newCard.innerHTML = `
        <span class="tag-location">${locText}</span>
        <div class="quest-title">🔥 ${topic}</div>
        <div class="quest-meta">Đang có: ${members} • Vừa xong</div>
    `;

    // Chèn vào đầu danh sách Quest
    questFeed.prepend(newCard);

    // Reset và đóng modal
    document.getElementById('topicInput').value = '';
    document.getElementById('memberInput').value = '';
    modal.style.display = 'none';
    
    // Tự động chuyển filter về "Tất cả" để thấy Quest mới
    document.querySelector('[data-target="all"]').click();
};
