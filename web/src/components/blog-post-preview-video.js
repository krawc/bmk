import * as styles from "./blog-post-preview-video.module.css";
import { buildImageObj, cn, getBlogUrl } from "../lib/helpers";
import { Link } from "gatsby";
import PortableText from "./portableText";
import React, {useState} from "react";
import { format } from "date-fns";
import { imageUrlFor } from "../lib/image-url";
import Modal from 'react-modal';
import ReactPlayer from 'react-player'

import { responsiveTitle3 } from "./typography.module.css";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '50vh',
    background: '#000',
    border: 0
  },
  overlay: {
    background: 'rgba(0,0,0,0.8)'
  }
};


function BlogPostPreview(props) {

  const [rando, setRando] = React.useState(Math.random())
  const [open, setOpen] = React.useState(false)

  console.log(props.videoLink)
  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel="Example Modal">
          <ReactPlayer controls={true} url={props.videoLink}></ReactPlayer>
      </Modal>
    <div
      className={cn(styles.card, props.isInList ? styles.inList : styles.inGrid)}
      style={{marginTop: (rando * 15) + 'vh'}}
      onClick={()=>setOpen(true)}
    >

      {/* <div className={styles.leadMediaThumb}> */}
        {props.mainImage && props.mainImage.asset && (
          <img
            className={styles.mainImage}
            src={imageUrlFor(buildImageObj(props.mainImage))
              .auto("format")
              .url()}
            alt={props.mainImage.alt}
          />
        )}
      {/* </div> */}
      <div className={styles.text}>
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
        {/* {props._rawExcerpt && (
          <div className={styles.excerpt}>
            <PortableText blocks={props._rawExcerpt} />
          </div>
        )} */}
        {/* <div className={styles.date}>
          {format(new Date(props.publishedAt), "MMMM Mo, yyyy")}
        </div> */}
      </div>
    </div>
    </>
  );
}

export default BlogPostPreview;
