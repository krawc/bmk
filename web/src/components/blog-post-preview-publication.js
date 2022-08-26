import * as styles from "./blog-post-preview-publication.module.css";
import { buildImageObj, cn, getBlogUrl } from "../lib/helpers";
import { Link } from "gatsby";
import PortableText from "./portableText";
import React, {useState} from "react";
import { format } from "date-fns";
import { imageUrlFor } from "../lib/image-url";

import { responsiveTitle3 } from "./typography.module.css";

function BlogPostPreview(props) {

  const [rando, setRando] = React.useState(Math.random())

  return (
    <Link
      className={cn(styles.card, props.isInList ? styles.inList : styles.inGrid)}
      to={getBlogUrl(props.publishedAt, props.slug.current)}
      style={{marginTop: (0.3 * 15) + 'vh'}}
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
    </Link>
  );
}

export default BlogPostPreview;
