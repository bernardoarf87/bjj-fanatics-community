/* ═══════════════════════════════════════════════════════
   BJJ FANATICS COMMUNITY — Application Logic
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Data ──
  const MEMBERS_DATA = [
    { name: 'Bernardo Faria', role: 'Founder & Head Instructor', avatar: 'assets/avatar-instructor.png', level: 9, levelName: 'Grand Master', points: 24850, posts: 342, joined: 'Jan 2024' },
    { name: 'Sarah Martinez', role: 'Competition Coach', avatar: 'assets/avatar-member2.png', level: 5, levelName: 'Brown Belt', points: 3240, posts: 187, joined: 'Feb 2024' },
    { name: 'Jake Thompson', role: 'Community Member', avatar: 'assets/avatar-member3.png', level: 3, levelName: 'Blue Belt', points: 890, posts: 65, joined: 'Mar 2024' },
    { name: 'Leo Batista', role: 'BJJ Instructor', avatar: 'assets/avatar-member1.png', level: 7, levelName: 'Coral Belt', points: 6200, posts: 245, joined: 'Jan 2024' },
    { name: 'Marcus Johnson', role: 'Community Member', avatar: 'assets/avatar-member3.png', level: 4, levelName: 'Purple Belt', points: 1580, posts: 98, joined: 'Apr 2024' },
    { name: 'Ana Costa', role: 'Competitor', avatar: 'assets/avatar-member2.png', level: 6, levelName: 'Black Belt', points: 4100, posts: 210, joined: 'Jan 2024' },
    { name: 'Ryan O\'Brien', role: 'Community Member', avatar: 'assets/avatar-member1.png', level: 2, levelName: 'Stripe 1', points: 320, posts: 34, joined: 'Jun 2024' },
    { name: 'Mia Rodriguez', role: 'Community Member', avatar: 'assets/avatar-member2.png', level: 3, levelName: 'Blue Belt', points: 750, posts: 42, joined: 'May 2024' },
    { name: 'Daniel Kim', role: 'Instructor', avatar: 'assets/avatar-member3.png', level: 5, levelName: 'Brown Belt', points: 2800, posts: 156, joined: 'Feb 2024' },
    { name: 'Emma Wilson', role: 'Community Member', avatar: 'assets/avatar-member2.png', level: 4, levelName: 'Purple Belt', points: 1200, posts: 88, joined: 'Mar 2024' },
    { name: 'Carlos Silva', role: 'Visiting Professor', avatar: 'assets/avatar-member1.png', level: 8, levelName: 'Red Belt', points: 8500, posts: 312, joined: 'Jan 2024' },
    { name: 'Ashley Chen', role: 'Community Member', avatar: 'assets/avatar-member2.png', level: 2, levelName: 'Stripe 1', points: 280, posts: 19, joined: 'Jul 2024' },
  ];

  const LEVEL_THRESHOLDS = [0, 50, 150, 400, 800, 1500, 3000, 5000, 10000];
  const LEVEL_NAMES = ['White Belt', 'Stripe 1', 'Blue Belt', 'Purple Belt', 'Brown Belt', 'Black Belt', 'Coral Belt', 'Red Belt', 'Grand Master'];

  const CALENDAR_EVENTS = {
    '2026-03-22': ['🔴 LIVE Q&A with Bernardo'],
    '2026-03-25': ['🥋 Side Control Workshop'],
    '2026-03-28': ['🏆 Competition Strategy'],
    '2026-03-29': ['🔴 Open Mat Hangout'],
    '2026-04-01': ['🎯 Drilling Session'],
    '2026-04-05': ['🔴 Monthly Sparring Review'],
    '2026-04-08': ['🥋 Leg Lock Workshop'],
    '2026-04-10': ['🥋 Guard Passing Workshop'],
    '2026-04-12': ['🏆 Tournament Prep Session'],
    '2026-04-15': ['🔴 LIVE Q&A'],
  };

  // ── Tab Navigation ──
  const navTabs = document.querySelectorAll('.nav-tab');
  const pageSections = document.querySelectorAll('.page-section');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');

  function switchTab(tabName) {
    navTabs.forEach(t => t.classList.remove('active'));
    pageSections.forEach(p => p.classList.remove('active'));

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`page-${tabName}`).classList.add('active');

    // Sidebar visibility
    if (tabName === 'community') {
      sidebar.style.display = '';
      mainContent.style.gridTemplateColumns = '1fr var(--sidebar-width)';
    } else {
      sidebar.style.display = 'none';
      mainContent.style.gridTemplateColumns = '1fr';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // View All buttons
  document.querySelectorAll('.view-all-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // ── Notification Dropdown ──
  const notifBtn = document.getElementById('notifBtn');
  const notifDropdown = document.getElementById('notifDropdown');

  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
      notifDropdown.classList.remove('active');
    }
  });

  document.getElementById('markAllRead').addEventListener('click', () => {
    document.querySelectorAll('.notification-item.unread').forEach(item => {
      item.classList.remove('unread');
    });
    const badge = document.querySelector('.notification-badge');
    if (badge) badge.style.display = 'none';
    showToast('All notifications marked as read', 'success');
  });

  // ── Like System ──
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const countEl = btn.querySelector('.like-count');
      const currentCount = parseInt(countEl.textContent);

      if (btn.classList.contains('liked')) {
        btn.classList.remove('liked');
        countEl.textContent = currentCount - 1;
        btn.querySelector('.action-icon').textContent = '❤️';
      } else {
        btn.classList.add('liked');
        countEl.textContent = currentCount + 1;
        btn.querySelector('.action-icon').textContent = '💖';

        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = '', 200);
      }
    });
  });

  // ── Comments Toggle ──
  document.querySelectorAll('.comment-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.dataset.postId;
      const commentsSection = document.getElementById(`comments-${postId}`);
      commentsSection.classList.toggle('active');
    });
  });

  // ── Comment Submission ──
  document.querySelectorAll('.comment-submit').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.comment-input-container');
      const input = container.querySelector('.comment-input');
      const text = input.value.trim();

      if (text) {
        const commentHTML = `
          <div class="comment-item" style="animation: fadeInUp 0.3s ease;">
            <img src="assets/avatar-member1.png" alt="" class="comment-avatar">
            <div class="comment-content">
              <span class="comment-user-name">You</span>
              <span class="comment-text">${escapeHtml(text)}</span>
              <div class="comment-meta">
                <span>Just now</span>
                <button>❤️ 0</button>
                <button>Reply</button>
              </div>
            </div>
          </div>
        `;

        container.insertAdjacentHTML('beforebegin', commentHTML);
        input.value = '';
        showToast('Comment posted!', 'success');
      }
    });
  });

  // ── Create Post Modal ──
  const composerInput = document.getElementById('composerInput');
  const createPostModal = document.getElementById('createPostModal');
  const closeModal = document.getElementById('closeModal');
  const cancelPost = document.getElementById('cancelPost');
  const submitPost = document.getElementById('submitPost');

  composerInput.addEventListener('click', () => {
    createPostModal.classList.add('active');
    setTimeout(() => document.getElementById('postTitleInput').focus(), 200);
  });

  function closePostModal() {
    createPostModal.classList.remove('active');
  }

  closeModal.addEventListener('click', closePostModal);
  cancelPost.addEventListener('click', closePostModal);

  createPostModal.addEventListener('click', (e) => {
    if (e.target === createPostModal) closePostModal();
  });

  submitPost.addEventListener('click', () => {
    const title = document.getElementById('postTitleInput').value.trim();
    const body = document.getElementById('postBodyInput').value.trim();
    const category = document.getElementById('postCategorySelect');
    const categoryText = category.options[category.selectedIndex].text;

    if (!title || !body) {
      showToast('Please fill in both title and content', 'error');
      return;
    }

    const postId = Date.now();
    const postHTML = `
      <article class="post-card" id="post-${postId}" style="animation: fadeInUp 0.4s ease;">
        <div class="post-header">
          <img src="assets/avatar-member1.png" alt="You" class="post-avatar">
          <div class="post-user-info">
            <div class="post-user-name">
              You
              <span class="level-badge level-4">⚡ Level 4</span>
            </div>
            <div class="post-timestamp">Just now</div>
          </div>
          <button class="post-menu-btn" title="More options">⋯</button>
        </div>
        <div class="post-category">${escapeHtml(categoryText)}</div>
        <h2 class="post-title">${escapeHtml(title)}</h2>
        <div class="post-body">
          <p>${escapeHtml(body)}</p>
        </div>
        <div class="post-footer">
          <button class="post-action like-btn" data-post-id="${postId}">
            <span class="action-icon">❤️</span>
            <span class="like-count">0</span>
          </button>
          <button class="post-action comment-toggle-btn" data-post-id="${postId}">
            <span class="action-icon">💬</span>
            <span>0 comments</span>
          </button>
          <button class="post-action">
            <span class="action-icon">🔗</span>
            <span>Share</span>
          </button>
        </div>
        <div class="comments-section" id="comments-${postId}">
          <div class="comment-input-container">
            <img src="assets/avatar-member1.png" alt="" class="comment-avatar">
            <input type="text" class="comment-input" placeholder="Write a comment...">
            <button class="comment-submit">Post</button>
          </div>
        </div>
      </article>
    `;

    const feedFilters = document.querySelector('.feed-filters');
    feedFilters.insertAdjacentHTML('afterend', postHTML);
    attachPostListeners(document.getElementById(`post-${postId}`));

    document.getElementById('postTitleInput').value = '';
    document.getElementById('postBodyInput').value = '';
    closePostModal();
    showToast('Post published! 🎉', 'success');
  });

  function attachPostListeners(postEl) {
    const likeBtn = postEl.querySelector('.like-btn');
    if (likeBtn) {
      likeBtn.addEventListener('click', () => {
        const countEl = likeBtn.querySelector('.like-count');
        const currentCount = parseInt(countEl.textContent);
        if (likeBtn.classList.contains('liked')) {
          likeBtn.classList.remove('liked');
          countEl.textContent = currentCount - 1;
          likeBtn.querySelector('.action-icon').textContent = '❤️';
        } else {
          likeBtn.classList.add('liked');
          countEl.textContent = currentCount + 1;
          likeBtn.querySelector('.action-icon').textContent = '💖';
          likeBtn.style.transform = 'scale(1.2)';
          setTimeout(() => likeBtn.style.transform = '', 200);
        }
      });
    }

    const commentToggle = postEl.querySelector('.comment-toggle-btn');
    if (commentToggle) {
      commentToggle.addEventListener('click', () => {
        const postId = commentToggle.dataset.postId;
        const commentsSection = document.getElementById(`comments-${postId}`);
        commentsSection.classList.toggle('active');
      });
    }

    const commentSubmit = postEl.querySelector('.comment-submit');
    if (commentSubmit) {
      commentSubmit.addEventListener('click', () => {
        const container = commentSubmit.closest('.comment-input-container');
        const input = container.querySelector('.comment-input');
        const text = input.value.trim();
        if (text) {
          const commentHTML = `
            <div class="comment-item" style="animation: fadeInUp 0.3s ease;">
              <img src="assets/avatar-member1.png" alt="" class="comment-avatar">
              <div class="comment-content">
                <span class="comment-user-name">You</span>
                <span class="comment-text">${escapeHtml(text)}</span>
                <div class="comment-meta">
                  <span>Just now</span>
                  <button>❤️ 0</button>
                  <button>Reply</button>
                </div>
              </div>
            </div>
          `;
          container.insertAdjacentHTML('beforebegin', commentHTML);
          input.value = '';
          showToast('Comment posted!', 'success');
        }
      });
    }
  }

  // ── Feed Filters ──
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Showing ${btn.textContent.trim()} posts`, 'info');
    });
  });

  const EVENTS_DATA = [
    {
      id: 1, title: 'LIVE Q&A with Bernardo Faria', type: 'live', typeLabel: '🔴 Live Q&A',
      date: '2026-03-22', time: '2:00 PM — 3:30 PM EST', day: 22, month: 'MAR', weekday: 'SAT',
      level: 'All Levels Welcome', rsvps: 234, host: 'Bernardo Faria',
      description: 'Join Bernardo Faria for a live, interactive Q&A session where you can ask any BJJ question — technique breakdowns, competition strategy, training methodology, and more! Top-voted questions from the community post get priority.',
      isLive: true
    },
    {
      id: 2, title: 'Technique Workshop: Side Control Escapes', type: 'workshop', typeLabel: '🥋 Workshop',
      date: '2026-03-25', time: '7:00 PM — 8:30 PM EST', day: 25, month: 'MAR', weekday: 'TUE',
      level: 'Beginner Friendly', rsvps: 189, host: 'Bernardo Faria',
      description: 'A hands-on workshop breaking down the most effective side control escape sequences. We\'ll cover frames, hip escapes, and the underhook recovery system. Bring a training partner if you can!'
    },
    {
      id: 3, title: 'Competition Strategy Masterclass', type: 'competition', typeLabel: '🏆 Competition',
      date: '2026-03-28', time: '6:00 PM — 7:30 PM EST', day: 28, month: 'MAR', weekday: 'FRI',
      level: 'Active Competitors', rsvps: 156, host: 'Sarah Martinez',
      description: 'Learn how to build a winning game plan for your next competition. We\'ll cover weight management, match strategy, mental preparation, and studying opponents. Real match footage analysis included.'
    },
    {
      id: 4, title: 'Open Mat Virtual Hangout', type: 'live', typeLabel: '🔴 Live Hangout',
      date: '2026-03-29', time: '12:00 PM — 2:00 PM EST', day: 29, month: 'MAR', weekday: 'SAT',
      level: 'All Levels', rsvps: 98, host: 'Bernardo Faria',
      description: 'Casual open mat hangout! Come chat, ask questions, show techniques on camera, and connect with other members. No agenda, just vibes and BJJ. 🤙'
    },
    {
      id: 5, title: 'Drilling Session: Guard Passing Chains', type: 'drilling', typeLabel: '🎯 Drilling',
      date: '2026-04-01', time: '7:00 PM — 8:00 PM EST', day: '01', month: 'APR', weekday: 'TUE',
      level: 'All Levels', rsvps: 142, host: 'Bernardo Faria',
      description: 'Follow-along drilling session focused on linking guard passing techniques into seamless chains. Toreando → knee slice → leg drag sequences with reps and timing.'
    },
    {
      id: 6, title: 'Monthly LIVE Sparring Review', type: 'live', typeLabel: '🔴 Live Review',
      date: '2026-04-05', time: '3:00 PM — 4:30 PM EST', day: '05', month: 'APR', weekday: 'SAT',
      level: 'All Levels', rsvps: 210, host: 'Bernardo Faria',
      description: 'Submit your sparring footage and get it reviewed LIVE by Bernardo! He\'ll break down what you did right, what to improve, and give specific drills for your game. Links to submit footage will be posted 48h before the event.'
    },
    {
      id: 7, title: 'Leg Lock Defense & Awareness Workshop', type: 'workshop', typeLabel: '🥋 Workshop',
      date: '2026-04-08', time: '7:00 PM — 8:30 PM EST', day: '08', month: 'APR', weekday: 'TUE',
      level: 'Intermediate+', rsvps: 167, host: 'Bernardo Faria',
      description: 'Essential leglock defense concepts: recognizing danger, proper boot defense, and safe extraction techniques. We\'ll cover heel hook defense, kneebar prevention, and common scrambles.'
    },
    {
      id: 8, title: 'Tournament Prep: Weight Cutting & Nutrition', type: 'competition', typeLabel: '🏆 Competition',
      date: '2026-04-12', time: '11:00 AM — 12:30 PM EST', day: 12, month: 'APR', weekday: 'SAT',
      level: 'Active Competitors', rsvps: 124, host: 'Sarah Martinez',
      description: 'Safe and effective weight management for competition. Covers nutrition timing, water manipulation, and recovery strategies. Guest speaker from sports nutrition background.'
    },
  ];

  const PAST_RECORDINGS = [
    { id: 101, title: 'LIVE Q&A — February Edition', duration: '1:23:45', date: 'Feb 22, 2026', views: 1240, thumb: 'assets/course-thumbnail.png' },
    { id: 102, title: 'Guard Retention Masterclass', duration: '1:05:20', date: 'Feb 15, 2026', views: 2108, thumb: 'assets/banner.png' },
    { id: 103, title: 'Rolling Analysis: Common Blue Belt Mistakes', duration: '55:30', date: 'Feb 8, 2026', views: 1856, thumb: 'assets/course-thumbnail.png' },
    { id: 104, title: 'Half Guard Sweeps Workshop', duration: '1:12:00', date: 'Feb 1, 2026', views: 1432, thumb: 'assets/banner.png' },
    { id: 105, title: 'Competition Mindset & Preparation', duration: '48:15', date: 'Jan 25, 2026', views: 987, thumb: 'assets/course-thumbnail.png' },
    { id: 106, title: 'No-Gi Takedowns for BJJ', duration: '1:18:40', date: 'Jan 18, 2026', views: 1654, thumb: 'assets/banner.png' },
  ];

  let rsvpedEvents = new Set();

  // ── Render Event Cards ──
  function renderEvents(filter = 'upcoming') {
    const listContainer = document.getElementById('eventsList');
    const listView = document.getElementById('eventsListView');
    const calView = document.getElementById('eventsCalendarView');
    const pastSection = document.getElementById('pastRecordingsSection');

    if (filter === 'past') {
      listView.style.display = 'none';
      calView.classList.remove('active');
      pastSection.style.display = 'block';
      renderPastRecordings();
      return;
    }

    pastSection.style.display = 'none';
    if (listView.classList.contains('active') || !calView.classList.contains('active')) {
      listView.style.display = '';
      listView.classList.add('active');
    }

    let filtered = EVENTS_DATA;
    if (filter === 'live') filtered = EVENTS_DATA.filter(e => e.type === 'live');
    else if (filter === 'workshop') filtered = EVENTS_DATA.filter(e => e.type === 'workshop');
    else if (filter === 'competition') filtered = EVENTS_DATA.filter(e => e.type === 'competition');

    listContainer.innerHTML = '';
    document.getElementById('eventsCount').textContent = `${filtered.length} upcoming`;

    filtered.forEach(event => {
      const isRsvped = rsvpedEvents.has(event.id);
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
        <div class="event-card-date-strip type-${event.type}">
          <span class="event-strip-month">${event.month}</span>
          <span class="event-strip-day">${event.day}</span>
          <span class="event-strip-weekday">${event.weekday}</span>
        </div>
        <div class="event-card-body">
          <div class="event-card-type type-${event.type}">${event.typeLabel}</div>
          <div class="event-card-title">${event.title}</div>
          <div class="event-card-meta">
            <span>🕐 ${event.time.split('—')[0].trim()}</span>
            <span>🎯 ${event.level}</span>
            <span>👤 ${event.host}</span>
          </div>
        </div>
        <div class="event-card-actions">
          <div class="event-rsvp-count"><strong>${event.rsvps + (isRsvped ? 1 : 0)}</strong> RSVPs</div>
          <button class="event-card-rsvp-btn ${isRsvped ? 'rsvped' : ''}" data-event-id="${event.id}">
            ${isRsvped ? '✅ Going!' : '✋ RSVP'}
          </button>
        </div>
      `;

      // Click card body to open detail modal
      card.querySelector('.event-card-body').addEventListener('click', () => openEventModal(event));

      // RSVP button
      const rsvpBtn = card.querySelector('.event-card-rsvp-btn');
      rsvpBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleRsvp(event.id, rsvpBtn, card.querySelector('.event-rsvp-count strong'), event.rsvps);
      });

      listContainer.appendChild(card);
    });
  }

  // ── RSVP Toggle ──
  function toggleRsvp(eventId, btnEl, countEl, baseCount) {
    if (rsvpedEvents.has(eventId)) {
      rsvpedEvents.delete(eventId);
      btnEl.classList.remove('rsvped');
      btnEl.textContent = '✋ RSVP';
      countEl.textContent = baseCount;
      showToast('RSVP removed', 'info');
    } else {
      rsvpedEvents.add(eventId);
      btnEl.classList.add('rsvped');
      btnEl.textContent = '✅ Going!';
      countEl.textContent = baseCount + 1;
      btnEl.style.transform = 'scale(1.1)';
      setTimeout(() => btnEl.style.transform = '', 200);
      showToast('You\'re in! 🎉 See you there!', 'success');
    }
  }

  // ── Event Detail Modal ──
  function openEventModal(event) {
    const modal = document.getElementById('eventDetailModal');
    document.getElementById('eventModalBadge').textContent = event.typeLabel;
    document.getElementById('eventModalTitle').textContent = event.title;
    document.getElementById('eventModalDate').textContent = formatEventDate(event.date);
    document.getElementById('eventModalTime').textContent = event.time;
    document.getElementById('eventModalLevel').textContent = event.level;
    document.getElementById('eventModalAttendees').textContent = `${event.rsvps} RSVPs`;
    document.getElementById('eventModalDescription').innerHTML = `
      <h4>About This Event</h4>
      <p>${event.description}</p>
    `;

    // Update RSVP button state
    const rsvpBtn = document.getElementById('eventRsvpBtn');
    const isRsvped = rsvpedEvents.has(event.id);
    rsvpBtn.textContent = isRsvped ? '✅ Going!' : '✋ RSVP — I\'m In!';
    rsvpBtn.onclick = () => {
      if (rsvpedEvents.has(event.id)) {
        rsvpedEvents.delete(event.id);
        rsvpBtn.textContent = '✋ RSVP — I\'m In!';
        showToast('RSVP removed', 'info');
      } else {
        rsvpedEvents.add(event.id);
        rsvpBtn.textContent = '✅ Going!';
        showToast('You\'re in! 🎉', 'success');
      }
      renderEvents(getCurrentFilter());
    };

    modal.classList.add('active');
  }

  function formatEventDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  function getCurrentFilter() {
    const activeFilter = document.querySelector('.event-filter-pill.active');
    return activeFilter ? activeFilter.dataset.filter : 'upcoming';
  }

  // Close event modal
  document.getElementById('closeEventModal').addEventListener('click', () => {
    document.getElementById('eventDetailModal').classList.remove('active');
  });
  document.getElementById('eventDetailModal').addEventListener('click', (e) => {
    if (e.target.id === 'eventDetailModal') e.target.classList.remove('active');
  });
  document.getElementById('eventShareBtn').addEventListener('click', () => {
    showToast('Event link copied! 📋', 'success');
  });

  // ── Past Recordings ──
  function renderPastRecordings() {
    const grid = document.getElementById('recordingsGrid');
    grid.innerHTML = '';
    PAST_RECORDINGS.forEach(rec => {
      const card = document.createElement('div');
      card.className = 'recording-card';
      card.innerHTML = `
        <div class="recording-thumb">
          <img src="${rec.thumb}" alt="${rec.title}">
          <div class="recording-thumb-overlay">
            <div class="recording-play-icon">▶</div>
          </div>
          <span class="recording-duration">${rec.duration}</span>
        </div>
        <div class="recording-info">
          <h4>${rec.title}</h4>
          <div class="recording-meta">
            <span>📅 ${rec.date}</span>
            <span>👁 ${rec.views.toLocaleString()} views</span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => showToast(`Playing "${rec.title}"...`, 'info'));
      grid.appendChild(card);
    });
  }

  // ── View Toggle (List / Calendar) ──
  document.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const view = btn.dataset.view;
      const listView = document.getElementById('eventsListView');
      const calView = document.getElementById('eventsCalendarView');

      if (view === 'list') {
        listView.classList.add('active');
        listView.style.display = '';
        calView.classList.remove('active');
      } else {
        listView.classList.remove('active');
        listView.style.display = 'none';
        calView.classList.add('active');
      }
    });
  });

  // ── Event Type Filters ──
  document.querySelectorAll('.event-filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.event-filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEvents(btn.dataset.filter);
    });
  });

  // ── Create Event Button ──
  document.getElementById('createEventBtn').addEventListener('click', () => {
    showToast('Event creation coming soon! 📅', 'info');
  });

  // ── Live Now Banner ──
  const liveNowBanner = document.getElementById('liveNowBanner');
  document.getElementById('joinLiveBtn').addEventListener('click', () => {
    showToast('Joining live session... 📹', 'success');
  });

  // Simulate viewer count changes
  let viewerCount = 847;
  setInterval(() => {
    viewerCount += Math.floor(Math.random() * 7) - 2;
    viewerCount = Math.max(780, viewerCount);
    const viewerEl = document.getElementById('liveNowViewers');
    if (viewerEl) viewerEl.textContent = viewerCount;
  }, 4000);

  // Initialize events list
  renderEvents('upcoming');

  // ── Members Grid ──
  function renderMembers(filter = '') {
    const grid = document.getElementById('membersGrid');
    grid.innerHTML = '';

    const filtered = MEMBERS_DATA.filter(m =>
      m.name.toLowerCase().includes(filter.toLowerCase()) ||
      m.role.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach((member, index) => {
      const card = document.createElement('div');
      card.className = 'member-card';
      card.style.animationDelay = `${index * 0.03}s`;
      card.innerHTML = `
        <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
        <div class="member-name">${member.name}</div>
        <span class="level-badge level-${member.level}" style="margin: 0 auto 8px;">${LEVEL_NAMES[member.level - 1]}</span>
        <div class="member-role">${member.role}</div>
        <div class="member-stats">
          <span><span class="stat-number">${member.points.toLocaleString()}</span> pts</span>
          <span><span class="stat-number">${member.posts}</span> posts</span>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderMembers();

  document.getElementById('membersSearchInput').addEventListener('input', (e) => {
    renderMembers(e.target.value);
  });

  // ── Leaderboard ──
  function renderLeaderboard() {
    const sortedMembers = [...MEMBERS_DATA].sort((a, b) => b.points - a.points);

    // Sidebar leaderboard (top 5)
    const sidebarLeaderboard = document.getElementById('sidebarLeaderboard');
    sidebarLeaderboard.innerHTML = '';

    sortedMembers.slice(0, 5).forEach((member, index) => {
      const item = document.createElement('div');
      item.className = 'leaderboard-item';
      item.innerHTML = `
        <div class="rank-number ${index < 3 ? 'top-3' : ''}">${index + 1}</div>
        <img src="${member.avatar}" alt="${member.name}" class="leaderboard-avatar">
        <div class="leaderboard-user-info">
          <div class="leaderboard-name">${member.name}</div>
          <div class="leaderboard-level">Level ${member.level} • ${member.levelName}</div>
        </div>
        <div class="leaderboard-points">${member.points.toLocaleString()}</div>
      `;
      sidebarLeaderboard.appendChild(item);
    });

    // Full leaderboard page
    const fullList = document.getElementById('leaderboardFullList');
    fullList.innerHTML = '';

    const rankClasses = ['gold', 'silver', 'bronze'];
    const rankEmojis = ['🥇', '🥈', '🥉'];

    sortedMembers.forEach((member, index) => {
      const nextLevelPoints = member.level < 9 ? LEVEL_THRESHOLDS[member.level] : LEVEL_THRESHOLDS[8];
      const currentLevelPoints = LEVEL_THRESHOLDS[member.level - 1];
      const progress = member.level >= 9 ? 100 : Math.min(100, ((member.points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100);

      const item = document.createElement('div');
      item.className = 'leaderboard-full-item';
      item.innerHTML = `
        <div class="full-rank ${index < 3 ? rankClasses[index] : ''}">
          ${index < 3 ? rankEmojis[index] : index + 1}
        </div>
        <img src="${member.avatar}" alt="${member.name}" class="full-rank-avatar">
        <div class="full-rank-info">
          <div class="full-rank-name">
            ${member.name}
            <span class="level-badge level-${member.level}">${member.levelName}</span>
          </div>
          <div class="level-progress-container">
            <div class="level-progress-bar">
              <div class="level-progress-fill" style="width: ${progress}%"></div>
            </div>
            <span class="level-progress-text">${Math.round(progress)}% to Level ${Math.min(member.level + 1, 9)}</span>
          </div>
        </div>
        <div class="full-rank-points">
          ${member.points.toLocaleString()} <span>pts</span>
        </div>
      `;
      fullList.appendChild(item);
    });
  }

  renderLeaderboard();

  // Leaderboard time filters
  document.querySelectorAll('.time-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.time-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Showing ${btn.textContent.trim()} leaderboard`, 'info');
    });
  });

  // ── Toast Notifications ──
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // ── Utility ──
  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // ── Share & Invite Buttons ──
  document.getElementById('shareBtn').addEventListener('click', () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://bjjfanaticscommunity.com');
      showToast('Link copied to clipboard! 📋', 'success');
    } else {
      showToast('Share: bjjfanaticscommunity.com', 'info');
    }
  });

  document.getElementById('inviteBtn').addEventListener('click', () => {
    showToast('Invite link generated! Share with your training partners 🤙', 'success');
  });

  // ── Search ──
  document.getElementById('globalSearch').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (query) {
        showToast(`Searching for "${query}"...`, 'info');
        e.target.value = '';
      }
    }
  });

  // ── Keyboard Shortcuts ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePostModal();
      notifDropdown.classList.remove('active');
    }
  });

  // ── Messages Button ──
  document.getElementById('messagesBtn').addEventListener('click', () => {
    showToast('Messages coming soon! 📨', 'info');
  });

  // ── Profile Button ──
  document.getElementById('profileBtn').addEventListener('click', () => {
    showToast('Profile settings coming soon! ⚙️', 'info');
  });

  // ── Course Cards ──
  document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
      const courseName = card.querySelector('.course-title').textContent;
      showToast(`Opening "${courseName}"...`, 'info');
    });
  });

  // ── Logo redirect ──
  document.getElementById('logoBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // ── Enter key on comment inputs ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('comment-input')) {
      e.preventDefault();
      const submitBtn = e.target.closest('.comment-input-container').querySelector('.comment-submit');
      if (submitBtn) submitBtn.click();
    }
  });

  // ═══════════════════════════════════════════════════════
  // BOOK A CALL — Complete Booking System
  // ═══════════════════════════════════════════════════════

  const SESSION_TYPES = {
    'video-1on1': { name: '1-on-1 Video Call', icon: '📹', durations: [{min: 30, price: 79}, {min: 60, price: 129}] },
    'phone': { name: 'Phone Call', icon: '📱', durations: [{min: 20, price: 49}, {min: 45, price: 89}] },
    'group': { name: 'Small Group Q&A', icon: '👥', durations: [{min: 60, price: 29}] }
  };

  // Available time slots per weekday (simulated)
  const AVAILABLE_TIMES = {
    1: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],       // Mon
    2: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'], // Tue
    3: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],                               // Wed
    4: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'], // Thu
    5: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],                    // Fri
    6: ['10:00 AM', '11:00 AM', '12:00 PM'],                                          // Sat
  };

  let bookingState = {
    sessionType: 'video-1on1',
    selectedDate: null,
    selectedTime: null,
    duration: 30,
    price: 79,
    calMonth: new Date().getMonth(),
    calYear: new Date().getFullYear()
  };

  // ── Session Type Selection ──
  const sessionCards = document.querySelectorAll('.session-type-card');
  sessionCards.forEach(card => {
    card.addEventListener('click', () => {
      const sessionKey = card.dataset.session;

      // Update visual selection
      sessionCards.forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.session-select-btn').classList.remove('selected');
        c.querySelector('.session-select-btn').textContent = 'Select';
      });
      card.classList.add('selected');
      card.querySelector('.session-select-btn').classList.add('selected');
      card.querySelector('.session-select-btn').textContent = '✓ Selected';

      // Update state
      bookingState.sessionType = sessionKey;
      const session = SESSION_TYPES[sessionKey];
      bookingState.duration = session.durations[0].min;
      bookingState.price = session.durations[0].price;

      // Update duration toggle
      updateDurationToggle();
      updateBookingSummary();
    });
  });

  // ── Duration Toggle ──
  function updateDurationToggle() {
    const toggle = document.getElementById('durationToggle');
    const session = SESSION_TYPES[bookingState.sessionType];
    toggle.innerHTML = '';

    session.durations.forEach((d, i) => {
      const btn = document.createElement('button');
      btn.className = `duration-option${i === 0 ? ' active' : ''}`;
      btn.dataset.duration = d.min;
      btn.dataset.price = d.price;
      btn.textContent = `${d.min} min — $${d.price}`;
      btn.addEventListener('click', () => {
        toggle.querySelectorAll('.duration-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        bookingState.duration = d.min;
        bookingState.price = d.price;
        updateBookingSummary();
      });
      toggle.appendChild(btn);
    });
  }

  document.querySelectorAll('.duration-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.duration-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bookingState.duration = parseInt(btn.dataset.duration);
      bookingState.price = parseInt(btn.dataset.price);
      updateBookingSummary();
    });
  });

  // ── Booking Calendar ──
  function renderBookingCalendar() {
    const daysContainer = document.getElementById('bookingCalDays');
    const monthTitle = document.getElementById('bookingCalMonth');
    const year = bookingState.calYear;
    const month = bookingState.calMonth;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthTitle.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    daysContainer.innerHTML = '';

    // Empty slots before 1st
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'booking-cal-day empty';
      daysContainer.appendChild(empty);
    }

    // Day buttons
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dayOfWeek = dateObj.getDay();
      const isPast = dateObj < today;
      const isSunday = dayOfWeek === 0;
      const hasSlots = AVAILABLE_TIMES[dayOfWeek] && !isPast;
      const isToday = dateObj.getTime() === today.getTime();

      const btn = document.createElement('button');
      btn.className = 'booking-cal-day';
      btn.textContent = day;

      if (isToday) btn.classList.add('today');
      if (isPast || isSunday) {
        btn.classList.add('disabled');
      } else if (hasSlots) {
        btn.classList.add('available');
      }

      // Check if this is the selected date
      if (bookingState.selectedDate) {
        const sel = bookingState.selectedDate;
        if (sel.getFullYear() === year && sel.getMonth() === month && sel.getDate() === day) {
          btn.classList.add('selected');
        }
      }

      if (!isPast && !isSunday) {
        btn.addEventListener('click', () => {
          bookingState.selectedDate = new Date(year, month, day);
          bookingState.selectedTime = null;
          renderBookingCalendar();
          renderTimeSlots();
          updateBookingSummary();
        });
      }

      daysContainer.appendChild(btn);
    }
  }

  // ── Time Slots ──
  function renderTimeSlots() {
    const list = document.getElementById('timeSlotsList');
    const title = document.getElementById('timeSlotsTitle');

    if (!bookingState.selectedDate) {
      title.textContent = 'Select a date to see available times';
      list.innerHTML = '';
      return;
    }

    const dayOfWeek = bookingState.selectedDate.getDay();
    const slots = AVAILABLE_TIMES[dayOfWeek] || [];
    const dateStr = bookingState.selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    title.textContent = `Available times — ${dateStr}`;

    list.innerHTML = '';

    if (slots.length === 0) {
      list.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-tertiary); padding: 20px; font-size: 13px;">No available slots on this day</div>';
      return;
    }

    // Randomly mark 1-2 slots as unavailable for realism
    const unavailableIndices = new Set();
    if (slots.length > 3) {
      unavailableIndices.add(Math.floor(Math.random() * slots.length));
    }

    slots.forEach((time, index) => {
      const btn = document.createElement('button');
      btn.className = 'time-slot-btn';
      btn.textContent = time;

      if (unavailableIndices.has(index)) {
        btn.classList.add('unavailable');
        btn.textContent = `${time} (Booked)`;
      } else {
        if (bookingState.selectedTime === time) {
          btn.classList.add('selected');
        }
        btn.addEventListener('click', () => {
          bookingState.selectedTime = time;
          renderTimeSlots();
          updateBookingSummary();
        });
      }

      list.appendChild(btn);
    });
  }

  // Calendar navigation
  document.getElementById('bookingCalPrev').addEventListener('click', () => {
    bookingState.calMonth--;
    if (bookingState.calMonth < 0) {
      bookingState.calMonth = 11;
      bookingState.calYear--;
    }
    renderBookingCalendar();
  });

  document.getElementById('bookingCalNext').addEventListener('click', () => {
    bookingState.calMonth++;
    if (bookingState.calMonth > 11) {
      bookingState.calMonth = 0;
      bookingState.calYear++;
    }
    renderBookingCalendar();
  });

  // ── Booking Summary ──
  function updateBookingSummary() {
    const session = SESSION_TYPES[bookingState.sessionType];
    document.getElementById('summarySession').textContent = session.name;
    document.getElementById('summaryDuration').textContent = `${bookingState.duration} min`;
    document.getElementById('summaryTotal').textContent = `$${bookingState.price}`;

    if (bookingState.selectedDate) {
      document.getElementById('summaryDate').textContent = bookingState.selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else {
      document.getElementById('summaryDate').textContent = 'Not selected';
    }

    if (bookingState.selectedTime) {
      document.getElementById('summaryTime').textContent = `${bookingState.selectedTime} EST`;
    } else {
      document.getElementById('summaryTime').textContent = 'Not selected';
    }

    // Enable/disable confirm button
    const confirmBtn = document.getElementById('confirmBookingBtn');
    confirmBtn.disabled = !(bookingState.selectedDate && bookingState.selectedTime);
  }

  // ── Confirm Booking ──
  document.getElementById('confirmBookingBtn').addEventListener('click', () => {
    if (!bookingState.selectedDate || !bookingState.selectedTime) return;

    const session = SESSION_TYPES[bookingState.sessionType];
    const modal = document.getElementById('bookingConfirmModal');

    document.getElementById('confirmSession').textContent = session.name;
    document.getElementById('confirmDate').textContent = bookingState.selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('confirmTime').textContent = `${bookingState.selectedTime} EST`;
    document.getElementById('confirmDuration').textContent = `${bookingState.duration} minutes`;

    modal.classList.add('active');
  });

  // Close booking confirm modal
  document.getElementById('closeBookingConfirm').addEventListener('click', () => {
    document.getElementById('bookingConfirmModal').classList.remove('active');
    showToast('Booking confirmed! Check your email for the call link 📧', 'success');

    // Reset booking state
    bookingState.selectedDate = null;
    bookingState.selectedTime = null;
    renderBookingCalendar();
    renderTimeSlots();
    updateBookingSummary();
  });

  document.getElementById('addToCalBtn').addEventListener('click', () => {
    showToast('Calendar event download starting... 📅', 'success');
  });

  document.getElementById('bookingConfirmModal').addEventListener('click', (e) => {
    if (e.target.id === 'bookingConfirmModal') {
      e.target.classList.remove('active');
    }
  });

  // Initialize booking calendar
  renderBookingCalendar();

  // ═══════════════════════════════════════════════════════
  // VIDEO REVIEW — Footage Submission System
  // ═══════════════════════════════════════════════════════

  const VR_TYPES = {
    'competition': { name: 'Competition Match', turnaround: '~48 hours' },
    'sparring': { name: 'Training / Sparring', turnaround: '~48 hours' },
    'technique': { name: 'Technique Check', turnaround: '~24 hours' }
  };

  const VR_DEPTHS = {
    'standard': { name: 'Standard Review', price: 39, turnaround: '~48 hours' },
    'detailed': { name: 'Detailed Breakdown', price: 79, turnaround: '~48 hours' },
    'premium': { name: 'Premium Package', price: 149, turnaround: '~72 hours' }
  };

  let vrState = {
    reviewType: 'competition',
    depth: 'standard',
    price: 39,
    hasVideo: false,
    videoName: ''
  };

  // ── Review Type Selection ──
  const vrTypeCards = document.querySelectorAll('.vr-type-card');
  vrTypeCards.forEach(card => {
    card.addEventListener('click', () => {
      const vrType = card.dataset.vrtype;
      vrTypeCards.forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.vr-type-select-btn').classList.remove('selected');
        c.querySelector('.vr-type-select-btn').textContent = 'Select';
      });
      card.classList.add('selected');
      card.querySelector('.vr-type-select-btn').classList.add('selected');
      card.querySelector('.vr-type-select-btn').textContent = '✓ Selected';

      vrState.reviewType = vrType;
      updateVrSummary();
    });
  });

  // ── Review Depth Selection ──
  const vrDepthCards = document.querySelectorAll('.vr-depth-card');
  vrDepthCards.forEach(card => {
    card.addEventListener('click', () => {
      vrDepthCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      vrState.depth = card.dataset.depth;
      vrState.price = parseInt(card.dataset.price);
      updateVrSummary();
    });
  });

  // ── File Upload (Drag & Drop + Click) ──
  const vrUploadZone = document.getElementById('vrUploadZone');
  const vrFileInput = document.getElementById('vrFileInput');

  vrUploadZone.addEventListener('click', () => vrFileInput.click());
  vrUploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    vrUploadZone.classList.add('dragover');
  });
  vrUploadZone.addEventListener('dragleave', () => {
    vrUploadZone.classList.remove('dragover');
  });
  vrUploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    vrUploadZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleVrFile(e.dataTransfer.files[0]);
    }
  });

  vrFileInput.addEventListener('change', () => {
    if (vrFileInput.files.length > 0) {
      handleVrFile(vrFileInput.files[0]);
    }
  });

  function handleVrFile(file) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    document.getElementById('vrFileName').textContent = file.name;
    document.getElementById('vrFileSize').textContent = `${sizeMB} MB`;
    document.getElementById('vrUploadStatus').style.display = 'block';

    vrState.hasVideo = true;
    vrState.videoName = file.name;
    updateVrSummary();
    simulateUploadProgress();
  }

  function simulateUploadProgress() {
    const bar = document.getElementById('vrProgressBar');
    const text = document.getElementById('vrProgressText');
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        text.textContent = '✓ Upload complete — ready to submit';
        text.style.color = 'var(--success)';
      } else {
        text.textContent = `Uploading... ${Math.round(progress)}%`;
        text.style.color = 'var(--text-tertiary)';
      }
      bar.style.width = `${progress}%`;
    }, 200);
  }

  // ── Remove File ──
  document.getElementById('vrFileRemove').addEventListener('click', () => {
    document.getElementById('vrUploadStatus').style.display = 'none';
    vrFileInput.value = '';
    vrState.hasVideo = false;
    vrState.videoName = '';
    updateVrSummary();
  });

  // ── Video Link Input ──
  const vrLinkInput = document.getElementById('vrVideoLink');
  vrLinkInput.addEventListener('input', () => {
    const hasLink = vrLinkInput.value.trim().length > 5;
    if (hasLink && !vrState.hasVideo) {
      vrState.hasVideo = true;
      vrState.videoName = 'Video link';
    } else if (!hasLink && vrState.videoName === 'Video link') {
      vrState.hasVideo = false;
      vrState.videoName = '';
    }
    updateVrSummary();
  });

  // ── Update Summary ──
  function updateVrSummary() {
    const type = VR_TYPES[vrState.reviewType];
    const depth = VR_DEPTHS[vrState.depth];

    document.getElementById('vrSummaryType').textContent = type.name;
    document.getElementById('vrSummaryVideo').textContent = vrState.hasVideo ? vrState.videoName : 'Not uploaded';
    document.getElementById('vrSummaryDepth').textContent = depth.name;
    document.getElementById('vrSummaryTurnaround').textContent = depth.turnaround;
    document.getElementById('vrSummaryTotal').textContent = `$${depth.price}`;

    const submitBtn = document.getElementById('vrSubmitBtn');
    submitBtn.disabled = !vrState.hasVideo;
  }

  // ── Submit for Review ──
  document.getElementById('vrSubmitBtn').addEventListener('click', () => {
    if (!vrState.hasVideo) return;

    const type = VR_TYPES[vrState.reviewType];
    const depth = VR_DEPTHS[vrState.depth];
    const modal = document.getElementById('vrSubmitModal');

    document.getElementById('vrConfirmType').textContent = type.name;
    document.getElementById('vrConfirmDepth').textContent = depth.name;
    document.getElementById('vrConfirmTurnaround').textContent = depth.turnaround;
    document.getElementById('vrConfirmPrice').textContent = `$${depth.price}`;

    modal.classList.add('active');
  });

  document.getElementById('closeVrSubmitModal').addEventListener('click', () => {
    document.getElementById('vrSubmitModal').classList.remove('active');
    showToast('Video submitted for review! You\'ll be notified when it\'s ready 🎬', 'success');

    // Reset state
    vrState.hasVideo = false;
    vrState.videoName = '';
    document.getElementById('vrUploadStatus').style.display = 'none';
    vrFileInput.value = '';
    vrLinkInput.value = '';
    updateVrSummary();
  });

  document.getElementById('vrSubmitModal').addEventListener('click', (e) => {
    if (e.target.id === 'vrSubmitModal') {
      e.target.classList.remove('active');
    }
  });

  // ═══════════════════════════════════════════════════════
  // PRIVATE TRAINING — Lessons & Seminars
  // ═══════════════════════════════════════════════════════

  const PT_TYPES = {
    'private': { name: 'Private Lesson', price: '$500' },
    'seminar': { name: 'Seminar / Workshop', price: '$2,500' }
  };

  let ptState = {
    type: 'private',
    reason: 'local'
  };

  // ── Offering Card Selection ──
  const ptCards = document.querySelectorAll('.pt-offering-card');
  ptCards.forEach(card => {
    card.addEventListener('click', () => {
      ptCards.forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.pt-select-btn').classList.remove('selected');
        c.querySelector('.pt-select-btn').textContent = 'Select';
      });
      card.classList.add('selected');
      card.querySelector('.pt-select-btn').classList.add('selected');
      card.querySelector('.pt-select-btn').textContent = '✓ Selected';

      ptState.type = card.dataset.pttype;
      updatePtSummary();
    });
  });

  // ── Reason Chips ──
  const ptChips = document.querySelectorAll('.pt-chip');
  ptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      ptChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      ptState.reason = chip.dataset.reason;
    });
  });

  // ── Live Summary Updates ──
  const ptCity = document.getElementById('ptCity');
  const ptDateRange = document.getElementById('ptDateRange');
  const ptGroupSize = document.getElementById('ptGroupSize');

  if (ptCity) ptCity.addEventListener('input', updatePtSummary);
  if (ptDateRange) ptDateRange.addEventListener('input', updatePtSummary);
  if (ptGroupSize) ptGroupSize.addEventListener('change', updatePtSummary);

  function updatePtSummary() {
    const type = PT_TYPES[ptState.type];
    document.getElementById('ptSummaryType').textContent = type.name;
    document.getElementById('ptSummaryPrice').textContent = type.price;

    const city = ptCity ? ptCity.value.trim() : '';
    document.getElementById('ptSummaryLocation').textContent = city || '—';

    const dates = ptDateRange ? ptDateRange.value.trim() : '';
    document.getElementById('ptSummaryDates').textContent = dates || '—';

    const group = ptGroupSize ? ptGroupSize.options[ptGroupSize.selectedIndex].text : '';
    document.getElementById('ptSummaryGroup').textContent = (ptGroupSize && ptGroupSize.value) ? group : '—';
  }

  // ── Submit Inquiry ──
  document.getElementById('ptSubmitBtn').addEventListener('click', () => {
    const type = PT_TYPES[ptState.type];
    const modal = document.getElementById('ptInquiryModal');

    document.getElementById('ptConfirmType').textContent = type.name;
    document.getElementById('ptConfirmLocation').textContent = (ptCity && ptCity.value.trim()) || 'Not specified';
    document.getElementById('ptConfirmDates').textContent = (ptDateRange && ptDateRange.value.trim()) || 'Flexible';
    const group = (ptGroupSize && ptGroupSize.value) ? ptGroupSize.options[ptGroupSize.selectedIndex].text : 'Not specified';
    document.getElementById('ptConfirmGroup').textContent = group;

    modal.classList.add('active');
  });

  document.getElementById('closePtInquiryModal').addEventListener('click', () => {
    document.getElementById('ptInquiryModal').classList.remove('active');
    showToast('Inquiry sent! We\'ll get back to you within 24 hours 🥋', 'success');
  });

  document.getElementById('ptInquiryModal').addEventListener('click', (e) => {
    if (e.target.id === 'ptInquiryModal') {
      e.target.classList.remove('active');
    }
  });

  // ═══════════════════════════════════════════════════════
  // SHOUTOUTS — Cameo-style Greeting Videos
  // ═══════════════════════════════════════════════════════

  const SO_OCCASIONS = {
    'birthday': 'Birthday',
    'motivation': 'Motivation',
    'congrats': 'Congratulations',
    'special': 'Special Occasion'
  };

  let soState = {
    occasion: 'birthday',
    speed: 'standard',
    price: 49
  };

  // ── Occasion Card Selection ──
  const soCards = document.querySelectorAll('.so-occasion-card');
  soCards.forEach(card => {
    card.addEventListener('click', () => {
      soCards.forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.so-occasion-btn').classList.remove('selected');
        c.querySelector('.so-occasion-btn').textContent = 'Select';
      });
      card.classList.add('selected');
      card.querySelector('.so-occasion-btn').classList.add('selected');
      card.querySelector('.so-occasion-btn').textContent = '✓ Selected';

      soState.occasion = card.dataset.occasion;
      updateSoSummary();
    });
  });

  // ── Delivery Speed Selection ──
  const soDeliveryCards = document.querySelectorAll('.so-delivery-card');
  soDeliveryCards.forEach(card => {
    card.addEventListener('click', () => {
      soDeliveryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      soState.speed = card.dataset.speed;
      soState.price = parseInt(card.dataset.price);
      updateSoSummary();
    });
  });

  // ── Live Summary Updates ──
  const soRecipient = document.getElementById('soRecipientName');
  if (soRecipient) soRecipient.addEventListener('input', updateSoSummary);

  function updateSoSummary() {
    document.getElementById('soSummaryOccasion').textContent = SO_OCCASIONS[soState.occasion] || 'Birthday';

    const recipientVal = soRecipient ? soRecipient.value.trim() : '';
    document.getElementById('soSummaryFor').textContent = recipientVal || '—';

    const deliveryText = soState.speed === 'rush' ? '⚡ Rush (24 hours)' : 'Standard (7 days)';
    document.getElementById('soSummaryDelivery').textContent = deliveryText;

    document.getElementById('soSummaryTotal').textContent = '$' + soState.price;
  }

  // ── Order Shoutout ──
  document.getElementById('soOrderBtn').addEventListener('click', () => {
    const modal = document.getElementById('soOrderModal');

    document.getElementById('soConfirmOccasion').textContent = SO_OCCASIONS[soState.occasion] || 'Birthday';
    document.getElementById('soConfirmFor').textContent = (soRecipient && soRecipient.value.trim()) || 'Not specified';
    document.getElementById('soConfirmDelivery').textContent = soState.speed === 'rush' ? '⚡ Rush (24 hours)' : 'Standard (7 days)';
    document.getElementById('soConfirmPrice').textContent = '$' + soState.price;

    modal.classList.add('active');
  });

  document.getElementById('closeSoOrderModal').addEventListener('click', () => {
    document.getElementById('soOrderModal').classList.remove('active');
    showToast('Shoutout ordered! Your personalized video is on the way 🌟', 'success');
  });

  document.getElementById('soOrderModal').addEventListener('click', (e) => {
    if (e.target.id === 'soOrderModal') {
      e.target.classList.remove('active');
    }
  });

  // ═══════════════════════════════════════════════════════
  // SHOP — Autographed Merch & Collectibles
  // ═══════════════════════════════════════════════════════

  let shopCart = [];

  // ── Filter Tabs ──
  const shopFilters = document.querySelectorAll('.shop-filter');
  const shopCards = document.querySelectorAll('.shop-product-card');

  shopFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      shopFilters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      const cat = filter.dataset.filter;
      shopCards.forEach(card => {
        if (cat === 'all' || card.dataset.category.includes(cat)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ── Add to Cart ──
  document.querySelectorAll('.shop-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.shop-product-card');
      const item = {
        id: btn.dataset.id,
        name: card.dataset.name,
        price: parseInt(card.dataset.price),
        img: card.querySelector('.shop-product-img img').src
      };

      // Prevent duplicates
      if (shopCart.find(i => i.id === item.id)) {
        showToast('Item already in cart!', 'info');
        return;
      }

      shopCart.push(item);
      btn.textContent = '✓ Added';
      btn.classList.add('added');

      updateShopCart();
      showToast(`${item.name} added to cart 🛒`, 'success');
    });
  });

  // ── Cart Toggle ──
  const cartOverlay = document.getElementById('shopCartOverlay');
  document.getElementById('shopCartToggle').addEventListener('click', () => {
    cartOverlay.classList.add('active');
  });

  document.getElementById('shopCartClose').addEventListener('click', () => {
    cartOverlay.classList.remove('active');
  });

  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) cartOverlay.classList.remove('active');
  });

  // ── Update Cart UI ──
  function updateShopCart() {
    const countEl = document.getElementById('shopCartCount');
    const itemsEl = document.getElementById('shopCartItems');
    const footerEl = document.getElementById('shopCartFooter');
    const totalEl = document.getElementById('shopCartTotal');

    countEl.textContent = shopCart.length;

    if (shopCart.length === 0) {
      itemsEl.innerHTML = '<div class="shop-cart-empty"><span>🛒</span><p>Your cart is empty</p></div>';
      footerEl.style.display = 'none';
      return;
    }

    footerEl.style.display = 'block';
    let total = 0;
    let html = '';

    shopCart.forEach((item, idx) => {
      total += item.price;
      html += `
        <div class="shop-cart-item">
          <div class="shop-cart-item-img"><img src="${item.img}" alt="${item.name}"></div>
          <div class="shop-cart-item-info">
            <div class="shop-cart-item-name">${item.name}</div>
            <div class="shop-cart-item-price">$${item.price}</div>
            <span class="shop-cart-item-remove" data-idx="${idx}">✕ Remove</span>
          </div>
        </div>`;
    });

    itemsEl.innerHTML = html;
    totalEl.textContent = '$' + total;

    // Bind remove buttons
    itemsEl.querySelectorAll('.shop-cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        const removedItem = shopCart[idx];

        // Reset the "Add to Cart" button
        document.querySelectorAll('.shop-add-btn').forEach(addBtn => {
          if (addBtn.dataset.id === removedItem.id) {
            addBtn.textContent = '🛒 Add to Cart';
            addBtn.classList.remove('added');
          }
        });

        shopCart.splice(idx, 1);
        updateShopCart();
      });
    });
  }

  // ── Checkout ──
  document.getElementById('shopCheckoutBtn').addEventListener('click', () => {
    if (shopCart.length === 0) return;

    const total = shopCart.reduce((sum, i) => sum + i.price, 0);
    document.getElementById('shopConfirmItems').textContent = shopCart.length + ' item' + (shopCart.length > 1 ? 's' : '');
    document.getElementById('shopConfirmTotal').textContent = '$' + total;

    cartOverlay.classList.remove('active');
    document.getElementById('shopCheckoutModal').classList.add('active');
  });

  document.getElementById('closeShopCheckoutModal').addEventListener('click', () => {
    document.getElementById('shopCheckoutModal').classList.remove('active');

    // Reset cart
    shopCart = [];
    updateShopCart();
    document.querySelectorAll('.shop-add-btn').forEach(btn => {
      btn.textContent = '🛒 Add to Cart';
      btn.classList.remove('added');
    });

    showToast('Order placed! Your items are on the way 🎉', 'success');
  });

  document.getElementById('shopCheckoutModal').addEventListener('click', (e) => {
    if (e.target.id === 'shopCheckoutModal') {
      e.target.classList.remove('active');
    }
  });

  console.log('🥋 BJJ Fanatics Community loaded successfully!');
});
