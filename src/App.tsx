import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SurjoNavbar } from './components/SurjoNavbar';
import { SurjoHero } from './components/SurjoHero';
import { AboutSection } from './components/AboutSection';
import { PillarsSection } from './components/PillarsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BloodNetworkSection } from './components/BloodNetworkSection';
import { CommitteeSection } from './components/CommitteeSection';
import { GallerySection } from './components/GallerySection';
import { SurjoFooter } from './components/SurjoFooter';
import { MembershipModal } from './components/MembershipModal';
import { BloodDonorModal } from './components/BloodDonorModal';
import { DonationModal } from './components/DonationModal';
import { Phone, Droplet, UserPlus } from 'lucide-react';
import { SURJO_TORUN_INFO } from './data/clubData';
import AdminLayout from './admin/AdminLayout';
import LoginPage from './admin/LoginPage';
import Dashboard from './admin/Dashboard';
import CommitteePage from './admin/CommitteePage';
import DonorsPage from './admin/DonorsPage';
import ProjectsPage from './admin/ProjectsPage';
import GalleryPage from './admin/GalleryPage';
import MembershipsPage from './admin/MembershipsPage';
import BloodRequestsPage from './admin/BloodRequestsPage';
import DonationsPage from './admin/DonationsPage';
import MessagesPage from './admin/MessagesPage';

function HomePage() {
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [isBloodModalOpen, setIsBloodModalOpen] = useState(false);
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfdfb] text-[#132a1c] font-bangla selection:bg-[#063b20] selection:text-[#fef3c7]">
      {/* Top Navbar */}
      <SurjoNavbar
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenBloodModal={() => setIsBloodModalOpen(true)}
        onOpenDonationModal={() => setIsDonationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <SurjoHero
          onOpenMembership={() => setIsMembershipOpen(true)}
          onOpenBloodModal={() => setIsBloodModalOpen(true)}
          onOpenDonationModal={() => setIsDonationOpen(true)}
        />

        {/* About Section */}
        <AboutSection
          onOpenMembership={() => setIsMembershipOpen(true)}
        />

        {/* 3 Core Pillars: শিক্ষা • ঐক্য • মানবিকতা */}
        <PillarsSection
          onOpenMembership={() => setIsMembershipOpen(true)}
          onOpenBloodModal={() => setIsBloodModalOpen(true)}
        />

        {/* Ongoing and Annual Projects */}
        <ProjectsSection />

        {/* Emergency Blood Network & Search */}
        <BloodNetworkSection
          onOpenDonorRegister={() => setIsBloodModalOpen(true)}
        />

        {/* Executive Committee & Leadership */}
        <CommitteeSection />

        {/* Photo Gallery */}
        <GallerySection />
      </main>

      {/* Footer */}
      <SurjoFooter />

      {/* Modals */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
      />

      <BloodDonorModal
        isOpen={isBloodModalOpen}
        onClose={() => setIsBloodModalOpen(false)}
      />

      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />

      {/* Mobile Floating Quick Action Dock */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2.5 sm:hidden">
        <a
          href={`tel:${SURJO_TORUN_INFO.phoneTel}`}
          className="w-12 h-12 rounded-full bg-amber-400 text-[#042816] shadow-2xl flex items-center justify-center border-2 border-white"
          title="হটলাইন কল"
          aria-label="Call Hotline"
        >
          <Phone className="w-5 h-5 fill-current" />
        </a>

        <button
          onClick={() => setIsBloodModalOpen(true)}
          className="w-12 h-12 rounded-full bg-rose-600 text-white shadow-2xl flex items-center justify-center border-2 border-white"
          title="জরুরি রক্তদান"
          aria-label="Blood Donors"
        >
          <Droplet className="w-5 h-5 fill-current" />
        </button>

        <button
          onClick={() => setIsMembershipOpen(true)}
          className="w-12 h-12 rounded-full bg-[#063b20] text-amber-300 shadow-2xl flex items-center justify-center border-2 border-amber-400"
          title="সদস্য আবেদন"
          aria-label="Join Us"
        >
          <UserPlus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="committee" element={<CommitteePage />} />
          <Route path="donors" element={<DonorsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="memberships" element={<MembershipsPage />} />
          <Route path="blood-requests" element={<BloodRequestsPage />} />
          <Route path="donations" element={<DonationsPage />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
