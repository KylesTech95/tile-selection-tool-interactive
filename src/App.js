import Choice from './choice.js'
import fox from "./media/foxy.jpeg"
import bear from "./media/beary.jpeg"
import wolf from "./media/wolfy.jpeg"
import snake from "./media/snaky.jpeg"
import rabbit from "./media/rabbit.jpeg"
import mongoose from "./media/mongoosy.jpeg"
import { useState, useRef, useEffect, useCallback } from 'react'

function Object({posObj,player,posRef}) {
const whichPos = (player) => {
  let items = document.querySelectorAll('.list-item');
  for(let i = 0; i < items.length; i++){
    if(items[i].classList.contains(`select-hover`)){
      let myX = player[i].pos[0]
      let myY = player[i].pos[1]
      return `{x: ${myX},y: ${myY}}`
    }
  }
}
  return (
    <div id="obj-container" className="obj-remove" ref={posRef}>
      <h1 className="obj-actual">{whichPos(player)}</h1>
    </div>
  )
}
 function Header({header}) {
  return (
    <div id="header-container">
      <h1 className="header-actual">{header}</h1>
    </div>
  )
}

function Btn({insRef}){
  const btnRef = useRef();
  const handleBtn = () => {
    let ref = insRef.current;
    ref.classList.toggle('display-hide')

  }

  return (
    <div className="ins-btn" ref={btnRef} onClick={handleBtn}><p>Instructions</p></div>
    )
}

function Instructions({insRef}) {
  return (
    <div id="instructions-container" ref={insRef} className="display-hide">
      <p className="instructions-actual">{`1) Press Arrow Keys to navigate Tiles`}</p>
      <p className="instructions-actual">{`2) Hover Mouse over Tiles`}</p>
      <br/>
      <b><p className="instructions-actual" styls={{width:200}}>{`Feat: Character Selection Code. Tiles are broken up into 2 rows and placed by position: `}</p></b>
      <p className="instructions-actual" styls={{width:200}}>{`Example: Fox equal object {x:0,y:0} `}</p>
      <p className="instructions-actual" styls={{width:200}}>{`Example: Snake equal object {x:0,y:1} `}</p>
      <p className="instructions-actual" styls={{width:200}}>{`Example: Bear  equal object {x:1,y:0} `}</p>
      <p className="instructions-actual" styls={{width:200}}>{`Example: Rabbit  equal object {x:1,y:1} `}</p>

    </div>
  )
}

// application src
function App() {
  const insRef = useRef();
  const posRef = useRef();
  const [posObj,setPosObj]=useState('{}')
  const [header,setHeader]=useState('Welcome')
  //  Array of player objects {prop:value}
  const [player,setPlayer]=useState([
    {
      src:fox,
      key:1,
      alt:'fox',
      pos:[0,0]
    },
    {
      src:bear,
      key:2,
      alt:'bear',
      pos:[1,0]
    },
    {
      src:wolf,
      key:3,
      alt:'wolf',
      pos:[2,0]
    },
    {
      src:snake,
      key:4,
      alt:'snake',
      pos:[0,1]
    },
    {
      src:rabbit,
      key:5,
      alt:'rabbit',
      pos:[1,1]
    },
    {
      src:mongoose,
      key:6,
      alt:'mongoose',
      pos:[2,1]
    }

  ])
  
  // return render
  return (
    <div id="app-container">
      <Object {...{posObj,player,posRef}}/>
      <Instructions {...{insRef}}/>
      <Btn {...{insRef}}/>
      <Header {...{header}}/>
      {/*Add player prop to Choice*/}
      <Choice {...{player,header,setHeader,posRef}}/>
    </div>
  );
}

export default App;
