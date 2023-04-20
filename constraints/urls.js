// creating a new global variable
export const baseURL = "http://192.168.2.41:3000";

export const userRouteURL = baseURL + "/users";

export const loginURL = userRouteURL + "/login";

export const organizationRouteURL = baseURL + "/organizations";

export const queueRouteURL = baseURL + "/queues";

export const refreshInterval = 1000;

export const averageServiceTime = 3;

export const signUpURL = userRouteURL + "/users";

export const swapQueueUrl = queueRouteURL + "/swap";

export const messageUrl = baseURL + "/messages";

export const ratingUrl = baseURL + "/ratings";

export var midjourneyProfileImagesUrls = [
  "https://cdn.discordapp.com/attachments/997261989292282007/1097986332338438184/neilarths_time_traveller_looking_to_the_camera_flying_in_action_51dd74cb-f9d3-400d-978c-87d32defcb9c.png",
  "https://cdn.discordapp.com/attachments/997261989292282007/1097985379455479899/neilarths_closeup_of_a_worn_out_time_traveller_looking_to_the_c_3dcafb00-7667-4e76-b749-c66841228d79.png",
];

const midJourneyOrganizationsImagesUrls = [
  "https://imgs.search.brave.com/KFSZyegpnri6JihZ6gFeg1IYgN5kAztNy6BLXo0aLF4/rs:fit:1000:666:1/g:ce/aHR0cHM6Ly93d3cu/c2FuY2xlbWVudGV0/aW1lcy5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTkvMDYv/R2FsYXh5cy1FZGdl/LTE4LU1pbGxlbm5p/dW0tRmFsY29uLUlu/dGVyaW9yLmpwZw",
  "https://cdn.discordapp.com/attachments/997261989292282007/1097987886843973734/2132486977_the_detonation_of_a_hydrogen_bomb_seen_from_a_railro_85bb331a-38c7-4cab-b08a-7d4fd0a268e6.png",
];

export const midJourneyImageUrl =
  midjourneyProfileImagesUrls[
    Math.floor(Math.random() * midjourneyProfileImagesUrls.length)
  ];

export const midJourneyOrganizationImageUrl =
  midJourneyOrganizationsImagesUrls[
    Math.floor(Math.random() * midJourneyOrganizationsImagesUrls.length)
  ];

export const urlHasImage = async function isImage(url) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
    });

    if (response.status === 200) {
      const contentType = response.headers.get("content-type");
      return contentType.startsWith("image/");
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
