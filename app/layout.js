import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { dbConnect } from "@/services/mongo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Eventia",
    description: "Events and conferences in one place",
};

export default async function RootLayout({ children }) {
    await dbConnect();
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <main className="py-8">{children}</main>
            </body>
        </html>
    );
}
