const boxes=document.querySelectorAll(".box");
const gameinfo=document.querySelector(".game-info");
const newgamebtn=document.querySelector(".btn");


let currentplayer;
let gamegrid;

const winningposition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create a function to initialize the game
function initgame(){
 currentplayer="X";
 gamegrid=["","","","","","","","",""];
 boxes.forEach((box,index) => {
    box.innerText=""
    boxes[index].style.pointerEvents="all"


    // remove green color
    box.classList=`box box${index+1}`;

 });
 newgamebtn.classList.remove("active");
 gameinfo.innerText=`Current Player-${currentplayer}`;
}
initgame();



function swapturn() {
    if(currentplayer==="X"){
        currentplayer="O";
    }
    else{
        currentplayer="X";
    }
    //UI update
    gameinfo.innerText=`Current Player-${currentplayer}`;

}




function checkgameover(){
    let answer=""
    winningposition.forEach((position)=> {
        //at winning positions it itertes over each winning position of every click and check wether that should be non empty and winnin
        if((gamegrid[position[0]]!=="" && gamegrid[position[1]]!=="" && gamegrid[position[2]]!=="" ) 
        && (gamegrid[position[0]]===gamegrid[position[1]]) && (gamegrid[position[1]]===gamegrid[position[2]])) {

        // check if winner is X
        if(gamegrid[position[0]]==='X')
             answer='X'
        else
             answer='O' 
            //disable pointer event since we got the winner
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

              //now we know who is winner X/O
              boxes[position[0]].classList.add("win")
              boxes[position[1]].classList.add("win")
              boxes[position[2]].classList.add("win")
         
         }
    })
    // it means we have winner
    if(answer!==""){
        gameinfo.innerText=`winner Player- ${answer}`
        newgamebtn.classList.add("active");
        boxes[position[0]].classList.remove("win")
        boxes[position[1]].classList.remove("win")
        boxes[position[2]].classList.remove("win")
   
        return;
    }

// it means we do not have winner lets check wether match tied
let fillcount=0;
gamegrid.forEach((box)=>{
    if(box!=="")
        fillcount++;
});

if(fillcount===9){
    gameinfo.innerText="Game Tied !"
    newgamebtn.classList.add("active")
}

  


}

function handleclick(index){
    if(gamegrid[index]===""){
        boxes[index].innerText=currentplayer;
        gamegrid[index]=currentplayer;
        boxes[index].style.pointerEvents="none"
        //to swap turn
        swapturn();
        //check if anybody wins
        checkgameover()
    }
    
    
}



boxes.forEach((box, index) => {
    box.addEventListener("click", ()=>{
        handleclick(index)
    })
});

newgamebtn.addEventListener("click",initgame);


