(() => {
  const D = window.BXN_DATA;
  const state = { index:0, scores:{freedom:0,expression:0,idealism:0,time:0,self:0,intensity:0}, answers:[] };
  const $ = s => document.querySelector(s);
  const intro = $("#intro"), qv=$("#questionView"), analysis=$("#analysisView");
  const progressInk=$("#progressInk"), progressText=$("#progressText");
  const qNo=$("#questionNo"), qTitle=$("#questionTitle"), qText=$("#questionText"), options=$("#options");

  function applyEffect(effect){
    for(const [k,v] of Object.entries(effect)) state.scores[k]+=v;
  }
  function renderQuestion(){
    const q=D.questions[state.index];
    qNo.textContent=`第 ${String(state.index+1).padStart(2,"0")} 頁`;
    qTitle.textContent=q.title; qText.textContent=q.text;
    progressText.textContent=`${String(state.index+1).padStart(2,"0")} / 12`;
    progressInk.style.width=`${((state.index+1)/12)*100}%`;
    options.innerHTML="";
    q.options.forEach((opt,i)=>{
      const b=document.createElement("button"); b.className="option";
      b.innerHTML=`<span class="option-letter">${String.fromCharCode(65+i)}</span><span>${opt.text}</span>`;
      b.addEventListener("click",()=>{
        [...options.children].forEach(x=>x.disabled=true);
        state.answers.push(i); applyEffect(opt.effect);
        setTimeout(next,220);
      });
      options.appendChild(b);
    });
  }
  function next(){
    state.index++;
    if(state.index>=D.questions.length) finish();
    else renderQuestion();
  }
  function finish(){
    qv.classList.add("hidden"); analysis.classList.remove("hidden");
    const lines=["正在整理你的答案……","翻閱你的文學座標……","有一個名字逐漸浮現……"];
    let i=0; $("#analysisLine").textContent=lines[0];
    const timer=setInterval(()=>{i++; if(i<lines.length) $("#analysisLine").textContent=lines[i];},850);
    setTimeout(()=>{clearInterval(timer); sessionStorage.setItem("bxn_result",JSON.stringify(state)); location.href="result.html";},2750);
  }
  $("#startBtn").addEventListener("click",()=>{intro.classList.add("hidden");qv.classList.remove("hidden");renderQuestion();});
})();
