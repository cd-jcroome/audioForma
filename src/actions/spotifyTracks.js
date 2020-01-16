import SpotifyWebApi from "spotify-web-api-js";

export const getTracks = async creds => {
  const token = creds;
  const newTracks = [];
  const newAudioFeatures = [];
  let spotify = new SpotifyWebApi();
  spotify.setAccessToken(token);
  try {
    console.log(creds);
    const limit = 50;
    var offset = 0;
    var total = Infinity;
    while (offset < total) {
      const data = await spotify.getMySavedTracks({
        limit: limit,
        offset: offset
      });
      total = data["total"];
      for (let track of data["items"]) {
        newTracks.push(track["track"]);
      }

      await spotify
        .getMySavedTracks({
          limit: limit,
          offset: offset
        })
        .then(data => {
          return data["items"].map(t => {
            return t["track"]["id"];
          });
        })
        .then(trackIds => {
          return spotify.getAudioFeaturesForTracks(trackIds);
        })
        .then(afData => {
          for (let af of afData["audio_features"]) {
            newAudioFeatures.push(af);
          }
        });
      offset += 50;
    }

    const merge = (arr1, arr2) => {
      const temp = [];

      arr1.forEach(x => {
        arr2.forEach(y => {
          if (x.id === y.id) {
            temp.push({ ...x, ...y });
          }
        });
      });

      return temp;
    };

    const trackData = merge(newTracks, newAudioFeatures);

    return trackData;
  } catch (error) {
    console.log(error);
  }
};
