<script lang="ts">
  import type { TypeArticleSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import Media from './Media.svelte'

  let { articles }: { articles: Entry<TypeArticleSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>[] } = $props()
</script>

<section class="padded flex flex--gapped">
  <h2 class="h1 col col--12of12">Actualités</h2>

  {#each articles as article, i}
  {#if i % 4 === 0}
  <hr class="col col--12of12" />
  {/if}
  <div class="col col--3of12 col--mobile--6of12 flex flex--column flex--gapped">
    {#if article.fields.media}
    <Media media={article.fields.media} />
    {/if}
    <h6>{article.fields.titre}</h6>

    {#if article.fields.liens?.length}
    <ul class="list--nostyle flex flex--gapped">
      {#each article.fields.liens as lien}
      <li><a href={lien.fields.route}><u>{lien.fields.titre}</u></a></li>
      {/each}
    </ul>
    {/if}
  </div>
  {/each}
</section>

<style lang="scss">
  section {
    padding-top: calc($s5 + 10svh);
  }
</style>
