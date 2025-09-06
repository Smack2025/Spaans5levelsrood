import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import StatsClient from "./StatsClient"

export default async function StatsPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  return <StatsClient />
}
