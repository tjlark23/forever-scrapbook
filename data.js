// ===== YEAR DATA =====
const YEARS_DATA = {
  2013: {
    headline: "Where It All Began",
    summary: "TJ and Ashley tied the knot. Two adventurous souls deciding to take on the world together — starting in Arizona.",
    note: "the beginning of everything",
    hasPhotos: false
  },
  2014: {
    headline: "Building Our Foundation",
    summary: "Our first full year as a married couple. Learning how to be a team, figuring out life together, one day at a time.",
    note: "just us two",
    hasPhotos: false
  },
  2015: {
    headline: "A New Chapter",
    summary: "Growing together, dreaming big, and laying the groundwork for what was about to be the most life-changing year yet.",
    note: "before the kids changed everything",
    hasPhotos: false
  },
  2016: {
    headline: "Hello, Noelle",
    summary: "Our first baby arrived and turned our world upside down in the best possible way. Life got louder, messier, and infinitely more beautiful.",
    note: "nothing prepares you for this kind of love",
    hasPhotos: false
  },
  2017: {
    headline: "Learning to Be Three",
    summary: "First steps, first words, first everything. We were exhausted, overwhelmed, and completely in love with our growing family.",
    note: "sleep was optional",
    hasPhotos: false
  },
  2018: {
    headline: "Growing Pains & Growing Up",
    summary: "Toddler life in full swing. Noelle was developing her own personality — stubborn, sweet, and full of sass. Sound familiar?",
    note: "she definitely gets it from ashley",
    hasPhotos: false
  },
  2019: {
    headline: "Our Little Girl Blooms",
    summary: "Noelle at 2-3 years old — curious about everything, obsessed with princesses, and already bossing everyone around. These early months were pure magic.",
    note: "pre-charlie era... the calm before the beautiful storm",
    hasPhotos: true,
    heroPhotos: [0, 2, 5, 8, 12],
    scrapbookDesc: "January through March 2019. Noelle was 2 going on 3, and every single day was an adventure. Here's what we captured."
  },
  2020: {
    headline: "Charlie Arrives (And a Pandemic)",
    summary: "Our boy was born right as the world shut down. A global pandemic couldn't stop the joy of welcoming Charlie into the family. Crazy timing, perfect kid.",
    note: "quarantine with a newborn... we survived",
    hasPhotos: false
  },
  2021: {
    headline: "Finding Our Rhythm",
    summary: "Two kids. Still a pandemic. But we found our groove. Noelle became a big sister. Charlie started walking. We started sleeping again (mostly).",
    note: "family of four, figured out",
    hasPhotos: false
  },
  2022: {
    headline: "Big Moves, Big Changes",
    summary: "New adventures, new milestones. The kids were growing fast and we were building something special in Liberty Hill.",
    note: "texas felt like home",
    hasPhotos: false
  },
  2023: {
    headline: "Settling Into Our Story",
    summary: "School days, soccer games, and Saturday mornings. Life found its rhythm and we leaned into it hard.",
    note: "the good stuff is in the ordinary",
    hasPhotos: false
  },
  2024: {
    headline: "Full Speed Ahead",
    summary: "Noelle in full creative mode. Charlie finding his confidence. TJ building a media empire. Ashley holding it all together like a champion.",
    note: "we don't slow down",
    hasPhotos: false
  },
  2025: {
    headline: "Leveling Up",
    summary: "Everything accelerating. The kids are becoming actual people with actual opinions (so many opinions). The Larkin machine is in full motion.",
    note: "buckle up",
    hasPhotos: false
  },
  2026: {
    headline: "Right Now — Our Best Chapter",
    summary: "Soccer season, snow days, roller skating, Valentine's Day, Mardi Gras, and everything in between. Noelle is 9, Charlie is 6, and life is full.",
    note: "you're looking at our life, right now",
    hasPhotos: true,
    heroPhotos: [0, 3, 6, 10, 14],
    scrapbookDesc: "January and February 2026. Soccer games and snow days. Roller skating and Valentine's dances. This is us, right now."
  }
};

// Corkboard uses 6 photos from the most recent year with photos
const CORKBOARD_YEAR = '2026';
const CORKBOARD_INDICES = [0, 3, 5, 8, 12, 16];
const CORKBOARD_PINS = ['pin-red', 'pin-blue', 'pin-green', 'pin-yellow', 'pin-red', 'pin-blue'];
const CORKBOARD_ROTATIONS = [-3, 2, -1, 4, -2, 1];

// Video Drive URLs
function getDrivePlayerUrl(driveId) {
  return `https://drive.google.com/file/d/${driveId}/view`;
}
