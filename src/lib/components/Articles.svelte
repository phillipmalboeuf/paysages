<script lang="ts">
  import type { TypeArticleSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import Media from './Media.svelte'
  import { formatDate } from '$lib/formatters'

  let { articles, full }: { articles: Entry<TypeArticleSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>[], full?: boolean } = $props()
</script>

<section class="padded flex flex--gapped" class:limited={!full}>
  <nav class="col col--12of12 flex flex--gapped flex--bottom">
    <h2 class="h0 col">Actualités</h2>
    {#if !full}
    <a class="col" href="/actualites"><u>Toutes les actualités</u></a>
    {/if}
  </nav>

  {#each (articles.slice(0, full ? articles.length : 4)) as article, i}
  {#if i % 4 === 0}
  <hr class="col col--12of12" />
  {/if}
  <article class="col col--3of12 col--mobile--6of12 flex flex--column flex--gapped">
    {#if article.fields.media}
    <Media media={article.fields.media} />
    {/if}
    <p>{article.fields.titre}<br>{formatDate(article.fields.date)}</p>

    {#if article.fields.liens?.length}
    <ul class="list--nostyle flex flex--gapped">
      {#each article.fields.liens as lien}
      <li><a href={lien.fields.route}><u>{lien.fields.titre}</u></a></li>
      {/each}
    </ul>
    {/if}
  </article>
  {/each}
</section>

<style lang="scss">
  section {
    padding-top: calc($s5 + 10svh);
    align-items: stretch;

    :global(.-contact) & {
      display: none;
    }

    @media (max-width: $mobile) {
      padding-top: calc($s5 + 5svh);

      hr {
        // display: none;
      }
    }

    nav {
      h2 {
        margin-right: auto;
      }
    }

    article {
      
      ul {
        margin-top: auto;
      }

      :global(img) {
        min-height: 20vh;
        object-fit: contain;
      }
    }

    &.limited { 
      @media (max-width: $mobile) {
        article:nth-child(n + 5) {
          display: none;
        }
      }
    }
  }
</style>
