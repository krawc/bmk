import React from "react";
import { graphql } from "gatsby";
import {
  filterOutDocsPublishedInTheFuture,
  filterOutDocsWithoutSlugs,
  mapEdgesToNodes,
} from "../lib/helpers";
import Contact from "../components/Contact";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";


const ContactPage = (props) => {
  const { data, errors } = props;

  //console.log(data.posts.edges[0].node);


  return (
    <Layout>
      <SEO
        title={'bognamk contact'}
      />
      <Container>
        <Contact></Contact>
      </Container>
    </Layout>
  );
};

export default ContactPage;
