class IPTVPlayer {
    constructor() {
        this.videoPlayer = null;
        this.hls = null;
        this.currentChannel = null;
        this.isHlsSupported = false;
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            // Check HLS support
            this.isHlsSupported = typeof Hls !== 'undefined' && Hls.isSupported();
            
            await this.initializeVideoJS();
            this.setupEventListeners();
            this.loadTheme();
            
            // Show popup ad after delay
            setTimeout(() => this.showPopupAd(), 30000);
            
            this.isInitialized = true;
            console.log('VAZO TV Player initialized successfully');
        } catch (error) {
            console.error('Failed to initialize player:', error);
        }
    }

    initializeVideoJS() {
        return new Promise((resolve, reject) => {
            try {
                // Wait for videojs to be available
                if (typeof videojs === 'undefined') {
                    throw new Error('Video.js not loaded');
                }

                this.videoPlayer = videojs('videoPlayer', {
                    fluid: true,
                    responsive: true,
                    playbackRates: [0.5, 1, 1.25, 1.5, 2],
                    controls: true,
                    preload: 'metadata',
                    sources: [],
                    html5: {
                        vhs: {
                            overrideNative: true
                        }
                    },
                    userActions: {
                        hotkeys: true
                    }
                });

                this.videoPlayer.ready(() => {
                    console.log('Video.js ready');
                    resolve();
                });

                // Handle player errors
                this.videoPlayer.on('error', (e) => {
                    console.error('Video player error:', e);
                    this.handlePlayerError();
                });

                this.videoPlayer.on('loadstart', () => {
                    this.updatePlayerStats('স্ট্রিম লোড হচ্ছে...');
                });

                this.videoPlayer.on('playing', () => {
                    this.updatePlayerStats('লাইভ স্ট্রিমিং');
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.searchChannels());
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.searchChannels();
            });
            
            // Real-time search
            searchInput.addEventListener('input', (e) => {
                if (e.target.value.length === 0) {
                    this.searchChannels();
                }
            });
        }

        // Category filters
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterChannels(category);
            });
        });

        // Popup close
        const closePopup = document.querySelector('.close-popup');
        if (closePopup) {
            closePopup.addEventListener('click', () => {
                this.closePopupAd();
            });
        }

        // Close popup when clicking outside
        const popupAd = document.getElementById('popupAd');
        if (popupAd) {
            popupAd.addEventListener('click', (e) => {
                if (e.target === popupAd) {
                    this.closePopupAd();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePopupAd();
            }
        });
    }

    toggleTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        
        if (!body || !themeToggle) return;

        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            localStorage.setItem('vazo-tv-theme', 'light');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
            localStorage.setItem('vazo-tv-theme', 'dark');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('vazo-tv-theme') || 'dark';
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        
        if (!body || !themeToggle) return;

        if (savedTheme === 'light') {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        }
    }

    playChannel(channel) {
        if (!this.isInitialized || !this.videoPlayer) {
            console.error('Player not initialized');
            return;
        }

        try {
            this.currentChannel = channel;
            
            // Update UI
            const channelNameElement = document.getElementById('currentChannelName');
            const playerSection = document.getElementById('playerSection');
            
            if (channelNameElement) {
                channelNameElement.textContent = channel.name;
            }
            
            if (playerSection) {
                playerSection.style.display = 'block';
                playerSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }

            this.updatePlayerStats('স্ট্রিম প্রস্তুত করা হচ্ছে...');

            // Stop current playback
            this.videoPlayer.pause();
            
            if (this.hls) {
                this.hls.destroy();
                this.hls = null;
            }

            // Try to play the stream
            this.playStream(channel.url);

        } catch (error) {
            console.error('Error playing channel:', error);
            this.updatePlayerStats('ত্রুটি: চ্যানেল প্লে করতে সমস্যা হচ্ছে');
        }
    }

    playStream(url) {
        if (this.isHlsSupported) {
            this.playWithHLS(url);
        } else {
            this.playWithNative(url);
        }
    }

    playWithHLS(url) {
        try {
            this.hls = new Hls({
                enableWorker: false,
                lowLatencyMode: true,
                backBufferLength: 90,
                maxBufferLength: 30,
                maxMaxBufferLength: 60
            });

            this.hls.loadSource(url);
            this.hls.attachMedia(this.videoPlayer.tech().el());

            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                this.videoPlayer.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                    this.updatePlayerStats('প্লে বাটনে ক্লিক করুন');
                });
            });

            this.hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS Error:', data);
                if (data.fatal) {
                    this.handlePlayerError();
                }
            });

        } catch (error) {
            console.error('HLS failed, falling back to native:', error);
            this.playWithNative(url);
        }
    }

    playWithNative(url) {
        this.videoPlayer.src({
            src: url,
            type: 'application/x-mpegURL'
        });
        
        this.videoPlayer.ready(() => {
            this.videoPlayer.play().catch(e => {
                console.log('Autoplay prevented:', e);
                this.updatePlayerStats('প্লে বাটনে ক্লিক করুন');
            });
        });
    }

    handlePlayerError() {
        this.updatePlayerStats('স্ট্রিম লোড করতে সমস্যা হচ্ছে...');
        
        // Try fallback after 2 seconds
        setTimeout(() => {
            if (this.currentChannel && this.currentChannel.fallbackUrls && this.currentChannel.fallbackUrls.length > 0) {
                this.tryFallbackUrls();
            } else {
                this.updatePlayerStats('চ্যানেলটি বর্তমানে unavailable');
            }
        }, 2000);
    }

    tryFallbackUrls() {
        if (this.currentChannel.fallbackUrls.length > 0) {
            const fallbackUrl = this.currentChannel.fallbackUrls.shift();
            this.updatePlayerStats(`অল্টারনেটিভ স্ট্রিম চেষ্টা করছি... (${this.currentChannel.fallbackUrls.length + 1} remaining)`);
            
            setTimeout(() => {
                this.playStream(fallbackUrl);
            }, 1000);
        } else {
            this.updatePlayerStats('সব স্ট্রিম failed');
        }
    }

    updatePlayerStats(status) {
        const statsElement = document.getElementById('playerStats');
        if (statsElement) {
            statsElement.textContent = status;
            statsElement.setAttribute('aria-live', 'polite');
        }
    }

    searchChannels() {
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
        const channelsGrid = document.getElementById('channelsGrid');
        
        if (!channelsGrid) return;

        const channelCards = channelsGrid.getElementsByClassName('channel-card');
        let visibleCount = 0;

        Array.from(channelCards).forEach(card => {
            const channelName = card.querySelector('.channel-name')?.textContent.toLowerCase() || '';
            const channelCategory = card.querySelector('.channel-category')?.textContent.toLowerCase() || '';
            
            if (channelName.includes(searchTerm) || channelCategory.includes(searchTerm)) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        this.updateChannelsCount(visibleCount, searchTerm);
    }

    filterChannels(category) {
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        event.target.classList.add('active');
        event.target.setAttribute('aria-selected', 'true');

        const channelsGrid = document.getElementById('channelsGrid');
        if (!channelsGrid) return;

        const channelCards = channelsGrid.getElementsByClassName('channel-card');
        let visibleCount = 0;

        Array.from(channelCards).forEach(card => {
            const channelCategory = card.getAttribute('data-category');
            
            if (category === 'all' || channelCategory === category) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        this.updateChannelsCount(visibleCount, category);
    }

    updateChannelsCount(count, filter) {
        const countElement = document.getElementById('channelsCount');
        if (!countElement) return;

        let text = `${count} চ্যানেল পাওয়া গেছে`;
        
        if (filter && filter !== 'all') {
            const categoryName = this.getCategoryName(filter);
            text = `${count} ${categoryName} চ্যানেল পাওয়া গেছে`;
        }
        
        countElement.textContent = text;
    }

    getCategoryName(category) {
        const categoryNames = {
            'Bangla': 'বাংলা',
            'Sports': 'স্পোর্টস', 
            'Movies': 'মুভিজ',
            'News': 'নিউজ',
            'Kids': 'কিডস'
        };
        return categoryNames[category] || category;
    }

    showPopupAd() {
        const popup = document.getElementById('popupAd');
        if (popup) {
            popup.style.display = 'flex';
            popup.setAttribute('aria-hidden', 'false');
            
            // Focus trap for accessibility
            const closeBtn = popup.querySelector('.close-popup');
            if (closeBtn) {
                closeBtn.focus();
            }
        }
    }

    closePopupAd() {
        const popup = document.getElementById('popupAd');
        if (popup) {
            popup.style.display = 'none';
            popup.setAttribute('aria-hidden', 'true');
        }
    }

    // Cleanup method
    destroy() {
        if (this.hls) {
            this.hls.destroy();
        }
        if (this.videoPlayer) {
            this.videoPlayer.dispose();
        }
    }
}

// Global function to render channels
function renderChannels(channels) {
    const channelsGrid = document.getElementById('channelsGrid');
    if (!channelsGrid) {
        console.error('Channels grid element not found');
        return;
    }

    let channelsHTML = '';
    let channelCount = 0;

    channels.forEach((channel, index) => {
        if (channel.url && channel.name) {
            const safeChannel = {
                name: channel.name,
                url: channel.url,
                category: channel.category,
                fallbackUrls: channel.fallbackUrls || []
            };
            
            // Escape channel name for HTML
            const escapedChannel = JSON.stringify(safeChannel)
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            
            channelsHTML += `
                <div class="channel-card" 
                     data-category="${channel.category}" 
                     onclick="window.iptvPlayer.playChannel(${escapedChannel})"
                     onkeydown="if(event.key === 'Enter' || event.key === ' ') { window.iptvPlayer.playChannel(${escapedChannel}); event.preventDefault(); }"
                     tabindex="0"
                     role="button"
                     aria-label="Play ${channel.name} channel">
                    <div class="channel-logo" aria-hidden="true">
                        ${channel.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div class="channel-name">${channel.name}</div>
                    <div class="channel-category">${channel.category}</div>
                </div>
            `;
            channelCount++;
        }
    });

    channelsGrid.innerHTML = channelsHTML;
    
    // Update channels count
    const countElement = document.getElementById('channelsCount');
    if (countElement) {
        countElement.textContent = `${channelCount} চ্যানেল পাওয়া গেছে`;
    }

    // Update category buttons with counts
    const categories = ['Bangla', 'Sports', 'Movies', 'News', 'Kids'];
    categories.forEach(category => {
        const count = channels.filter(ch => ch.category === category).length;
        const btn = document.querySelector(`[data-category="${category}"]`);
        if (btn) {
            const categoryName = {
                'Bangla': 'বাংলা',
                'Sports': 'স্পোর্টস',
                'Movies': 'মুভিজ', 
                'News': 'নিউজ',
                'Kids': 'কিডস'
            }[category] || category;
            
            btn.textContent = `${categoryName} (${count})`;
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global player instance
    window.iptvPlayer = new IPTVPlayer();
    
    // Render channels if data is available
    if (window.channelsData && Array.isArray(window.channelsData)) {
        setTimeout(() => renderChannels(window.channelsData), 100);
    } else {
        console.error('Channels data not found or invalid');
    }
});

// Handle page unload
window.addEventListener('beforeunload', function() {
    if (window.iptvPlayer) {
        window.iptvPlayer.destroy();
    }
});
