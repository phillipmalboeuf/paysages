<script lang="ts">
  import type { TypeHeroSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Parallax from './Parallax.svelte'

  import { icons } from '$lib/formatters'

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
        <input type="checkbox" id={item.fields.id + '-caption'}>
        <label for={item.fields.id + '-caption'}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#F5CDBD"/><path d="M12.0049 6.096C12.6929 6.096 13.2369 6.624 13.2369 7.312C13.2369 8 12.6929 8.528 12.0049 8.528H11.9889C11.3009 8.528 10.7569 8 10.7569 7.312C10.7569 6.624 11.3009 6.096 11.9889 6.096H12.0049ZM10.9489 9.808H13.0609V18H10.9489V9.808Z" fill="black"/></svg>
        </label>
        <p>{@html icons(item.fields.image.fields.description)}</p>
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
        z-index: 30;
        bottom: calc($s-1 * -1);
        left: 0;
        width: auto;
        
        p {
          max-width: none;
          padding: $s0 calc($s0 * 2);
          font-weight: 600;
        }

        @media (max-width: $mobile) {
          z-index: initial;
          transition: transform 0.666s;
          transform: translateY(100%);
          width: 100%;

          &:has(> input:checked) {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }

      label {
        position: absolute;
        z-index: 30;
        bottom: 100%;
        left: 0;
        padding: $s-2 calc($s0 * 2);

        @media (min-width: $mobile) {
          display: none;
        }

        @media (max-width: $mobile) {
          & + p {
            background-color: white;
            transition: opacity 0.666s;
            opacity: 0;
          }
        }
      }

      input[type="checkbox"] {
        display: none;

        @media (max-width: $mobile) {
          &:checked + label + p {
            opacity: 1;
          }
        }
      }
    }
  }
</style>

