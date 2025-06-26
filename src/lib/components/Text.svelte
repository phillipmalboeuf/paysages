<script lang="ts">
  import type { TypeText, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item, first, noTitle }: { item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, first?: boolean, noTitle?: boolean } = $props()
</script>

<section class="flex flex--gapped flex--spaced {item.fields.alignement} paragraph--{item.fields.alignementParagraph} {item.fields.image ? 'has-image' : 'has-no-image'}" class:first id={item.fields.id}>
  {#if !noTitle && item.fields.title}
  <div class="col col--9of12 col--mobile--12of12">
    <h2 class:h1={!item.fields.grosTitre} class:h0={item.fields.grosTitre}>{@html item.fields.title.replaceAll('Capitale-Nationale', '<span class="nobr">Capitale-Nationale</span>')}</h2>
  </div>
  {/if}
  {#if item.fields.corps || item.fields.liens?.length}
  <div class="col col--5of12 col--landscape--6of12 col--mobile--12of12 flex flex--column flex--gapped corps" class:col--6of12={!item.fields.image && item.fields.alignementParagraph === 'Droite'} class:col--12of12={!item.fields.image && !item.fields.alignementParagraph}>
    <Rich body={item.fields.corps} />

    {#if item.fields.liens?.length}
    <ul class="list--nostyle flex flex--gapped {item.fields.liens.length > 2 ? 'flex--column' : ''}">
      {#each item.fields.liens as lien}
      <li><a href={lien.fields.route}><u>{lien.fields.titre}</u></a></li>
      {/each}
    </ul>
    {/if}
  </div>
  {/if}
  {#if item.fields.image}
  <div class="col col--6of12 col--mobile--12of12 media">
    <Media media={item.fields.image} ar={4/6} focalPoint={item.fields.focus?.focalPoint} />
  </div>
  {:else}
  <div class="col col--6of12"></div>
  {/if}
</section>

<style lang="scss">
  section {

    h2,
    .corps :global(h2) {
      margin-bottom: $s2;
    }

    ul {
      li {
        font-size: $s-1;
      }
    }

    &.has-image {
      // @media (min-width: $mobile) {
      //   &.Gauche.paragraph--Droite {
      //     .media {
      //       margin-top: 10svh;
      //     }
      //   }

      //   &.Gauche:not(.paragraph--Droite) {
      //     .corps {
      //       margin-top: 10svh;
      //     }
      //   }

      //   &.Droite:not(.paragraph--Droite) {
      //     .media {
      //       margin-top: 10svh;
      //     }
      //   }

      //   &.Droite.paragraph--Droite {
      //     .corps {
      //       margin-top: 10svh;
      //     }
      //   }
      // }
    }

    @media (min-width: $mobile) {
      &.paragraph--Droite {
        .corps {
          order: 99;
        }
      }
    }

    &#appel-de-projets {
      .corps {
        :global(table) {
          // margin-bottom: calc($s3 * -1);
          width: 100%;

          @media (max-width: $tablet_landscape) {
            width: 200%;
          }

          @media (max-width: $mobile) {
            width: 100%;

            :global(tr) {
              display: flex;
              flex-direction: column;
              margin-top: $s0;
            }

            :global(tr + tr) {
              margin-top: $s2;
            }

            :global(th),
            :global(td) {
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>

