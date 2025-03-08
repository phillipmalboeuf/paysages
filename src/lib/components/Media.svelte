<script lang="ts">
  import type { Asset } from 'contentful'

  let {
    media,
    mobileMedia,
    alt,
    width = 1666,
    ar = undefined,
    eager = false
  }: { media: Asset<"WITHOUT_UNRESOLVABLE_LINKS">, mobileMedia?: Asset<"WITHOUT_UNRESOLVABLE_LINKS">, alt?: string, width?: number, ar?: number, eager?: boolean } = $props()

  function cdn(url: string) {
    return url
  }
</script>

<figure>
  <picture>
    <source srcSet="{cdn(mobileMedia ? mobileMedia.fields.file.url : media.fields.file.url)}?h={Math.round(width * 0.333)}{ar ? `&fit=fill&w=${Math.round(width * 0.333 * ar)}` : ''}" media="(max-width: 900px)" />
    <source srcSet="{cdn(media.fields.file.url)}?w={Math.round(width * 0.666)}{ar ? `&fit=fill&h=${Math.round(width * 0.666 * ar)}` : ''}" media="(max-width: 1200px)" />
    <source srcSet="{cdn(media.fields.file.url)}?w={Math.round(width * 1.333)}{ar ? `&fit=fill&h=${Math.round(width * 1.333 * ar)}` : ''}" media="(min-width: 1500px)" />
    <img src="{cdn(media.fields.file.url)}?w={width}{ar ? `&fit=fill&h=${Math.round(width * ar)}` : ''}"
      style:--ar={ar ? `${width} / ${Math.round(width * ar)}` : `${media.fields.file.details.image.width} / ${media.fields.file.details.image.height}`}
      style:--mobile-ar={(!ar && mobileMedia) ? `${mobileMedia.fields.file.details.image.width} / ${mobileMedia.fields.file.details.image.height}` : undefined}
      alt="{alt || media.fields.title}" loading={eager ? "eager" : "lazy"} />
  </picture>
  <figcaption>
    <svg viewBox="0 0 300 50" preserveAspectRatio="none">
    <path d="M0 0L300 50H0V0Z"/>
    </svg>

    {#if media.fields.description}
    <p>{@html media.fields.description}</p>
    {/if}
  </figcaption>
</figure>

<style lang="scss">
  figure {
    width: 100%;
    // margin: 0;
    position: relative;
    overflow: hidden;

    figcaption {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: $jaune;
      padding: 0 $s-1 $s-1;
      transition: transform 0.333s, opacity 0.333s;
      transform: translateY(100%);
      opacity: 0;
      mix-blend-mode: screen;

      svg {
        position: absolute;
        bottom: calc(100% - 1px);
        left: 0;
        width: 100%;
        height: 0lvh;
        transition: height 0.333s;

        path {
          fill: $jaune !important;
        }
      }
    }

    &:hover {
      figcaption {
        transform: translateY(0);
        opacity: 1;

        svg {
          height: 5lvh;
        }
      }
    }
  }
</style>