import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Calendar, Play, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Static dogs for fallback
import dog1 from "@/assets/dog-1.jpg";
import dog2 from "@/assets/dog-2.jpg";
import dog3 from "@/assets/dog-3.jpg";
import dog4 from "@/assets/dog-4.jpg";
import dog5 from "@/assets/dog-5.jpg";
import dog6 from "@/assets/dog-6.jpg";

const staticDogs = [
  {
    id: "buddy",
    name: "Buddy",
    breed: "Labrador Retriever",
    age: "8 months",
    image: dog1,
    description: "A playful and energetic pup who loves to fetch and swim. Perfect for active families! Buddy is well-trained and gets along great with children and other pets.",
    gallery: [dog1, dog2],
  },
  {
    id: "luna",
    name: "Luna",
    breed: "Siberian Husky",
    age: "2 years",
    image: dog2,
    description: "A majestic beauty with striking blue eyes. Loves outdoor adventures and long walks in the Himalayan trails.",
    gallery: [dog2, dog3],
  },
  {
    id: "marcel",
    name: "Marcel",
    breed: "French Bulldog",
    age: "6 months",
    image: dog3,
    description: "An adorable cuddle buddy who loves naps and belly rubs. Great apartment companion!",
    gallery: [dog3, dog4],
  },
  {
    id: "max",
    name: "Max",
    breed: "German Shepherd",
    age: "3 years",
    image: dog4,
    description: "Loyal and intelligent protector. Great with kids and very trainable. Perfect guard dog for your home.",
    gallery: [dog4, dog5],
  },
  {
    id: "coco",
    name: "Coco",
    breed: "Pembroke Corgi",
    age: "1 year",
    image: dog5,
    description: "Full of personality and endless joy. Will bring smiles to everyone she meets!",
    gallery: [dog5, dog6],
  },
  {
    id: "charlie",
    name: "Charlie",
    breed: "Beagle",
    age: "4 years",
    image: dog6,
    description: "Curious explorer with an amazing nose. Perfect hiking and trail companion in the mountains.",
    gallery: [dog6, dog1],
  },
];

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  gallery_urls: string[] | null;
}

const DogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [dog, setDog] = useState<Dog | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDog = async () => {
      // First check static dogs
      const staticDog = staticDogs.find(d => d.id === id || d.name.toLowerCase() === id?.toLowerCase());
      
      if (staticDog) {
        setDog({
          id: staticDog.id,
          name: staticDog.name,
          breed: staticDog.breed,
          age: staticDog.age,
          description: staticDog.description,
          image_url: staticDog.image,
          video_url: null,
          gallery_urls: staticDog.gallery,
        });
        setLoading(false);
        return;
      }

      // Then check database
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setDog(data);
      }
      setLoading(false);
    };

    fetchDog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!dog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Dog Not Found</h1>
          <Link to="/#gallery">
            <Button variant="hero">
              <ArrowLeft className="w-5 h-5" />
              Back to Gallery
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const gallery = dog.gallery_urls || [];
  const allImages = [dog.image_url, ...gallery].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/#gallery" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            Back to Gallery
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-card">
                <img
                  src={selectedImage || dog.image_url || dog1}
                  alt={dog.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Video Play Button */}
                {dog.video_url && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute inset-0 flex items-center justify-center bg-foreground/30 hover:bg-foreground/40 transition-colors group"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                  </button>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        (selectedImage || dog.image_url) === img
                          ? "border-primary shadow-glow"
                          : "border-transparent hover:border-primary/50"
                      }`}
                    >
                      <img src={img} alt={`${dog.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {dog.age}
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
                  {dog.name}
                </h1>
                <p className="text-xl text-primary font-medium">{dog.breed}</p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {dog.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/#booking" className="flex-1">
                  <Button variant="hero" size="lg" className="w-full">
                    <Calendar className="w-5 h-5" />
                    Book a Visit
                  </Button>
                </a>
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="w-5 h-5" />
                  Add to Favorites
                </Button>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h4 className="font-semibold text-foreground mb-1">Location</h4>
                  <p className="text-sm text-muted-foreground">Himachal Pradesh, India</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h4 className="font-semibold text-foreground mb-1">Available</h4>
                  <p className="text-sm text-primary font-medium">Ready for Adoption</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Video Modal */}
      {showVideo && dog.video_url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
          <video
            src={dog.video_url}
            controls
            autoPlay
            className="max-w-4xl w-full rounded-2xl shadow-card"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      <Footer />
      <WhatsAppButton phoneNumber="919876543210" message={`Hi! I'm interested in ${dog.name} from Dog Farm Himachal.`} />
    </div>
  );
};

export default DogDetail;