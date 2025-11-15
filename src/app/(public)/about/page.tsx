

import Image from "next/image";
import SocialLink from "@/components/SocialLink"; // Make sure this handles icons + links
import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="max-w py-12 px-4 md:px-16 bg-light  dark:bg-dark"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-start space-y-8">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          About Me
        </h2>

        {/* Profile Image */}
        <Image
          src="/your-image.jpg" // Replace with your image path
          alt="Shah Alom"
          width={120}
          height={120}
          className="rounded-full border-4 border-gray-300 dark:border-gray-700"
        />

        {/* Short Bio */}
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          I`m <strong>Shah Alom</strong>, a creative front-end developer who loves building
          modern, responsive user interfaces. I created this web app to document
          my journey, share what I learn, and explore new technologies through
          hands-on projects. Whether it`s writing blog posts, sharing code
          snippets, or experimenting with new tools — I`m always learning and
          building.
        </p>

        {/* Skills & Technologies */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
            Skills & Technologies
          </h3>
          <div className="flex flex-wrap gap-3 text-sm">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "TypeScript",
              "React.js",
              "Next.js",
              "Tailwind CSS",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Firebase",
              "JWT",
              "Git",
              "GitHub",
            ].map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
            Connect with Me
          </h3>
          <div className="flex gap-6 text-xl flex-wrap text-gray-700 dark:text-gray-300">
            <SocialLink />
          </div>
        </div>

        {/* Redirect to Contact Page */}
        <p className="text-md text-gray-600 dark:text-gray-400">
          Want to reach out?
          <Link 
          className="text-blue-600 dark:text-blue-400 hover:underline"
          href={"/contact"}> Visit the contact page</Link>
          to send me a message!
        </p>
      </div>
    </section>
  );
}
