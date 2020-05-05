var tahminAdet = 0; //oyuncununkaç kez tahminde bulunduğunututar
var sissayi;        //programın tutacağı sayı
var basamak=4;      //oyun düzeyinin basamak sayısı
var arti = 0 , eksi = 0;     //karşılaştırma için  
var txtOyuncuSayi = "";
var girRkmAdet = 0;
sayiTut();          //rastgele sayi tut
var sure = 0, saat = 0, dk = 0, sn = 0;

var timeout;
var kont = true;  //setInterval için
var interval;     //interval için
var x3 = document.getElementById("sesTada"); //click sesi çalması için

//zorluk grubundaki radio btonlara click olayı ekleme 
var elements = document.getElementsByName("zorluk");
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", radioSecilen);  
}

//rakamları dinle
rakamListener();

//rakamları dinleme fonksiyonu
function rakamListener(){
    var rakamlar = document.querySelectorAll(".rakam");
    for (let i = 0; i < rakamlar.length; i++) {
        rakamlar[i].addEventListener("click", rakamSecilen);    
    }
}

//bütün rakamları aktif rengine getir
function ramalarAktifRenk(){
    var rakamlar = document.querySelectorAll(".rakam");
    for (let i = 0; i < rakamlar.length; i++) {
        rakamlar[i].style.backgroundColor ="#93b5cc";       
    }
}


//oyuncunun girdiği sayıyı değerlendiren fonksiyon
function testet(){

    var sayi = document.getElementById("tahminBox").innerHTML;

    //Eksik sayi girme durumu
    var tmp = sayi + "";
    if(tmp.length < basamak) {
        uyariMesaj("Az rakam girdiniz!");   
        return;
    }

    //kullanıcı süresini başlat
    if(kont){
        interval = setInterval(sureGuncelle, 1000);
        kont = false;
    }
 
    /*
    if(!kuralKontrol(sayi)){
        alert("Girilien sayi kurala uygun olmalıdır");
        return;
    }
    */

    //Oyuncu sayısı ile program sayısının karşılaştırılması
    

    tahminAdet++;
    sonucUret(sayi);

    var element = document.getElementById("gecmis");
    var testSonucu = document.getElementById("sissayi");
    if(arti > 0 && eksi > 0){
        var txt1 = tahminAdet + ". " +sayi + " +" + arti + " -" + eksi;
        var txt = tahminAdet + ". " +sayi + " +" + arti + " -" + eksi + "<br>";
    }
    else if(arti > 0 && eksi == 0) {
        var txt1 = tahminAdet + ". " +sayi + " +" + arti;
        var txt = tahminAdet + ". " +sayi + " +" + arti + "<br>";
    }     
    else if(arti == 0 && eksi > 0){
        var txt1 = tahminAdet + ". " +sayi + " -" + eksi;
        var txt = tahminAdet + ". " +sayi + " -" + eksi + "<br>";
    }  
    else if(arti == 0 && eksi == 0){
        var txt1 = tahminAdet + ". " +sayi + " →  " + arti;
        var txt = tahminAdet + ". " +sayi + " →  " + arti + "<br>";
    }
        
    testSonucu.innerHTML = txt1;
    element.innerHTML += txt;    

    //girilen rakamlar pasif yapılmış dinleme bırakılmıştı
    //bunları aktif yap ve dinle
    rakamListener();
    ramalarAktifRenk();

    //yeni rakam girişi için girilen rakamları temizle
    txtOyuncuSayi = "";
    document.getElementById("tahminBox").innerText = txtOyuncuSayi;
    girRkmAdet = 0;
    
    

}

//basamak sayısına göre rastgele sayı saçer
function sayiTut(){
    var kont = false;
    //seçilen rastgele sayı kurala uyanakadar sayi seç
    do{
        //rastgele sayı seç
        switch (basamak) {
            case 3:
                sissayi = Math.floor(Math.random() * (987 - 102) + 102);
                break;
            case 4:
                sissayi = Math.floor(Math.random() * (9876 - 1023) + 1023); 
                break;
             case 5:
                sissayi = Math.floor(Math.random() * (98765 - 10234) + 10234);
                break;
            default:
                break;
        }
        //seçilen sayının kurala uygunluğunu kontrol eder
        kont = kuralKontrol(sissayi);
     }while(!kont);
     //alert(sissayi);
     //document.getElementById("sissayi").innerText = sissayi;
}

//seçilen sayının kurala uygunluğunu kontrol eder
function kuralKontrol(sayi){

    switch (basamak) {
        case 3:
            if(sayi < 102 || sayi > 987) return false;
            break;
        case 4:
            if(sayi < 1023 || sayi > 9876) return false;
            break;
         case 5:
            if(sayi < 10234 || sayi > 98765) return false;
            break;
        default:
            break;
    }

    //seçilen rastgele sayı kurala uyuyor mu? 
    sayi = sayi + "";   //sayi stringe dönüştü
    //alert(sissayi);
    var ele;
    for (let i = 0; i < basamak - 1; i++) {
        for (let j = i + 1; j < basamak; j++) {   
            //alert(sissayi[i] + "-" + sissayi[j]);
            if(sayi[i] == sayi[j]) {
                sayi = ""; 
                return false;    
            }
        }
    } 
    return true;
}

//Oyunun başlık bilgisi ve basamak sayısını değiştirir
function radioSecilen(event){
    var ids = event.target.id;
    console.log(ids);
    var ele =  document.getElementById("oyunadi");
    var sis = document.getElementById("sissayi");
    
    if(ids == "kolay"){
        ele.innerHTML = "Üç Basamaklı Sayı Bulma";    
        sis.innerHTML = "X X X";  
        basamak = 3;      
    }else if(ids == "orta"){
        ele.innerHTML = "Dört Basamaklı Sayı Bulma";  
        sis.innerHTML = "X X X X"; 
        basamak = 4;     
    }else if(ids == "uzman"){
        ele.innerHTML = "Beş Basamaklı Sayı Bulma";    
        sis.innerHTML = "X X X X X";  
        basamak = 5;       
    }
    //Geçmiş tahmin ekranını temizler
    txtOyuncuSayi="";
    document.getElementById("tahminBox").innerHTML = "";
    girRkmAdet = 0;
    rakamListener();
    ramalarAktifRenk();
    tahminAdet = 0;
    clearInterval(interval);
    sayiTut();
    
    //geçmiş ekranını temizle
    document.getElementById("gecmis").innerText = "";

}

//Oyuncu sayısı ile program sayısının karşılaştırılması
function sonucUret(sayi){
    
    sayi = sayi + "";  //karaktere çevirdi
    var sis = sissayi + "";
    arti = 0; eksi = 0;
    
    for (let i = 0; i < basamak; i++) {
        if(sis[i] == sayi[i]) arti++;  
        if(arti == basamak) {           //Bilme durumu
            clearInterval(interval);
            if(dk > 0){
                msg = "Tebrikler! <br>" + "Hamle : " + tahminAdet + "<br>Süreniz :" + dk + " dk. " + sn + " s"; 
              }else{
                 msg = "Tebrikler! <br>" + "Hamle : " + tahminAdet + "<br>Süreniz : "  + sn + " s"; 
              } 
            sonMesaj(msg); 
            return;
        }
    }
    for (let i = 0; i < basamak; i++) {
        for (let j = 0; j < basamak; j++) {
            if(i == j) continue;
            if(sis[i] == sayi[j]) eksi++;
        }   
    }
}
function rakamSecilen(event){
    //rakam id sini alır
    var idr = event.target.id;
    var girilenEle = document.getElementById(idr);
    var girilen = girilenEle.innerHTML;

    //basamak sayısından fazla rakam girilmesini engelleme
    girRkmAdet++;
    if(girRkmAdet > basamak) {girRkmAdet--; return;}
    
    //ilk rakam 0 olamaz
    if(girRkmAdet == 1 && girilen == "0") {girRkmAdet--; return;}
    txtOyuncuSayi += girilen;
    document.getElementById("tahminBox").innerHTML= txtOyuncuSayi;

    //daha önce girilen rakam pasif yapılır seçilemez
    girilenEle.removeEventListener("click", rakamSecilen);
    girilenEle.style.backgroundColor = "#637a8a";

}
//Sil tuşuna basılınca oyuncunun girdiği sayının son
//rakamını siler
function rakamSil(){
    //oyuncunun girdiği son rakam
    var sonRkm = txtOyuncuSayi.substr(txtOyuncuSayi.length-1,1);
    if(txtOyuncuSayi==0) return;
   

    txtOyuncuSayi = txtOyuncuSayi.substr(0,txtOyuncuSayi.length-1);
    document.getElementById("tahminBox").innerHTML= txtOyuncuSayi;
    girRkmAdet--;

    //daha önce pasif yapılan rakam aktif yapılır
    var ele = document.getElementById(sonRkm);
    ele.addEventListener("click", rakamSecilen);
    ele.style.backgroundColor ="#93b5cc";

}

//her saniye oyuncu süresini günceller
function sureGuncelle(){
    sure++;   
    saat = Math.floor(sure / 3600);
    dk = Math.floor(sure / 60);
    sn = sure - saat*3600 - dk*60;
    //document.getElementById("sure").innerHTML = "süre:" + saat+":" + dk+":" + sn;
 }

/* son mesaj ekranı popup */
function sonMesaj(mesaj) {
    playTada();
    document.getElementById("mesaj").classList.toggle("show");
    document.getElementById("mesaj").innerHTML = mesaj;
    setTimeout(function(){
        mesaj = "";
        document.getElementById("mesaj").innerHTML = mesaj;
        document.getElementById("mesaj").classList.toggle("show");
    },5000);
}

function playTada() { //Bildiğinde çalınacak ses
    x3.play(); 
  } 

/* Eksik rakam Uyarı mesaj ekranı popup */
function uyariMesaj(mesaj) {
    //playTada();
    document.getElementById("uyari").classList.toggle("show2");
    document.getElementById("uyari").innerHTML = mesaj;
    
    setTimeout(function(){
        mesaj = "";
        document.getElementById("uyari").innerHTML = mesaj;
        document.getElementById("uyari").classList.toggle("show2");
    },2000);    
}

//oyunu yeniden başlat
function restart(){
    location.reload();
 }