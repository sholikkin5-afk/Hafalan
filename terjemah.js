// File: terjemah.js - Taruh sejajar sama index.html
window.terjemahData = window.terjemahData || {
  baqarah: {
    1: "Alif Lam Mim."},
  aliimron: { 
    1: "Alif Lam Mim."
  },
  annisa: { 
    1: "Wahai manusia! Bertakwalah kepada Tuhanmu yang telah menciptakan kamu dari diri yang satu (Adam)." 
  }
};
(function(){
  const MAP={baqarah:2,aliimron:3,annisa:4};
  const KEY="terjemah_cache_v1";
  try{
    let c=JSON.parse(localStorage.getItem(KEY)||"{}");
    for(let k in c){
      if(!window.terjemahData[k])window.terjemahData[k]={};
      Object.assign(window.terjemahData[k],c[k]);
    }
  }catch(e){}

  async function fetchSurat(k){
    let no=MAP[k];if(!no)return;
    try{
      let r=await fetch(`https://equran.id/api/v2/surat/${no}`);
      let j=await r.json();
      if(!j.data||!j.data.ayat)return;
      if(!window.terjemahData[k])window.terjemahData[k]={};
      j.data.ayat.forEach(a=>{
        let arti=(a.teksIndonesia||"").replace(/<[^>]*>/g,'').trim();
        if(arti)window.terjemahData[k][a.nomorAyat]=arti;
      });
      let cache={};
      try{cache=JSON.parse(localStorage.getItem(KEY)||"{}");}catch(e){}
      cache[k]=window.terjemahData[k];
      localStorage.setItem(KEY,JSON.stringify(cache));
      console.log(`✅ ${k} ${Object.keys(window.terjemahData[k]).length} ayat`);
    }catch(e){console.log("Gagal",k,e);}
  }

  window.lengkapiTerjemahan=async function(){
    for(let k of Object.keys(MAP)){await fetchSurat(k);}
    alert("✅ Selesai Jo! Baqarah "+Object.keys(window.terjemahData.baqarah).length+" | Ali Imran "+Object.keys(window.terjemahData.aliimron).length+" | An-Nisa "+Object.keys(window.terjemahData.annisa).length);
  };

  if(navigator.onLine){
    setTimeout(()=>{
      for(let k of Object.keys(MAP)){
        let c=window.terjemahData[k]?Object.keys(window.terjemahData[k]).length:0;
        if(c<10)fetchSurat(k);
      }
    },1500);
  }
})();