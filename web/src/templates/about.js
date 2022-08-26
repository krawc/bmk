import { graphql } from "gatsby";
import About from "../components/about";
import React from "react";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import { toPlainText } from "../lib/helpers";

export const query = graphql`
  query AboutTemplateQuery($id: String!) {
    post: sanityAbout(id: { eq: $id }) {
      id
      mainImage {
        ...SanityImage
        alt
      }
      title
      description
    }
  }
`;

const AboutTemplate = (props) => {
  const { data, errors } = props;
  const post = data && data.post;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {post && (
        <SEO
          title={post.title || "Untitled"}
          description={toPlainText(post._rawExcerpt)}
          image={post.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {post && <About {...post} />}
    </Layout>
  );
};

export default AboutTemplate;
