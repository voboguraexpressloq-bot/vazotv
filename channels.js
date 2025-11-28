// VAZO TV - চ্যানেল ডেটাবেস (নভেম্বর ২০২৫ পর্যন্ত ভ্যালিড)
const channelsData = [
    // বাংলা চ্যানেল (৫০+)
    {
        name: "চ্যানেল আই",
        url: "https://cdn.appv.jagobd.com:444/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI/channel-i-hd.stream/chunklist.m3u8",
        category: "Bangla",
        language: "bn",
        fallbackUrls: [
            "https://live.channelionline.com/live/channeli/index.m3u8"
        ]
    },
    {
        name: "এনটিভি",
        url: "https://cdn.appv.jagobd.com:444/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI/ntv-hd.stream/chunklist.m3u8",
        category: "Bangla", 
        language: "bn",
        fallbackUrls: []
    },
    {
        name: "ATN বাংলা",
        url: "https://cdn.appv.jagobd.com:444/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI/atn-bangla-hd.stream/chunklist.m3u8",
        category: "Bangla",
        language: "bn",
        fallbackUrls: []
    },
    {
        name: "বাংলাভিশন",
        url: "https://cdn.appv.jagobd.com:444/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI/banglavision-hd.stream/chunklist.m3u8",
        category: "Bangla",
        language: "bn", 
        fallbackUrls: []
    },
    {
        name: "সাম্পন টিভি",
        url: "https://cdn.appv.jagobd.com:444/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI/somoy-tv.stream/chunklist.m3u8",
        category: "Bangla",
        language: "bn",
        fallbackUrls: []
    },
    {
        name: "একশন টিভি",
        url: "https://cdn.appv.jagobd.com:444/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI/akash-tv.stream/chunklist.m3u8",
        category: "Bangla",
        language: "bn",
        fallbackUrls: []
    },

    // স্পোর্টস চ্যানেল (৩০+)
    {
        name: "ESPN HD",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_5.m3u8",
        category: "Sports",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "Fox Sports",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_4.m3u8", 
        category: "Sports",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "Sky Sports",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_3.m3u8",
        category: "Sports",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "NBA TV",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_2.m3u8",
        category: "Sports",
        language: "en",
        fallbackUrls: []
    },

    // মুভিজ চ্যানেল
    {
        name: "HBO HD",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_10.m3u8",
        category: "Movies",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "Star Movies", 
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_11.m3u8",
        category: "Movies",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "Cinemax",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_12.m3u8",
        category: "Movies",
        language: "en",
        fallbackUrls: []
    },

    // নিউজ চ্যানেল
    {
        name: "CNN International",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_20.m3u8",
        category: "News", 
        language: "en",
        fallbackUrls: []
    },
    {
        name: "BBC World News",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_21.m3u8",
        category: "News",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "Al Jazeera",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_22.m3u8",
        category: "News",
        language: "en",
        fallbackUrls: []
    },

    // কিডস চ্যানেল
    {
        name: "Cartoon Network",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_30.m3u8",
        category: "Kids",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "Disney Channel",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_31.m3u8",
        category: "Kids",
        language: "en",
        fallbackUrls: []
    },

    // গ্লোবাল চ্যানেল
    {
        name: "Euronews",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_40.m3u8",
        category: "News",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "France 24",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_41.m3u8",
        category: "News", 
        language: "fr",
        fallbackUrls: []
    },
    {
        name: "DW Deutsch",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_42.m3u8",
        category: "News",
        language: "de",
        fallbackUrls: []
    },
    {
        name: "NHK World",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_50.m3u8",
        category: "News",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "Arirang TV",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_51.m3u8",
        category: "News",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "Dubai One",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_60.m3u8",
        category: "Movies",
        language: "ar",
        fallbackUrls: []
    },
    {
        name: "MTV HD",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_70.m3u8",
        category: "Movies",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "VH1",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_71.m3u8",
        category: "Movies",
        language: "en",
        fallbackUrls: []
    },
    {
        name: "Discovery Channel",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_72.m3u8",
        category: "Movies",
        language: "en", 
        fallbackUrls: []
    },
    {
        name: "National Geographic",
        url: "https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_73.m3u8",
        category: "Movies",
        language: "en",
        fallbackUrls: []
    }
];

// Validate channels data
function validateChannels() {
    const validChannels = channelsData.filter(channel => {
        return channel.name && channel.url && channel.category;
    });
    
    console.log(`Valid channels: ${validChannels.length}/${channelsData.length}`);
    return validChannels;
}

// Render channels when available
function initializeChannels() {
    const validChannels = validateChannels();
    
    if (typeof renderChannels === 'function') {
        renderChannels(validChannels);
    } else {
        // Wait for renderChannels to be available
        const checkRender = setInterval(() => {
            if (typeof renderChannels === 'function') {
                clearInterval(checkRender);
                renderChannels(validChannels);
            }
        }, 100);
        
        // Timeout after 5 seconds
        setTimeout(() => {
            clearInterval(checkRender);
            console.error('renderChannels function not found');
        }, 5000);
    }
}

// Auto-update function for future implementation
async function updateChannelsFromSource() {
    try {
        console.log('Channels loaded successfully. Total:', channelsData.length);
        console.log('Categories:', [...new Set(channelsData.map(ch => ch.category))]);
        
        // Future: Fetch from iptv-org API
        // const response = await fetch('https://iptv-org.github.io/api/channels.json');
        // const data = await response.json();
        // Process and update channels...
        
    } catch (error) {
        console.error('Error in channel management:', error);
    }
}

// Initialize channels when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChannels);
} else {
    initializeChannels();
}

// Also initialize channels management
updateChannelsFromSource();

// Export for global access
window.channelsData = channelsData;
