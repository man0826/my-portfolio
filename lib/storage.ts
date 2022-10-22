import admin from "./server";
import { Work } from "../types/data";

const getImageURL = async (dirName: string, imageName: string) => {
  const bucket = admin.storage().bucket();

  try {
    const url: string[] = await bucket
      .file(`${dirName}/${imageName}.png`)
      .getSignedUrl({
        action: "read",
        expires: "12-31-3020",
      });

    return url[0];
  } catch (e) {
    console.log(e);
  }
};

export const getImagesData = async (worksData: Work[]) => {
  let works: Array<Work> = [];

  await Promise.all(
    worksData.map(async (work) => {
      const thumbnail = (await getImageURL(
        "thumbnails",
        work.imageName
      )) as string;
      const display = (await getImageURL("display", work.imageName)) as string;
      const screenshot = (await getImageURL(
        "screenshot",
        work.imageName
      )) as string;
      works.push({ ...work, images: { thumbnail, display, screenshot } });
    })
  );
  return works;
};
