<script>
  import { Calendar, Sun, ShoppingBag, MessageSquare, GraduationCap } from 'lucide-svelte';
  import { onMount } from 'svelte';

  export let openContactModal;

  const projects = [
    {
      title: 'Booking Platform',
      description: 'Team project with designers. Next.js & Supabase.',
      tech: ['Next.js', 'Supabase'],
      icon: Calendar,
    },
    {
      title: 'Photovoltaic Business Website',
      description: 'Blogs, admin/user dashboard, chatbot. Next.js & Supabase.',
      tech: ['Next.js', 'Supabase'],
      icon: Sun,
    },
    {
      title: 'Patisserie eCommerce Website',
      description: 'Full eCommerce flow. Next.js & Supabase.',
      tech: ['Next.js', 'Supabase'],
      icon: ShoppingBag,
    },
    {
      title: 'Real Estate Expert Chatbot',
      description: 'AI-powered chatbot. HTML, CSS, Flask, LangChain, MySQL.',
      tech: ['Flask', 'LangChain', 'MySQL'],
      icon: MessageSquare,
    },
    {
      title: 'Elearning Mobile Application',
      description: 'Backend with Next.js & Supabase.',
      tech: ['Next.js', 'Supabase'],
      icon: GraduationCap,
    },
  ];

  const USERNAME = 'AmiirAbid';

  // Contribution data state
  let contributions = [];
  let totalThisYear = 0;
  let loading = true;
  let error = false;
  let isDark = false;
  let tooltip = null; // { date, count, x, y }

  // Color scales for light and dark mode (GitHub-style intensity 0–4)
  const colorScale = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark:  ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  $: colors = isDark ? colorScale.dark : colorScale.light;

  // Derive a 53-week grid (Sun→Sat columns) from flat contributions array
  $: weeks = buildWeeks(contributions);

  function buildWeeks(contribs) {
    if (!contribs.length) return [];

    // Sort ascending
    const sorted = [...contribs].sort((a, b) => a.date.localeCompare(b.date));

    // Keep only the last 52 weeks + current partial week
    const end = new Date(sorted[sorted.length - 1].date);
    const start = new Date(end);
    start.setDate(start.getDate() - 364); // 52 weeks back

    const filtered = sorted.filter(d => new Date(d.date) >= start);

    // Group into weeks (each week starts on Sunday)
    const map = Object.fromEntries(filtered.map(d => [d.date, d]));
    const result = [];
    let current = new Date(start);
    // Rewind to previous Sunday
    current.setDate(current.getDate() - current.getDay());

    while (current <= end) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const key = current.toISOString().slice(0, 10);
        week.push(map[key] ?? { date: key, count: 0, intensity: '0' });
        current.setDate(current.getDate() + 1);
      }
      result.push(week);
    }
    return result;
  }

  // Month labels: find first week where month changes
  $: monthLabels = buildMonthLabels(weeks);

  function buildMonthLabels(weeks) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const firstDay = week.find(d => d.date);
      if (!firstDay) return;
      const m = new Date(firstDay.date).getMonth();
      if (m !== lastMonth) {
        labels.push({ label: months[m], col: i });
        lastMonth = m;
      }
    });
    return labels;
  }

  function cellColor(day) {
    const intensity = parseInt(day.intensity ?? '0', 10);
    return colors[Math.min(intensity, 4)];
  }

  function showTooltip(event, day) {
    if (!day.count && day.intensity === '0') {
      tooltip = { date: day.date, count: 0 };
    } else {
      tooltip = { date: day.date, count: day.count ?? 0 };
    }
  }

  function hideTooltip() {
    tooltip = null;
  }

  async function fetchContributions() {
    loading = true;
    error = false;
    try {
      const res = await fetch(`/api/github`);
      if (!res.ok) throw new Error('Non-200');
      const json = await res.json();
      contributions = json.contributions ?? [];
      // Total for current year
      const currentYear = new Date().getFullYear().toString();
      const yearData = (json.years ?? []).find(y => y.year === currentYear);
      totalThisYear = yearData?.total ?? 0;
    } catch (e) {
      error = true;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    // Detect dark mode from OS
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    isDark = mq.matches;
    const mqHandler = (e) => { isDark = e.matches; };
    mq.addEventListener('change', mqHandler);

    // Also watch for data-theme / class on <html> (app-level theme toggle)
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      const theme = html.getAttribute('data-theme') ?? '';
      const cls = html.className ?? '';
      isDark = theme.includes('dark') || cls.includes('dark');
    });
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    fetchContributions();

    return () => {
      mq.removeEventListener('change', mqHandler);
      observer.disconnect();
    };
  });

  // SVG layout constants
  const CELL = 11;
  const GAP = 3;
  const STEP = CELL + GAP;
  const LABEL_H = 20; // space for month labels above
  const DAY_LABEL_W = 0; // no day labels for compactness

  $: svgWidth = weeks.length * STEP;
  $: svgHeight = 7 * STEP + LABEL_H;
</script>

<section class="projects section" id="projects" aria-labelledby="projects-heading">
  <h2 id="projects-heading">Featured Projects</h2>
  <div class="project-cards">
    {#each projects as p}
      <article class="project-card card-glow">
        <div class="project-card-header">
          <span class="project-icon">
            <svelte:component this={p.icon} size={24} aria-hidden="true" />
          </span>
          <h3>{p.title}</h3>
        </div>
        <p>{p.description}</p>
        <div class="tech-badges">
          {#each p.tech as t}
            <span class="tech-tag">{t}</span>
          {/each}
        </div>
        <button type="button" class="btn-secondary" onclick={openContactModal}>
          Contact me to collaborate
        </button>
      </article>
    {/each}
  </div>

  <div class="github-section">
    <div class="github-header">
      <h3>GitHub Contributions</h3>
      {#if !loading && !error}
        <span class="contrib-count">{totalThisYear} contributions this year</span>
      {/if}
    </div>

    <div class="github-graph">
      {#if loading}
        <div class="graph-placeholder">
          <div class="skeleton-grid">
            {#each Array(53) as _}
              <div class="skeleton-col">
                {#each Array(7) as _}
                  <div class="skeleton-cell"></div>
                {/each}
              </div>
            {/each}
          </div>
        </div>
      {:else if error}
        <div class="graph-error">
          <span>Could not load contribution data.</span>
          <button type="button" onclick={fetchContributions}>Retry</button>
        </div>
      {:else}
        <div class="graph-scroll">
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <svg
            width={svgWidth}
            height={svgHeight}
            role="img"
            aria-label="GitHub contribution graph for {USERNAME}"
          >
            <!-- Month labels -->
            {#each monthLabels as { label, col }}
              <text
                x={col * STEP}
                y={LABEL_H - 6}
                font-size="10"
                fill="var(--text-muted)"
                font-family="inherit"
              >{label}</text>
            {/each}

            <!-- Cells -->
            {#each weeks as week, wi}
              {#each week as day, di}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <rect
                  x={wi * STEP}
                  y={LABEL_H + di * STEP}
                  width={CELL}
                  height={CELL}
                  rx="2"
                  ry="2"
                  fill={cellColor(day)}
                  aria-label="{day.count ?? 0} contributions on {day.date}"
                />
              {/each}
            {/each}
          </svg>

          <!-- Tooltip -->
          {#if tooltip}
            <div class="graph-tooltip">
              <strong>{tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''}</strong>
              on {tooltip.date}
            </div>
          {/if}
        </div>

        <!-- Legend -->
        <div class="graph-legend">
          <span>Less</span>
          {#each colors as c}
            <svg width="11" height="11">
              <rect width="11" height="11" rx="2" fill={c} />
            </svg>
          {/each}
          <span>More</span>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .projects {
    background: var(--bg-primary);
  }

  .projects > h2 {
    margin-bottom: 2rem;
  }

  .project-cards {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .project-cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .project-cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .project-card {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .project-card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .project-icon {
    color: var(--accent);
    flex-shrink: 0;
  }

  .project-card h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  .project-card p {
    flex: 1;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .tech-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tech-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: var(--bg-tertiary);
    border-radius: 4px;
    color: var(--text-muted);
  }

  /* ── GitHub Section ── */
  .github-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--glass-border);
  }

  .github-header {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .github-header h3 {
    margin: 0;
  }

  .contrib-count {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .github-graph {
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--bg-secondary);
    border: 1px solid var(--glass-border);
    padding: 1rem 1.25rem 0.75rem;
  }

  /* Scroll wrapper so the graph is never clipped on small screens */
  .graph-scroll {
    overflow-x: auto;
    position: relative;
    padding-bottom: 0.25rem;
  }

  .graph-scroll svg {
    display: block;
  }

  /* Tooltip */
  .graph-tooltip {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg-primary);
    border: 1px solid var(--glass-border);
    border-radius: 6px;
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
    white-space: nowrap;
    pointer-events: none;
    color: var(--text-primary, inherit);
  }

  /* Legend */
  .graph-legend {
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: flex-end;
    margin-top: 0.6rem;
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  /* Loading skeleton */
  .graph-placeholder {
    padding: 0.5rem 0;
  }

  .skeleton-grid {
    display: flex;
    gap: 3px;
  }

  .skeleton-col {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .skeleton-cell {
    width: 11px;
    height: 11px;
    border-radius: 2px;
    background: var(--bg-tertiary, #ebedf0);
    animation: shimmer 1.4s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  /* Error state */
  .graph-error {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .graph-error button {
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--glass-border);
    background: var(--bg-tertiary);
    color: var(--text-muted);
    cursor: pointer;
  }
</style>