(() => {
  const D=window.BXN_DATA;
  const raw=sessionStorage.getItem("bxn_result");
  if(!raw){location.href="index.html";return;}
  const state=JSON.parse(raw);
  const dims=D.dimensions;

  function normScores(){
    const max={freedom:0,expression:0,idealism:0,time:0,self:0,intensity:0};
    state.answers.forEach((ai,qi)=>{
      const e=D.questions[qi].options[ai].effect;
      for(const k of Object.keys(max)) max[k]+=Math.abs(e[k]||0);
    });
    return Object.fromEntries(Object.keys(state.scores).map(k=>[k,max[k]?state.scores[k]/max[k]:0]));
  }
  const normalized=normScores();

  function writerScore(w){
    let s=0;
    for(const [k,weight] of Object.entries(D.writerWeights[w])) s += (1-Math.min(1,Math.abs(normalized[k] - D.writers[w].vector[k]/5)))*weight;
    return s;
  }
  const ranked=Object.keys(D.writers).map(id=>[id,writerScore(id)]).sort((a,b)=>b[1]-a[1]);
  const [first,second]=ranked;
  const unfinished = (first[1]-second[1]<0.22) || Object.values(normalized).every(v=>Math.abs(v)<0.2);
  const primary=unfinished?null:first[0], secondary=second[0];

  const nameEl=document.querySelector("#writerName");
  nameEl.textContent=unfinished?"未完稿":D.writers[primary].name;
  document.querySelector("#secondary").textContent=`另一個靠近你的名字｜${D.writers[secondary].name}`;
  document.querySelector("#summary").textContent=unfinished
    ?"你的答案沒有收束成單一方向。你似乎同時保留了幾種看待關係、時間與自己的方式。這不是沒有答案，而是你的故事還在寫。"
    :D.writers[primary].basis;

  const dimsEl=document.querySelector("#dimensions");
  dims.forEach(d=>{
    const row=document.createElement("div");row.className="dimension";
    const v=Math.max(-1,Math.min(1,normalized[d.key]));
    const left=document.createElement("span");left.textContent=d.left;
    const bar=document.createElement("div");bar.className="bar";
    const dot=document.createElement("i");dot.className="dot";dot.style.left=`${((v+1)/2)*100}%`;bar.appendChild(dot);
    const right=document.createElement("span");right.textContent=d.right;
    row.append(left,bar,right);dimsEl.appendChild(row);
  });

  const quoteId=primary||secondary, q=D.quotes[quoteId];
  document.querySelector("#quote").textContent=`「${q.text}」`;
  document.querySelector("#quoteSource").textContent=q.source;
  document.querySelector("#basisText").textContent=D.writers[quoteId].basis;
  const works=document.querySelector("#works");works.className="works";
  D.writers[quoteId].works.forEach(w=>{const s=document.createElement("span");s.className="tag";s.textContent=w;works.appendChild(s);});

  document.querySelector("#againBtn").onclick=()=>{sessionStorage.removeItem("bxn_result");location.href="index.html";};
  document.querySelector("#shareBtn").onclick=async()=>{
    const text=`《筆下的你》｜我的文學座標是${nameEl.textContent}。`;
    try{await navigator.clipboard.writeText(text);document.querySelector("#shareStatus").textContent="結果文字已複製，可以貼到社群或訊息裡。";}
    catch{document.querySelector("#shareStatus").textContent=text;}
  };
})();
