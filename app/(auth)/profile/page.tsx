
import { redirect } from "next/navigation";

export default function ProfilePage() {
  redirect("/chat?view=settings&section=profile");
}
