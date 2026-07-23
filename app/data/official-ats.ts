export type GreenhouseBoard = {
  company: string;
  board: string;
};

// Official public boards for companies in Scouter's priority universe.
// Community-maintained feeds supplement companies without a public board API.
export const greenhouseBoards: GreenhouseBoard[] = [
  { company: "Airbnb", board: "airbnb" },
  { company: "Asana", board: "asana" },
  { company: "Cloudflare", board: "cloudflare" },
  { company: "Datadog", board: "datadog" },
  { company: "Discord", board: "discord" },
  { company: "Figma", board: "figma" },
  { company: "Lyft", board: "lyft" },
  { company: "MongoDB", board: "mongodb" },
  { company: "Reddit", board: "reddit" },
  { company: "Roblox", board: "roblox" },
  { company: "Samsara", board: "samsara" },
  { company: "Stripe", board: "stripe" },
  { company: "Waymo", board: "waymo" },
];
