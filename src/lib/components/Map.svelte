<script lang="ts">
  import type { TypeCarteSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item, noTitle }: { item: Entry<TypeCarteSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, noTitle?: boolean } = $props()
</script>

<section class="flex flex--gapped" id={item.fields.id}>
  {#if !noTitle}
  <div class="col col--12of12 col--mobile--12of12">
    <h2 class="h1">{@html item.fields.titre}</h2>
  </div>
  {/if}
  {#if item.fields.googleMapId}
  <div class="col col--12of12 col--mobile--12of12">
    <iframe title={item.fields.titre} src={`https://www.google.com/maps/d/embed?mid=${item.fields.googleMapId}&ehbc=000000&noprof=1`}></iframe>
  </div>
  {/if}

  <!-- {#if !!item.fields.alignement}
  <svg viewBox="0 0 300 50" preserveAspectRatio="none"><path d="M0 0L300 50H0V0Z"/></svg>
  <svg viewBox="0 0 300 50" preserveAspectRatio="none"><path d="M0 0L300 50H0V0Z"/></svg>
  {/if} -->
</section>

<style lang="scss">
  section {
    position: relative;

    iframe {
      border: none;
      width: 100%;
      height: 75svh;
      margin: $s3 0;
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
    //     color: var(--background-color, white);
    //   }

    //   &:last-of-type {
    //     top: auto;
    //     bottom: -1px;
    //     transform: rotate(0deg);
    //   }
    // }

    // &.Gauche {
    //   svg {
    //     &:first-of-type {
    //       transform: rotate(180deg) scaleX(-1);
    //     }
    //   }
    // }

    // &.Droite {
    //   svg {
    //     &:last-of-type {
    //       transform: rotate(180deg) scaleY(-1);
    //     }
    //   }
    // }
  }
</style>

