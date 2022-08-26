import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import { cn } from "../lib/helpers";

import * as styles from "./header.module.css";

import { useState, useEffect } from 'react';

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



const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => {

  const [isOpen, setIsOpen] = useState(false);

  const { height, width } = useWindowDimensions();

  if (width <= 768) {
    return (
      <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <Link to="/">{siteTitle}</Link>
        </div>
         <div className={styles.menuContainer}>
          <div className={styles.icon} onClick={() => { console.log(isOpen); setIsOpen(!isOpen)}}>
          <Icon symbol="hamburger"/>
          </div>
            {
              isOpen && <div className={styles.mobMenu}>
              <Link to="/" activeStyle={{fontWeight: 700}}>Works</Link>
              <Link to="/about/" activeStyle={{fontWeight: 700}}>About</Link>
              <Link to="/contact/" activeStyle={{fontWeight: 700}}>Contact</Link>
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
        <Link to="/">{siteTitle}</Link>
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
    </div>
  </div>
  )
};

export default Header;
