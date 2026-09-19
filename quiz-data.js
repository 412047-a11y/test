const dimensions = [
  { key: "freedom", left: "自由", right: "依戀" },
  { key: "expression", left: "含蓄", right: "直白" },
  { key: "idealism", left: "理想", right: "現實" },
  { key: "time", left: "當下", right: "長久" },
  { key: "self", left: "自我", right: "成全" },
  { key: "intensity", left: "熱烈", right: "平淡" }
];

const writers = {
  libai: { name:"李白", core:["自由","理想","熱烈"], vector:{freedom:-4,expression:2,idealism:-5,time:-3,self:-4,intensity:-5},
    basis:"以自由、想像、遠行與精神契合為主要文學意象；遊戲中將他詮釋為不願被關係框住、仍想保有自己人生方向的文人。",
    works:["月下獨酌","將進酒","夢遊天姥吟留別","贈汪倫"] },
  dufu: { name:"杜甫", core:["依戀","長久","成全"], vector:{freedom:3,expression:-2,idealism:4,time:5,self:5,intensity:2},
    basis:"作品常把個人情感與家庭、友朋、時局及責任交織在一起；遊戲中將他詮釋為重視牽掛、責任與長期承擔的文人。",
    works:["月夜","春望","北征","夢李白"] },
  baijuyi: { name:"白居易", core:["直白","現實","平淡"], vector:{freedom:1,expression:3,idealism:3,time:3,self:2,intensity:4},
    basis:"以日常生活、人情與清楚易懂的抒情著稱；遊戲中代表把重要關係落實在陪伴與具體生活裡的傾向。",
    works:["問劉十九","琵琶行","長恨歌","與元九書"] },
  wangwei: { name:"王維", core:["含蓄","平淡","自我"], vector:{freedom:-2,expression:-5,idealism:-3,time:1,self:1,intensity:5},
    basis:"山水、禪意與內省色彩濃厚；遊戲中代表情感不一定要說破，而更傾向安靜感受與自我消化。",
    works:["送元二使安西","山居秋暝","相思","鹿柴"] },
  sushi: { name:"蘇軾", core:["長久","平淡","自由"], vector:{freedom:-1,expression:1,idealism:1,time:3,self:0,intensity:3},
    basis:"作品經常面對聚散、人生變化與日常困境，並展現包容與豁達；遊戲中代表接受變化、仍保留長久情感的傾向。",
    works:["水調歌頭","江城子·乙卯正月二十日夜記夢","定風波","赤壁賦"] },
  liuyong: { name:"柳永", core:["依戀","直白","長久"], vector:{freedom:4,expression:1,idealism:-1,time:4,self:2,intensity:-3},
    basis:"詞作大量書寫羈旅、相思、離別與情感表達；遊戲中代表願意承認情感重量並把想念說出來的傾向。",
    works:["雨霖鈴","八聲甘州","蝶戀花","望海潮"] },
  liqingzhao: { name:"李清照", core:["依戀","長久","含蓄"], vector:{freedom:4,expression:-3,idealism:1,time:5,self:2,intensity:-1},
    basis:"作品常把記憶、日常細節、離別與時間感交織在一起；遊戲中代表情感深、重視記憶與餘韻的傾向。",
    works:["聲聲慢","一剪梅","如夢令","武陵春"] },
  xinqiji: { name:"辛棄疾", core:["理想","熱烈","長久"], vector:{freedom:-1,expression:2,idealism:-5,time:4,self:3,intensity:-4},
    basis:"其作品常把個人情懷、理想、選擇與人生抱負放在一起；遊戲中代表為相信的事長期投入的傾向。",
    works:["青玉案·元夕","破陣子·為陳同甫賦壯詞以寄之","永遇樂·京口北固亭懷古","醜奴兒·書博山道中壁"] },
  taoyuanming: { name:"陶淵明", core:["自我","自由","平淡"], vector:{freedom:-5,expression:-2,idealism:-2,time:1,self:-5,intensity:5},
    basis:"辭仕歸田、田園生活與不迎合的自我選擇，是遊戲中「向內的自由」意象的重要來源。",
    works:["歸園田居","飲酒","桃花源記","五柳先生傳"] },
  dumu: { name:"杜牧", core:["當下","熱烈","自由"], vector:{freedom:-2,expression:1,idealism:-2,time:-1,self:-2,intensity:-3},
    basis:"作品兼有青春、感懷、歷史與情感書寫；遊戲中代表珍惜當下與青春片段、也會在往後回望的傾向。",
    works:["贈別","寄揚州韓綽判官","泊秦淮","赤壁"] },
  yuanzen: { name:"元稹", core:["依戀","長久","成全"], vector:{freedom:5,expression:-1,idealism:1,time:5,self:3,intensity:-2},
    basis:"與白居易的文學交往及大量詩文留下豐富的私人情感、追憶與人際材料；遊戲中代表長久記得、把關係留在時間裡的傾向。",
    works:["離思五首·其四","遣悲懷三首","聞樂天授江州司馬","會真記"] },
  nalan: { name:"納蘭性德", core:["長久","依戀","含蓄"], vector:{freedom:4,expression:-2,idealism:1,time:5,self:2,intensity:-2},
    basis:"詞作常以離別、追憶、時間與個人情感為中心；遊戲中代表對已逝或遠去之人的長久記憶。",
    works:["木蘭花令·擬古決絕詞柬友","浣溪沙","長相思","蝶戀花"] }
};

const questions = [
  {id:1,title:"久未聯絡",text:"一個以前很要好的朋友，突然傳訊息：「最近過得怎麼樣？」你會？",options:[
    {text:"直接約他出來，既然想見就見。",effect:{freedom:0,time:1,self:0,expression:1,intensity:1}},
    {text:"先聊聊近況，不急著把關係拉回從前。",effect:{freedom:-1,time:1,self:0,expression:1,intensity:1}},
    {text:"心裡其實很開心，但不太知道該怎麼回。",effect:{freedom:0,time:1,self:0,expression:-1,intensity:0}},
    {text:"覺得大家都有自己的生活，順其自然就好。",effect:{freedom:2,time:-1,self:-1,expression:-1,intensity:1}}
  ]},
  {id:2,title:"沒說出口",text:"你很在意一個人，但你發現對方好像完全沒有察覺。你會？",options:[
    {text:"找一個適合的時機，直接告訴對方。",effect:{expression:2,freedom:-1,time:1,self:0,intensity:1}},
    {text:"偶爾給一點暗示，看他能不能明白。",effect:{expression:1,freedom:-1,time:1,self:0,intensity:0}},
    {text:"不一定要說出口，自己知道這份在意就夠了。",effect:{expression:-2,freedom:-1,time:2,self:0,intensity:-1}},
    {text:"先把自己的生活過好，如果有緣自然會知道。",effect:{expression:-1,freedom:2,time:0,self:-1,intensity:1}}
  ]},
  {id:3,title:"不同的人生方向",text:"你和一個很重要的人，對未來的方向完全不同。你會比較傾向？",options:[
    {text:"說服彼此找一條可以一起走的路。",effect:{idealism:0,self:1,time:1}},
    {text:"尊重對方，也不放棄自己的方向。",effect:{idealism:-1,self:-1,freedom:1}},
    {text:"如果真的很重要，願意調整自己的計畫。",effect:{idealism:0,self:2,time:1}},
    {text:"有些路本來就只能一個人走。",effect:{idealism:-2,self:-2,freedom:2}}
  ]},
  {id:4,title:"最後一天",text:"你知道一段很重要的關係明天就要告一段落，你最想做什麼？",options:[
    {text:"把今天過得好好的，至少留下快樂的記憶。",effect:{time:-2,intensity:2,expression:0}},
    {text:"把一直沒說的話全部說出來。",effect:{time:1,expression:2,intensity:1}},
    {text:"什麼都不特別安排，只想安靜地待在一起。",effect:{time:1,expression:-2,intensity:-1}},
    {text:"已經開始想像很多年後，再回想起今天會是什麼感覺。",effect:{time:2,intensity:-1,expression:0}}
  ]},
  {id:5,title:"為你改變",text:"如果一個很重要的人為了你，放棄了一個原本很重要的機會，你會？",options:[
    {text:"第一反應是希望他不要為我放棄自己的人生。",effect:{self:-2,idealism:-1,freedom:1}},
    {text:"如果那是他的選擇，我會尊重，但也會一直記得。",effect:{self:-1,time:2}},
    {text:"我會很感動，也可能願意為他做出同樣的改變。",effect:{self:2,time:1,freedom:-1}},
    {text:"我會認真和他討論，看看能不能找到兩全其美的方法。",effect:{self:1,idealism:1,freedom:0}}
  ]},
  {id:6,title:"一個很難忘的下午",text:"多年後，你最希望自己記得一段關係中的什麼？",options:[
    {text:"那些一起瘋、一起笑的瞬間。",effect:{intensity:-2,time:-1}},
    {text:"某個很普通的下午，什麼特別的事情都沒發生。",effect:{intensity:2,time:1}},
    {text:"曾經一起相信過的某個夢想。",effect:{intensity:-1,idealism:-2,time:1}},
    {text:"對方曾經說過的一句話，直到現在還記得。",effect:{intensity:-1,time:2,expression:-1}}
  ]},
  {id:7,title:"朋友做錯了事",text:"一個很重要的朋友做了一件讓你很失望的事，後來他來向你道歉。",options:[
    {text:"如果他真的願意改，我願意重新相信他。",effect:{freedom:-1,time:1,self:1}},
    {text:"我會原諒，但關係不一定能回到以前。",effect:{freedom:1,time:1,self:-1}},
    {text:"我會直接告訴他，我當時到底有多難過。",effect:{expression:2,time:1}},
    {text:"我需要一點時間，自己想清楚這段關係對我還剩下多少意義。",effect:{expression:-1,freedom:1,self:-1,time:1}}
  ]},
  {id:8,title:"即將分開",text:"你和一個很重要的人即將分開，而且不知道下一次見面會是什麼時候。你會？",options:[
    {text:"先不想那麼遠，好好把剩下的時間過完。",effect:{time:-2,intensity:1}},
    {text:"約定以後一定要再見。",effect:{time:2,freedom:-1,expression:1}},
    {text:"想留下某個東西，讓以後看到時還能想起這段時間。",effect:{time:2,expression:-1,intensity:-1}},
    {text:"把真正想說的話告訴他，不想留下遺憾。",effect:{time:1,expression:2,freedom:-1}}
  ]},
  {id:9,title:"所有人都不理解你",text:"你做了一個自己很相信的選擇，但身邊的人幾乎都不理解。你會？",options:[
    {text:"只要是自己認真想過的，我還是會去做。",effect:{freedom:2,idealism:-1,self:-2}},
    {text:"先聽聽大家的理由，再決定要不要改變。",effect:{idealism:1,self:0,freedom:-1}},
    {text:"如果這件事真的重要，我願意承擔一段時間的孤獨。",effect:{freedom:1,idealism:-2,self:-1,intensity:-1}},
    {text:"如果重要的人都反對，我會重新想想是不是值得。",effect:{freedom:-1,self:1,idealism:1}}
  ]},
  {id:10,title:"舊照片",text:"整理手機時，你突然看到幾年前的一張照片。你的第一個念頭比較接近？",options:[
    {text:"「那時候真的很好玩。」",effect:{time:-2,intensity:-1}},
    {text:"「原來已經過這麼久了。」",effect:{time:2,intensity:1}},
    {text:"「不知道現在的我們還會不會像以前一樣。」",effect:{time:2,freedom:-1,intensity:-1}},
    {text:"「那時候的自己，應該不會想到今天。」",effect:{time:1,self:1}}
  ]},
  {id:11,title:"不一樣的未來",text:"你發現自己和一個很重要的人，對「以後的生活」有完全不同的想像。你會？",options:[
    {text:"也許不用完全一樣，能理解彼此就好了。",effect:{idealism:0,self:1,time:1}},
    {text:"認真討論，看看現實中到底能不能找到交集。",effect:{idealism:1,self:1,time:1}},
    {text:"如果彼此都不願改變，也許分開才是尊重。",effect:{idealism:-1,self:-2,freedom:2}},
    {text:"只要彼此夠在乎，我相信很多事情都可以慢慢調整。",effect:{idealism:-2,self:2,freedom:-1,time:2}}
  ]},
  {id:12,title:"最後一頁",text:"如果要把自己對「重要的人」的想法寫成文章，你最希望最後一句是？",options:[
    {text:"「我們都還是各自成為了自己。」",effect:{freedom:1,self:-1,time:0}},
    {text:"「後來想起那段日子，還是會微笑。」",effect:{time:-1,intensity:-1}},
    {text:"「有些人離開了，卻一直留在時間裡。」",effect:{time:1,freedom:-1}},
    {text:"「不用說太多，你知道我一直都在。」",effect:{expression:-1,freedom:-1,time:1}}
  ]}
];

const writerWeights = {
  libai:{freedom:1.5,idealism:1.5,intensity:1.3},
  dufu:{freedom:1.4,time:1.5,self:1.5},
  baijuyi:{expression:1.4,idealism:1.4,intensity:1.5},
  wangwei:{expression:1.5,intensity:1.5,self:1.2},
  sushi:{time:1.3,intensity:1.4,freedom:1.2},
  liuyong:{freedom:1.5,expression:1.4,time:1.5},
  liqingzhao:{freedom:1.5,time:1.5,expression:1.4},
  xinqiji:{idealism:1.5,intensity:1.4,time:1.3},
  taoyuanming:{freedom:1.5,self:1.5,intensity:1.4},
  dumu:{time:1.5,intensity:1.3,freedom:1.1},
  yuanzen:{freedom:1.5,time:1.6,self:1.2},
  nalan:{time:1.5,freedom:1.4,expression:1.4}
};

const quotes = {
  libai:{text:"舉杯邀明月，對影成三人。",source:"《月下獨酌》"},
  dufu:{text:"何時倚虛幌，雙照淚痕乾。",source:"《月夜》"},
  baijuyi:{text:"晚來天欲雪，能飲一杯無？",source:"《問劉十九》"},
  wangwei:{text:"願君多采擷，此物最相思。",source:"《相思》"},
  sushi:{text:"但願人長久，千里共嬋娟。",source:"《水調歌頭》"},
  liuyong:{text:"多情自古傷離別。",source:"《雨霖鈴》"},
  liqingzhao:{text:"此情無計可消除，才下眉頭，卻上心頭。",source:"《一剪梅》"},
  xinqiji:{text:"眾裡尋他千百度。",source:"《青玉案·元夕》"},
  taoyuanming:{text:"採菊東籬下，悠然見南山。",source:"《飲酒》"},
  dumu:{text:"多情卻似總無情，唯覺樽前笑不成。",source:"《贈別》"},
  yuanzen:{text:"曾經滄海難為水，除卻巫山不是雲。",source:"《離思五首·其四》"},
  nalan:{text:"人生若只如初見。",source:"《木蘭花令·擬古決絕詞柬友》"}
};

window.BXN_DATA = { dimensions, writers, questions, writerWeights, quotes };
