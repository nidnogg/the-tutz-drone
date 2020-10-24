import React, {useEffect, useState, useRef} from 'react';
import { gsap } from "gsap";
import Drone from './Drone.js';
import Clock from './Clock.js';
import Controller from './Controller.js';
import Hentai from './Hentai.js';
import Bg from './img/bg.png';
import './css/App.css';


const App = () => {

  const [isActive, setActive] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(0);

  //const timeline = useRef(0);
  const tl = useRef(0);
  const menu = useRef(0);
  const menuHeaderDiv = useRef(0);
  const menuHeader = useRef(0);
  const verNum = useRef(0);
  const menuButton = useRef(0);
  const menuContentDiv = useRef(0);
  const blur = useRef(0);

  // value should be either 0 or 1. These callbacks are passed down to child components
  function setActiveCallback(value) {
    setActive(value);
  }

  function isActiveCallback() {
    return isActive;
  } 

  function setMenuOpenCallback(value) {
    setMenuOpen(value);
  }

  function isMenuOpenCallback() {
    return isMenuOpen;
  }
  
  useEffect(() => {
    if(!tl.current) {
      tl.current = gsap.timeline({defaults: {duration: 0.2, ease:"expo"} })
                       .to(menu.current, {duration: 0.001, zIndex: 9997, ease:"none"})
                      // .add("start", 2)
                       .to(blur.current, {bottom: "-30%", duration: 0.3777}, 0.2) //0.2 could be label start!
                       .set(blur.current, {webkitFilter:"blur(10px)"}, 0.2)
                       .to(menu.current, {opacity:"1"}, 0.4)
                       .to(menuHeaderDiv.current, {opacity:"1"})
                       .to(menuHeader.current, {opacity: "1"}, ">-0.2")
                       .to(verNum.current, {opacity: "1"}, ">-0.1")
                       .to(menuContentDiv.current, {opacity: "1"}, ">-0.2")
                       .to(menuButton.current, {opacity: "1"}, ">-0.2");
    }
  }, []); // crap requirement for using hooks with timelines

  useEffect(() => {
    isMenuOpen ? tl.current.play() : tl.current.reverse();
  }, [isMenuOpen]);  // wonder if isMenuOpen is also required for hooks

  return (
    <section className="main-section">
      <Hentai isMenuOpen={isMenuOpenCallback} setMenuOpen={setMenuOpenCallback} />
      <img className="background-img" src={Bg} alt="background"></img>
      <section ref={menu} className="main-menu-section">
        <div ref={menuHeaderDiv} className="main-menu-header">
            <span ref={menuHeader} className="menu-header">sueli drone</span> <span className="ver-num" ref={verNum}>v1.0</span>     
        </div>
        
        <div ref={menuContentDiv} className="main-menu-content">
          <p>
            Olá Sueli! Seja bem-vinda ao seu rádio pessoal na internet. 
            
            <br/> <br/>
            Aqui está um <a href="https://photos.app.goo.gl/Vcp9VM7kGLPgwEDE7">álbum</a> com suas fotos.
            Muito obrigado por todo o seu carinho e hospitalidade nos nossos 3 anos que nos conhecemos. Você é uma pessoa incrível! <br />
            Admiro muito seu amor pelo seu trabalho. <br />
            A última música é de minha autoria. Veja mais no meu <a href="https://soundcloud.com/nidnogg">soundcloud!</a> <br/>
            Inspirado pela exposição fenomenal do Docubyte, <a href="https://www.docubyte.com/works/guide-to-computing/">Guide to Computing.</a> <br />
            Feliz Aniversário!
          </p>
        </div>
      </section>

      <div ref={blur} className="drone-wrapper">
        <Drone className="drone" isActive={isActiveCallback} />
          <div className="visor-panel-wrapper">
            <section className="visor">
              <Clock />
            </section>
          </div>
          <Controller isActive={isActiveCallback} setActive={setActiveCallback} 
          />
     </div>
     {/*<Tooltip />*/}
    </section>
  );
}

const Tooltip = () => {
  return (
    <div className="tooltip-container">
      <span className="tooltip">
          Now playing: <br /> songname
      </span>
    </div>
  );
}

export default App;