import * as styles from "./blog-post-preview-grid.module.css";
import BlogPostPreview from "./blog-post-preview";
import BlogPostPreviewVideo from "./blog-post-preview-video";
import BlogPostPreviewPublication from "./blog-post-preview-publication";

import { Link } from "gatsby";
import React, { useState, useRef, useEffect, useCallback } from "react";
import HorizontalScroll from './scroller'
import DOM from 'react-dom'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import window from 'global'

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

function BlogPostPreviewGrid(props) {

  const refsc = useRef();
  const [scroll, setScroll] = useState(0);
  const [w, setW] = useState(1);
  const [mode, setMode] = useState('essays');

  const { height, width } = useWindowDimensions();

  const handleScroll = num => {
    // 👇️ take parameter passed from Child component
    setScroll(num);
  };

  const handleWidth = num => {
    // 👇️ take parameter passed from Child component
    setW(num);
  };

  return (
    <div className={styles.root}> 


      {width > 768 ? 
        <HorizontalScroll style={{height: 'calc(100vh - 73px)'}} handleScroll={handleScroll} handleWidth={handleWidth}>
        {props.nodes &&
          props.nodes.map((node) => {
            if (node.categories && node.categories.length !== 0 && node.categories[0].title === 'Videos') {
              return(
                <BlogPostPreviewVideo {...node} />
              )
            }
            if (node.categories && node.categories.length !== 0 && node.categories[0].title === 'Publications') {
              return(
                <BlogPostPreviewPublication {...node} />
              )
            }
            return(
            <BlogPostPreview {...node} />
            )
          })}
        </HorizontalScroll>
        :
        <Carousel
        additionalTransfrom={0}
        arrows
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 5,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 1,
            partialVisibilityGutter: 30
          }
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        transitionDuration={1000}
      >
          {props.nodes &&
            props.nodes.map((node) => {
              if (node.categories && node.categories.length !== 0 && node.categories[0].title === 'Videos') {
                return(
                  <BlogPostPreviewVideo {...node} />
                )
              }
              if (node.categories && node.categories.length !== 0 && node.categories[0].title === 'Publications') {
                return(
                  <BlogPostPreviewPublication {...node} />
                )
              }
              return(
              <BlogPostPreview {...node} />
              )
            })}
      </Carousel>
      }


      <div className={styles.scrollBar}>
        <div className={styles.wheel} style={{left: 'calc(' + ((Math.abs(scroll) / w) * 90) + '% + 5%)'}}></div>
      </div>
      <div className={styles.overlay}></div>
        <ul className={styles.subMenu}>
          <li>
            <Link to="/" activeStyle={{opacity: 1}}>ALL</Link>
          </li>
          <li>
            <Link to="/essays/" activeStyle={{opacity: 1}}>ESSAYS</Link>
          </li>
          <li>
            <Link to="/videos/" activeStyle={{opacity: 1}}>VIDEOS</Link>
          </li>
          <li>
            <Link to="/publications/" activeStyle={{opacity: 1}}>PUBLICATIONS</Link>
          </li>
      </ul>
      {/* {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )} */}
    </div>
  );
}

BlogPostPreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: "",
};

export default BlogPostPreviewGrid;


function sideScroll(element,direction,speed,distance,step) {
  let scrollAmount = 0;
  var slideTimer = setInterval(() => {
      if(direction == 'left'){
          element.scrollLeft -= step;
      } else {
          element.scrollLeft += step;
      }
      scrollAmount += step;
      if(scrollAmount >= distance){
          window.clearInterval(slideTimer);
      }
  }, speed);
} 


class Card extends React.Component {
constructor(props) {
  super(props);
}

render() {
  return(
    <div className={"card " + this.props.classes}>
      <div className="card-img-container">
        <span className="card-img-text">Not available</span>
      </div>
      <div className="card-text-container">
        <div className="card-title-block">
          <span className="card-title">{this.props.title}</span>
          <span className="card-subtitle">City, NE</span>
        </div>
        <div className="card-info-container">
          <div className="icon-container__horizontal">
            <div className="icon-group">
              <i className="fas fa-users"></i> <span className="icon-text">42,389</span>
            </div>
            <div className="icon-group">
              <i className="fas fa-user-check"></i> <span className="icon-text">6.8%</span>
            </div>
            <div className="icon-group">
              <i className="fas fa-dollar-sign"></i> <span className="icon-text">32,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
}




class CardContainer extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    disableScroll: false,
    scrollWidth: 0,
    scrollPos: 1,
    clonesWidth: 0,
  }
  this.scrollContainerRef = React.createRef();
  this.handleScroll = this.handleScroll.bind(this);
  this.scrollNext = this.scrollNext.bind(this);
  this.scrollPrev = this.scrollPrev.bind(this);
  this.setScroll = this.setScroll.bind(this);
  this.getClonesWidth = this.getClonesWidth.bind(this);
  this.reCalc = this.reCalc.bind(this);
}

reCalc() {
  let scrollPos = this.state.scrollPos;
  let scrollWidth = this.scrollContainerRef.current.clientWidth;
  let clonesWidth = this.getClonesWidth();

  if (scrollPos <= 0) {
    scrollPos = 1;
  }
  this.setState({
    scrollPos: scrollPos,
    scrollWidth: scrollWidth,
    clonesWidth: clonesWidth,
  });
}

handleScroll(e) {
  const container = e.currentTarget;
  const scrollWidth = container.scrollWidth;
  const clonesWidth = this.getClonesWidth();
  let scrollPos = container.scrollLeft;
  let scrollPosAdd;
  container.clientWidth > clonesWidth ? scrollPosAdd = container.clientWidth : scrollPosAdd = clonesWidth;
  
  if (!this.state.disableScroll) {
    if (scrollPos + scrollPosAdd >= scrollWidth) {
      this.setScroll(
        // The math floor value helps smooth out the scroll jump, 
        // I don't know why that particular value works, but it does 
        // Same goes for the other setScroll call below
        container, 1 + Math.floor(scrollPosAdd/12.09)
      );
      this.setState({
        disableScroll: true,
      });
    } else if (scrollPos <= 0) {
      this.setScroll(
        container, scrollWidth - clonesWidth - Math.floor(scrollPosAdd/12.09)
      );
      this.setState({
        disableScroll: true,
      });
    }
  } 
  
  this.setState({
    scrollWidth: container.scrollWidth,
    scrollPos: container.scrollLeft,
  });
} 

getClonesWidth() {
  const clones = document.getElementsByClassName('is-clone');
  let clonesWidth = 0;
  for (let i = 0; i < clones.length; i++) {
    clonesWidth = clonesWidth + clones[i].clientWidth;
  }
  return clonesWidth;
}

setScroll(element, pos) {
  element.scrollLeft = pos;
  this.setState({
    scrollPos: element.scrollLeft,
  });
}

scrollNext(e) {
  const container = e.currentTarget.previousSibling;
  sideScroll(container,'right', 10, 272, 10);
}

scrollPrev(e) {
  const container = e.currentTarget.nextSibling;
  sideScroll(container, 'left', 10, 272, 10);
}



componentDidUpdate(prevProps, prevState) {
    if (this.state.disableScroll) {
      window.setTimeout(function() {
        this.setState({
          disableScroll: false,
        });
      }.bind(this), 40)
    }
}

componentDidMount() {
  window.addEventListener('resize', this.reCalc);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.reCalc);
}

render() {
  return(
    <div className="card-container">
      <div className="scroll scroll-prev" onClick={this.scrollPrev}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <div ref={this.scrollContainerRef} className="scrolling-wrapper" onScroll={this.handleScroll}>
        {this.props && this.props.nodes &&
          this.props.nodes.map((node) => (
            <BlogPostPreview  {...node} />
        ))}
      </div>
      <div className="scroll scroll-next" onClick={this.scrollNext}>
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  )
}
}