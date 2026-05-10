import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatCounter = ({ end, label, duration = 2, prefix = '', suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    if (inView) {
      window.requestAnimationFrame(step);
    }
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="bg-card dark:bg-darkCard rounded-3xl p-8 border border-borderLight dark:border-borderDark shadow-premium text-center flex flex-col justify-center min-h-[160px]">
      <h3 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </h3>
      <p className="text-xs font-bold tracking-widest uppercase text-textSecondary dark:text-gray-400">{label}</p>
    </div>
  );
};

const About = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const teamMembers = [
    { name: 'Aditya Verma', role: 'Founder & CEO', initials: 'AV' },
    { name: 'Sneha Kapoor', role: 'Head of Experiences', initials: 'SK' },
    { name: 'Imran Khan', role: 'Fleet Director', initials: 'IK' },
    { name: 'Meera Joshi', role: 'Customer Care', initials: 'MJ' }
  ];

  return (
    <div className="bg-background dark:bg-darkBackground min-h-screen">
      
      {/* Hero / Our Story */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-background dark:bg-[#0F172A]">
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
            alt="Mountains" 
            className="w-full h-full object-cover"
          />
          {/* Smooth Bottom Fade Only to eliminate separation line */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background dark:from-darkBackground to-transparent pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">OUR STORY</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-textPrimary dark:text-white leading-tight mb-8">
              Crafting <span className="text-accent italic">unforgettable</span> journeys
            </h1>
            <p className="text-lg text-textSecondary dark:text-gray-300 leading-relaxed font-medium">
              Starline Travel began in 2018 with a single Innova and a simple promise — make every drive feel premium. Today we run curated tours across India and Nepal, with a fleet of 80+ vehicles and a team that obsesses over the small details.
            </p>
          </motion.div>

          {/* Stat Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            <StatCounter end={12000} label="Happy Customers" />
            <StatCounter end={4500} label="Trips Completed" />
            <StatCounter end={80} label="Premium Vehicles" />
            <StatCounter end={120} label="Destinations" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card dark:bg-darkCard rounded-3xl p-10 lg:p-14 border border-borderLight dark:border-borderDark shadow-premium"
          >
            <div className="flex items-center space-x-2 text-accent mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/></svg>
              <span className="text-[10px] font-bold tracking-widest uppercase">OUR MISSION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Travel that feels effortless</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              We believe great travel is built on trust. Every driver is verified, every itinerary is hand-checked and every vehicle meets our quality bar. So you can focus on the moments that matter.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card dark:bg-darkCard rounded-3xl p-10 lg:p-14 border border-borderLight dark:border-borderDark shadow-premium"
          >
            <div className="flex items-center space-x-2 text-accent mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span className="text-[10px] font-bold tracking-widest uppercase">OUR VISION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Be the most loved travel brand</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              To become South Asia's most trusted name in luxury travel — known for warmth, reliability and an exceptional taste in destinations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24 md:py-32 bg-backgroundSoft dark:bg-darkSecondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">TEAM</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-textPrimary dark:text-white">
              Meet the people <span className="text-accent italic">behind</span> your trip
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card dark:bg-darkCard rounded-3xl p-8 border border-borderLight dark:border-borderDark shadow-premium text-center flex flex-col items-center group hover:-translate-y-2 transition-transform"
              >
                <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mb-6 shadow-xl shadow-accent/20 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-serif font-bold text-darkBackground">{member.initials}</span>
                </div>
                <h3 className="text-xl font-bold text-textPrimary dark:text-white mb-1">{member.name}</h3>
                <p className="text-sm text-textSecondary dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;