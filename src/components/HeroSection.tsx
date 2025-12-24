import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-dog.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Beautiful dog at Dog Farm Himachal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary/30">
              Welcome to Dog Farm Himachal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            Find Your Perfect
            <br />
            <span className="text-gradient">Furry Companion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-foreground/80 mb-10 max-w-xl mx-auto"
          >
            Discover our adorable dogs in the beautiful hills of Himachal Pradesh. 
            Book a visit today and meet your new best friend.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#gallery">
              <Button variant="hero" size="xl">
                <Heart className="w-5 h-5" />
                View Our Dogs
              </Button>
            </a>
            <a href="#booking">
              <Button
                variant="outline"
                size="xl"
                className="border-foreground/30 text-foreground hover:bg-foreground/10 backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5" />
                Book a Visit
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-foreground/50 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;