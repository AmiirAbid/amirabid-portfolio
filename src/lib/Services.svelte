<script>
  import { Globe, Layers, Box } from 'lucide-svelte';

  export let openContactModal;

  const services = [
    {
      title: 'Web Development',
      description: 'Modern, responsive websites and web apps built with performance and UX in mind.',
      icon: Globe,
    },
    {
      title: 'Full-Stack Projects',
      description: 'End-to-end development: frontend, backend, APIs, and databases.',
      icon: Layers,
    },
    {
      title: 'System Design',
      description: 'Architecture and implementation of scalable, secure systems.',
      icon: Box,
    },
  ];
</script>

<section class="services section" id="services" aria-labelledby="services-heading">
  <h2 id="services-heading">Services Offered</h2>
  <div class="cards">
    {#each services as s}
      <article class="card card-glow">
        <div class="card-icon">
          <svelte:component this={s.icon} size={28} aria-hidden="true" />
        </div>
        <h3>{s.title}</h3>
        <p>{s.description}</p>
        <button type="button" class="btn-secondary" onclick={openContactModal}>
          Get in Touch
        </button>
      </article>
    {/each}
  </div>
</section>

<style>
  .services {
    background: var(--bg-primary);
  }

  .services h2 {
    margin-bottom: 2rem;
  }

  .cards {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .card {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .card-icon {
    color: var(--accent);
    margin-bottom: 1rem;
  }

  .card h3 {
    margin-bottom: 0.5rem;
  }

  .card p {
    flex: 1;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
</style>
