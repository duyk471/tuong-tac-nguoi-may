/* File: hi-fi/js/index.js */

// Khởi tạo các phần tử DOM
const modal = document.getElementById('modal');
const questFeed = document.getElementById('questFeed');
const userBadge = document.getElementById('userBadge');
const userDropdown = document.getElementById('userDropdown');
const btnOpen = document.getElementById('btnOpen');
const btnClose = document.getElementById('btnClose');
const btnPost = document.getElementById('btnPost');

// --- 1. Quản lý User Dropdown ---
if (userBadge && userDropdown) {
    userBadge.onclick = (e) => {
        e.stopPropagation();
        const isShowing = userDropdown.style.display === 'flex';
        userDropdown.style.display = isShowing ? 'none' : 'flex';
    };

    document.onclick = (e) => {
        if (!userBadge.contains(e.target)) {
            userDropdown.style.display = 'none';
        }
    };
}

// --- 2. Quản lý Modal (Tạo Quest) ---
const toggleModal = (show) => {
    if (modal) modal.style.display = show ? 'flex' : 'none';
};

if (btnOpen) btnOpen.onclick = () => toggleModal(true);
if (btnClose) btnClose.onclick = () => toggleModal(false);

// Đóng modal khi click ra ngoài vùng form
window.onclick = (event) => {
    if (event.target == modal) toggleModal(false);
};

// --- 3. Logic Lọc (Filter) ---
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
    btn.onclick = () => {
        // Cập nhật trạng thái Active của nút
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) activeBtn.classList.remove('active');
        btn.classList.add('active');

        const target = btn.getAttribute('data-target');
        const cards = document.querySelectorAll('.quest-card');

        cards.forEach(card => {
            // Lọc dựa trên data-location
            if (target === 'all' || card.dataset.location === target) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.4s ease'; // Thêm lại hiệu ứng khi hiện
            } else {
                card.style.display = 'none';
            }
        });
    };
});

// --- 4. Logic Đăng Quest mới ---
if (btnPost) {
    btnPost.onclick = () => {
        const topicInput = document.getElementById('topicIn');
        const locSelect = document.getElementById('locIn');
        
        const topic = topicInput.value.trim();
        const locValue = locSelect.value;
        const locText = locSelect.options[locSelect.selectedIndex].text;

        if (!topic) {
            alert("HANU-er ơi, đừng để trống chủ đề nhé!");
            return;
        }

        // Tạo cấu trúc Card Hi-fi
        const newCard = document.createElement('div');
        newCard.className = 'quest-card';
        newCard.dataset.location = locValue;
        newCard.innerHTML = `
            <div class="location-label">
                <i class="fa-solid fa-location-dot"></i> ${locText}
            </div>
            <div class="quest-title">🔥 ${topic}</div>
            <div class="quest-footer">
                <span class="member-count">👥 1/-- đang chờ</span>
                <button style="border:none; background:none; color:var(--hanu-blue); font-weight:700; cursor:pointer;">THAM GIA</button>
            </div>
        `;

        // Chèn vào đầu danh sách
        questFeed.prepend(newCard);

        // Reset Form & Đóng Modal
        topicInput.value = '';
        toggleModal(false);
        
        // Quay về tab "Tất cả" để người dùng thấy bài đăng mới ngay lập tức
        const allTab = document.querySelector('[data-target="all"]');
        if (allTab) allTab.click();
    };
}