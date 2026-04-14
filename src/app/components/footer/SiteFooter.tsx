import { Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";
import footerLogo from "../../../assets/Logo-et-horizontal-blanco.svg";

const footerMenu = [
  { label: "Portada", href: "https://www.eltelegrafo.com.ec/" },
  {
    label: "Nacionales",
    href: "https://www.eltelegrafo.com.ec/nacionales",
    children: [{ label: "Locales", href: "https://www.eltelegrafo.com.ec/nacionales/locales" }],
  },
  {
    label: "Internacionales",
    href: "https://www.eltelegrafo.com.ec/internacionales",
    children: [
      {
        label: "El Telegrafo en China",
        href: "https://especiales.eltelegrafo.com.ec/china-et/",
      },
    ],
  },
  {
    label: "Deportes",
    href: "https://www.eltelegrafo.com.ec/deportes",
    children: [
      {
        label: "Fanatico Mundialista",
        href: "https://especiales.eltelegrafo.com.ec/fanaticomundialista/",
      },
    ],
  },
  { label: "Tendencias", href: "https://www.eltelegrafo.com.ec/tendencias" },
  {
    label: "Opinion",
    href: "https://www.eltelegrafo.com.ec/opinion",
    children: [{ label: "Articulistas", href: "https://www.eltelegrafo.com.ec/opinion/articulistas" }],
  },
  { label: "Especiales", href: "https://www.eltelegrafo.com.ec/especiales-et" },
];

const legalLinks = [
  {
    label: "Politica para el tratamiento de datos personales",
    href: "https://www.eltelegrafo.com.ec/politica-para-el-tratamiento-de-datos-personales",
  },
  {
    label: "Codigo deontologico",
    href: "https://www.eltelegrafo.com.ec/transparencia/codigo-deontologico",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/el_telegrafo/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/diarioeltelegrafo",
    icon: Facebook,
  },
  {
    label: "Whatsapp",
    href: "https://whatsapp.com/channel/0029VaRdwplFy72KLLL1Ua2g",
    icon: MessageCircle,
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/user/eltelegrafoec",
    icon: Youtube,
  },
];

export function SiteFooter() {
  return (
    <footer className="flex flex-col bg-black pt-12">
      <div
        className="site-footer-surface mx-auto w-full max-w-7xl"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.72)), url('/templates/caliope/assets/images/footer.jpg')",
        }}
      >
        <div className="comfortaa mx-auto flex w-full flex-wrap items-center justify-center border-b border-b-[#474546] px-2 pt-4 pb-4 font-bold text-white">
          <div className="mx-auto flex w-4/5 flex-wrap items-center justify-center text-xs lg:text-xs xl:text-sm">
            <div className="mx-auto basis-full pb-2 md:basis-2/9">
              <a href="/">
                <img src={footerLogo} alt="El Telegrafo" />
              </a>
            </div>

            <div className="flex basis-full items-center justify-center pb-2 md:basis-7/9">
              <ul className="footermenu mod-list columns-3 md:flex md:flex-row">
                {footerMenu.map((item) => (
                  <li key={item.href} className="px-1 pb-2 md:pb-0">
                    <a
                      href={item.href}
                      className="item-menu block px-1 lg:px-3 hover:text-[#a4e7ff]"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {item.label}
                    </a>
                    {item.children?.length ? (
                      <ul className="nav-child unstyled small">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              className="item-menu block px-1 lg:px-3 hover:text-[#a4e7ff]"
                              target={child.href.startsWith("http") ? "_blank" : undefined}
                              rel={child.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="afacad-flux mx-auto flex w-full flex-wrap items-center justify-center border-b-2 border-b-[#2f2d2d] px-2 pt-4 pb-4 font-light text-white">
          <div className="basis-full px-2 text-center text-sm md:basis-1/3">
            <p>
              <span>San Salvador E6-49 y Eloy Alfaro</span>
              <br />
              <strong>Contacto: </strong>
              <span>+593 98 777 7778</span>
              <br />
              <span>info@comunica.ec</span>
            </p>
          </div>
          <div className="basis-full px-2 text-center text-sm md:basis-1/3">
            <p>
              <a
                href="https://api.whatsapp.com/send/?phone=593987777778&text=Quiero+mas+informacion&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contacto
              </a>
            </p>
            <p>
              <a
                href="https://quegusto.comunica.ec/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Publicidad
              </a>
            </p>
          </div>
          <div className="basis-full px-2 text-center text-sm md:basis-1/3">
            <ul className="footerrightmenu mod-list flex flex-col">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="item-menu block text-white hover:text-[#a4e7ff]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="afacad-flux mx-auto flex w-full flex-col items-center justify-center px-2 pt-4 pb-4 font-light text-white">
          <div className="flex flex-row text-xl">
            <div className="flex items-center justify-center">Siguenos en: </div>
            <ul className="nav flex flex-row">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block px-1 py-2"
                      aria-label={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0070b2] text-white">
                        <Icon size={16} />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mx-auto flex w-full flex-row items-center justify-center">
            <div className="basis-1/15" />
            <div className="basis-13/15 text-center text-sm leading-4 text-[#6a6768]">
              &copy; 2026 COMUNICA EP.
              <br className="block md:hidden" />
              Todos los derechos reservados
            </div>
            <div className="flex basis-1/15 items-center justify-center text-end">
              <a href="#hero" className="backToTop inline-flex w-8" aria-label="Volver al inicio">
                <svg fill="#006eb3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM441 335C450.4 344.4 450.4 359.6 441 368.9C431.6 378.2 416.4 378.3 407.1 368.9L320.1 281.9L233.1 368.9C223.7 378.3 208.5 378.3 199.2 368.9C189.9 359.5 189.8 344.3 199.2 335L303 231C312.4 221.6 327.6 221.6 336.9 231L441 335z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
