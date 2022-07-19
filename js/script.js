const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field");

let charIndex = 0;

function randomParagraph(){
    // buat dapat nomor index random dan bakal <= length paragraphs
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    // ambil random item dari array paragraphs, lalu di split semua karakternya + di add ke dalam span, habis itu masukkan kedalam tah P yang ada di HTML
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag
    });
    // fokusin input field keydown atau klik
    document.addEventListener("keydown", () =>(inpField.focus()));
    typingText.addEventListener("click", () =>(inpField.focus()));
}

function initTyping (){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(characters[charIndex].innerText === typedChar){
        // kalau user tekan huruf yang sama dengan paragraf maka akan ditambahkan kelas "correct" di setiap karakternya dalam HTML
        characters[charIndex].classList.add("correct");
    }else{
        characters[charIndex].classList.add("incorrect");
    }
    charIndex++; //buat naikkan charIndex supaya tau karakter selanjutnya benar atau salah
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
}

randomParagraph();
inpField.addEventListener("input", initTyping);