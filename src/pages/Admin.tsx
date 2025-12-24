import { useState, useEffect } from "react";
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
  LogOut,
  Users,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface DogEntry {
  id: string;
  name: string;
  breed: string;
  age: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  gallery_urls: string[] | null;
}

const Admin = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [dogs, setDogs] = useState<DogEntry[]>([]);
  const [loadingDogs, setLoadingDogs] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [newDog, setNewDog] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (!loading && user && !isAdmin) {
      toast.error("Access denied. Admin only.");
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    const { data, error } = await supabase
      .from("dogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching dogs:", error);
    } else {
      setDogs(data || []);
    }
    setLoadingDogs(false);
  };

  const handleAddDog = async () => {
    if (!newDog.name || !newDog.breed || !newDog.age) {
      toast.error("Please fill in name, breed, and age");
      return;
    }

    const { data, error } = await supabase
      .from("dogs")
      .insert({
        name: newDog.name,
        breed: newDog.breed,
        age: newDog.age,
        description: newDog.description || null,
      })
      .select()
      .single();

    if (error) {
      toast.error("Failed to add dog: " + error.message);
    } else {
      setDogs([data, ...dogs]);
      setNewDog({ name: "", breed: "", age: "", description: "" });
      toast.success("Dog added successfully!");
    }
  };

  const handleDeleteDog = async (id: string) => {
    const { error } = await supabase.from("dogs").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete: " + error.message);
    } else {
      setDogs(dogs.filter((dog) => dog.id !== id));
      toast.success("Dog removed");
    }
  };

  const handleImageUpload = async (dogId: string, file: File) => {
    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${dogId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("dog-media")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("dog-media")
      .getPublicUrl(fileName);

    const { error: updateError } = await supabase
      .from("dogs")
      .update({ image_url: urlData.publicUrl })
      .eq("id", dogId);

    if (updateError) {
      toast.error("Failed to update dog image");
    } else {
      fetchDogs();
      toast.success("Image uploaded!");
    }
    setUploading(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || loadingDogs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

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
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.email}
              </span>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
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
            <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24 border border-border">
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

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleAddDog}
                >
                  <Plus className="w-5 h-5" />
                  Add Dog
                </Button>
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
                  className="bg-card rounded-xl p-4 shadow-soft flex items-center gap-4 border border-border"
                >
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {dog.image_url ? (
                      <img
                        src={dog.image_url}
                        alt={dog.name}
                        className="w-full h-full object-cover"
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
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(dog.id, file);
                        }}
                        disabled={uploading}
                      />
                      <Button variant="outline" size="icon" asChild>
                        <span>
                          <Upload className="w-4 h-4" />
                        </span>
                      </Button>
                    </label>
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
                <div className="text-center py-12 bg-card rounded-xl border border-border">
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