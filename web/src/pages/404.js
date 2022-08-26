import Layout from "../components/layout";
import React from "react";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1 style={{color: "#fff"}}>NOT FOUND</h1>
    <p style={{color: "#fff"}}>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
