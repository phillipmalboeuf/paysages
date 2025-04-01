<script lang="ts">
  import type { TypeText, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item, noTitle }: { item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, noTitle?: boolean } = $props()
</script>

<section class="flex flex--gapped {item.fields.alignement}">
  {#if !noTitle}
  <div class="col col--12of12 col--mobile--12of12">
    <h2 class="h1">{@html item.fields.title}</h2>
  </div>
  {/if}
  {#if item.fields.corps || item.fields.liens?.length}
  <div class="col col--6of12 col--mobile--12of12 flex flex--column flex--gapped">
    <Rich body={item.fields.corps} />

    {#if item.fields.liens?.length}
    <ul class="list--nostyle flex flex--gapped">
      {#each item.fields.liens as lien}
      <li><a href={lien.fields.route}><u>{lien.fields.titre}</u></a></li>
      {/each}
    </ul>
    {/if}
  </div>
  {/if}
  {#if item.fields.image}
  <div class="col col--6of12 col--mobile--12of12">
    <Media media={item.fields.image} />
  </div>
  {/if}

  {#if !!item.fields.alignement}
  <svg viewBox="0 0 300 50" preserveAspectRatio="none"><path d="M0 0L300 50H0V0Z"/></svg>
  <svg viewBox="0 0 300 50" preserveAspectRatio="none"><path d="M0 0L300 50H0V0Z"/></svg>
  {/if}
</section>

<style lang="scss">
  section {
    position: relative;

    svg {
      position: absolute;
      z-index: 2;
      top: -1px;
      left: 0;
      width: 100%;
      height: 10svh;
      transform: rotate(180deg);

      @media (max-width: $mobile) {
        height: 5svh;
      }

      path {
        color: var(--background-color, white);
      }

      &:last-of-type {
        top: auto;
        bottom: -1px;
        transform: rotate(0deg);
      }
    }

    &.Gauche {
      svg {
        &:first-of-type {
          transform: rotate(180deg) scaleX(-1);
        }
      }
    }

    &.Droite {
      svg {
        &:last-of-type {
          transform: rotate(180deg) scaleY(-1);
        }
      }
    }
  }
</style>

