/* ═══════════════════════════════════════════════════════
   BJJ FANATICS COMMUNITY — Discovery Page Logic
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Communities Data ──
  const COMMUNITIES = [
    {
      id: 'bernardo-faria',
      name: 'Bernardo Faria\'s BJJ Community',
      instructor: 'Bernardo Faria',
      avatar: 'assets/avatar-instructor.png',
      banner: 'assets/banner.png',
      description: 'The premier community for BJJ practitioners. Get exclusive access to world-class instructional content, live technique breakdowns, competition strategies, and direct interaction with 5x World Champion Bernardo Faria.',
      members: 12847,
      courses: 48,
      events: 156,
      rating: 4.9,
      reviews: 2340,
      price: '$29/mo',
      priceType: 'paid',
      categories: ['gi', 'popular', 'guard', 'competition'],
      tags: ['Guard', 'Pressure Passing', 'Competition'],
      featured: true,
      joined: true,
      bio: '5x World Champion, 3x ADCC Trials Champion. Known for the deep half guard and over-under passing system. Founder of BJJ Fanatics.',
      highlights: ['5x World Champion', 'Deep Half Guard Expert', 'BJJ Fanatics Founder'],
    },
    {
      id: 'no-gi-elite',
      name: 'No-Gi Elite Academy',
      instructor: 'Marcus Ryan',
      avatar: 'assets/instructor-gordon.png',
      banner: 'assets/banner-nogi.png',
      description: 'Master the no-gi game with systematic approaches to leg locks, back takes, and wrestling-based grappling. Competition-focused training with live sparring reviews.',
      members: 9423,
      courses: 32,
      events: 98,
      rating: 4.8,
      reviews: 1856,
      price: '$39/mo',
      priceType: 'paid',
      categories: ['nogi', 'popular', 'submissions', 'competition'],
      tags: ['No-Gi', 'Leg Locks', 'Wrestling'],
      featured: true,
      joined: false,
      bio: 'ADCC Champion and no-gi specialist. Pioneer of modern leg lock systems and systematic grappling approaches.',
      highlights: ['ADCC Champion', 'Leg Lock System', 'No-Gi Specialist'],
    },
    {
      id: 'submission-lab',
      name: 'The Submission Lab',
      instructor: 'Craig Anderson',
      avatar: 'assets/instructor-craig.png',
      banner: 'assets/course-thumbnail.png',
      description: 'A science-based approach to submissions. Learn detailed finishing mechanics, grip fighting, and set-up sequences from one of the most technical grapplers in the world.',
      members: 7215,
      courses: 24,
      events: 72,
      rating: 4.9,
      reviews: 1420,
      price: '$24/mo',
      priceType: 'paid',
      categories: ['nogi', 'submissions', 'popular'],
      tags: ['Submissions', 'Leg Locks', 'Technical'],
      featured: true,
      joined: false,
      bio: 'Renowned for heel hooks and leg lock systems. Has beaten multiple ADCC champions. Known for innovative approaches to lower body submissions.',
      highlights: ['Leg Lock Specialist', 'ADCC Veteran', 'Innovative Techniques'],
    },
    {
      id: 'guard-mastery',
      name: 'Guard Mastery Hub',
      instructor: 'Lachlan Brooks',
      avatar: 'assets/instructor-lachlan.png',
      banner: 'assets/banner.png',
      description: 'Build an unpassable guard and develop a complete bottom game. From spider guard to X-guard, develop systematic guard retention and sweeping strategies.',
      members: 6890,
      courses: 28,
      events: 84,
      rating: 4.7,
      reviews: 1180,
      price: '$19/mo',
      priceType: 'paid',
      categories: ['gi', 'guard', 'popular'],
      tags: ['Guard', 'Sweeps', 'Spider Guard'],
      featured: false,
      joined: false,
      bio: 'Known for his innovative guard game and creative approaches to bottom position. Has developed several new guard systems used by top competitors worldwide.',
      highlights: ['Guard Innovator', 'Competition Coach', 'System Builder'],
    },
    {
      id: 'competition-academy',
      name: 'Competition Ready Academy',
      instructor: 'Mikey Santos',
      avatar: 'assets/instructor-mikey.png',
      banner: 'assets/banner-nogi.png',
      description: 'Get competition ready with structured training programs, game plan development, mental preparation, and tournament-specific strategies from a multiple-time world champion.',
      members: 5430,
      courses: 20,
      events: 110,
      rating: 4.8,
      reviews: 890,
      price: '$34/mo',
      priceType: 'paid',
      categories: ['competition', 'gi', 'nogi'],
      tags: ['Competition', 'Game Plans', 'Mindset'],
      featured: false,
      joined: false,
      bio: 'Multiple-time World Champion and Pan American Champion. Specializes in competition preparation and strategic game planning.',
      highlights: ['World Champion', 'Pan Am Champion', 'Competition Strategy'],
    },
    {
      id: 'bjj-beginners',
      name: 'BJJ Fundamentals for Beginners',
      instructor: 'Sofia Delgado',
      avatar: 'assets/instructor-female.png',
      banner: 'assets/banner.png',
      description: 'Start your BJJ journey the right way. Learn the essential techniques, positions, and concepts that every white belt needs. Supportive, welcoming community focused on growth.',
      members: 15240,
      courses: 36,
      events: 200,
      rating: 4.9,
      reviews: 3100,
      price: 'Free',
      priceType: 'free',
      categories: ['beginners', 'gi', 'free', 'popular'],
      tags: ['Beginners', 'Fundamentals', 'Free'],
      featured: false,
      joined: false,
      bio: 'Black belt instructor with a passion for making BJJ accessible to everyone. Known for patient, detailed teaching style and creating welcoming training environments.',
      highlights: ['Black Belt Instructor', 'Beginner Specialist', 'Free Community'],
    },
    {
      id: 'wrestling-for-bjj',
      name: 'Wrestling For BJJ',
      instructor: 'Marcus Ryan',
      avatar: 'assets/instructor-gordon.png',
      banner: 'assets/banner-nogi.png',
      description: 'Dominate the stand-up game. Learn takedowns, scrambles, and clinch work specifically adapted for BJJ competition. No wrestling experience required.',
      members: 4120,
      courses: 16,
      events: 48,
      rating: 4.6,
      reviews: 640,
      price: '$19/mo',
      priceType: 'paid',
      categories: ['nogi', 'competition'],
      tags: ['Wrestling', 'Takedowns', 'Stand-up'],
      featured: false,
      joined: false,
      bio: 'Former D1 wrestler and ADCC competitor. Bridges the gap between wrestling and BJJ with practical techniques for grapplers.',
      highlights: ['D1 Wrestler', 'ADCC Competitor', 'Takedown Specialist'],
    },
    {
      id: 'womens-bjj',
      name: 'Women\'s BJJ Alliance',
      instructor: 'Sofia Delgado',
      avatar: 'assets/instructor-female.png',
      banner: 'assets/course-thumbnail.png',
      description: 'A supportive community for women in BJJ. Technique breakdowns, competition prep, and discussions specific to women grapplers. All levels welcome.',
      members: 8750,
      courses: 22,
      events: 130,
      rating: 4.9,
      reviews: 1920,
      price: 'Free',
      priceType: 'free',
      categories: ['beginners', 'gi', 'nogi', 'free', 'popular'],
      tags: ['Women', 'All Levels', 'Community'],
      featured: false,
      joined: false,
      bio: 'Creating a safe and empowering space for women in BJJ. Multiple Pan Am champion and advocate for women in martial arts.',
      highlights: ['Pan Am Champion', 'Women\'s BJJ Advocate', 'Community Builder'],
    },
    {
      id: 'half-guard-specialists',
      name: 'Half Guard Specialists',
      instructor: 'Bernardo Faria',
      avatar: 'assets/avatar-instructor.png',
      banner: 'assets/course-thumbnail.png',
      description: 'Deep dive into the half guard position — learn sweeps, submissions, and transitions from the underhook half guard, deep half, lockdown, and more.',
      members: 3890,
      courses: 14,
      events: 40,
      rating: 4.8,
      reviews: 720,
      price: '$14/mo',
      priceType: 'paid',
      categories: ['gi', 'guard'],
      tags: ['Half Guard', 'Deep Half', 'Sweeps'],
      featured: false,
      joined: false,
      bio: '5x World Champion known globally for his deep half guard system. This community is dedicated entirely to mastering all variations of the half guard position.',
      highlights: ['Deep Half Master', '5x World Champion', 'Position Specialist'],
    },
  ];

  // ── Render Communities ──
  function renderCommunityCard(community) {
    return `
      <div class="community-card" data-id="${community.id}" onclick="window.location.href='about.html?community=${community.id}'">
        <div class="card-banner">
          <img src="${community.banner}" alt="${community.name}" class="card-banner-img">
          <div class="card-banner-overlay"></div>
          <div class="card-price-badge ${community.priceType}">${community.price}</div>
        </div>
        <div class="card-avatar-container">
          <img src="${community.avatar}" alt="${community.instructor}" class="card-avatar">
        </div>
        <div class="card-body">
          <h3 class="card-community-name">${community.name}</h3>
          <div class="card-instructor">by <strong>${community.instructor}</strong></div>
          <p class="card-description">${community.description}</p>
          <div class="card-meta">
            <span class="card-meta-item">👥 ${formatNumber(community.members)}</span>
            <span class="card-meta-item">🎓 ${community.courses} courses</span>
            <span class="card-meta-item">📅 ${community.events} events</span>
          </div>
          <div class="card-tags">
            ${community.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="card-footer">
          <div class="card-rating">⭐ ${community.rating} <span style="color: var(--text-tertiary); font-weight: 400; font-size: 12px;">(${formatNumber(community.reviews)})</span></div>
          <button class="card-join-btn ${community.joined ? 'joined' : ''}" onclick="event.stopPropagation(); handleJoin(this, '${community.id}')">
            ${community.joined ? '✓ Joined' : 'View →'}
          </button>
        </div>
      </div>
    `;
  }

  function renderFeatured() {
    const grid = document.getElementById('featuredGrid');
    const featured = COMMUNITIES.filter(c => c.featured);
    grid.innerHTML = featured.map(c => renderCommunityCard(c)).join('');
  }

  function renderAll(filter = 'all', searchQuery = '') {
    const grid = document.getElementById('allGrid');
    let communities = COMMUNITIES;

    if (filter !== 'all') {
      communities = communities.filter(c => c.categories.includes(filter));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      communities = communities.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    if (communities.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--text-tertiary);">
          <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
          <h3 style="color: var(--text-primary); margin-bottom: 8px;">No communities found</h3>
          <p>Try a different search or category filter.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = communities.map(c => renderCommunityCard(c)).join('');
  }

  // ── Initialize ──
  renderFeatured();
  renderAll();

  // ── Category Filters ──
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderAll(pill.dataset.category, document.getElementById('heroSearch').value);
    });
  });

  // ── Search ──
  const heroSearch = document.getElementById('heroSearch');
  const globalSearch = document.getElementById('globalSearch');

  let searchTimeout;
  function handleSearch(query) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const activeCategory = document.querySelector('.category-pill.active').dataset.category;
      renderAll(activeCategory, query);
    }, 300);
  }

  heroSearch.addEventListener('input', (e) => handleSearch(e.target.value));
  globalSearch.addEventListener('input', (e) => {
    heroSearch.value = e.target.value;
    handleSearch(e.target.value);
  });

  // ── Join handler ──
  window.handleJoin = function(btn, communityId) {
    if (btn.classList.contains('joined')) {
      // Navigate to community
      window.location.href = 'community.html';
    } else {
      // Navigate to about page
      window.location.href = `about.html?community=${communityId}`;
    }
  };

  // ── CTA Button ──
  document.getElementById('createCommunityBtn').addEventListener('click', () => {
    showToast('Community creation coming soon! 🚀', 'info');
  });

  // ── Utilities ──
  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // Store community data globally for about page
  window.COMMUNITIES_DATA = COMMUNITIES;
  localStorage.setItem('communities', JSON.stringify(COMMUNITIES));

  console.log('🥋 BJJ Fanatics Discovery page loaded!');
});
