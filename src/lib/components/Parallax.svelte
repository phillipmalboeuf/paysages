<script lang="ts">
  import { onMount, type Snippet } from 'svelte'
  import { scrollY } from 'svelte/reactivity/window'

  let {
    children,
    factor = 0.9
  }: {
    children: Snippet,
    factor?: number
  } = $props()

  let node: HTMLElement = $state()
  let stamp: number | undefined = $state()

  let offset = $derived((scrollY && stamp) ? Math.floor((scrollY.current - stamp) * Math.abs(factor - 1)) : undefined)

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const detail of entries) {
        const { isIntersecting, target } = detail
        if (isIntersecting) {
          stamp = scrollY.current + detail.boundingClientRect.top
        } else {
          stamp = undefined
        }
      }
    })
    observer.observe(node)
    return () => {
      observer.unobserve(node)
      observer.disconnect()
    }
  })
</script>

<div class="parallax" bind:this={node}>
  <div style:transform={stamp ? `translateY(${offset}px) scale(${1 + ((1 - factor) * 0.5)})` : undefined}>
    {@render children()}
  </div>
</div>


<style lang="scss">
  .parallax {
    position: relative;
    overflow: hidden;

    > div {
      will-change: transform;
    }
  }
</style>
