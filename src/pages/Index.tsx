import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DogGallery from "@/components/DogGallery";
import BookingSection from "@/components/BookingSection";
import LocationMap from "@/components/LocationMap";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <DogGallery />
          <BookingSection />
          <LocationMap />
        </main>
        <Footer />
        <WhatsAppButton phoneNumber="919876543210" message="Hi! I'm interested in adopting a dog from Dog Farm Himachal." />
      </div>
    </>
  );
};

export default Index;