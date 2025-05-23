<script lang="ts">
  import type { Asset } from 'contentful'
  import { onMount } from "svelte"

  import Media from './Media.svelte'
  import Parallax from './Parallax.svelte'

  let ready = $state(false);
  let section: HTMLElement;

  let {
    image,
    focus
  }: {
    image: Asset<"WITHOUT_UNRESOLVABLE_LINKS">,
    focus: {
      focalPoint: {
        x: number;
        y: number;
      };
    }
  } = $props()

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        ready = entry.isIntersecting
      })
    }, {
      threshold: 0.1
    })

    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect();
  });
</script>

<section bind:this={section} class:ready>
  {#if image}
  <Parallax>
    <Media noCaption ar={700/1432} media={image} focalPoint={focus?.focalPoint as { x: number, y: number }} />
  </Parallax>
  {/if}
  <!-- <img bind:this={element} src="https://images.unsplash.com/photo-1739993655680-4b7050ed2896?q=80&w=1270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero" /> -->
  <svg viewBox="0 0 1432 700" preserveAspectRatio="xMidYMax meet">
    <defs>
      <mask id="svgMask" fill="white">
        <path d="M0 0H1432V700H0Z" fill="white"/>
        <path style:--delay={0} d="M465.683 233.302C465.683 104.459 361.43 0 232.842 0H0V699.955H232.842V466.653C361.43 466.653 465.683 362.194 465.683 233.352V233.302Z" fill="black"/>
        <path style:--delay={0.2} d="M826.611 0C633.728 0 477.349 156.688 477.349 349.952C477.349 543.216 633.728 699.905 826.611 699.905V0Z" fill="black"/>
        <path style:--delay={0.4} d="M849.896 0L1432 699.955V0H849.896Z" fill="black"/>
      </mask>
    </defs>
    <rect width="100%" height="100%" fill="white" mask="url(#svgMask)" />
  </svg>
</section>

<style lang="scss">
  section {
    position: relative;
    z-index: 4;
    min-height: 100vh;
    width: 100%;
    background-color: $jaune;
    // scroll-timeline: --scrollTimeline y;

    aspect-ratio: 1432/800;

    @media (max-width: $tablet_portrait) {
      min-height: 50svh;
      aspect-ratio: 1432/1000;
    }

    :global(.corail) & { background-color: $corail; }
    :global(.jaune) & { background-color: $jaune; }
    :global(.bleu) & { background-color: $bleu; }
    :global(.vert) & { background-color: $vert; }
    :global(.gris) & { background-color: $gris; }

    svg,
    :global(.parallax) {
      position: absolute;
      bottom: $s0;
      left: $s0;
      width: calc(100% - $s0 * 2);
      aspect-ratio: 1432/700;
      // padding: $s1;
      // border: none;

      @media (min-width: $tablet_landscape) {
        bottom: $s2;
        left: $s2;
        width: calc(100% - $s2 * 2);
      }
    }

    :global(.parallax) {
      background-color: $noir;
    }

    svg {
      transform: scale(1.0);
      bottom: calc($s0 - 1px);
      left: calc($s0 - 1px);
      width: calc((100% - $s0 * 2) + 2px);
      // padding: $s1;
      // fill: $jaune;
      // background-color: $jaune;

      @media (min-width: $tablet_landscape) {
        bottom: calc($s2 - 1px);
        left: calc($s2 - 1px);
        width: calc((100% - $s2 * 2) + 2px);
      }

      mask {
        path[fill="black"] {
          transition: transform 666ms ease-in-out calc(var(--delay) * 666ms);
          transform: translateY(100%);
          will-change: transform;
        }
      }

      rect {
        fill: $jaune;

        :global(.corail) & { fill: $corail; }
        :global(.jaune) & { fill: $jaune; }
        :global(.bleu) & { fill: $bleu; }
        :global(.vert) & { fill: $vert; }
        :global(.gris) & { fill: $gris; }
      }
    }

    &.ready {
      mask {
        path[fill="black"] {
          transform: translateY(0);
        }
      }
    }
  }
</style>