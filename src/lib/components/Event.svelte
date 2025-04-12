<script lang="ts">
  import type { TypeEventSkeleton, TypeText, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  
  import { formatDate } from '$lib/formatters'
  
  let { item }: { item: Entry<TypeEventSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, first?: boolean, noTitle?: boolean } = $props()
</script>

<article class="flex flex--gapped flex--column" id={item.fields.id}>
  <h3>{@html item.fields.titre}</h3>

  {#if item.fields.image}
  <div class="media">
    <Media media={item.fields.image} />
  </div>
  {/if}

  {#if item.fields.date}
  <p>{formatDate(item.fields.date)}</p>
  {/if}

  {#if item.fields.endroit}
  <p>{item.fields.endroit}</p>
  {/if}

  {#if item.fields.liens?.length}
  <ul class="list--nostyle flex flex--gapped">
    {#each item.fields.liens as lien}
    <li><a href={lien.fields.route}><u>{lien.fields.titre}</u></a></li>
    {/each}
  </ul>
  {/if}
</article>

<style lang="scss">
  article {

    // h2 {
    //   margin-bottom: $s3;
    // }
  }
</style>

