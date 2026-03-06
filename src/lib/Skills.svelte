<script>
  import {
    CodeXml,
    Palette,
    Database,
    Code,
    Globe,
    Bot,
    Server,
  } from 'lucide-svelte';

  const skills = [
    { name: 'Next.js', icon: Globe },
    { name: 'Supabase', icon: Database },
    { name: 'HTML', icon: CodeXml },
    { name: 'CSS', icon: Palette },
    { name: 'Flask', icon: Server },
    { name: 'MySQL', icon: Database },
    { name: 'LangChain', icon: Bot },
    { name: 'Svelte', icon: Code },
    { name: 'JavaScript', icon: Code },
    { name: 'TypeScript', icon: Code },
    { name: 'REST APIs', icon: Server },
    { name: 'Git', icon: Code },
  ];
</script>

<section class="skills section" id="skills" aria-labelledby="skills-heading">
  <h2 id="skills-heading">Tech Stack</h2>
  <div class="badges">
    {#each skills as s}
      <span class="badge card-glow">
        <s.icon size={18} aria-hidden="true" />
        {s.name}
      </span>
    {/each}
  </div>
</section>

<style>
  .skills {
    background: var(--bg-secondary);
  }

  .skills h2 {
    margin-bottom: 2rem;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-muted);
    background: var(--bg-tertiary);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
  }

  .badge :global(svg) {
    color: var(--accent);
  }

  .badge:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
</style>
