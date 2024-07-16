import { redirect } from "next/navigation";

export default function AuthMain() {
  redirect("/auth/signin");
}
