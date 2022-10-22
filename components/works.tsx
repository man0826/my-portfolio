import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Work } from "../types/data";

type WorksProps = {
  works: Work[];
};

const Works = ({ works }: WorksProps) => {
  const [category, setCategory] = useState<string>("All");

  const selectedWorks = () => {
    if (category === "All") {
      return works;
    }
    return works.filter((work: Work) => work.category === category);
  };

  const worksList = selectedWorks().map((work: Work) => (
    <div key={work.id}>
      <Link href={`/work/${work.id}`}>
        <a className="group relative block w-full h-full before:w-full before:h-full before:bg-black before:mix-blend-multiply before:opacity-0 hover:before:opacity-70 before:transition-all before:duration-300 before:absolute before:top-0 before:left-0 before:z-10">
          <div className="image-wrap">
            <Image
              className="image !border !border-solid !border-gray-200"
              src={
                work.images?.thumbnail
                  ? work.images.thumbnail
                  : "/images/placeholder_thumbnail.png"
              }
              unoptimized={true}
              alt="display"
              layout="fill"
              objectFit="contain"
              placeholder="blur"
              blurDataURL="/images/placeholder_thumbnail.png"
            />
          </div>
          <span className="text-white text-sm tracking-wider text-center whitespace-pre-wrap px-1 absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100">
            {work.title}
          </span>
        </a>
      </Link>
    </div>
  ));

  return (
    <section className="pt-16 md:pt-24 pb-16 md:pb-36">
      <div className="inner-def">
        <div className="sec-container">
          <h2 className="ttl">Works</h2>
          <div className="relative flex justify-between mx-auto mb-16 md:mb-20 w-64 md:w-72">
            <span
              onClick={() => setCategory("All")}
              className={`${category === "All" ? "opacity-100" : ""} tab`}
            >
              All
            </span>
            <span
              onClick={() => setCategory("Web")}
              className={`${category === "Web" ? "opacity-100" : ""} tab`}
            >
              Web
            </span>
            <span
              onClick={() => setCategory("App")}
              className={`${category === "App" ? "opacity-100" : ""} tab`}
            >
              App
            </span>
            <div
              className={`${
                category == "Web"
                  ? "left-1/3"
                  : category == "App"
                  ? "left-2/3"
                  : "left-0"
              } w-1/5 h-0.5 bg-slate-800 absolute ml-[7%] top-8 md:top-10 transition-all duration-200`}
            ></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] md:gap-x-[4vw] lg:gap-x-10 gap-y-[9vw] sm:gap-y-[5vw] lg:gap-y-10">
            {worksList}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
