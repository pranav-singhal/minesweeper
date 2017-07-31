$(document).ready(function(){
gameArr=[
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]
console.log(gameArr);
for(var i=0;i<=10; ){
  var mineRow=Math.floor(Math.random()*8);
  var mineColumn=Math.floor(Math.random()*8);
  if (gameArr[mineRow][mineColumn]==0){
    gameArr[mineRow][mineColumn]="mine";
    console.log(gameArr[mineRow][mineColumn]);
    i++;
  }

}
console.log(gameArr);

function setVal(row, column){
  if(gameArr[row][column]!="mine"){
    var mineCount=0
    if(((row-1)>=0)&&(column-1>=0)&&gameArr[row-1][column-1]=='mine'){
      mineCount++;
    }
    if((row-1>=0)&&gameArr[row-1][column]=="mine"){
      mineCount++;
    }
    if((row-1>=0)&&(column+1<8)&&gameArr[row-1][column+1]=="mine"){
      mineCount++;
    }
    if((column+1<8)&&gameArr[row][column+1]=="mine"){
      mineCount++;

    }
    if((row+1<8)&&(column+1<8)&&gameArr[row+1][column+1]=="mine"){
      mineCount++;
    }
    if((row+1<8)&&gameArr[row+1][column]=="mine"){
      mineCount++;
    }
    if((column-1>=0)&&(row+1<8)&&gameArr[row+1][column-1]=="mine" ){
      mineCount++;
    }
    if((column-1>=0)&&gameArr[row][column-1]=="mine"){
      mineCount++;
    }
    return mineCount;
  }
  else{return "mine";}

}
// console.log(setVal(5,0));
for(var i=0;i<8;i++){
  for(var j=0;j<8;j++){
    var val =setVal(i,j)
    // console.log(val);
    gameArr[i][j]=val;
  }
}
// console.log("after set val");
// console.log(gameArr);
function makeGameTable(){
  table=document.getElementById("table")
  for(var i=0;i<8;i++){
    var row= document.createElement("TR");
    for(var j=0;j<8;j++){
      var td=document.createElement("TD");
      td.val=gameArr[i][j];
      td.setAttribute("id",i+" "+j);
      // console.log(td.val);

      row.appendChild(td);
    }
    table.appendChild(row)
  }
}
makeGameTable();
$("td").on("contextmenu",function(event){
  event.preventDefault();
  $(this)[0].innerHTML="flag"
})
$("td").on("click",function check(){

var currentCell=this;
console.log(this);
var currentRow= parseFloat(currentCell.id.split(" ")[0]);
var currentColumn=parseFloat(currentCell.id.split(" ")[1]);
 show(currentRow,currentColumn)

if(currentCell.val=="mine"){
  showAllMines();
}

});
function showAllMines(){
  var tdArray=document.getElementsByTagName("td");
  console.log(tdArray);
  for(i=0;i<tdArray.length;i++){
    if (tdArray[i].val=="mine"){
    tdArray[i].innerHTML="mine";}
  }
}
function show(row, column){
  var cell=document.getElementById(row+" "+column)
  if ((gameArr[row][column]!=0)&&(gameArr[row][column]!="mine")){

    console.log(cell.id);
    console.log("here");

    cell.innerHTML=cell.val;
  }
  if (gameArr[row][column]==0&&(gameArr[row][column]!="mine")){
    gameArr[row][column]="e"; //to make sure that the code isnt stuck in an infinite loop
    cell.innerHTML=0;          // on calling the above line of code, the program will show 0 where gameArr[row][column]=="e", so one cell may stay empty; this line of code takes care of that

    if(((row-1)>=0)&&(column-1>=0)){
      show(row-1,column-1);
    }
    if((row-1>=0)){
      show(row-1,column);
    }
    if((row-1>=0)&&(column+1<8)){
      show(row-1,column+1);
    }
    if((column+1<8)){
      show(row,column+1);

    }
    if((row+1<8)&&(column+1<8)){
      show(row+1,column+1);
    }
    if((row+1<8)){
      show(row+1,column);
    }
    if((column-1>=0)&&(row+1<8) ){
      show(row+1,column-1);
    }
    if((column-1>=0)){
      show(row,column-1);
    }
  }
}
})
