import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full space-y-4">
      <h1>Hello World</h1>
      <Button variant="outline"><Link href="/admin">Admin</Link></Button>
    </div>
  );
}
