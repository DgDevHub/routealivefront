import style from "@/components/Footer/Footer.module.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={`bg-green-700 text-white py-6 px-4 mt-10 ${style.footer}`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="font-bold text-lg">RouteAlive</p>
          <p className="text-sm text-gray-100 font-medium">
            Desenvolvido com 💚 por quem viveu as estradas do Brasil.
          </p>
          <p className="text-xs text-gray-200 mt-1">© {new Date().getFullYear()} RouteAlive API. Todos os direitos reservados.</p>
        </div>

        <div className="flex gap-5 text-white text-xl">
          <a
            href="https://github.com/DgDevHub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-950 transition text-3xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/seulinkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-950 transition text-3xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:seuemail@email.com"
            className="hover:text-emerald-950 transition text-3xl"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
