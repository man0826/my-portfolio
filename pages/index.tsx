import type { NextPage } from "next";
import Layout from "../components/layout";
import Skills from "../components/skills";
import Works from "../components/works";
import { GetStaticProps } from "next";
import { getData } from "../lib/getData";
import { Work, Skill } from "../types/data";
import { getImagesData } from "../lib/storage";

type HomeProps = {
  works: Work[];
  skills: Skill[];
};

const Home: NextPage<HomeProps> = ({ works, skills }) => {
  return (
    <Layout title="Pf">
      <Skills skills={skills} />
      <Works works={works} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const worksData = await getData<Work>("works");
  const works = await getImagesData(worksData);
  const skills = await getData<Skill>("skills");

  // const [skills, works] = await Promise.all([
  //   getData<Skill>("skills"),
  //   getImagesData(worksData),
  // ]);

  return {
    props: { works, skills },
  };
};

export default Home;
