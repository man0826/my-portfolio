import { useState, useEffect } from "react";
import { Skill } from "../types/data";

type SkillsProps = {
  skills: Skill[];
};

const Skills = ({ skills }: SkillsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <section className="pt-28 md:pt-40 pb-10 md:pb-16">
      <div className="inner-def">
        <div className="sec-container">
          <h2 className="ttl">Skills</h2>
          <div className="font-lato">
            {skills.map((skill) => (
              <div key={skill.id}>
                <p className="text-sm md:text-base mb-1">{skill.name}</p>
                <div className="relative w-full h-10 md:h-11 mb-4 md:mb-5 bg-white">
                  <div
                    className="bg-sky-700 w-0 relative h-full transition-all duration-1000 ease-in-out"
                    style={{
                      width: isOpen ? `${skill.percent}%` : "0",
                    }}
                  >
                    <span className="text-base md:text-lg text-white absolute top-2/4 left-7 -translate-y-2/4">
                      {skill.percent}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
