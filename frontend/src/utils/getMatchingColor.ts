export const getMatchingColor = (title: string) => {
  const platforms = [
    {
      title: "GitHub",
      color: "#040404",
    },
    {
      title: "Frontend Mentor",
      color: "#ffffff",
    },
    {
      title: "Twitter",
      color: "#8CDCFC",
    },
    {
      title: "LinkedIn",
      color: "#0680FA",
    },
    {
      title: "YouTube",
      color: "#FF3939",
    },
    {
      title: "Facebook",
      color: "#143C9C",
    },
    {
      title: "Twitch",
      color: "#FB04FB",
    },
    {
      title: "Dev.to",
      color: "#333333",
    },
    {
      title: "Codewars",
      colr: "#C0449D",
    },
    {
      title: "freeCodeCamp",
      color: "#442464",
    },
    {
      title: "GitLab",
      color: "#FC5C04",
    },
    {
      title: "Hashnode",
      color: "#0437DC",
    },
    {
      title: "Stack Overflow",
      color: "#F78B12",
    },
  ];
  return platforms.find((platform) => platform.title === title)?.color;
};
