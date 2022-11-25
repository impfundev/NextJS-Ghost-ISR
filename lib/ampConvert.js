export default async function ampConvert({ content }) {

  // Remove preload and prefetch tags
    content.replace(/<link[^>]*rel="(?:preload|prefetch)?"[^>]*>/gi, '');
  
  // Remove data attributes from tags
    content.replace(/\s*data-(v|n)-(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, '');
    content.replace(/javascript:void\(0\)/gi, '#');

  // Replace iframe with amp-iframe
    content.replace(/<iframe([^>]*)><\/iframe>/gi, (match, sub) => {
      return `<amp-iframe ${sub} layout=responsive></amp-iframe>`
    });

  // Replace unwanted attribute
    content.replace(/<div[^>]*name=(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, (match) => {
      return match.replace(/name/gi, '')
    });
    content.replace(/<a[^>]*source="[a-z|-]*"/gi, (match) => {
      return match.replace(/source=/gi, '')
    });

  // Remove JS script tags except for ld+json
    content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (match) => {
      return (/application\/ld\+json/gi.test(match)) ? match : ''
    });

  return {
    ampHtml: content,
  };
}
