import * as styles from "./contact.module.css";
import { differenceInDays, formatDistance, format } from "date-fns";
import AuthorList from "./author-list";
import Container from "./container";
import PortableText from "./portableText";
import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

function Contact(props) {
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
              <div className={styles.rightColumn}>
                <h1 className={styles.title}>GENERAL INQUIRIES</h1>
                <input type="email" placeholder="Write your email address..."></input>
                <textarea placeholder="Write your message"></textarea>
                <button>SEND</button>
                {description && <p>{description}</p>}
              </div>
          </div>
        </div>
      </Container>
    </article>
  );
}

export default Contact;
