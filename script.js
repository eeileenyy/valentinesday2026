// ------------------- Screen management -------------------
function showScreen(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
 document.getElementById(id).classList.add("active");
}

document.getElementById("startBtn").addEventListener("click",()=>showScreen("instructions"));
document.getElementById("playBtn").addEventListener("click",()=>showScreen("gameScreen"));
document.getElementById("openEnvelopeBtn").addEventListener("click",()=>showScreen("letterScreen"));
document.getElementById("replayBtn").addEventListener("click",()=>location.reload());

// ------------------- Game -------------------
const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");
let score=0;
const totalLetters=24;
let gameRunning=true;

const player={x:180,y:550,size:32,emoji:"🐈"};
let items=[];

function createItem(){
 const isGood=Math.random()>0.3;
 items.push({x:Math.random()*360,y:0,speed:isGood?3:4,emoji:isGood?"💌":"⛈️",good:isGood});
}

document.addEventListener("keydown",(e)=>{
 if(e.key==="ArrowLeft" && player.x>0) player.x-=6;
 if(e.key==="ArrowRight" && player.x<canvas.width-32) player.x+=6;
});

function drawPlayer(){ ctx.font="32px Arial"; ctx.fillText(player.emoji,player.x,player.y); }
function drawItems(){ ctx.font="28px Arial"; items.forEach(i=>ctx.fillText(i.emoji,i.x,i.y)); }
function updateItems(){
 items.forEach((item,index)=>{
 item.y+=item.speed;
 if(item.x>player.x-10 && item.x<player.x+player.size && item.y>player.y-20 && item.y<player.y){
 score+=item.good?10:-5;
 items.splice(index,1);
 document.getElementById("score").textContent=score;
 }
 });
 items=items.filter(i=>i.y<canvas.height);
}
function checkWin(){ if(score>=totalLetters*10 && gameRunning){gameRunning=false; showScreen("winScreen");} }
function gameLoop(){ if(!gameRunning)return; ctx.clearRect(0,0,canvas.width,canvas.height); drawPlayer(); drawItems(); updateItems(); checkWin(); requestAnimationFrame(gameLoop); }

setInterval(createItem,1000);
gameLoop();

// ------------------- Floating hearts -------------------
const heartsContainer=document.getElementById("heartsContainer");
function createHeart(){
 const heart=document.createElement("div");
 heart.className="heart";
 heart.textContent="❤️";
 heart.style.left = (50 + (Math.random()*40 - 20)) + "%"; // middle ±20%
 heartsContainer.appendChild(heart);
 setTimeout(()=>heart.remove(),3000);
}
setInterval(createHeart,300);

// ------------------- Envelope click -------------------
const envelope=document.getElementById("envelope");
const letterContent=document.getElementById("letterContent");
const openMeText=document.getElementById("openMeText");
const replayBtn=document.getElementById("replayBtn");

envelope.addEventListener("click",()=>{
 envelope.style.display="none";
 openMeText.style.display="none";
 letterContent.style.display="block";
 setTimeout(()=>{ replayBtn.style.display="inline-block"; },30000); // 30 sec delay
});
