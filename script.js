const fromLang = document.querySelector("#from-lang");
const toLang = document.querySelector("#to-lang");
const btnTranslate = document.querySelector("#btnTranslate");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const exchange = document.querySelector(".exchange");
const icons =document.querySelectorAll(".icons");


for (let lang in languages) {
    // console.log(lang,languages[lang]);
    //Dilleri ekleme
    let option = `<option value="${lang}">${languages[lang]}</option>`
    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);
    //default değerleri ekleme
    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
};
//btnTranslate Actions
btnTranslate.addEventListener("click", () => {
    let text = fromText.value;
    let fromLng = fromLang.value;
    let toLng = toLang.value;
    //Api Access
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLng}|${toLng}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        });
});
//exchange icon events
exchange.addEventListener("click", () => {
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
});

for(let icon of icons){
    icon.addEventListener("click", (element) =>{
        if(element.target.classList.contains("fa-copy")){
            if(element.target.id =="from"){
                //Texti kullanıcı panosuna kopyalama (ctrl+c)
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            //Sesli okuma için kod blogu web speech api kullanabilirz
            let voice;
            if(element.target.id =="from"){
                voice = new SpeechSynthesisUtterance(fromText.value);
                voice.lang=fromLang.value;//dil seçeneği için
            }else{
               voice = new SpeechSynthesisUtterance(toText.value);
               voice.lang=toLang.value; 
            }
            speechSynthesis.speak(voice);
        }
    });
}



