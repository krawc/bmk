import * as styles from "./about.module.css";
import { differenceInDays, formatDistance, format } from "date-fns";
import AuthorList from "./author-list";
import Container from "./container";
import PortableText from "./portableText";
import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

function About(props) {
  const {
    description,
    title,
    mainImage,
  } = props;


  return (
    <article className={styles.root}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            {mainImage && mainImage.asset && (
                <img
                  className={styles.mainImage}
                  src={imageUrlFor(buildImageObj(mainImage))
                    .fit("crop")
                    .auto("format")
                    .url()}
                  alt={mainImage.alt}
                />
            )}
            <div className={styles.rightColumn}>
            <h1 className={styles.title}>{title}</h1>
            {description && <p>{description}</p>}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}

export default About;
