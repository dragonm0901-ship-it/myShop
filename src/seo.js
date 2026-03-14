import { useEffect } from 'react';

const setMetaTag = (selector, attribute, content) => {
  if (typeof document === 'undefined') return;
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    const attrName = selector.includes('property=') ? 'property' : 'name';
    const value = selector.split('="')[1]?.replace('"]', '') || '';
    if (value) tag.setAttribute(attrName, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attribute, content);
};

const setLinkTag = (rel, href) => {
  if (typeof document === 'undefined') return;
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

export const useSeo = ({
  title,
  description,
  image,
  type = 'website',
  url,
  jsonLd,
}) => {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setMetaTag('meta[name="description"]', 'content', description);
      setMetaTag('meta[property="og:description"]', 'content', description);
      setMetaTag('meta[name="twitter:description"]', 'content', description);
    }
    if (title) {
      setMetaTag('meta[property="og:title"]', 'content', title);
      setMetaTag('meta[name="twitter:title"]', 'content', title);
    }
    if (type) {
      setMetaTag('meta[property="og:type"]', 'content', type);
    }
    if (image) {
      setMetaTag('meta[property="og:image"]', 'content', image);
      setMetaTag('meta[name="twitter:image"]', 'content', image);
    }
    const resolvedUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    if (resolvedUrl) {
      setMetaTag('meta[property="og:url"]', 'content', resolvedUrl);
      setLinkTag('canonical', resolvedUrl);
    }

    if (jsonLd) {
      let script = document.querySelector('script[data-seo="jsonld"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'jsonld');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }
  }, [title, description, image, type, url, jsonLd]);
};
