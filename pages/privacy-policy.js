import { gql } from "@apollo/client";
import parse from "html-react-parser";

import { client } from "../lib/apolloClient";
import Layout from "../components/Layout";

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function SinglePost({ page }) {
  const { title, content } = page;

  return (
    <Layout>
      <article className="blog-post">
        <h1>{title}</h1>
        <div>{parse(content)}</div>
      </article>
    </Layout>
  );
}

const GET_PAGE = gql`
  query getPages() {
    page(id: "privacy-policy", idType: URI) {
      title
      content
    }
  }
`;

export async function getStaticProps() {

  const response = await client.query({
    query: GET_PAGE,
  });

  const page = response?.data?.page;

  if (!page) {
    return { notFound: true };
  }

  return {
    props: { page },
    revalidate: 60,
  };
}
