import { Link, graphql, useStaticQuery } from "gatsby";
import React from "react";
import Icon from "./icon";
import { cn, mapEdgesToNodes} from "../lib/helpers";
import Modal from 'react-modal';

import * as styles from "./header.module.css";

import { useState, useEffect } from 'react';
import window from 'global'

export const query = graphql`
  query ThemesQuery {
    themes: allSanityTheme {
      edges {
        node {
          id
          title
          description
        }
      }
    }
  }
`

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}



const Header = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const [themes, setThemes] = React.useState(false)

  const  data = useStaticQuery(query);

  const { height, width } = useWindowDimensions();



  const themeNodes = (data || {}).themes
  ? mapEdgesToNodes(data.themes)
  : [];

  console.log(data.themes)

  const customStyles = {
    content: {
      padding: 20,
       textAlign: 'center'
    },
    overlay: {
      background: 'rgba(0,0,0,0.3)', 
      width: '100%',
      height: '100%',
      margin: 'auto',
      backdropFilter: 'blur(30px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }
  }


  const links = themeNodes && themeNodes.map((item) => {
    return <Link onClick={() => setThemes(!themes)} to={`/theme/${item.id}`} activeStyle={{fontWeight: 700}}>{item.title}</Link>
  })

  if (width <= 768) {
    return (
      <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <Link to="/">{props.siteTitle}</Link>
        </div>
         <div className={styles.menuContainer}>
            <Modal
              isOpen={themes}
              style={customStyles}
              className="themesModalll"
              onRequestClose={() => setThemes(false)}
              contentLabel="Example Modal">
                <h2>THEMES</h2>
                <div style={{fontFamily: 'Roboto Mono', fontSize: 28, display: 'flex', flexDirection: 'column'}}>
                  {links}
                </div>
            </Modal>
          <div className={styles.icon} onClick={() => { console.log(isOpen); setIsOpen(!isOpen)}}>
          <Icon symbol="hamburger"/>
          </div>
            {
              isOpen && <div className={styles.mobMenu}>
              <Link to="/" activeStyle={{fontWeight: 700}}>Works</Link>
              <Link to="/about/" activeStyle={{fontWeight: 700}}>About</Link>
              <Link to="/contact/" activeStyle={{fontWeight: 700}}>Contact</Link>
              <div onClick={() => {setThemes(!themes)}} activeStyle={{fontWeight: 700}}>THEMES</div>
          </div>}
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className={styles.root}>
    <div className={styles.wrapper}>
      <div className={styles.branding}>
        <Link to="/">{props.siteTitle}</Link>
      </div>
      {

      }
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/" activeStyle={{fontWeight: 700}}>Works</Link>
          </li>
          <li>
            <Link to="/about/" activeStyle={{fontWeight: 700}}>About</Link>
          </li>
          <li>
            <Link to="/contact/" activeStyle={{fontWeight: 700}}>Contact</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.themes}>
        <button type="button" onClick={() => {setThemes(!themes)}}><svg fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px"><path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"/></svg>THEMES</button>
        <Modal
          isOpen={themes}
          style={customStyles}
          className="themesModalll"
          onRequestClose={() => setThemes(false)}
          contentLabel="Example Modal">
            <h2>THEMES</h2>
            <div style={{fontFamily: 'Roboto Mono', fontSize: 28, display: 'flex', flexDirection: 'column'}}>
              {links}
            </div>
        </Modal>
      </div>
    </div>
  </div>
  )
};

export default Header;
