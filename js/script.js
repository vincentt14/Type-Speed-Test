const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping =0;

function randomParagraph(){
    // buat dapat nomor index random dan bakal <= length paragraphs
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // ambil random item dari array paragraphs, lalu di split semua karakternya + di add ke dalam span, habis itu masukkan kedalam tah P yang ada di HTML
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    // fokusin input field keydown atau klik
    document.addEventListener("keydown", () =>(inpField.focus()));
    typingText.addEventListener("click", () =>(inpField.focus()));
}

function initTyping (){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){ //kalau timer dah nyala, gaakan ngulang nyala lagi
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }
    
        // kalau user masih belum masukin karakter apapun atau tekan backspace
        if(typedChar == null){
            charIndex--; //decrement char index buat hapus
            // decrement mistakes hanya saat charIndex spans memiliki kelas Inccorrect
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        }else{
            if(characters[charIndex].innerText === typedChar){
                // kalau user tekan huruf yang sama dengan paragraf maka akan ditambahkan kelas "correct/incorrect" di setiap karakternya dalam HTML dan increment mistakes 
                characters[charIndex].classList.add("correct");
            }else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++; //buat naikkan charIndex supaya tau karakter selanjutnya benar atau salah
        }
    
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        // kalau wpm 0, kosong atau empty maka valuenya jado 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerHTML = charIndex - mistakes; //cpm gabakal count mistake
    } else{
        clearInterval(timer);
    }
}

function initTimer(){
    // kalau timeleft lebih bsr dri 0 maka timeleft akan decrement, else clear timer
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }else{
        inpField.value = "";
        clearInterval(timer)
    }
}

function resetGame(){
    // manggil function loadParagraph dan reset semua variabel dan eleent ke default
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerHTML = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);