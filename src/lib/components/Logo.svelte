<script lang="ts">
  import { onMount } from "svelte";

  let ready = $state(false);

  onMount(() => {
    ready = true;
  });
</script>

<section class:ready>
  <img src="https://images.unsplash.com/photo-1739993655680-4b7050ed2896?q=80&w=1270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero" />
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
    min-height: 100vh;
    background-color: $jaune;
    scroll-timeline: --scrollTimeline y;
  }

  svg,
  img {
    position: absolute;
    bottom: $s1;
    left: $s1;
    width: calc(100% - $s1 * 2);
    aspect-ratio: 1432/700;
    // padding: $s1;
    // border: none;
  }

  svg {
    transform: scale(1.01);
    // padding: $s1;
    // fill: $jaune;
    // background-color: $jaune;


    mask {
      path[fill="black"] {
        transition: transform 666ms ease-in-out calc(var(--delay) * 666ms);
        transform: translateY(100%);

        .ready & {
          transform: translateY(0);
        }
      }
    }

    rect {
      fill: $jaune;
    }
  }

  img {
    animation-name: parallaxAnimation;
    animation-timeline: --scrollTimeline;
  }

  @keyframes parallaxAnimation {
    from {
      transform: translateY(-10%);
    }

    to {
      transform: translateY(10%);
    }
  }
</style>