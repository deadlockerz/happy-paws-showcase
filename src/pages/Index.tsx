import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DogGallery from "@/components/DogGallery";
import BookingSection from "@/components/BookingSection";
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
        </main>
        <Footer />
        <WhatsAppButton phoneNumber="1234567890" message="Hi! I'm interested in adopting a dog from PawPals." />
      </div>
    </>
  );
};

export default Index;
