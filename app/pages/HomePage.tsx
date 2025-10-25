'use client';

import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import CategoryGrid from '../components/Home/CategoryGrid';
import SpecialOffers from '../components/Home/SpecialOffers';
import ReadyInMinutes from '../components/Home/ReadyInMinutes';
import TextSlider from '../components/Home/TextSlider';
import RegionalSpecials from '../components/Home/RegionalSpecials'; // now hooked to API
import ReferralBanner from '../components/Home/ReferralBanner';
import FeaturedFeed from '../components/Home/FeaturedFeed';

export default function HomePage() {
  return (
    <div className="pb-24 space-y-6">
      <HeroBanner />
      <CategoryGrid />
      <SpecialOffers />

      {/* Mobile-only sections */}
      <div className="md:hidden">
        <ReadyInMinutes />
      </div>
      <div className="md:hidden">
        <TextSlider />
      </div>

      {/* ✅ Updated RegionalSpecials (Explore Our Special Picks) */}
      <div className="md:hidden">
        <RegionalSpecials />
      </div>

      <div className="md:hidden">
        <ReferralBanner />
      </div>
      <div className="md:hidden">
        <FeaturedFeed />
      </div>
    </div>
  );
}



// 'use client'

// import React from 'react';
// import HeroBanner from '../components/Home/HeroBanner';
// import CategoryGrid from '../components/Home/CategoryGrid';
// import SpecialOffers from '../components/Home/SpecialOffers';

// export default function HomePage() {
//   return (
//     <div className="pb-20 md:pb-0">
//       <HeroBanner />
//       <CategoryGrid />
//       <SpecialOffers />
//     </div>
//   );
// }

// 'use client'

// import React from 'react';
// import HeroBanner from '../components/Home/HeroBanner';
// import CategoryGrid from '../components/Home/CategoryGrid';
// import SpecialOffers from '../components/Home/SpecialOffers';
// import ReadyInMinutes from '../components/Home/ReadyInMinutes';
// import TextSlider from '../components/Home/TextSlider';
// import RegionalSpecials from '../components/Home/RegionalSpecials';
// import ReferralBanner from '../components/Home/ReferralBanner';
// import FeaturedFeed from '../components/Home/FeaturedFeed';

// export default function HomePage() {
//   return (
//     <div className="pb-24 space-y-6">
//       <HeroBanner />
//       <CategoryGrid />
//       <SpecialOffers />

//       <div className="md:hidden">
//          <ReadyInMinutes />
//       </div>
//       <div className="md:hidden">
//          <TextSlider />
//       </div>
//       <div className="md:hidden">
//          <RegionalSpecials />
//       </div>
//       <div className="md:hidden">     
//          <ReferralBanner />
//       </div>
//       <div className="md:hidden">  
//          <FeaturedFeed />
//       </div>
     
//     </div>
//   );
// }
