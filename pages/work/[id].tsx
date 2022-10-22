import { NextPage } from "next";
import { useState, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/layout";
import { getData } from "../../lib/getData";
import { Work } from "../../types/data";
import { getImagesData } from "../../lib/storage";

type WorkProps = {
  work: Work;
  worksLen: number;
};

const Work: NextPage<WorkProps> = ({ work }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUrlExists, setIsUrlExists] = useState<boolean>(true);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Layout title={work.title}>
      <section className="pt-24 md:pt-36 pb-20 md:pb-28">
        <div className="inner-def">
          <div className="sec-container">
            <div
              className="opacity-0 translate-y-5 transition-all duration-700 delay-1000"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="mb-16 md:mb-24 flex items-baseline">
                <h2 className="text-2xl md:text-4xl leading-snug tracking-[.075em]">
                  {work.title}
                </h2>
                <p className="text-sm md:text-lg font-light font-lato relative ml-4 md:ml-5 pl-4 md:pl-5 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:w-px before:h-4 md:before:h-5 before:bg-black">
                  {work.category}
                </p>
              </div>
              {work.images?.display && (
                <div className="mb-10 md:mb-12">
                  <div className="image-wrap">
                    <Image
                      className="image"
                      src={work.images.display}
                      unoptimized={true}
                      alt="display"
                      layout="fill"
                      objectFit="contain"
                      placeholder="blur"
                      blurDataURL="/images/placeholder_display.png"
                    />
                  </div>
                </div>
              )}
              <div className="mb-5">
                <p className="leading-relaxed">{work.content}</p>
              </div>
              <Link href={work.url}>
                <a
                  className="pb-0.5 font-light font-lato break-all transition-all duration-200 border-b-[0.5px] border-solid border-black"
                  target="_blank"
                >
                  {work.url}
                </a>
              </Link>
              {work.github && (
                <dl className="md:flex mt-4 font-light font-lato">
                  <dt className="min-w-[70px]">
                    GitHub<span className="hidden md:inline-block">:</span>
                  </dt>
                  <dd>
                    <Link href={work.github}>
                      <a
                        className="pb-0.5 font-light font-lato break-all transition-all duration-200 border-b-[0.5px] border-solid border-black"
                        target="_blank"
                      >
                        {work.github}
                      </a>
                    </Link>
                  </dd>
                </dl>
              )}
            </div>
            {isUrlExists && work.images?.screenshot && (
              <div className="max-w-[800px] w-full mt-24 md:mt-28 ¥ mx-auto px-[6vw] md:px-0">
                <div className="image-wrap">
                  <Image
                    className="image"
                    src={work.images.screenshot}
                    unoptimized={true}
                    alt="screenshot"
                    layout="fill"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL="/images/placeholder_screenshot.png"
                    onError={() => {
                      setIsUrlExists(false);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const works = await getData<Work>("works");
  const paths = works.map((work: Work) => {
    return {
      params: {
        id: work.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id?.toString();
  const worksData = await getData<Work>("works");
  const works = await getImagesData(worksData);
  const work = works.find((work) => work.id === id);

  if (!work) {
    throw new Error("work is null");
  }

  return {
    props: {
      work,
    },
  };
};

export default Work;
