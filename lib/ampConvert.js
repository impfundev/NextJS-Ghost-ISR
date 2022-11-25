import reactHtmlReplace from 'react-html-replace';

export default async function ampConvert({ content }) {
  const ampHtml = reactHtmlReplace(content, (tag, props) => {
    if (tag === 'script') {
      return ('');
    }
    if (tag === 'iframe') {
      const { src, width, height } = props;
      return <amp-iframe width={width} height={height} src={src} layout="responsive"></amp-iframe>;
    }
    if (tag === 'video') {
      const { src } = props;
      return <amp-video width="650" height="360" src={src} layout="responsive" autoplay loop></amp-video>;
    }
  });

  return { ampHtml };
}
