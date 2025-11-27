import { useEffect, useState } from 'react';
import { useMode } from '../context/ModeContext';

// NOTE: Using the standard public path reference for the mother image.
const MOTHER_IMAGE_SRC = '/mother.jpg'; 

export default function StoryPage() {
  const { accentColor } = useMode();
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Thematic background image for dark ambiance (Kolkata Stories theme)
  const storyBg = "https://images.pexels.com/photos/2559599/pexels-photo-2559599.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"; 
  
  // NOTE: Manually formatted 'i' (as <b>i</b>) to apply the red dot styling effect via dangerouslySetInnerHTML.
  const fullText = `Our k<b>i</b>tchen <b>i</b>s run by love, not just chefs. The '<b>I</b>' <b>i</b>n our story <b>i</b>s B<b>i</b>nd<b>i</b> Maa, the mother who cooks for us all. Every sp<b>i</b>ce, every rec<b>i</b>pe, and every flavour <b>i</b>s a memory from her hands, ensur<b>i</b>ng every d<b>i</b>sh carr<b>i</b>es the warmth of home.

In the heart of Kolkata, where trams st<b>i</b>ll rattle through narrow lanes and the aroma of street food m<b>i</b>ngles w<b>i</b>th the scent of ra<b>i</b>n-soaked earth, B<b>i</b>nd<b>i</b> Maa created someth<b>i</b>ng mag<b>i</b>cal. Her k<b>i</b>tchen became a sanctuary where trad<b>i</b>t<b>i</b>on meets <b>i</b>nnovat<b>i</b>on, where every meal tells a story of her<b>i</b>tage, love, and belong<b>i</b>ng.

From dawn t<b>i</b>ll dusk, she pours her soul <b>i</b>nto every d<b>i</b>sh, treat<b>i</b>ng each <b>i</b>ngred<b>i</b>ent w<b>i</b>th the reverence <b>i</b>t deserves. The mustard o<b>i</b>l that s<b>i</b>zzles <b>i</b>n her pan carr<b>i</b>es generat<b>i</b>ons of w<b>i</b>sdom. The sp<b>i</b>ces she gr<b>i</b>nds by hand hold secrets passed down through t<b>i</b>me. And when she serves a meal, she doesn't just feed hunger—she nour<b>i</b>shes the soul.

Th<b>i</b>s <b>i</b>s not just a restaurant or a café. Th<b>i</b>s <b>i</b>s B<b>i</b>nd<b>i</b> Maa's Raso<b>i</b>, where every guest becomes fam<b>i</b>ly, and every meal becomes a cher<b>i</b>shed memory.`;

  useEffect(() => {
    setIsVisible(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 20); // Typewriter speed

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${storyBg}')`,
          filter: 'brightness(0.3) sepia(0.3)',
        }}
      />

      <div
        className="absolute inset-0 animate-parallax"
        style={{
          background: `linear-gradient(180deg, ${accentColor}10 0%, ${accentColor}30 100%)`,
        }}
      />

      <div className="relative z-10 min-h-screen px-4 py-32">
        <div className="container mx-auto max-w-4xl">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 text-center"
              style={{ color: accentColor }}
            >
              Our Story: The Rasoi and I
            </h1>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                
                {/* 🔴 BINDI MAA IMAGE (Logo/Symbol) */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold overflow-hidden border-4"
                  style={{ borderColor: accentColor }}
                >
                  <img
                    src={MOTHER_IMAGE_SRC} // ⬅️ Corrected public path
                    alt="Bindi Maa"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: accentColor }}>
                    Bindi Maa
                  </h2>
                  <p className="text-gray-600">The Heart of Our Kitchen</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                {/* 🔴 STORY TEXT with RED 'i' EFFECT */}
                <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap font-serif">
                  <span 
                    dangerouslySetInnerHTML={{ 
                        __html: displayedText.replace(/<b>i<\/b>/g, '<span style="color: red; font-weight: bold;">i</span>') 
                    }} 
                  />
                  <span className="animate-pulse">|</span>
                </p>
              </div>

              {/* Feature Boxes */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                  >
                    ❤️
                  </div>
                  <h3 className="font-bold text-xl mb-2" style={{ color: accentColor }}>
                    Made with Love
                  </h3>
                  <p className="text-gray-600">
                    Every dish prepared with maternal care and affection
                  </p>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                  >
                    🏛️
                  </div>
                  <h3 className="font-bold text-xl mb-2" style={{ color: accentColor }}>
                    Heritage Recipes
                  </h3>
                  <p className="text-gray-600">
                    Authentic flavors passed down through generations
                  </p>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                  >
                    🏠
                  </div>
                  <h3 className="font-bold text-xl mb-2" style={{ color: accentColor }}>
                    Home Away From Home
                  </h3>
                  <p className="text-gray-600">
                    A warm embrace in every meal we serve
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}