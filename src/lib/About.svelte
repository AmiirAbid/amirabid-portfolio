<script>
  import { Code2, Shield, Database, Cpu } from 'lucide-svelte';
</script>

<section class="about section" id="about" aria-labelledby="about-heading">
  <h2 id="about-heading">About Me</h2>
  <p class="about-intro">
    Full-stack developer with hands-on experience building web applications and APIs.
    Currently studying cybersecurity engineering—focused on building serious systems
    that scale and securing what matters.
  </p>
  <ul class="experience-list">
    <li>
      <Code2 size={22} aria-hidden="true" />
      <span>Full-stack web apps with Next.js, Supabase, and modern tooling</span>
    </li>
    <li>
      <Database size={22} aria-hidden="true" />
      <span>APIs, databases, and system design for real-world projects</span>
    </li>
    <li>
      <Shield size={22} aria-hidden="true" />
      <span>Security-minded development and best practices</span>
    </li>
    <li>
      <Cpu size={22} aria-hidden="true" />
      <span>AI integrations (LangChain) and chatbot systems</span>
    </li>
  </ul>
</section>

<style>
  .about {
    background: var(--bg-secondary);
  }

  .about h2 {
    margin-bottom: 1rem;
  }

  .about-intro {
    max-width: 640px;
    margin-bottom: 2rem;
    font-size: 1.05rem;
  }

  .experience-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .experience-list li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    color: var(--text-muted);
  }

  .experience-list li :global(svg) {
    flex-shrink: 0;
    color: var(--accent);
    margin-top: 0.15rem;
  }
</style>
