import BlogPostPreviewTheme from "../components/blog-post-preview-theme";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import React from "react";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";

import { responsiveTitle1 } from "../components/typography.module.css";

export const query = graphql`
  query ThemePageQuery($id: String) {
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { themes: {elemMatch: { id: { eq: $id } } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          themes {
            id
            title
            description
          }
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const ThemePage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  console.log(props)

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);

  return (
    <Layout>
      <SEO title="Archive" />
      <Container>
        <h1 style={{maxWidth: 900, margin: 'auto', fontFamily: 'Roboto Mono, monospace'}} className={responsiveTitle1}>Theme: {props.pageContext.title}</h1>
        {postNodes && postNodes.length > 0 && (
          <BlogPostPreviewTheme nodes={postNodes} />
        )}
      </Container>
    </Layout>
  );
};

export default ThemePage;
