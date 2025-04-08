<script lang="ts">
  import type { TypeHeroSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Parallax from './Parallax.svelte'

  let { item }: { item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>

<section class="flex flex--gapped hero" id={item.fields.id}>
  {#if item.fields.titre}
  <div class="col col--12of12 col--mobile--12of12">
    <h2 class="h1">{@html item.fields.titre}</h2>
  </div>
  {/if}
  {#if item.fields.image}
  <div class="col col--12of12 col--mobile--12of12 {item.fields.alignement}">
    <figure>
      <Parallax>
        <Media media={item.fields.image} noCaption focalPoint={item.fields.focus?.focalPoint as { x: number, y: number }} />
      </Parallax>
      {#if item.fields.image.fields.description}
      <figcaption>
        <p>{@html item.fields.image.fields.description}</p>
      </figcaption>
      {/if}
    </figure>
  </div>
  {/if}
</section>

<style lang="scss">
  section {
    overflow: hidden;

    figure {
      position: relative;
      width: calc(100% + $s0 * 2);
      margin: 0 calc($s0 * -1);

      :global(img), :global(video) {
        max-height: 66svh;
      }

      figcaption {
        position: absolute;
        z-index: 3;
        bottom: 0;
        left: 0;
        width: auto;
        padding: $s0 calc($s0 * 2);

        p {
          max-width: none;
        }
      }

      // svg {
      //   position: absolute;
      //   z-index: 2;
      //   top: -1px;
      //   left: 0;
      //   width: 100%;
      //   height: 10svh;
      //   transform: rotate(180deg);

      //   @media (max-width: $mobile) {
      //     height: 5svh;
      //   }

      //   path {
      //     color: var(--triangle-color, white);
      //   }

      //   &:last-of-type {
      //     top: auto;
      //     bottom: -1px;
      //     transform: rotate(0deg);
      //   }
      // }
    }

    // div.Gauche {
    //   figure {
    //     svg {
    //       &:first-of-type {
    //         transform: rotate(180deg) scaleX(-1);
    //       }
    //     }
    //   }
    // }

    // div.Droite {
    //   figure {
    //     figcaption {
    //       left: auto;
    //       right: 0;
    //       text-align: right;
    //     }

    //     svg {
    //       &:last-of-type {
    //         transform: rotate(180deg) scaleY(-1);
    //       }
    //     }
    //   }
    // }
  }
</style>

