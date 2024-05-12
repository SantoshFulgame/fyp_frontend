import React from "react";
import { Link } from "react-router-dom";
import creator1 from "../assest/santosh_fulgame.jpg";
import creator2 from "../assest/aditi_gholap.jpg";
import creator3 from "../assest/Hritu_Chittal.jpg";
import creator4 from "../assest/Mrunal Raskar.jpg";
import creator5 from "../assest/Umarfarukh.jpeg";

const Portfolio = () => {
  const soloProjects = [
    {
      id: 1,
      title: "Santosh Fulgame",
      img: creator1,
      description: "FullStack Developer",
      info: "Student",
      link: "https://www.linkedin.com/in/santosh-fulgame-4b4035248?originalSubdomain=in",
      github: "https://github.com/SantoshFulgame",
    },
    {
      id: 2,
      title: "Aditi Gholap",
      img: creator2,
      description: "Frontend Developer",
      info: "Student",
      link: "/",
      github: "https://github.com/AditiGholap",
    },
    {
      id: 3,
      title: "Hritu Chittal",
      img: creator3,
      description: "Frontend Developer",
      info: "Student",
      link: "/",
      github: "linkedin.com/in/hritu-chittal-73335a238",
    },
    {
      id: 4,
      title: "Mrunal Raskar",
      img: creator4,
      description: "Backend Developer",
      info: "Student",
      link: "/",
      github: "https://www.linkedin.com/in/mrunal-raskar655503/?originalSubdomain=in",
    },
    {
      id: 5,
      title: "Umarfarukh Shaikh",
      img: creator5,
      description: "Backend Developer",
      info: "Student",
      link: "/",
      github: "https://www.linkedin.com/search/results/people/?firstName=Umarfarukh&lastName=Shaikh&origin=SEO_PSERP&sid=aFF",
    },

  ];

  return (
    <section id="portfolio" className="px-4 sm:px-0">
      <h2 className="py-6 text-center text-2xl font-bold mb-8">CREATORS</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8">
        {soloProjects.map((pro) => (
          <article
            className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md transition duration-300 hover:border-primary hover:bg-transparent hover:translate-y-[-2px] hover:shadow-lg"
            key={pro.id}
          >
            <div className="rounded-full overflow-hidden h-32 w-32 mx-auto mb-4 sm:mb-6">
              <img
                src={pro.img}
                alt={pro.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{pro.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{pro.description}</p>
              <p className="text-sm text-gray-600">{pro.info}</p>
            </div>
            <div className="flex justify-center mt-3 sm:mt-4">
              <Link
                to={pro.github}
                target="_blank"
                className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white rounded-full transition duration-300 hover:bg-green-600"
              >
                Visit Profile
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
