<script lang="ts">
  import type { TypeText, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item, first, noTitle }: { item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, first?: boolean, noTitle?: boolean } = $props()
</script>

<section class="flex flex--gapped {item.fields.alignement}" class:first id={item.fields.id}>
  {#if !noTitle}
  <div class="col col--12of12 col--mobile--12of12">
    <h2 class="h1">{@html item.fields.title}</h2>
  </div>
  {/if}
  {#if item.fields.corps || item.fields.liens?.length}
  <div class="col col--6of12 col--mobile--12of12 flex flex--column flex--gapped" class:col--12of12={!item.fields.image}>
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
</section>

<style lang="scss">
  section {
    
  }
</style>

