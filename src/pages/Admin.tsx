import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dog,
  Upload,
  Image,
  Video,
  Plus,
  Trash2,
  ArrowLeft,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface DogEntry {
  id: number;
  name: string;
  breed: string;
  age: string;
  description: string;
  imageUrl: string;
}

const Admin = () => {
  const [dogs, setDogs] = useState<DogEntry[]>([
    {
      id: 1,
      name: "Buddy",
      breed: "Labrador Retriever",
      age: "8 months",
      description: "A playful pup who loves to fetch!",
      imageUrl: "",
    },
  ]);

  const [newDog, setNewDog] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
  });

  const handleAddDog = () => {
    if (!newDog.name || !newDog.breed) {
      toast.error("Please fill in at least name and breed");
      return;
    }

    const dog: DogEntry = {
      id: Date.now(),
      ...newDog,
      imageUrl: "",
    };

    setDogs([...dogs, dog]);
    setNewDog({ name: "", breed: "", age: "", description: "" });
    toast.success("Dog added successfully!");
  };

  const handleDeleteDog = (id: number) => {
    setDogs(dogs.filter((dog) => dog.id !== id));
    toast.success("Dog removed");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Dog className="w-6 h-6 text-primary" />
                <span className="font-display text-xl font-semibold text-foreground">
                  Admin Panel
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add New Dog Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
              <h2 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Add New Dog
              </h2>

              <div className="space-y-4">
                <Input
                  placeholder="Dog Name"
                  value={newDog.name}
                  onChange={(e) =>
                    setNewDog({ ...newDog, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Breed"
                  value={newDog.breed}
                  onChange={(e) =>
                    setNewDog({ ...newDog, breed: e.target.value })
                  }
                />
                <Input
                  placeholder="Age (e.g., 2 years)"
                  value={newDog.age}
                  onChange={(e) =>
                    setNewDog({ ...newDog, age: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={newDog.description}
                  onChange={(e) =>
                    setNewDog({ ...newDog, description: e.target.value })
                  }
                  className="resize-none"
                />

                {/* Upload Section */}
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload image or video
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, MP4 up to 10MB
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Image className="w-4 h-4" />
                    Image
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Video className="w-4 h-4" />
                    Video
                  </Button>
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleAddDog}
                >
                  <Plus className="w-5 h-5" />
                  Add Dog
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> To enable
                  full media upload functionality, connect to Lovable Cloud for
                  database storage.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Dog List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">
              Manage Dogs ({dogs.length})
            </h2>

            <div className="space-y-4">
              {dogs.map((dog) => (
                <motion.div
                  key={dog.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card rounded-xl p-4 shadow-soft flex items-center gap-4"
                >
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    {dog.imageUrl ? (
                      <img
                        src={dog.imageUrl}
                        alt={dog.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Dog className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {dog.name}
                    </h3>
                    <p className="text-sm text-primary">{dog.breed}</p>
                    <p className="text-xs text-muted-foreground">{dog.age}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Upload className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteDog(dog.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}

              {dogs.length === 0 && (
                <div className="text-center py-12 bg-card rounded-xl">
                  <Dog className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No dogs added yet</p>
                  <p className="text-sm text-muted-foreground">
                    Use the form to add your first dog
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
