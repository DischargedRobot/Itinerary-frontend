import { ExecutorCard } from "@/entities/Executors/ExecutorCard/ui/ExecutorCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <ExecutorCard executor={{members: ['sss','ddd','dreee','dfdg'], id: 1, isBrigade: true, department: {id: 1, name: '12'}, operations: []}}/>
    </main>
  );
}
