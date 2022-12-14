import { siteName, siteUrl } from "../lib/config";
import SeoArticle from "./SeoArticle";

import Layout from "./Layout";
import PrimaryTags from "./PrimaryTags";
import Thumbnail from "./Thumbnail";
import Author from "./Author";
import DateUpdate from "./DateUpdate";
import DatePublish from "./DatePublish";
import Content from "./Content";
import Tags from "./Tags";
// import Comment from "./Comment";
import MorePost from "./MorePost";

export default function Post({ post, relatedPosts, thumbnail }) {
  const { title, excerpt, html, slug, tags, feature_image_caption, updated_at, published_at } = post;

  return (
    <>
    <SeoArticle
      url={`${siteUrl}/${slug}`}
      body={html}
      title={title}
      images={thumbnail}
      excerpt={excerpt}
      siteUrl={siteUrl}
      siteName={siteName}
      authorName={post.primary_author.name}
      authorSlug={post.primary_author.slug}
      modifiedTime={updated_at}
      publishedTime={published_at}
      publisherLogo={`${siteUrl}/favicon.png`}
    />
    <Layout>
    {post.primary_tag ? (
    <>
      <PrimaryTags tag={post.primary_tag} siteUrl={siteUrl} />
    </>
    ) : null}
      <article className="prose">
        <h1 className="text-2xl">
          {title}
        </h1>
        {thumbnail ? (
          <Thumbnail
            thumbnail={thumbnail}
            caption={feature_image_caption}
            title={title}
          />
        ) : null}
        <Author
          author={post.primary_author}
          siteUrl={siteUrl}
          title={title}
          slug={slug}
        />
        {updated_at ? (
          <DateUpdate update={updated_at} />
        ) : (
          <DatePublish publish={published_at} />
        )}
        <hr />
        <Content content={html} />
      </article>
      {tags ? (
        <>
          <Tags tags={tags} siteUrl={siteUrl} />
        </>
      ) : null}
      <!--[ <Comment url={`${siteUrl}/${slug}`} /> ]-->
      <MorePost
        posts={relatedPosts}
      />
    </Layout>
    </>
  );
}
