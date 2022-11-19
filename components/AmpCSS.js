export default function AmpCSS() {
  return (
    <>
<style jsx global amp-custom="">{`
.header {
position: sticky; 
top: 0; 
background-color: #ffffff;
}

.header-wrapper {
width: 100%; 
display: flex; 
padding-top: 1rem;
padding-bottom: 1rem; 
padding-left: 1.25rem;
padding-right: 1.25rem; 
justify-content: space-between; 
align-items: center;
}

.logo-wrapper {
display: flex; 
align-items: center; 
gap: 1rem;
}

.logo {
border-radius: 9999px;
}

.site-title {
font-size: 1.125rem;
line-height: 1.75rem; 
font-weight: 700;
}

.menu-icon {
display: inline-block; 
width: 1.5rem; 
height: 1.5rem; 
stroke: currentColor;
}

.main-wrapper {
width: 100%; 
padding-left: 1.25rem;
padding-right: 1.25rem; 
padding-bottom: 2rem;
}

.category-wrapper {
padding-top: 1rem;
padding-bottom: 1rem;
}

.category {
padding-top: 0.25rem;
padding-bottom: 0.25rem; 
padding-left: 0.75rem;
padding-right: 0.75rem; 
background-color: #000000; 
color: #ffffff; 
font-size: 0.875rem;
line-height: 1.25rem; 
font-weight: 700; 
border-radius: 9999px;
}

/* Main Content */
iframe {
  width: 100%;
  height: auto;
  min-height: 300px;
}

img {
  width: 100%;
  height: auto;
}

a {
  text-decoration: none;
  font-weight: 700;
}

.has-text-align-left {
  text-align: left;
}

.has-text-align-center {
  text-align: center;
}

.has-text-align-right {
  text-align: right;
}

.has-large-font-size {
  font-size: 2.25rem;
  line-height: 2.5rem; 
}

.alignfull {
  position: relative;
  width: 100vw;
  left: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  max-width: 100vw;
  right: 50%;
}

.wp-block-image img {
margin-top: 0.5rem; 
max-width: 100%;
}
.wp-block-image.aligncenter {
text-align: center;
}
.wp-block-image.alignfull img,
.wp-block-image.alignwide img {
  width: 100%;
}
.wp-block-image .alignleft,
.wp-block-image .alignright,
.wp-block-image .aligncenter,
.wp-block-image.is-resized {
display: table;
margin-right: 0;
margin-left: 0;
}
.wp-block-image .alignleft > figcaption,
.wp-block-image .alignright > figcaption,
.wp-block-image .aligncenter > figcaption,
.wp-block-image.is-resized > figcaption {
  display: table-caption;
  caption-side: bottom;
}

.wp-block-image .alignleft {
float: left; 
margin-right: 1rem;
}
.wp-block-image .alignright {
float: right; 
margin-left: 1rem;
}
.wp-block-image .aligncenter {
  margin: auto;
}

.wp-block-button a,
.wp-block-file a.wp-block-file__button {
padding-top: 0.5rem;
padding-bottom: 0.5rem; 
padding-left: 1rem;
padding-right: 1rem; 
background-color: #000000; 
color: #ffffff; 
text-decoration: none;
}

.wp-block-button a:hover,
.wp-block-file a.wp-block-file__button:hover {
background-color: #000000; 
cursor: pointer;
}

.wp-block-file a:first-of-type {
  margin-right: 1rem; 
}

.wp-block-cover {
display: flex; 
overflow: hidden; 
background-position: center; 
background-size: cover; 
flex-wrap: wrap; 
justify-content: center; 
align-items: center;
min-height: 430px;
}

.wp-block-verse {
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; 
}

.wp-block-media-text {
display: grid; 
grid-template-columns: repeat(2, minmax(0, 1fr)); 
gap: 1rem;
}

.main-title {
font-size: 1.5rem;
line-height: 2rem;
}

@media only screen (min-width: 768px) { 
  .main-title {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
}

.main-date {
color: #6B7280; 
font-size: 0.875rem;
line-height: 1.25rem;
}

.tag-wrapper {
display: flex; 
padding: 0; 
padding-top: 0.75rem;
padding-bottom: 0.75rem; 
margin: 0; 
list-style-type: none; 
flex-wrap: wrap; 
gap: 0.25rem;
}

.tag-list {
padding: 0; 
margin: 0;
}

.tag {
padding-top: 0.25rem;
padding-bottom: 0.25rem; 
padding-left: 0.75rem;
padding-right: 0.75rem; 
background-color: #000000; 
color: #ffffff; 
font-size: 0.875rem;
line-height: 1.25rem; 
font-weight: 700; 
border-radius: 9999px; 
}

.comment-wrapper {
padding-top: 1.25rem;
padding-bottom: 1.25rem; 
}
`}</style>
    </>
  );
}
