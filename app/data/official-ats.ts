export type GreenhouseBoard = {
  company: string;
  board: string;
};

// Official public boards for companies in Scouter's priority universe.
// Community-maintained feeds supplement companies without a public board API.
export const greenhouseBoards: GreenhouseBoard[] = [
  { company: "MetOx International", board: "metoxinternationalinc" },
  { company: "Anduril", board: "andurilindustries" },
  { company: "Databricks", board: "databricks" },
  { company: "SpaceX", board: "spacex" },
  { company: "xAI", board: "xai" },
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

export const fallBoards = [
  { company: "Nexus Engineering Group", url: "https://api.lever.co/v0/postings/nexuse-group?mode=json", provider: "lever" },
  { company: "Commonwealth Fusion Systems", url: "https://api.lever.co/v0/postings/cfsenergy?mode=json", provider: "lever" },
  { company: "Skydio", url: "https://api.ashbyhq.com/posting-api/job-board/skydio", provider: "ashby" },
  { company: "Brain Co.", url: "https://api.ashbyhq.com/posting-api/job-board/brainco", provider: "ashby" },
] as const;

export const fallWorkdayBoards = [
  { company: "GE Vernova", origin: "https://gevernova.wd5.myworkdayjobs.com", tenant: "gevernova", site: "Vernova_ExternalSite" },
  { company: "GE Aerospace", origin: "https://geaerospace.wd5.myworkdayjobs.com", tenant: "geaerospace", site: "GE_ExternalSite" },
] as const;
