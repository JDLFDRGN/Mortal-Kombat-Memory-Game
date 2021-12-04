let cont=document.querySelector(".content");
let opt=document.querySelector("#option");
let optCont=document.querySelector(".optionContent");
let bck=document.querySelector("#back");
let str=document.querySelector("#start");
let lvl=document.querySelectorAll(".level>button");
let app=document.querySelector("#apply");
let gm=document.querySelector("#game");
let ctnr=document.querySelector(".container");
let mnctnr=document.querySelector(".mainContainer");
let cardNumber=12;
let lastCard=0;
let crtCards=[];
let frontCard=[];
let backCard=[];
let rand=[];
let hasPair=[];
let cardVal=[];
let temp;
let cardState=[];
let move=0;
let lastContent;
let lastIndex;
let finish=[];
let corrAns=0;
let music=new Audio("Sound/mortalKombat.mp3");
let clickSound=new Audio("Sound/click.wav");
let tas=document.querySelector(".timeAndScore");
let seconds=0;
let pnt=document.querySelector("#points");
let scn=document.querySelector("#seconds");
let highestScore=1000;
let score=0;
let missionComplete=false;
let rs=document.querySelector(".results");
let chk=document.querySelector(".check");
let scrRes=document.querySelector("#scoreResults");

opt.addEventListener("click",()=>{
    clickSound.currentTime=0;
    clickSound.play();
    cont.style.display="none";
    optCont.style.display="grid";
});
bck.addEventListener("click",()=>{
    clickSound.currentTime=0;
    clickSound.play();
    cont.style.display="grid";
    optCont.style.display="none";
});

for(let i=0;i<3;i++){
    lvl[0].style.background="yellowgreen";
    lvl[i].addEventListener("click",()=>{
        clickSound.currentTime=0;
        clickSound.play();
        cardNumber=lvl[i].value;
        if(i!=lastCard){
            lvl[i].style.background="yellowgreen";
            lvl[lastCard].style.background="gray";
            
        }
        lastCard=i;
    });
}
function addCards(){
    for(let i=0;i<cardNumber;i++){
        crtCards[i]=document.createElement("div");
        crtCards[i].setAttribute("class","card");
        gm.appendChild(crtCards[i]); 
    }
    for(let i=0;i<cardNumber;i++){
        frontCard[i]=document.createElement("div");
        frontCard[i].setAttribute("class","frontCard");
        backCard[i]=document.createElement("div");
        backCard[i].setAttribute("class","backCard");
        crtCards[i].appendChild(frontCard[i]);
        crtCards[i].appendChild(backCard[i]);
    }

    if(cardNumber==12){
        gm.classList.add("easy");
        seconds=61;
    }else if(cardNumber==24){
        gm.classList.add("medium");
        seconds=121;
    }else{
        gm.classList.add("hard");
        seconds=181;
    }
}
   
str.addEventListener("click",()=>{
    clickSound.currentTime=0;
    tas.style.visibility="visible";
    cont.style.display="none";
    gm.style.display="grid";
    clickSound.play();
    music.play();
    music.loop="true";
    addCards();
    createRandomPair();
    eliminate();
    timerAndPoints();
});

function createRandomPair(){
    for(let i=0;i<cardNumber;i++){
        rand[i]=Math.floor(Math.random()*10+1);
        cardVal[i]=rand[i];
        hasPair[i]=false;
    }
    for(let i=0;i<cardNumber-1;i++){
        for(let j=i+1;j<cardNumber;j++){
            if(hasPair[i]==false)
            if(cardVal[i]==cardVal[j]){
                hasPair[i]=true;
                hasPair[j]=true;
            }
        }
    }
    for(let i=0;i<cardNumber;i++){
        while(hasPair[i]==false){
            temp=Math.floor(Math.random()*cardNumber);
            if(hasPair[temp]==false&&temp!=i){
            cardVal[temp]=cardVal[i];
            hasPair[temp]=true;
            hasPair[i]=true;
            }
        }
    }
    for(let i=0;i<cardNumber;i++){
        backCard[i].innerHTML=cardVal[i];
    }
    for(let i=0;i<cardNumber;i++){
        switch(cardVal[i]){
            
            case 1:
                backCard[i].style.backgroundImage="url('Cards/ermac.png')";
                break;
            case 2:
                backCard[i].style.backgroundImage="url('Cards/goro.png')";
                break;
            case 3:
                backCard[i].style.backgroundImage="url('Cards/johnny-cage.png')";
                break;
            case 4:
                backCard[i].style.backgroundImage="url('Cards/liu-kang.png')";
                break;
            case 5:
                backCard[i].style.backgroundImage="url('Cards/mileena.png')";
                break;
            case 6:
                backCard[i].style.backgroundImage="url('Cards/noob.png')";
                break;
            case 7:
                backCard[i].style.backgroundImage="url('Cards/raiden.png')";
                break;
            case 8:
                backCard[i].style.backgroundImage="url('Cards/scorpion.png')";
                break;
            case 9:
                backCard[i].style.backgroundImage="url('Cards/sub-zero.png')";
                break;
            case 10:
                backCard[i].style.backgroundImage="url('Cards/trevor.png')";
                break; 
              
        }
    }
}
function eliminate(){
    for(let i=0;i<cardNumber;i++){
        finish[i]=false;
        cardState[i]=0;
        crtCards[i].addEventListener("click",()=>{     
            if(finish[i]==false){
            move++;
            cardState[i]=1-cardState[i];
            if(cardState[i]==1){
                crtCards[i].style.transform="rotateY(180deg)";
            }else{
                crtCards[i].style.transform="rotateY(360deg)";
            }
           switch(move){
                case 1:
                    lastContent=backCard[i].innerHTML;
                    lastIndex=i;
                    break;
                case 2:
                    if(lastContent==backCard[i].innerHTML&&lastIndex!=i){
                        corrAns+=2;
                        backCard[i].style.background="black";
                        backCard[lastIndex].style.background="black"; 
                        crtCards[i].style.background="black";
                        crtCards[lastIndex].style.background="black";      
                        finish[i]=true;
                        finish[lastIndex]=true;
                        result();
                    }else{
                        setTimeout(()=>{
                            crtCards[i].style.transform="rotateY(360deg)";
                            crtCards[lastIndex].style.transform="rotateY(0deg)";
                        },1000);
                    }
                    cardState[i]=0;
                    cardState[lastIndex]=0;
                    move=0;
                    break;
                default:
                    break;
           }
        }
        });
    }
}
function result(){
   if(corrAns==cardNumber){
        music.pause();
        mnctnr.style.display="grid";
        gm.style.display="none";
        missionComplete=true;
        tas.style.display="none";
        gm.style.display="none";
        ctnr.style.display="none";
        rs.style.display="grid";
        scrRes.innerHTML=highestScore;  
    }
}
function timerAndPoints(){
    setInterval(()=>{
        scrRes.innerHTML=highestScore;  
        if(seconds!=0 && missionComplete==false){
        seconds--;
        scn.innerHTML=seconds+"s";
        highestScore=highestScore-(highestScore/seconds);
        highestScore=parseInt(highestScore);
        pnt.innerHTML=highestScore;
        }else if(missionComplete==false && seconds==0){
            highestScore=0;
            music.pause();
            mnctnr.style.display="grid";
            gm.style.display="none";
            missionComplete=true;
            tas.style.display="none";
            gm.style.display="none";
            ctnr.style.display="none";
            rs.style.display="grid";     
            scrRes.innerHTML=highestScore;       
        }
    },500);
}

