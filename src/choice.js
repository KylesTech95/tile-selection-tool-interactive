import { React,useEffect, useCallback, useState, useRef } from 'react'
  import './App.css'

export default function Choice({player,header,setHeader,posRef}) {
  const listRef = useRef()
  // states
  const [selected,secSelected]=useState('select-hover')
  const [target,setTarget]=useState({x:0,y:0})
  const pos = []
  // update position on keypress
  const updateTarget = (key,start) => {
    switch(true){
      case key==='ArrowUp' && start.y>0:
        console.log('up')
        start.y-=1
      break;
      case key==='ArrowRight':
        console.log('right')
        start.x = (start.x + 1)%3
      break;
      case key==='ArrowDown' && start.y<1:
        console.log('down')
        start.y+=1
      break;
      case key==='ArrowLeft':
        console.log('left')
        start.x = start.x > 0 ? (start.x - 1) : start.x=2
      break;
      default:
        console.log('oops!..Limit is reached');
      break;
    }
    //  console.log(start)
  }
    // update position on mouseover/hover
  const updateTarget2 = (elem,start) => {
    let last_class = elem.classList.length-1
    switch(true){
      case /1/.test(elem.classList[last_class]):
        start.x=0;
        start.y=0;
      break;
      case /2/.test(elem.classList[last_class]):
        start.x=1;
        start.y=0;
      break;
      case /3/.test(elem.classList[last_class]):
        start.x=2;
        start.y=0;
      break;
      case /4/.test(elem.classList[last_class]):
        start.x=0;
        start.y=1;
      break;
      case /5/.test(elem.classList[last_class]):
        start.x=1;
        start.y=1;
      break;
      case /6/.test(elem.classList[last_class]):
        start.x=2;
        start.y=1;
      break;
      default:
        console.log('nothing hovered over');
      break;
    }
    //  console.log(start)
  }
  // fn converts array to object with 2 arguments (element,index)
  const arrayToObject = (p,index) =>{
    return {x:p[index].pos[0],y:p[index].pos[1]}
   }
   // keypress function
  const keyPress = (event) => {
    posRef.current.classList.remove('obj-remove')
    // itmes array
     const items = document.querySelectorAll('.list-item')
     const bod = document.body
     // if user clicks one of the 4 array keys...
    if(/(left|right|up|down)/i.test(event.key)){
      // update the target object's position on keypress
      updateTarget(event.key,target)
      // iterate through the items
      for(let i = 0; i < items.length; i++){
        // convery array to an object
        let obj = arrayToObject(player,i)
        // Each player's key propery is lowered by 1 (0-based index) and stored in "real_key"
        let real_key = player[i].key-1
        // if 1)i==real_key, and 2)object's value === target's value...
        if(i==real_key && (obj.x==target.x&&obj.y==target.y)){
          // update background image to match current selection
          bod.style = `background-image:url(${player[i].src});background-repeat:no-repeat;background-size:25%;transition:.25s;bu`
          // update tile with 'select-hover' class
          items[i].classList.add(selected)
          setTarget(obj)
          // change the header text to match the character/animal
          setHeader(player[i].alt)
        }
        else{
          // remove 'select hover' class
          items[i].classList.remove(selected)
        }
        
        
      }
    }
  }
  // mouseover function
  const hoverHandle = (event) => {
    let bod = document.body
    // target = img element
    let targ = event.target
    // store target's parent (li) 
    let img_parent = targ.parentElement;
    if(targ.classList.contains('img')){
      posRef.current.classList.remove('obj-remove')
    }
    else{
      posRef.current.classList.add('obj-remove')
    }
    // get array of items
    const items = document.querySelectorAll('.list-item')
    // update target on mouse over
    updateTarget2(img_parent,target)

    // iterate through items
    for(let i = 0; i < items.length; i++){

      // console.log(items[i])
      // if items[index]==the current target
      if(items[i]==img_parent){
          // console.log(items[i])
          // update tile with 'select-hover' class
          items[i].classList.add(selected)
          // update background to match selection
          bod.style = `background-image:url(${player[i].src});background-repeat:no-repeat;`
          setHeader(player[i].alt)
        }
      else{
        // remove 'select-hover' class from item
        items[i].classList.remove(selected)
      }
      
      
      
    }
  }
 


  // memoization technique:
  /*
  Memoization: In a nutt-shell, memoization is an optimization technique to improve application efficiency.
              We store the function's output in cache. From here, the function will check to see if it's stores in cache
              before computing again.
  */
  const memoize2 = useCallback(hoverHandle)//hover memoization
  const memoize = useCallback(keyPress)//keypress memoization
  // useEffect 
  useEffect(()=>{
    for(let i in player){
      pos.push(player[i].pos)
    }
    // window event listeners
    window.addEventListener('keydown',memoize)
    window.addEventListener('mouseover',memoize2)

    return () => {
      window.removeEventListener('keydown', memoize);
      window.removeEventListener('mouseover',memoize2)


    };
  })

  // return render
  return (
    <>
        <div id="char-container">
          <ul className="list-container" ref={listRef}>

            {/* We are mapping over player object 
                and returning <div><li></li></div> */}

            {[...player].map((p,index)=>{
              return (
                <div key={p.key} className="button-back">
                  <li key={p.key} className={`list-item p${index+1}`}><img className="img" src={p.src} alt={p.alt} /></li>
                </div>
              )
            })}
          </ul>
        </div>
    </>
  )
}
