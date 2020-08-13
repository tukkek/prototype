const MAP=document.querySelector('#map')
const HEX=document.querySelector('template#hex').content.children[0]
const HEXSIZE=70
const MARGIN=HEXSIZE/2
const GRIDSIZE=[40,30]
const GRID=[]

class Hex{
  constructor(x,y){
    this.x=x
    this.y=y
    this.visual=false
    this.type='hill'
  }
  
  define(type){
    this.type=type
    this.visual.classList.add(this.type)
    this.visual.setAttribute('title',this.type)
  }
  
  draw(){
    this.visual=HEX.cloneNode(true)
    let left=this.x*HEXSIZE+MARGIN
    if(this.y%2==1) left+=HEXSIZE/2
    this.visual.style['left']=left+'px'
    this.visual.style['top']=(this.y*(HEXSIZE-12)+MARGIN)+'px'
    this.visual.innerHTML=this.y*GRIDSIZE[0]+this.x
    this.define(this.type)
    MAP.appendChild(this.visual)
    this.visual.addEventListener('click',()=>this.click())
  }
  
  click(){
    alert('hex type: '+this.type+'\n'+
      'hex coordinates: x='+this.x+' y='+this.y+'\n'+
      'hex number: '+(this.y*GRIDSIZE[0]+this.x)
    )
  }
}

export function setup(){
  for(let x=0;x<GRIDSIZE[0];x++){
    GRID[x]=[]
    for(let y=0;y<GRIDSIZE[1];y++){
      GRID[x][y]=new Hex(x,y)
      GRID[x][y].draw()
    }
  }
  for(let x=0;x<GRID[0].length-1;x++){
    GRID[x][x].define('river')
    if(x%2==0) GRID[x][x+1].define('river')
  }
  for(let x=GRIDSIZE[0]-1;x>10;x--){
    console.log(x)
    GRID[x][GRIDSIZE[0]-x].define('river')
    if(x%2==0) GRID[x][GRIDSIZE[0]-x-1].define('river')
  }
  for(let x=0;x<GRIDSIZE[0];x++){
    for(let y=0;y<GRIDSIZE[1];y++){
      if(x<=0||y<=0||x>=GRIDSIZE[0]-1||y>=GRIDSIZE[1]-1){
        GRID[x][y].define('mountain')
      }
    }
  }
  let spacer=new Hex(GRIDSIZE[0],GRIDSIZE[1]-.5)
  spacer.draw()
  spacer.visual.style.visibility='hidden'
}
