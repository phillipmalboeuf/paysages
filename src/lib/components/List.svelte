<script lang="ts">
  import { type TypeListeSkeleton, type TypeTextSkeleton, isTypeArticle, isTypeEvent, isTypeImageFocused, isTypeLienDeNavigation, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import Autoplay from 'embla-carousel-autoplay'
  import type { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel'

  import Text from './Text.svelte'
  import Event from './Event.svelte'
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Icon from './Icon.svelte'

  import { onMount, onDestroy } from 'svelte'
  import { browser } from '$app/environment'

  const options: EmblaOptionsType = {
    loop: true,
    dragFree: false,
    skipSnaps: true,
    align: 'start'
  }

  const plugins: EmblaPluginType[] = [
    // Autoplay({
    //   delay: 0,
    //   stopOnInteraction: false,
    // })
  ]

  let embla: EmblaCarouselType = $state()

  let { item }: { item: Entry<TypeListeSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'> } = $props()
</script>

<section class="flex flex--gapped" id={item.fields.id}>
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
  {#if item.fields.type === 'Slider'}
  <div class="embla" use:emblaCarouselSvelte={{ options: { ...options }, plugins, }} onemblaInit={e => embla = e.detail}>
    <ul class="list--nostyle embla__container">
      {#each item.fields.items as listItem, index}
      <li class="embla__slide" style:--slide-columns={isTypeText(listItem)
        ? 3
        : isTypeArticle(listItem)
        ? 3
        : isTypeImageFocused(listItem)
        ? 3
        : 1}>
        {#if isTypeText(listItem)}
          <Text item={listItem} />
        {:else if isTypeImageFocused(listItem)}
          <Media media={listItem.fields.image} />
        {/if}
      </li>
      {/each}
    </ul>

    {#if item.fields.type === 'Slider'}
      <!-- <button class="embla__prev button--accent button--circle" onclick={() => embla?.scrollPrev()} aria-label="Précédent"><svg width="32" height="32" viewBox="0 0 32 33"><path d="M17.9453 11.0988L12.4813 16.836L17.9453 22.5733" stroke="currentColor" stroke-width="1.41198"/></svg></button> -->
      <button class="embla__next button--none" onclick={() => embla?.scrollNext()} aria-label="Suivant"><svg width="15" height="23" viewBox="0 0 15 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 21L12 11.5L2 2" stroke="currentColor" stroke-width="4"/></svg></button>
    {/if}

    <!-- {#if embla}
      <Dots dots={item.fields.items.length} slider={embla} />
    {/if} -->
  </div>
  {:else}
  <ul class="list--nostyle col col--12of12 flex flex--gapped">
    {#each item.fields.items as listItem}
    <li class="col" class:col--6of12={!item.fields.type || (item.fields.type === 'Colonnes' && !isTypeEvent(listItem)) || (item.fields.type === 'Tableau' && item.fields.items.length > 6)} class:col--4of12={item.fields.type === 'Colonnes' && isTypeEvent(listItem)} class:col--mobile--12of12={(item.fields.type === 'Colonnes' && isTypeEvent(listItem)) || (item.fields.type === 'Tableau' && item.fields.items.length > 6)} class:col--12of12={item.fields.type === 'Accordeon' || (item.fields.type === 'Tableau' && item.fields.items.length <= 6)}>
      {#if item.fields.type === 'Accordeon'}
      <details name={item.sys.id}>
        {#if isTypeText(listItem)}
        <summary class="flex flex--gapped flex--middle flex--spaced"><h2>{listItem.fields.title}</h2> <span class="h3"></span></summary>
        <article><Text item={listItem} noTitle /></article>
        {/if}
      </details>
      {:else}
      {#if isTypeText(listItem)}
      <Text item={listItem} />
      {:else if isTypeEvent(listItem)}
      <Event item={listItem} />
      {:else if isTypeImageFocused(listItem)}
      <Media media={listItem.fields.image} />
      {:else if isTypeLienDeNavigation(listItem)}
      <a href={listItem.fields.route} class="flex flex--gapped flex--middle">
        <div class="col col--8of12">{listItem.fields.titre}</div>
        <span>{@html listItem.fields.cta || 'Site&nbsp;Web'}</span> <Icon i="arrow" label="Visiter" />
      </a>
      {/if}
      {/if}
    </li>
    {/each}
  </ul>
  {/if}
  {/if}
</section>

<style lang="scss">
  section {
    h2 {
      // margin-bottom: $s2;
    }

    ul {
      margin: $s5 0;

      li {
        a {
          flex-wrap: nowrap;
          width: 100%;
          padding-bottom: $s-3;
          padding-right: 5vw;
          border-bottom: 1px solid;

          span {
            margin-left: auto;
          }
        }
      }
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

    .embla {
      position: relative;
      overflow: hidden;

      .embla__container {
        display: flex;
      }

      .embla__slide {
        --gap: #{$s0};

        $width: calc(100% / var(--slide-columns));
        $adjust: calc(var(--gap) / var(--slide-columns));
        --slide-width: calc(#{$width} - var(--gap) + #{$adjust});

        flex: 0 0 var(--slide-width);
        min-width: 0;
        max-width: none;
        width: var(--slide-width);
        margin: 0 var(--gap);

        @media (max-width: $mobile) {
          --slide-width: 100% !important;
        }
      }

      .embla__next {
        position: absolute;
        right: 0;
        top: calc($s5 + ($s5 / 4));
        // transform: translateY(-50%);
      }
    }

    &#ligne-du-temps {
      li {
        :global(h2) {
          
          &:after {
            content: '';
            display: block;
            width: 1px;
            height: 15svh;
            margin-top: $s0;
            background-color: $noir;
          }
        }
      }
    }
  }
</style>