import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";


const SocialLink = () => {
    return (
        <>
             <a
                          href="#"
                          aria-label="Facebook"
                          className="hover:text-color-secondary flex items-center gap-2"
                        >
                          <FaFacebook className="text-blue-400" /> Facebook
                        </a>
                        <a
                          href="#"
                          aria-label="GitHub"
                          className="hover:text-color-secondary flex items-center gap-2"
                        >
                          <FaGithub className="text-white" />
                          GitHub
                        </a>
                        <a
                          href="#"
                          aria-label="YouTube"
                          className="hover:text-color-secondary flex items-center gap-2"
                        >
                          <FaYoutube className="text-red-500" />
                          YouTube
                        </a>
                        <a
                          href="#"
                          aria-label="LinkedIn"
                          className="hover:text-color-secondary flex items-center gap-2"
                        >
                          <FaLinkedin className="text-blue-400" /> LinkedIn
                        </a>
        </>
    );
};

export default SocialLink;