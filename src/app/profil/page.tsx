import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileMain from "@/components/Profile/ProfileMain";

export const metadata = {
  title: "Profil | Lab. Teknik Sipil Unsoed",
};

export default function Profile () {

  return (
    <main>
      <ProfileHeader />
      <ProfileMain />      
    </main>
  );
};
