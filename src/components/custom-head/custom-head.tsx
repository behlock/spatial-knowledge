import Head from 'next/head'

export const SITE_URL = 'https://collectivecreationgames.com'

export interface CustomHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  /** Absolute URL of the social preview image (1200×630). */
  imageUrl?: string
}

const ROBOTS = process.env.NODE_ENV === 'production' ? 'index,follow' : 'noindex,nofollow'

export default function CustomHead({
  title = 'Spatial Knowledge',
  description = 'Interactive 3D Knowledge Bases',
  keywords = [],
  // TODO: replace the placeholder with a real 1200×630 raster image; most platforms ignore SVG previews.
  imageUrl = `${SITE_URL}/seo-image.svg`,
}: CustomHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(',')} />}
      <meta name="author" content="Walid Behlock" />
      <meta name="robots" content={ROBOTS} />
      <meta name="format-detection" content="telephone=no" />
      <link rel="canonical" href={`${SITE_URL}/`} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  )
}
