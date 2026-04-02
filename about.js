/* ═══════════════════════════════════════════════════════
   BJJ FANATICS COMMUNITY — About Page Logic
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Get Community Data ──
  const COMMUNITIES = JSON.parse(localStorage.getItem('communities') || '[]');

  // Fallback data if localStorage is empty
  const FALLBACK_COMMUNITIES = [
    {
      id: 'bernardo-faria',
      name: 'Bernardo Faria\'s BJJ Community',
      instructor: 'Bernardo Faria',
      avatar: 'assets/avatar-instructor.png',
      banner: 'assets/banner.png',
      description: 'The premier community for BJJ practitioners. Get exclusive access to world-class instructional content, live technique breakdowns, competition strategies, and direct interaction with 5x World Champion Bernardo Faria. Learn the deep half guard, pressure passing, and competition-tested techniques that have dominated BJJ for over a decade.',
      members: 12847,
      courses: 48,
      events: 156,
      rating: 4.9,
      reviews: 2340,
      price: '$29/mo',
      priceType: 'paid',
      bio: '5x World Champion, 3x ADCC Trials Champion. Known for the deep half guard and over-under passing system. Founder of BJJ Fanatics.',
      highlights: ['5x World Champion', 'Deep Half Guard Expert', 'BJJ Fanatics Founder'],
    },
    {
      id: 'no-gi-elite',
      name: 'No-Gi Elite Academy',
      instructor: 'Marcus Ryan',
      avatar: 'assets/instructor-gordon.png',
      banner: 'assets/banner-nogi.png',
      description: 'Master the no-gi game with systematic approaches to leg locks, back takes, and wrestling-based grappling. Competition-focused training with live sparring reviews and detailed breakdowns of modern submission grappling.',
      members: 9423,
      courses: 32,
      events: 98,
      rating: 4.8,
      reviews: 1856,
      price: '$39/mo',
      priceType: 'paid',
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
      bio: 'Black belt instructor with a passion for making BJJ accessible to everyone. Known for patient, detailed teaching style and creating welcoming training environments.',
      highlights: ['Black Belt Instructor', 'Beginner Specialist', 'Free Community'],
    },
    {
      id: 'wrestling-for-bjj',
      name: 'Wrestling For BJJ',
      instructor: 'Marcus Ryan',
      avatar: 'assets/instructor-gordon.png',
      banner: 'assets/banner-nogi.png',
      description: 'Dominate the stand-up game with wrestling-based takedowns specifically adapted for BJJ competition.',
      members: 4120,
      courses: 16,
      events: 48,
      rating: 4.6,
      reviews: 640,
      price: '$19/mo',
      priceType: 'paid',
      bio: 'Former D1 wrestler and ADCC competitor. Bridges the gap between wrestling and BJJ.',
      highlights: ['D1 Wrestler', 'ADCC Competitor', 'Takedown Specialist'],
    },
    {
      id: 'womens-bjj',
      name: 'Women\'s BJJ Alliance',
      instructor: 'Sofia Delgado',
      avatar: 'assets/instructor-female.png',
      banner: 'assets/course-thumbnail.png',
      description: 'A supportive community for women in BJJ. Technique breakdowns, competition prep, and discussions specific to women grapplers.',
      members: 8750,
      courses: 22,
      events: 130,
      rating: 4.9,
      reviews: 1920,
      price: 'Free',
      priceType: 'free',
      bio: 'Creating a safe and empowering space for women in BJJ. Multiple Pan Am champion.',
      highlights: ['Pan Am Champion', 'Women\'s BJJ Advocate', 'Community Builder'],
    },
    {
      id: 'half-guard-specialists',
      name: 'Half Guard Specialists',
      instructor: 'Bernardo Faria',
      avatar: 'assets/avatar-instructor.png',
      banner: 'assets/course-thumbnail.png',
      description: 'Deep dive into the half guard position — sweeps, submissions, and transitions from underhook half guard, deep half, lockdown, and more.',
      members: 3890,
      courses: 14,
      events: 40,
      rating: 4.8,
      reviews: 720,
      price: '$14/mo',
      priceType: 'paid',
      bio: '5x World Champion known globally for his deep half guard system.',
      highlights: ['Deep Half Master', '5x World Champion', 'Position Specialist'],
    },
  ];

  const allCommunities = COMMUNITIES.length > 0 ? COMMUNITIES : FALLBACK_COMMUNITIES;

  // ── Parse URL for community ID ──
  const params = new URLSearchParams(window.location.search);
  const communityId = params.get('community') || 'bernardo-faria';

  const community = allCommunities.find(c => c.id === communityId) || allCommunities[0];

  // ── Populate Page ──
  document.title = `${community.name} — BJJ Fanatics Community`;

  // Safe element setter
  function setEl(id, prop, value) {
    const el = document.getElementById(id);
    if (!el) return;
    if (prop === 'innerHTML') el.innerHTML = value;
    else if (prop === 'textContent') el.textContent = value;
    else if (prop === 'src') el.src = value;
  }

  // Banner
  setEl('bannerImg', 'src', community.banner);

  // Header
  setEl('aboutAvatar', 'src', community.avatar);
  setEl('aboutName', 'textContent', community.name);
  setEl('aboutInstructor', 'innerHTML', `by <strong>${community.instructor}</strong>`);
  setEl('aboutQuickStats', 'innerHTML', `
    <span>👥 ${formatNumber(community.members)} members</span>
    <span class="dot"></span>
    <span>📍 Private</span>
    <span class="dot"></span>
    <span>⭐ ${community.rating} rating</span>
  `);

  // Join Card
  setEl('joinPrice', 'textContent', community.price);

  // Description
  setEl('aboutDescription', 'textContent', community.description);

  // Instructor
  setEl('instructorAvatar', 'src', community.avatar);
  setEl('instructorName', 'textContent', community.instructor);
  setEl('instructorBio', 'textContent', community.bio);

  const highlightsContainer = document.getElementById('instructorHighlights');
  if (highlightsContainer) {
    highlightsContainer.innerHTML = community.highlights.map(h =>
      `<span class="highlight-badge">🏅 ${h}</span>`
    ).join('');
  }

  // Stats
  setEl('statMembers', 'textContent', formatNumber(community.members));
  setEl('statCourses', 'textContent', community.courses);
  setEl('statEvents', 'textContent', community.events);
  setEl('statRating', 'textContent', `⭐ ${community.rating}`);
  setEl('statReviews', 'textContent', formatNumber(community.reviews));

  // ── Join Buttons ──
  function handleJoin() {
    if (community.id === 'bernardo-faria') {
      window.location.href = 'community.html';
    } else {
      showToast(`Joining "${community.name}"... Redirecting to community! 🥋`, 'success');
      setTimeout(() => {
        window.location.href = 'community.html';
      }, 1500);
    }
  }

  const joinMainBtn = document.getElementById('joinMainBtn');
  if (joinMainBtn) joinMainBtn.addEventListener('click', handleJoin);
  const joinSidebarBtn = document.getElementById('joinSidebarBtn');
  if (joinSidebarBtn) joinSidebarBtn.addEventListener('click', handleJoin);

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

  console.log(`🥋 About page loaded for: ${community.name}`);
});
