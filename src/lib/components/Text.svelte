<script lang="ts">
  import type { TypeText, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item }: { item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>

<section class="flex flex--gapped">
  <div class="col col--12of12 col--mobile--12of12">
    <h2 class="h1">{@html item.fields.title}</h2>
  </div>
  {#if item.fields.corps || item.fields.liens?.length}
  <div class="col col--6of12 col--mobile--12of12 flex flex--column flex--gapped">
    <Rich body={item.fields.corps} />

    {#if item.fields.liens?.length}
    <ul class="list--nostyle flex flex--gapped">
      {#each item.fields.liens as lien}
      <li><a href={lien.fields.route}>{lien.fields.titre}</a></li>
      {/each}
    </ul>
    {/if}
  </div>
  {/if}
  {#if item.fields.media}
  <div class="col col--6of12 col--mobile--12of12">
    <Media media={item.fields.media} />
  </div>
  {/if}
</section>

