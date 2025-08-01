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
    <h2>{@html item.fields.titre.replaceAll('Capitale-Nationale', '<span class="nobr">Capitale-Nationale</span>')}</h2>
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

  {#if item.fields.sousTitre}
  <div class="col col--12of12 col--mobile--12of12 sousTitre">
    <h4>{@html item.fields.sousTitre}</h4>
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
        : isTypeEvent(listItem)
        ? 3
        : isTypeImageFocused(listItem)
        ? 3
        : 1}>
        {#if isTypeText(listItem)}
          <Text item={listItem} />
        {:else if isTypeEvent(listItem)}
        <Event item={listItem} />
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
    <li class="col" class:col--6of12={!item.fields.type || (item.fields.type === 'Colonnes' && !isTypeEvent(listItem))} class:col--4of12={item.fields.type === 'Colonnes' && isTypeEvent(listItem)} class:col--mobile--12of12={(item.fields.type === 'Colonnes' && isTypeEvent(listItem)) || (item.fields.type === 'Tableau' && item.fields.items.length > 6)} class:col--12of12={item.fields.type === 'Accordeon' || (item.fields.type === 'Tableau')}>
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
      <Media media={listItem.fields.image} ar={4/6} />
      {:else if isTypeLienDeNavigation(listItem)}
      <a href={listItem.fields.route} class="flex flex--gapped flex--middle">
        <div class="col col--8of12">{listItem.fields.titre}</div>
        <span>{@html listItem.fields.cta || 'Consulter'}</span> <Icon i="arrow" label={undefined} />
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

    .sousTitre {
      margin-top: $s4;
      
      & + ul {
        margin-top: 0;
      }
    }

    details {
      border-top: 1px solid;

      summary {
        cursor: pointer;
        padding: $s0 0;

        @media (min-width: $tablet_landscape) {
          padding: $s2 0;
        }

        span {
          &:before {
            content: '+';
          }
        }
      }

      article {
        padding: $s0 0;

        @media (min-width: $tablet_landscape) {
          padding: $s2 0;
        }

        :global(table) {
          // max-width: 50%;
          // margin: 0 auto;

          @media (max-width: $mobile) {
            max-width: 100%;
          
            :global(tr) {
              display: flex;
              flex-direction: column;
            }

            :global(th),
            :global(td) {
              width: 100%;
              margin-bottom: $s1;
            }
          }
        }
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
        --slide-width: calc(#{$width} - (var(--gap) * 2) + #{$adjust});

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
        border-left: 1px solid;
        padding-left: $s-2;

        :global(> section) {
          height: 100%;
        }

        :global(> section .corps) {
          margin-top: auto;
        }

        :global(> section .col--6of12:empty) {
          display: none;
        }


        // :global(h2) {
          
        //   &:after {
        //     content: '';
        //     display: block;
        //     width: 1px;
        //     height: 15svh;
        //     margin-top: $s0;
        //     background-color: $noir;
        //   }
        // }
      }
    }

    &#formations,
    // &#partenaires-contributeurs-MRC,
    &#territoire {

      ul {
        gap: 0;

        li {
          :global(.has-no-image > div) {
            width: 100%;
          }
        }
      }
      
      summary {
        h2 {
          font-size: $s2;
        }
      }

      :global(table tr:last-child td) {
        border-bottom: none;
        // padding-bottom: 0;

        :global(strong) {
          font-size: $s1;
          line-height: 1.1;
        }
      }

    }
  }
</style>