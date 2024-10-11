import { createMedia } from "@artsy/fresnel";

const AppMedia = createMedia({
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
  },
});

export const mediaStyles = AppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = AppMedia;
