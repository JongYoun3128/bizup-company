// 연락처 저장 기능 (vCard 형식)
function saveContact() {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:손광명
N:손;광명;;;
ORG:주식회사 제이엠비라이프
TITLE:대표
TEL;TYPE=CELL:010-7611-9525
EMAIL:skmok3927@naver.com
ADR;TYPE=WORK:;;연삼로 714 1층;연삼로;제주시;;제주
URL:${window.location.href}
END:VCARD`;

    const blob = new Blob([vCard], {
        type: "text/vcard;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "주식회사 제이엠비라이프_손광명_대표.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    alert("연락처가 다운로드되었습니다!");
}

// 카카오톡 공유
function shareKakao() {
    const shareUrl = "https://jongyoun3128.github.io/bizup-gabi/";
    const text = "손광명 디지털 명함";
    const message = `${text}\n${shareUrl}`;

    // 모바일에서 Web Share API 사용 (카카오톡 포함)
    if (navigator.share) {
        navigator
            .share({
                title: text,
                text: text,
                url: shareUrl,
            })
            .then(() => {
                console.log("공유 성공");
                closeShareModal();
            })
            .catch((error) => {
                console.log("공유 취소 또는 실패:", error);
                // Web Share 실패시 카카오톡 URL 스킴 사용
                fallbackKakaoShare(message);
            });
    } else {
        // Web Share API 미지원시 카카오톡 URL 스킴 직접 사용
        fallbackKakaoShare(message);
    }
}

// 카카오톡 URL 스킴을 사용한 공유 (폴백)
function fallbackKakaoShare(message) {
    const kakaoUrl = `kakaotalk://send?text=${encodeURIComponent(message)}`;

    // 카카오톡 앱 열기 시도
    const openKakao = window.open(kakaoUrl, "_self");

    // 1초 후 카카오톡이 열리지 않으면 링크 복사 제안
    setTimeout(() => {
        if (
            confirm(
                "카카오톡이 설치되어 있지 않거나 열 수 없습니다.\n링크를 복사하시겠습니까?",
            )
        ) {
            copyToClipboard("https://jongyoun3128.github.io/bizup-gabi/");
        }
    }, 1000);

    closeShareModal();
}

// 인스타그램 공유
function shareInstagram() {
    const url = window.location.href;

    // 모바일에서 인스타그램 앱으로 이동
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        )
    ) {
        // 인스타그램 앱 열기
        window.location.href = "instagram://";

        setTimeout(() => {
            alert(
                "인스타그램 앱에서 스토리나 게시물을 작성할 때\n명함 링크를 붙여넣어 주세요!\n\n링크가 클립보드에 복사되었습니다.",
            );
            copyToClipboard(url);
        }, 500);
    } else {
        // PC에서는 링크 복사
        copyToClipboard(url);
        alert(
            "명함 링크가 복사되었습니다!\n인스타그램 DM이나 프로필에 붙여넣어 주세요.",
        );
    }

    closeShareModal();
}

// 라인 공유
function shareLine() {
    const url = window.location.href;
    const text = "주식회사 제이엠비라이프 손광명 대표의 명함입니다";

    const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(
        text + "\n" + url,
    )}`;
    window.open(lineUrl, "_blank");

    closeShareModal();
}

// 이메일 공유
function shareEmail() {
    const subject = "주식회사 제이엠비라이프 - 손광명 대표 명함";
    const body = `주식회사 제이엠비라이프 손광명 대표의 명함입니다.

회사: POINTGROUND
대표: 손광명
전화: 010-7611-9525
이메일: matching25.skmok3927@naver.com
주소: 금천구 가산동 벚꽃로 286 삼성리더스타워 1101호

명함 보기: ${window.location.href}`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
        subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    closeShareModal();
}

// 문자 메시지 공유
function shareSMS() {
    const text = `POINTGROUND 손광명 대표의 명함입니다.\n\n전화: 010-7611-9525\n이메일: matching25.skmok3927@naver.com\n\n명함 보기: ${window.location.href}`;

    // iOS와 Android 모두 지원
    const smsUrl = `sms:?body=${encodeURIComponent(text)}`;
    window.location.href = smsUrl;

    closeShareModal();
}

// URL 클립보드 복사
function copyToClipboard() {
    const url = window.location.href;

    if (navigator.clipboard) {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                alert("명함 링크가 복사되었습니다!");
            })
            .catch(() => {
                fallbackCopyToClipboard(url);
            });
    } else {
        fallbackCopyToClipboard(url);
    }
}

// 클립보드 복사 fallback
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand("copy");
        alert("명함 링크가 복사되었습니다!");
    } catch (err) {
        alert("링크 복사 실패. URL을 수동으로 복사해주세요:\n" + text);
    }

    document.body.removeChild(textArea);
}

// 다국어 번역 데이터
const translations = {
    ko: {
        position: "대표",
        name: "손 광 명",
        address: "제주 제주시 연삼로 714",
        tagline: "Business &<br /> Consulting",
        save_contact: "연락처 저장",
        kakao: "카카오톡",
        insta: "인스타그램",
        line: "라인",
        email: "이메일",
        sms: "메시지",
    },

    en: {
        position: "CEO",
        name: "Kwangmyeong Son",
        address: "714 Yeonsam-ro, Jeju-si, Jeju ",
        tagline: "Business &<br /> Consulting",
        save_contact: "Save Contact",
        kakao: "KakaoTalk",
        insta: "Instagram",
        line: "LINE",
        email: "Email",
        sms: "Message",
    },

    ja: {
        position: "代表",
        name: "ソン・グァンミョン",
        address: "済州特別自治道 済州市 ヨンサムロ 714",
        tagline: "ビジネス &<br /> コンサルティング",
        save_contact: "連絡先を保存",
        kakao: "カカオトーク",
        insta: "インスタグラム",
        line: "LINE",
        email: "メール",
        sms: "メッセージ",
    },

    zh: {
        position: "代表",
        name: "孙光明",
        address: "韩国 济州特别自治道 济州市 延三路 714",
        tagline: "商务 &<br /> 咨询",
        save_contact: "保存联系人",
        kakao: "KakaoTalk",
        insta: "Instagram",
        line: "LINE",
        email: "电子邮件",
        sms: "短信",
    },

    fr: {
        position: "PDG",
        name: "Son Gwangmyeong",
        address: "714 Yeonsam-ro, Jeju-si, Jeju ",
        tagline: "Business &<br /> Conseil",
        save_contact: "Enregistrer le contact",
        kakao: "KakaoTalk",
        insta: "Instagram",
        line: "LINE",
        email: "E-mail",
        sms: "Message",
    },

    de: {
        position: "Geschäftsführer",
        name: "Son Gwangmyeong",
        address: "Yeonsam-ro 714, Jeju-si, Jeju ",
        tagline: "Business &<br /> Consulting",
        save_contact: "Kontakt speichern",
        kakao: "KakaoTalk",
        insta: "Instagram",
        line: "LINE",
        email: "E-Mail",
        sms: "Nachricht",
    },

    es: {
        position: "Director General",
        name: "Son Gwangmyeong",
        address: "714 Yeonsam-ro, Jeju-si, Jeju ",
        tagline: "Negocios &<br /> Consultoría",
        save_contact: "Guardar contacto",
        kakao: "KakaoTalk",
        insta: "Instagram",
        line: "LINE",
        email: "Correo",
        sms: "Mensaje",
    },

    it: {
        position: "Amministratore Delegato",
        name: "Son Gwangmyeong",
        address: "714 Yeonsam-ro, Jeju-si, Jeju ",
        tagline: "Business &<br /> Consulenza",
        save_contact: "Salva contatto",
        kakao: "KakaoTalk",
        insta: "Instagram",
        line: "LINE",
        email: "Email",
        sms: "Messaggio",
    },

    pt: {
        position: "CEO",
        name: "Son Gwangmyeong",
        address: "714 Yeonsam-ro, Jeju-si, Jeju",
        tagline: "Negócios &<br /> Consultoria",
        save_contact: "Salvar contato",
        kakao: "KakaoTalk",
        insta: "Instagram",
        line: "LINE",
        email: "E-mail",
        sms: "Mensagem",
    },

    ru: {
        position: "Генеральный директор",
        name: "Сон Кванмён",
        address: "714 Ёнсам-ро, г. Чеджу, о-в Чеджу ",
        tagline: "Бизнес &<br /> Консалтинг",
        save_contact: "Сохранить контакт",
        kakao: "KakaoTalk",
        insta: "Instagram",
        line: "LINE",
        email: "Эл. почта",
        sms: "Сообщение",
    },
};

// 현재 언어 설정
let currentLang = "ko";

// 언어 변경 함수
function changeLanguage(lang) {
    currentLang = lang;

    // 모든 번역 가능한 요소 찾기
    const elements = document.querySelectorAll("[data-translate]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-translate");
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // 활성 언어 버튼 표시
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.classList.remove("active");
    });
    document
        .querySelector(`.lang-btn[data-lang="${lang}"]`)
        .classList.add("active");

    // 로컬 스토리지에 저장
    localStorage.setItem("selectedLanguage", lang);
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function () {
    // 저장된 언어 불러오기
    const savedLang = localStorage.getItem("selectedLanguage") || "ko";
    changeLanguage(savedLang);

    // 언어 버튼에 이벤트 리스너 추가
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            const lang = this.getAttribute("data-lang");
            changeLanguage(lang);
        });
    });
});
