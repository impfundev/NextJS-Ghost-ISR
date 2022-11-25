export default async function ampConvert({ html }) {

  // Remove preload and prefetch tags
    html = html.replace(/<link[^>]*rel="(?:preload|prefetch)?"[^>]*>/gi, '');
  
  // Remove data attributes from tags
    html = html.replace(/\s*data-(v|n)-(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, '');
    html = html.replace(/javascript:void\(0\)/gi, '#');

  // Replace iframe with amp-iframe
    html = html.replace(/<iframe([^>]*)><\/iframe>/gi, (match, sub) => {
      return `<amp-iframe ${sub} layout=responsive></amp-iframe>`
    });

  // Replace unwanted attribute
    html = html.replace(/<div[^>]*name=(?:[^=>]*="[^"]*"|[^=>\s]*)/gi, (match) => {
      return match.replace(/name/gi, '')
    });
    html = html.replace(/<a[^>]*source="[a-z|-]*"/gi, (match) => {
      return match.replace(/source=/gi, '')
    });

  // Remove JS script tags except for ld+json
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (match) => {
      return (/application\/ld\+json/gi.test(match)) ? match : ''
    });

  return html;
}
