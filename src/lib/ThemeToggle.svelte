<script>
  import { onMount } from 'svelte';
  import { Sun, Moon } from 'lucide-svelte';

  let dark = true;

  function toggle() {
    dark = !dark;
    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
  }

  onMount(() => {
    const stored = localStorage.getItem('portfolio-theme');
    if (stored === 'light' || stored === 'dark') {
      dark = stored === 'dark';
      document.documentElement.setAttribute('data-theme', stored);
    } else {
      dark = document.documentElement.getAttribute('data-theme') !== 'light';
    }
  });
</script>

<button
  type="button"
  class="theme-toggle"
  onclick={toggle}
  aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
  title={dark ? 'Light mode' : 'Dark mode'}
>
  {#if dark}
    <Sun size={20} aria-hidden="true" />
  {:else}
    <Moon size={20} aria-hidden="true" />
  {/if}
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    background: transparent;
    color: var(--text-muted);
    border-radius: var(--radius);
  }

  .theme-toggle:hover {
    color: var(--accent);
    box-shadow: 0 0 12px var(--accent-glow);
  }
</style>
