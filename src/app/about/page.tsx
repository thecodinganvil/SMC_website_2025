import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 bg-black text-white">
            <section className="max-w-6xl mx-auto px-6 text-center">
                {/* Team Image */}
                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-12 jusify-center flex">
                    <Image
                        src="/image.jpg"
                        alt="IEEE SMC Team"
                        fill
                        className="rounded-xl "
                    />
                </div>
                {/* Content */}
                <h1 className="text-4xl orbitron mb-6">About Us</h1>
                <p className="exo2 max-w-3xl mx-auto text-gray-300 leading-relaxed text-lg">
                   We are the official IEEE Systems, Man, and Cybernetics Society Student Branch Chapter of Muffakham Jah College of Engineering and Technology.
                   Our mission is to support the community by creating a platform where ideas can be shared for breakthroughs in the swiftly evolving research domains.
                   We aim to expand and explore the world of Artificial Intelligence, Machine Learning, and Data Science, moving forward as a team.
                   We organize workshops, webinars, and hackathons to foster learning and innovation among students and professionals alike.
                   Join us to be a part of this exciting journey towards technological advancement and community building.
                </p>
                {/* Contact Information */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mt-12 max-w-2xl mx-auto">
                    <h2 className="text-2xl orbitron mb-4">Contact Us</h2>
                    <p className="exo2 text-gray-300 mb-2">Nameera Nausheen Chair:+91 81251 34015</p>
                    <p className="exo2 text-gray-300 mb-2">Saad Riyan Vice Chair:+91 81795 70242</p>
                    <h2 className="text-2xl orbitron mb-3">Follow Us</h2>
                    <div className="flex justify-center gap-6">
                        <a href="https://www.instagram.com/ieeesmcmjcet?igsh=MXA3Z2thYXpvcXhlaA==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
                         <FaInstagram /></a>
                        <a href="https://www.linkedin.com/company/ieeesmcmjcet/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                         <FaLinkedin /></a>
                         </div>
                </div>
            </section>
        </main>
);
}