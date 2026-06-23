// bgm.js

// 1. Lấy cấu hình từ LocalStorage
// Nếu chưa từng cài đặt, mặc định sẽ là 'nhac-nen.mp3'
const savedMusic = localStorage.getItem('musicUrl') || "nhac-nen2.mp3";
const musicStatus = localStorage.getItem('musicStatus') || "playing"; // Mặc định là bật

const player = document.createElement('audio');
player.id = "bgm-player";
player.loop = true;
player.src = savedMusic; // Gán bài hát dựa trên cấu hình đã lưu
player.style.display = "none";
document.body.appendChild(player);

// Liên tục lưu vị trí nhạc
player.ontimeupdate = () => {
    localStorage.setItem('musicCurrentTime', player.currentTime);
};

window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split("/").pop();

    // KIỂM TRA: Nếu về trang chủ
    if (currentPage === "index.html" || currentPage === "") {
        player.pause();
        player.currentTime = 0;
        localStorage.setItem('musicCurrentTime', 0);
        console.log("Dừng nhạc tại trang chủ");
    }
    // Nếu vào trang nội dung
    else {
        // Nếu trong cài đặt đang chọn TẮT nhạc thì không làm gì cả
        if (musicStatus === "paused") return;

        // Phục hồi thời gian cũ
        const savedTime = localStorage.getItem('musicCurrentTime');
        if (savedTime) player.currentTime = parseFloat(savedTime);

        // Hàm ép phát nhạc (vì trình duyệt hay chặn)
        const playMusic = () => {
            player.play().catch(() => {
                // Nếu bị chặn, đợi bé click 1 cái vào màn hình là hát luôn
                document.addEventListener('click', () => {
                    player.play();
                }, { once: true });
            });
        };

        playMusic();
    }
});