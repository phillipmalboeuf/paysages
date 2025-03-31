<script lang="ts">
  import { type TypeListeSkeleton, type TypeTextSkeleton, isTypeArticle, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import Text from './Text.svelte'
  import Rich from './Rich.svelte'

  let { item }: { item: Entry<TypeListeSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'> } = $props()
</script>

<section class="flex flex--gapped">
  {#if item.fields.titre}
  <div class="col col--12of12 col--mobile--12of12">
    <h2>{item.fields.titre}</h2>
  </div>
  {/if}

  {#if item.fields.corps}
  <div class="col col--6of12 col--mobile--12of12 flex flex--column flex--gapped">
    <Rich body={item.fields.corps} />

    <!-- {#if item.fields.liens?.length}
    <ul class="list--nostyle flex flex--gapped">
      {#each item.fields.liens as lien}
      <li><a href={lien.fields.route}><u>{lien.fields.titre}</u></a></li>
      {/each}
    </ul>
    {/if} -->
  </div>
  {/if}

  {#if item.fields.items?.length}
  <ul class="list--nostyle col col--12of12">
    {#each item.fields.items as _item}
    <li>
      {#if item.fields.type === 'Accordeon'}
      <details name={item.sys.id}>
        {#if isTypeText(_item)}
        <summary class="flex flex--gapped flex--middle flex--spaced"><h3>{_item.fields.title}</h3> <span class="h3"></span></summary>
        <article><Text item={_item} noTitle /></article>
        {/if}
      </details>
      {:else}
      {#if isTypeText(_item)}
      <Text item={_item} />
      {/if}
      {/if}
    </li>
    {/each}
  </ul>
  {/if}
</section>

<style lang="scss">
  section {
    h2 {
      margin-bottom: $s3;
    }

    details {
      border-top: 1px solid;

      summary {
        cursor: pointer;
        padding: $s0 0;

        span {
          &:before {
            content: '+';
          }
        }
      }

      article {
        padding: $s0 0;
      }

      &[open] {
        summary {
          span {
            &:before {
              content: '–';
            }
          }
        }
      }
    }
  }
</style>