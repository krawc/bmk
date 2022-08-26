import * as styles from "./author-list.module.css";
import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

function AuthorList({ items, title }) {
  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {items.map(({ author, _key }) => {
          const authorName = author && author.name;
          return (
            <li key={_key} className={styles.listItem}>
              <div>
                <div>{'BY ' + authorName || <em>Missing name</em>}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AuthorList;
