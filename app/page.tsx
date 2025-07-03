import GpaCalculator from "@/components/GpaCalculator";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-black/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white sm:text-4xl">
                        Aap Kitna Paani Mai Ho Calculator
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Find the minimum GPA needed in your future semesters.
                    </p>
                </div>
                <GpaCalculator />
            </div>
            <footer className="text-center mt-8 text-gray-500 text-sm">
                <p>Built with tears.</p>
                <p>
                    <Link href={"https://github.com/psycoxer"}>https://github.com/psycoxer</Link>
                </p>
            </footer>
        </main>
    );
}
