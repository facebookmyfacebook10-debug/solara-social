// Solara Community — Facebook-style social app

const posts = [
  {
    id: 1,
    author: "Solara Outdoor",
    avatar: "SO",
    time: "2h",
    text: "New arrival alert! Our Professional Garden Tool Set in Emerald is back in stock. Perfect for the spring planting season. Who's ready to get their hands dirty? 🌱",
    image: "images/H3e55ec1d0cd64b558a9389f2e577ecd6H.jpg",
    likes: 128,
    comments: [
      { user: "Thandi M.", text: "Just ordered mine last week — quality is excellent!" },
      { user: "Kobus P.", text: "Does it come with a carry case?" }
    ],
    liked: false
  },
  {
    id: 2,
    author: "James L.",
    avatar: "JL",
    time: "5h",
    text: "Weekend project complete. The SOLARA Autonomous Lawn Mower has transformed our garden. Zero effort, perfect stripes. Highly recommend for anyone with a medium-large lawn.",
    image: "images/Sa5bd26851d5a49b0921e4a0e9a8575dcd.jpg",
    likes: 89,
    comments: [
      { user: "Ayanda N.", text: "How noisy is it? Considering one for our place." }
    ],
    liked: false
  },
  {
    id: 3,
    author: "Solara Outdoor",
    avatar: "SO",
    time: "1d",
    text: "Pool season is coming. Keep your water crystal clear with the SOLARA Portable Pool Cleaner — ultra-portable, fast drain, and covers pools up to 900 ft². Link in bio.",
    image: "images/H1f3d0fb70c554147920c12060a2ade58I.jpg",
    likes: 214,
    comments: [
      { user: "Sarah R.", text: "This saved us so much time last summer." },
      { user: "David M.", text: "Works on above-ground pools too?" }
    ],
    liked: true
  },
  {
    id: 4,
    author: "Thandi Mokoena",
    avatar: "TM",
    time: "1d",
    text: "Gifted my mom the Floral Garden Tool Set for her birthday. She hasn't stopped smiling. The violet case is so beautiful! 💜 Thank you Solara.",
    image: "images/Hc1f835aaec7441aea4278bc959989316s.jpg",
    likes: 156,
    comments: [],
    liked: false
  },
  {
    id: 5,
    author: "Kobus Pretorius",
    avatar: "KP",
    time: "2d",
    text: "Finally got around to organising the shed. The KEELAT cordless drill kit is a game changer for weekend DIY. Battery lasts forever.",
    image: "images/762719753_28575529328701916_8598157533834602329_n.jpg",
    likes: 67,
    comments: [
      { user: "James L.", text: "Solid kit. I have the same one." }
    ],
    liked: false
  },
  {
    id: 6,
    author: "Ayanda Nkosi",
    avatar: "AN",
    time: "3d",
    text: "Kids are already counting down to summer. This 3-in-1 splash water park is going to be the highlight of our backyard. Who else is getting ready for outdoor season?",
    image: "images/704731973_122119497633244690_1762907833678368150_n.jpg",
    likes: 203,
    comments: [
      { user: "Solara Outdoor", text: "We're excited for you! Have an amazing summer." }
    ],
    liked: false
  }
];

function renderPosts() {
  const container = document.getElementById('postsContainer');
  container.innerHTML = posts.map(p => `
    <article class="post" data-id="${p.id}">
      <div class="post-header">
        <div class="post-avatar">${p.avatar}</div>
        <div class="post-meta">
          <h4>${p.author} ${p.author === 'Solara Outdoor' ? '<span>· Official</span>' : ''}</h4>
          <p>${p.time} · 🌍</p>
        </div>
      </div>
      <div class="post-body">${p.text}</div>
      ${p.image ? `<img class="post-image" src="${p.image}" alt="Post image" loading="lazy">` : ''}
      <div class="post-stats">
        <span>${p.likes > 0 ? '👍 ' + p.likes : ''}</span>
        <span>${p.comments.length > 0 ? p.comments.length + ' comments' : ''}</span>
      </div>
      <div class="post-actions">
        <button class="post-action ${p.liked ? 'liked' : ''}" onclick="toggleLike(${p.id})">
          <svg width="18" height="18" fill="${p.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
          Like
        </button>
        <button class="post-action" onclick="toggleComments(${p.id})">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Comment
        </button>
        <button class="post-action">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          Share
        </button>
      </div>
      <div class="comment-section" id="comments-${p.id}">
        ${p.comments.map(c => `
          <div class="comment">
            <div class="comment-avatar">${c.user.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
            <div class="comment-bubble"><strong>${c.user}</strong>${c.text}</div>
          </div>
        `).join('')}
        <div class="comment-input-row">
          <div class="comment-avatar">SO</div>
          <input type="text" placeholder="Write a comment..." onkeydown="if(event.key==='Enter') addComment(${p.id}, this)">
        </div>
      </div>
    </article>
  `).join('');
}

function toggleLike(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderPosts();
  // Keep comments open if they were open
  const section = document.getElementById(`comments-${id}`);
  if (section && section.dataset.wasOpen === 'true') {
    section.classList.add('open');
  }
}

function toggleComments(id) {
  const section = document.getElementById(`comments-${id}`);
  if (!section) return;
  section.classList.toggle('open');
  section.dataset.wasOpen = section.classList.contains('open');
}

function addComment(id, input) {
  const text = input.value.trim();
  if (!text) return;
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.comments.push({ user: 'Solara Outdoor', text });
  input.value = '';
  renderPosts();
  document.getElementById(`comments-${id}`).classList.add('open');
}

// Create Post Modal
const modal = document.getElementById('createModal');
document.getElementById('openCreatePost').addEventListener('click', () => modal.classList.add('open'));
document.getElementById('photoBtn').addEventListener('click', () => modal.classList.add('open'));
document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

document.getElementById('submitPost').addEventListener('click', () => {
  const text = document.getElementById('postText').value.trim();
  if (!text) return;
  posts.unshift({
    id: Date.now(),
    author: 'Solara Outdoor',
    avatar: 'SO',
    time: 'Just now',
    text,
    image: null,
    likes: 0,
    comments: [],
    liked: false
  });
  document.getElementById('postText').value = '';
  modal.classList.remove('open');
  renderPosts();
});

// Init
renderPosts();
