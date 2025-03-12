<script lang="ts">
  import { type TypeListeSkeleton, type TypeTextSkeleton, isTypeArticle, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import Text from './Text.svelte'

  let { item }: { item: Entry<TypeListeSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'> } = $props()
</script>

<section>
  {#if item.fields.titre}
  <h2>{item.fields.titre}</h2>
  {/if}

  {#if item.fields.items?.length}
  <ul class="list--nostyle">
    {#each item.fields.items as _item}
    <li>
      {#if isTypeText(_item)}
      <Text item={_item} />
      {/if}
    </li>
    {/each}
  </ul>
  {/if}
</section>

<style lang="scss">
  section {
  }
</style>