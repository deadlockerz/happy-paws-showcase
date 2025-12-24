import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DogCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  image: string;
  description: string;
  index: number;
}

const DogCard = ({ id, name, breed, age, image, description, index }: DogCardProps) => {
  return (
    <Link to={`/dog/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer border border-border"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover overlay */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <Button variant="hero" size="sm" className="w-full">
              <Heart className="w-4 h-4" />
              Meet {name}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {name}
            </h3>
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {age}
            </span>
          </div>
          <p className="text-sm text-primary font-medium mb-2">{breed}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default DogCard;