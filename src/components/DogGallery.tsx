import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DogCard from "./DogCard";
import { supabase } from "@/integrations/supabase/client";
import dog1 from "@/assets/dog-1.jpg";
import dog2 from "@/assets/dog-2.jpg";
import dog3 from "@/assets/dog-3.jpg";
import dog4 from "@/assets/dog-4.jpg";
import dog5 from "@/assets/dog-5.jpg";
import dog6 from "@/assets/dog-6.jpg";

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: string;
  description: string | null;
  image_url: string | null;
}

const staticDogs = [
  {
    id: "buddy",
    name: "Buddy",
    breed: "Labrador Retriever",
    age: "8 months",
    image: dog1,
    description: "A playful and energetic pup who loves to fetch and swim. Perfect for active families!",
  },
  {
    id: "luna",
    name: "Luna",
    breed: "Siberian Husky",
    age: "2 years",
    image: dog2,
    description: "A majestic beauty with striking blue eyes. Loves outdoor adventures and long walks.",
  },
  {
    id: "marcel",
    name: "Marcel",
    breed: "French Bulldog",
    age: "6 months",
    image: dog3,
    description: "An adorable cuddle buddy who loves naps and belly rubs. Great apartment companion!",
  },
  {
    id: "max",
    name: "Max",
    breed: "German Shepherd",
    age: "3 years",
    image: dog4,
    description: "Loyal and intelligent protector. Great with kids and very trainable.",
  },
  {
    id: "coco",
    name: "Coco",
    breed: "Pembroke Corgi",
    age: "1 year",
    image: dog5,
    description: "Full of personality and endless joy. Will bring smiles to everyone she meets!",
  },
  {
    id: "charlie",
    name: "Charlie",
    breed: "Beagle",
    age: "4 years",
    image: dog6,
    description: "Curious explorer with an amazing nose. Perfect hiking and trail companion.",
  },
];

const DogGallery = () => {
  const [dbDogs, setDbDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const { data } = await supabase
        .from("dogs")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) {
        setDbDogs(data);
      }
    };

    fetchDogs();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("dogs-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "dogs" },
        () => {
          fetchDogs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Combine database dogs with static dogs
  const allDogs = [
    ...dbDogs.map((dog) => ({
      id: dog.id,
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      image: dog.image_url || dog1,
      description: dog.description || "",
    })),
    ...staticDogs,
  ];

  return (
    <section id="gallery" className="py-20 md:py-32 bg-soft-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Meet Our Pups
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Available <span className="text-gradient">Dogs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each of our furry friends is waiting for a loving home. Come meet them and find your perfect match!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allDogs.map((dog, index) => (
            <DogCard key={dog.id} {...dog} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DogGallery;