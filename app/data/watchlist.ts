export type WatchCompany = {
  name: string;
  cohort: "Fortune 500" | "Target list" | "Fortune 500 + target";
  category: string;
  rank: number | null;
  website: string | null;
};

// 2026 Fortune 500 names plus the technology, AI, quant, fintech,
// robotics, healthcare, enterprise, and research targets in the product brief.
export const watchlist: WatchCompany[] = [
  {
    "name": "Amazon",
    "cohort": "Fortune 500 + target",
    "category": "Internet Services and Retailing",
    "rank": 1,
    "website": "https://amazon.com"
  },
  {
    "name": "Walmart",
    "cohort": "Fortune 500 + target",
    "category": "General Merchandisers",
    "rank": 2,
    "website": "https://walmart.com"
  },
  {
    "name": "UnitedHealth",
    "cohort": "Fortune 500",
    "category": "Health Care: Insurance and Managed Care",
    "rank": 3,
    "website": "https://unitedhealthgroup.com"
  },
  {
    "name": "Apple",
    "cohort": "Fortune 500 + target",
    "category": "Computers, Office Equipment",
    "rank": 4,
    "website": "https://apple.com"
  },
  {
    "name": "McKesson",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Health Care",
    "rank": 5,
    "website": "https://mckesson.com"
  },
  {
    "name": "Alphabet",
    "cohort": "Fortune 500",
    "category": "Internet Services and Retailing",
    "rank": 6,
    "website": "https://abc.xyz"
  },
  {
    "name": "CVS Health",
    "cohort": "Fortune 500 + target",
    "category": "Health Care: Pharmacy and Other Services",
    "rank": 7,
    "website": "https://cvshealth.com"
  },
  {
    "name": "Berkshire Hathaway",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 8,
    "website": "https://berkshirehathaway.com"
  },
  {
    "name": "Exxon Mobil",
    "cohort": "Fortune 500 + target",
    "category": "Petroleum Refining",
    "rank": 9,
    "website": "https://exxonmobil.com"
  },
  {
    "name": "Cencora",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Health Care",
    "rank": 10,
    "website": "https://cencora.com"
  },
  {
    "name": "Microsoft",
    "cohort": "Fortune 500 + target",
    "category": "Computer Software",
    "rank": 11,
    "website": "https://microsoft.com"
  },
  {
    "name": "Costco",
    "cohort": "Fortune 500 + target",
    "category": "General Merchandisers",
    "rank": 12,
    "website": "https://costco.com"
  },
  {
    "name": "Cigna",
    "cohort": "Fortune 500 + target",
    "category": "Health Care: Pharmacy and Other Services",
    "rank": 13,
    "website": "https://thecignagroup.com"
  },
  {
    "name": "Cardinal Health",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Health Care",
    "rank": 14,
    "website": "https://cardinalhealth.com"
  },
  {
    "name": "Nvidia",
    "cohort": "Fortune 500 + target",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 15,
    "website": "https://nvidia.com"
  },
  {
    "name": "Meta",
    "cohort": "Fortune 500 + target",
    "category": "Internet Services and Retailing",
    "rank": 16,
    "website": "https://meta.com"
  },
  {
    "name": "Elevance Health",
    "cohort": "Fortune 500 + target",
    "category": "Health Care: Insurance and Managed Care",
    "rank": 17,
    "website": "https://elevancehealth.com"
  },
  {
    "name": "Centene",
    "cohort": "Fortune 500",
    "category": "Health Care: Insurance and Managed Care",
    "rank": 18,
    "website": "https://centene.com"
  },
  {
    "name": "Chevron",
    "cohort": "Fortune 500 + target",
    "category": "Petroleum Refining",
    "rank": 19,
    "website": "https://chevron.com"
  },
  {
    "name": "Ford Motor",
    "cohort": "Fortune 500",
    "category": "Motor Vehicles & Parts",
    "rank": 20,
    "website": "https://ford.com"
  },
  {
    "name": "General Motors",
    "cohort": "Fortune 500 + target",
    "category": "Motor Vehicles & Parts",
    "rank": 21,
    "website": "https://gm.com"
  },
  {
    "name": "JPMorgan Chase",
    "cohort": "Fortune 500 + target",
    "category": "Commercial Banks",
    "rank": 22,
    "website": "https://jpmorganchase.com"
  },
  {
    "name": "Home Depot",
    "cohort": "Fortune 500 + target",
    "category": "Specialty Retailers: Other",
    "rank": 23,
    "website": "https://homedepot.com"
  },
  {
    "name": "Fannie Mae",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 24,
    "website": "https://fanniemae.com"
  },
  {
    "name": "Walgreens",
    "cohort": "Fortune 500",
    "category": "Food & Drug Stores",
    "rank": 25,
    "website": "https://walgreensbootsalliance.com"
  },
  {
    "name": "Kroger",
    "cohort": "Fortune 500",
    "category": "Food & Drug Stores",
    "rank": 26,
    "website": "https://thekrogerco.com"
  },
  {
    "name": "Verizon",
    "cohort": "Fortune 500 + target",
    "category": "Telecommunications",
    "rank": 27,
    "website": "https://verizon.com"
  },
  {
    "name": "Marathon Petroleum",
    "cohort": "Fortune 500",
    "category": "Petroleum Refining",
    "rank": 28,
    "website": "https://marathonpetroleum.com"
  },
  {
    "name": "StoneX",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 29,
    "website": "https://stonex.com"
  },
  {
    "name": "Phillips 66",
    "cohort": "Fortune 500",
    "category": "Petroleum Refining",
    "rank": 30,
    "website": "https://phillips66.com"
  },
  {
    "name": "Humana",
    "cohort": "Fortune 500",
    "category": "Health Care: Insurance and Managed Care",
    "rank": 31,
    "website": "https://humana.com"
  },
  {
    "name": "AT&T",
    "cohort": "Fortune 500 + target",
    "category": "Telecommunications",
    "rank": 32,
    "website": "https://att.com"
  },
  {
    "name": "Comcast",
    "cohort": "Fortune 500 + target",
    "category": "Telecommunications",
    "rank": 33,
    "website": "https://comcast.com"
  },
  {
    "name": "State Farm",
    "cohort": "Fortune 500 + target",
    "category": "Insurance: Property and Casualty (Mutual)",
    "rank": 34,
    "website": "https://statefarm.com"
  },
  {
    "name": "Valero Energy",
    "cohort": "Fortune 500",
    "category": "Petroleum Refining",
    "rank": 35,
    "website": "https://valero.com"
  },
  {
    "name": "Freddie Mac",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 36,
    "website": "https://freddiemac.com"
  },
  {
    "name": "Dell Technologies",
    "cohort": "Fortune 500",
    "category": "Computers, Office Equipment",
    "rank": 37,
    "website": "https://delltechnologies.com"
  },
  {
    "name": "Bank of America",
    "cohort": "Fortune 500 + target",
    "category": "Commercial Banks",
    "rank": 38,
    "website": "https://bankofamerica.com"
  },
  {
    "name": "Bank of New York",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 39,
    "website": "https://bny.com"
  },
  {
    "name": "Target",
    "cohort": "Fortune 500 + target",
    "category": "General Merchandisers",
    "rank": 40,
    "website": "https://target.com"
  },
  {
    "name": "Tesla",
    "cohort": "Fortune 500 + target",
    "category": "Motor Vehicles & Parts",
    "rank": 41,
    "website": "https://tesla.com"
  },
  {
    "name": "Walt Disney",
    "cohort": "Fortune 500",
    "category": "Entertainment",
    "rank": 42,
    "website": "https://thewaltdisneycompany.com"
  },
  {
    "name": "Johnson & Johnson",
    "cohort": "Fortune 500 + target",
    "category": "Pharmaceuticals",
    "rank": 43,
    "website": "https://jnj.com"
  },
  {
    "name": "PepsiCo",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 44,
    "website": "https://pepsico.com"
  },
  {
    "name": "Boeing",
    "cohort": "Fortune 500 + target",
    "category": "Aerospace & Defense",
    "rank": 45,
    "website": "https://boeing.com"
  },
  {
    "name": "UPS",
    "cohort": "Fortune 500 + target",
    "category": "Mail, Package and Freight Delivery",
    "rank": 46,
    "website": "https://ups.com"
  },
  {
    "name": "RTX",
    "cohort": "Fortune 500 + target",
    "category": "Aerospace & Defense",
    "rank": 47,
    "website": "https://rtx.com"
  },
  {
    "name": "FedEx",
    "cohort": "Fortune 500 + target",
    "category": "Mail, Package and Freight Delivery",
    "rank": 48,
    "website": "https://fedex.com"
  },
  {
    "name": "Progressive",
    "cohort": "Fortune 500 + target",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 49,
    "website": "https://progressive.com"
  },
  {
    "name": "Lowe's",
    "cohort": "Fortune 500 + target",
    "category": "Specialty Retailers: Other",
    "rank": 50,
    "website": "https://lowes.com"
  },
  {
    "name": "Energy Transfer",
    "cohort": "Fortune 500",
    "category": "Pipelines",
    "rank": 51,
    "website": "https://energytransfer.com"
  },
  {
    "name": "Citi",
    "cohort": "Fortune 500 + target",
    "category": "Commercial Banks",
    "rank": 52,
    "website": "https://citigroup.com"
  },
  {
    "name": "Procter & Gamble",
    "cohort": "Fortune 500",
    "category": "Household and Personal Products",
    "rank": 53,
    "website": "https://pginvestor.com"
  },
  {
    "name": "Wells Fargo",
    "cohort": "Fortune 500 + target",
    "category": "Commercial Banks",
    "rank": 54,
    "website": "https://wellsfargo.com"
  },
  {
    "name": "Albertsons",
    "cohort": "Fortune 500",
    "category": "Food & Drug Stores",
    "rank": 55,
    "website": "https://albertsonscompanies.com"
  },
  {
    "name": "Sysco",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Food and Grocery",
    "rank": 56,
    "website": "https://sysco.com"
  },
  {
    "name": "Archer Daniels Midland",
    "cohort": "Fortune 500",
    "category": "Food Production",
    "rank": 57,
    "website": "https://adm.com"
  },
  {
    "name": "MetLife",
    "cohort": "Fortune 500 + target",
    "category": "Insurance: Life, Health (Stock)",
    "rank": 58,
    "website": "https://metlife.com"
  },
  {
    "name": "HCA Healthcare",
    "cohort": "Fortune 500",
    "category": "Health Care: Medical Facilities",
    "rank": 59,
    "website": "https://hcahealthcare.com"
  },
  {
    "name": "Lockheed Martin",
    "cohort": "Fortune 500 + target",
    "category": "Aerospace & Defense",
    "rank": 60,
    "website": "https://lockheedmartin.com"
  },
  {
    "name": "American Express",
    "cohort": "Fortune 500 + target",
    "category": "Diversified Financials",
    "rank": 61,
    "website": "https://americanexpress.com"
  },
  {
    "name": "Morgan Stanley",
    "cohort": "Fortune 500 + target",
    "category": "Commercial Banks",
    "rank": 62,
    "website": "https://morganstanley.com"
  },
  {
    "name": "Allstate",
    "cohort": "Fortune 500 + target",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 63,
    "website": "https://allstate.com"
  },
  {
    "name": "Caterpillar",
    "cohort": "Fortune 500 + target",
    "category": "Construction and Farm Machinery",
    "rank": 64,
    "website": "https://caterpillar.com"
  },
  {
    "name": "IBM",
    "cohort": "Fortune 500 + target",
    "category": "Information Technology Services",
    "rank": 65,
    "website": "https://ibm.com"
  },
  {
    "name": "Oracle",
    "cohort": "Fortune 500 + target",
    "category": "Computer Software",
    "rank": 66,
    "website": "https://oracle.com"
  },
  {
    "name": "Eli Lilly",
    "cohort": "Fortune 500",
    "category": "Pharmaceuticals",
    "rank": 67,
    "website": "https://lilly.com"
  },
  {
    "name": "Merck",
    "cohort": "Fortune 500",
    "category": "Pharmaceuticals",
    "rank": 68,
    "website": "https://merck.com"
  },
  {
    "name": "Broadcom",
    "cohort": "Fortune 500 + target",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 69,
    "website": "https://broadcom.com"
  },
  {
    "name": "Delta Airlines",
    "cohort": "Fortune 500 + target",
    "category": "Airlines",
    "rank": 70,
    "website": "https://delta.com"
  },
  {
    "name": "Performance Food",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Food and Grocery",
    "rank": 71,
    "website": "https://pfgc.com"
  },
  {
    "name": "New York Life Insurance",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Mutual)",
    "rank": 72,
    "website": "https://newyorklife.com"
  },
  {
    "name": "Pfizer",
    "cohort": "Fortune 500 + target",
    "category": "Pharmaceuticals",
    "rank": 73,
    "website": "https://pfizer.com"
  },
  {
    "name": "TD Synnex",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Electronics and Office Equipment",
    "rank": 74,
    "website": "https://tdsynnex.com"
  },
  {
    "name": "AbbVie",
    "cohort": "Fortune 500",
    "category": "Pharmaceuticals",
    "rank": 75,
    "website": "https://abbvie.com"
  },
  {
    "name": "Prudential Financial",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Stock)",
    "rank": 76,
    "website": "https://prudential.com"
  },
  {
    "name": "TJX",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Apparel",
    "rank": 77,
    "website": "https://tjx.com"
  },
  {
    "name": "Publix Super Markets",
    "cohort": "Fortune 500",
    "category": "Food & Drug Stores",
    "rank": 78,
    "website": "https://publix.com"
  },
  {
    "name": "United Airlines",
    "cohort": "Fortune 500 + target",
    "category": "Airlines",
    "rank": 79,
    "website": "https://united.com"
  },
  {
    "name": "ConocoPhillips",
    "cohort": "Fortune 500 + target",
    "category": "Mining, Crude-Oil Production",
    "rank": 80,
    "website": "https://conocophillips.com"
  },
  {
    "name": "Nationwide",
    "cohort": "Fortune 500 + target",
    "category": "Insurance: Property and Casualty (Mutual)",
    "rank": 81,
    "website": "https://nationwide.com"
  },
  {
    "name": "Goldman Sachs",
    "cohort": "Fortune 500 + target",
    "category": "Commercial Banks",
    "rank": 82,
    "website": "https://goldmansachs.com"
  },
  {
    "name": "Cisco Systems",
    "cohort": "Fortune 500",
    "category": "Network and Other Communications Equipment",
    "rank": 83,
    "website": "https://cisco.com"
  },
  {
    "name": "HP",
    "cohort": "Fortune 500 + target",
    "category": "Computers, Office Equipment",
    "rank": 84,
    "website": "https://hp.com"
  },
  {
    "name": "Charter Communications",
    "cohort": "Fortune 500 + target",
    "category": "Telecommunications",
    "rank": 85,
    "website": "https://charter.com"
  },
  {
    "name": "American Airlines",
    "cohort": "Fortune 500 + target",
    "category": "Airlines",
    "rank": 86,
    "website": "https://aa.com"
  },
  {
    "name": "Tyson Foods",
    "cohort": "Fortune 500",
    "category": "Food Production",
    "rank": 87,
    "website": "https://tysonfoods.com"
  },
  {
    "name": "Capital One",
    "cohort": "Fortune 500 + target",
    "category": "Commercial Banks",
    "rank": 88,
    "website": "https://capitalone.com"
  },
  {
    "name": "Intel",
    "cohort": "Fortune 500 + target",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 89,
    "website": "https://intel.com"
  },
  {
    "name": "Enterprise Products Partners",
    "cohort": "Fortune 500",
    "category": "Pipelines",
    "rank": 90,
    "website": "https://enterpriseproducts.com"
  },
  {
    "name": "Ingram Micro",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Electronics and Office Equipment",
    "rank": 91,
    "website": "https://ingrammicro.com"
  },
  {
    "name": "General Dynamics",
    "cohort": "Fortune 500 + target",
    "category": "Aerospace & Defense",
    "rank": 92,
    "website": "https://gd.com"
  },
  {
    "name": "Uber",
    "cohort": "Fortune 500 + target",
    "category": "Internet Services and Retailing",
    "rank": 93,
    "website": "https://uber.com"
  },
  {
    "name": "Liberty Mutual Insurance",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 94,
    "website": "https://libertymutual.com"
  },
  {
    "name": "Travelers",
    "cohort": "Fortune 500 + target",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 95,
    "website": "https://travelers.com"
  },
  {
    "name": "USAA",
    "cohort": "Fortune 500 + target",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 96,
    "website": "https://usaa.com"
  },
  {
    "name": "Bristol-Myers Squibb",
    "cohort": "Fortune 500",
    "category": "Pharmaceuticals",
    "rank": 97,
    "website": "https://bms.com"
  },
  {
    "name": "Coca-Cola",
    "cohort": "Fortune 500",
    "category": "Beverages",
    "rank": 98,
    "website": "https://coca-colacompany.com"
  },
  {
    "name": "TIAA",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Mutual)",
    "rank": 99,
    "website": "https://tiaa.org"
  },
  {
    "name": "Nike",
    "cohort": "Fortune 500 + target",
    "category": "Apparel",
    "rank": 100,
    "website": "https://nike.com"
  },
  {
    "name": "General Electric",
    "cohort": "Fortune 500",
    "category": "Aerospace & Defense",
    "rank": 101,
    "website": "https://ge.com"
  },
  {
    "name": "Deere",
    "cohort": "Fortune 500",
    "category": "Construction and Farm Machinery",
    "rank": 102,
    "website": "https://deere.com"
  },
  {
    "name": "Molina Healthcare",
    "cohort": "Fortune 500",
    "category": "Health Care: Insurance and Managed Care",
    "rank": 103,
    "website": "https://molinahealthcare.com"
  },
  {
    "name": "Netflix",
    "cohort": "Fortune 500 + target",
    "category": "Entertainment",
    "rank": 104,
    "website": "https://netflix.com"
  },
  {
    "name": "Thermo Fisher Scientific",
    "cohort": "Fortune 500",
    "category": "Scientific, Photographic and Control Equipment",
    "rank": 105,
    "website": "https://thermofisher.com"
  },
  {
    "name": "Abbott Laboratories",
    "cohort": "Fortune 500",
    "category": "Medical Products and Equipment",
    "rank": 106,
    "website": "https://abbott.com"
  },
  {
    "name": "Qualcomm",
    "cohort": "Fortune 500 + target",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 107,
    "website": "https://qualcomm.com"
  },
  {
    "name": "Plains GP",
    "cohort": "Fortune 500",
    "category": "Pipelines",
    "rank": 108,
    "website": "https://plains.com"
  },
  {
    "name": "Mass Mutual",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Mutual)",
    "rank": 109,
    "website": "https://massmutual.com"
  },
  {
    "name": "Dollar General",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 110,
    "website": "https://dollargeneral.com"
  },
  {
    "name": "Northrop Grumman",
    "cohort": "Fortune 500 + target",
    "category": "Aerospace & Defense",
    "rank": 111,
    "website": "https://northropgrumman.com"
  },
  {
    "name": "Best Buy",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 112,
    "website": "https://bestbuy.com"
  },
  {
    "name": "Salesforce",
    "cohort": "Fortune 500 + target",
    "category": "Computer Software",
    "rank": 113,
    "website": "https://salesforce.com"
  },
  {
    "name": "Northwestern Mutual",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Mutual)",
    "rank": 114,
    "website": "https://northwesternmutual.com"
  },
  {
    "name": "Philip Morris",
    "cohort": "Fortune 500",
    "category": "Tobacco",
    "rank": 115,
    "website": "https://pmi.com"
  },
  {
    "name": "CBRE",
    "cohort": "Fortune 500",
    "category": "Real Estate",
    "rank": 116,
    "website": "https://cbre.com"
  },
  {
    "name": "Visa",
    "cohort": "Fortune 500 + target",
    "category": "Financial Data Services",
    "rank": 117,
    "website": "https://visa.com"
  },
  {
    "name": "Dow",
    "cohort": "Fortune 500",
    "category": "Chemicals",
    "rank": 118,
    "website": "https://dow.com"
  },
  {
    "name": "US Foods",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Food and Grocery",
    "rank": 119,
    "website": "https://usfoods.com"
  },
  {
    "name": "Mondelez",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 120,
    "website": "https://mondelezinternational.com"
  },
  {
    "name": "GE Vernova",
    "cohort": "Fortune 500",
    "category": "Energy",
    "rank": 121,
    "website": "https://gevernova.com"
  },
  {
    "name": "Lithia Motors",
    "cohort": "Fortune 500",
    "category": "Automotive Retailing, Services",
    "rank": 122,
    "website": "https://lithiadriveway.com"
  },
  {
    "name": "Honeywell",
    "cohort": "Fortune 500 + target",
    "category": "Industrial Machinery",
    "rank": 123,
    "website": "https://honeywell.com"
  },
  {
    "name": "Micron Technology",
    "cohort": "Fortune 500",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 124,
    "website": "https://micron.com"
  },
  {
    "name": "Warner Bros. Discovery",
    "cohort": "Fortune 500 + target",
    "category": "Entertainment",
    "rank": 125,
    "website": "https://wbd.com"
  },
  {
    "name": "Starbucks",
    "cohort": "Fortune 500 + target",
    "category": "Food Services",
    "rank": 126,
    "website": "https://starbucks.com"
  },
  {
    "name": "World Kinect",
    "cohort": "Fortune 500",
    "category": "Energy",
    "rank": 127,
    "website": "https://world-kinect.com"
  },
  {
    "name": "Amgen",
    "cohort": "Fortune 500",
    "category": "Pharmaceuticals",
    "rank": 128,
    "website": "https://amgen.com"
  },
  {
    "name": "CHS",
    "cohort": "Fortune 500",
    "category": "Food Production",
    "rank": 129,
    "website": "https://chsinc.com"
  },
  {
    "name": "Advanced Micro Devices",
    "cohort": "Fortune 500",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 130,
    "website": "https://amd.com"
  },
  {
    "name": "Coupang",
    "cohort": "Fortune 500",
    "category": "Internet Services and Retailing",
    "rank": 131,
    "website": "https://aboutcoupang.com"
  },
  {
    "name": "Hewlett Packard",
    "cohort": "Fortune 500",
    "category": "Computers, Office Equipment",
    "rank": 132,
    "website": "https://hpe.com"
  },
  {
    "name": "D.R. Horton",
    "cohort": "Fortune 500",
    "category": "Homebuilders",
    "rank": 133,
    "website": "https://drhorton.com"
  },
  {
    "name": "Lennar",
    "cohort": "Fortune 500",
    "category": "Homebuilders",
    "rank": 134,
    "website": "https://lennar.com"
  },
  {
    "name": "Cummins",
    "cohort": "Fortune 500 + target",
    "category": "Industrial Machinery",
    "rank": 135,
    "website": "https://cummins.com"
  },
  {
    "name": "Oneok",
    "cohort": "Fortune 500",
    "category": "Pipelines",
    "rank": 136,
    "website": "https://oneok.com"
  },
  {
    "name": "PayPal",
    "cohort": "Fortune 500 + target",
    "category": "Financial Data Services",
    "rank": 137,
    "website": "https://paypal.com"
  },
  {
    "name": "GuideWell Mutual",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Stock)",
    "rank": 138,
    "website": "https://guidewell.com"
  },
  {
    "name": "Mastercard",
    "cohort": "Fortune 500 + target",
    "category": "Financial Data Services",
    "rank": 139,
    "website": "https://mastercard.com"
  },
  {
    "name": "Nucor",
    "cohort": "Fortune 500",
    "category": "Metals",
    "rank": 140,
    "website": "https://nucor.com"
  },
  {
    "name": "Duke Energy",
    "cohort": "Fortune 500 + target",
    "category": "Utilities: Gas and Electric",
    "rank": 141,
    "website": "https://duke-energy.com"
  },
  {
    "name": "Apollo Global Management",
    "cohort": "Fortune 500",
    "category": "Securities",
    "rank": 142,
    "website": "https://apollo.com"
  },
  {
    "name": "Penske Automotive",
    "cohort": "Fortune 500",
    "category": "Automotive Retailing, Services",
    "rank": 143,
    "website": "https://penskeautomotive.com"
  },
  {
    "name": "United Natural Foods",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Food and Grocery",
    "rank": 144,
    "website": "https://unfi.com"
  },
  {
    "name": "Arrow Electronics",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Electronics and Office Equipment",
    "rank": 145,
    "website": "https://arrow.com"
  },
  {
    "name": "Ferguson",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 146,
    "website": "https://ferguson.com"
  },
  {
    "name": "NRG Energy",
    "cohort": "Fortune 500",
    "category": "Energy",
    "rank": 147,
    "website": "https://nrg.com"
  },
  {
    "name": "Jabil",
    "cohort": "Fortune 500",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 148,
    "website": "https://jabil.com"
  },
  {
    "name": "Southern",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 149,
    "website": "https://southerncompany.com"
  },
  {
    "name": "Gilead Sciences",
    "cohort": "Fortune 500",
    "category": "Pharmaceuticals",
    "rank": 150,
    "website": "https://gilead.com"
  },
  {
    "name": "PBF Energy",
    "cohort": "Fortune 500",
    "category": "Petroleum Refining",
    "rank": 151,
    "website": "https://pbfenergy.com"
  },
  {
    "name": "Paramount",
    "cohort": "Fortune 500 + target",
    "category": "Entertainment",
    "rank": 152,
    "website": "https://paramount.com"
  },
  {
    "name": "U.S. Bancorp",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 153,
    "website": "https://usbank.com"
  },
  {
    "name": "Quanta Services",
    "cohort": "Fortune 500",
    "category": "Engineering & Construction",
    "rank": 154,
    "website": "https://quantaservices.com"
  },
  {
    "name": "Paccar",
    "cohort": "Fortune 500",
    "category": "Motor Vehicles & Parts",
    "rank": 155,
    "website": "https://paccar.com"
  },
  {
    "name": "Applied Materials",
    "cohort": "Fortune 500 + target",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 156,
    "website": "https://appliedmaterials.com"
  },
  {
    "name": "Hartford Insurance",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 157,
    "website": "https://thehartford.com"
  },
  {
    "name": "Southwest Airlines",
    "cohort": "Fortune 500 + target",
    "category": "Airlines",
    "rank": 158,
    "website": "https://southwest.com"
  },
  {
    "name": "Baker Hughes",
    "cohort": "Fortune 500",
    "category": "Oil and Gas Equipment, Services",
    "rank": 159,
    "website": "https://bakerhughes.com"
  },
  {
    "name": "AutoNation",
    "cohort": "Fortune 500",
    "category": "Automotive Retailing, Services",
    "rank": 160,
    "website": "https://autonation.com"
  },
  {
    "name": "NextEra Energy",
    "cohort": "Fortune 500 + target",
    "category": "Utilities: Gas and Electric",
    "rank": 161,
    "website": "https://nexteraenergy.com"
  },
  {
    "name": "Marsh & McLennan",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 162,
    "website": "https://marshmclennan.com"
  },
  {
    "name": "Booking.com",
    "cohort": "Fortune 500",
    "category": "Internet Services and Retailing",
    "rank": 163,
    "website": "https://bookingholdings.com"
  },
  {
    "name": "McDonald's",
    "cohort": "Fortune 500 + target",
    "category": "Food Services",
    "rank": 164,
    "website": "https://mcdonalds.com"
  },
  {
    "name": "HF Sinclair",
    "cohort": "Fortune 500",
    "category": "Petroleum Refining",
    "rank": 165,
    "website": "https://hfsinclair.com"
  },
  {
    "name": "American International",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 166,
    "website": "https://aig.com"
  },
  {
    "name": "Marriott International",
    "cohort": "Fortune 500",
    "category": "Hotels, Casinos, Resorts",
    "rank": 167,
    "website": "https://marriott.com"
  },
  {
    "name": "Jones Lang LaSalle",
    "cohort": "Fortune 500",
    "category": "Real Estate",
    "rank": 168,
    "website": "https://jll.com"
  },
  {
    "name": "Freeport-McMoRan",
    "cohort": "Fortune 500",
    "category": "Mining, Crude-Oil Production",
    "rank": 169,
    "website": "https://fcx.com"
  },
  {
    "name": "CarMax",
    "cohort": "Fortune 500",
    "category": "Automotive Retailing, Services",
    "rank": 170,
    "website": "https://carmax.com"
  },
  {
    "name": "Constellation Energy",
    "cohort": "Fortune 500",
    "category": "Energy",
    "rank": 171,
    "website": "https://constellationenergy.com"
  },
  {
    "name": "Waste Management",
    "cohort": "Fortune 500",
    "category": "Waste Management",
    "rank": 172,
    "website": "https://wm.com"
  },
  {
    "name": "Live Nation Entertainment",
    "cohort": "Fortune 500",
    "category": "Entertainment",
    "rank": 173,
    "website": "https://livenationentertainment.com"
  },
  {
    "name": "Stryker",
    "cohort": "Fortune 500",
    "category": "Medical Products and Equipment",
    "rank": 174,
    "website": "https://stryker.com"
  },
  {
    "name": "3M",
    "cohort": "Fortune 500 + target",
    "category": "Chemicals",
    "rank": 175,
    "website": "https://3m.com"
  },
  {
    "name": "Kraft Heinz",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 176,
    "website": "https://kraftheinzcompany.com"
  },
  {
    "name": "PG&E",
    "cohort": "Fortune 500 + target",
    "category": "Utilities: Gas and Electric",
    "rank": 177,
    "website": "https://pgecorp.com"
  },
  {
    "name": "Danaher",
    "cohort": "Fortune 500",
    "category": "Medical Products and Equipment",
    "rank": 178,
    "website": "https://danaher.com"
  },
  {
    "name": "Union Pacific",
    "cohort": "Fortune 500",
    "category": "Railroads",
    "rank": 179,
    "website": "https://up.com"
  },
  {
    "name": "Genuine Parts",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 180,
    "website": "https://genpt.com"
  },
  {
    "name": "Exelon",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 181,
    "website": "https://exeloncorp.com"
  },
  {
    "name": "BlackRock",
    "cohort": "Fortune 500 + target",
    "category": "Securities",
    "rank": 182,
    "website": "https://blackrock.com"
  },
  {
    "name": "Block",
    "cohort": "Fortune 500 + target",
    "category": "Financial Data Services",
    "rank": 183,
    "website": "https://block.xyz"
  },
  {
    "name": "Charles Schwab",
    "cohort": "Fortune 500 + target",
    "category": "Securities",
    "rank": 184,
    "website": "https://aboutschwab.com"
  },
  {
    "name": "Adobe",
    "cohort": "Fortune 500 + target",
    "category": "Computer Software",
    "rank": 185,
    "website": "https://adobe.com"
  },
  {
    "name": "Reinsurance of America",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Stock)",
    "rank": 186,
    "website": "https://rgare.com"
  },
  {
    "name": "International Paper",
    "cohort": "Fortune 500",
    "category": "Packaging, Containers",
    "rank": 187,
    "website": "https://internationalpaper.com"
  },
  {
    "name": "Sherwin-Williams",
    "cohort": "Fortune 500",
    "category": "Chemicals",
    "rank": 188,
    "website": "https://sherwin-williams.com"
  },
  {
    "name": "WESCO International",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 189,
    "website": "https://wesco.com"
  },
  {
    "name": "Altria",
    "cohort": "Fortune 500",
    "category": "Tobacco",
    "rank": 190,
    "website": "https://altria.com"
  },
  {
    "name": "Lear",
    "cohort": "Fortune 500",
    "category": "Motor Vehicles & Parts",
    "rank": 191,
    "website": "https://lear.com"
  },
  {
    "name": "PNC",
    "cohort": "Fortune 500 + target",
    "category": "Commercial Banks",
    "rank": 192,
    "website": "https://pnc.com"
  },
  {
    "name": "Amphenol",
    "cohort": "Fortune 500",
    "category": "Network and Other Communications Equipment",
    "rank": 193,
    "website": "https://amphenol.com"
  },
  {
    "name": "Ross Stores",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Apparel",
    "rank": 194,
    "website": "https://rossstores.com"
  },
  {
    "name": "Newmont",
    "cohort": "Fortune 500",
    "category": "Mining, Crude-Oil Production",
    "rank": 195,
    "website": "https://newmont.com"
  },
  {
    "name": "EOG Resources",
    "cohort": "Fortune 500",
    "category": "Mining, Crude-Oil Production",
    "rank": 196,
    "website": "https://eogresources.com"
  },
  {
    "name": "Macy's",
    "cohort": "Fortune 500",
    "category": "General Merchandisers",
    "rank": 197,
    "website": "https://macysinc.com"
  },
  {
    "name": "1 Automotive",
    "cohort": "Fortune 500",
    "category": "Automotive Retailing, Services",
    "rank": 198,
    "website": "https://group1auto.com"
  },
  {
    "name": "CDW",
    "cohort": "Fortune 500",
    "category": "Information Technology Services",
    "rank": 199,
    "website": "https://cdw.com"
  },
  {
    "name": "Avnet",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Electronics and Office Equipment",
    "rank": 200,
    "website": "https://avnet.com"
  },
  {
    "name": "Halliburton",
    "cohort": "Fortune 500 + target",
    "category": "Oil and Gas Equipment, Services",
    "rank": 201,
    "website": "https://halliburton.com"
  },
  {
    "name": "Super Micro Computer",
    "cohort": "Fortune 500",
    "category": "Computers, Office Equipment",
    "rank": 202,
    "website": "https://supermicro.com"
  },
  {
    "name": "American Electric Power",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 203,
    "website": "https://aep.com"
  },
  {
    "name": "Becton Dickinson",
    "cohort": "Fortune 500",
    "category": "Medical Products and Equipment",
    "rank": 204,
    "website": "https://bd.com"
  },
  {
    "name": "Carrier Global",
    "cohort": "Fortune 500",
    "category": "Industrial Machinery",
    "rank": 205,
    "website": "https://carrier.com"
  },
  {
    "name": "Occidental Petroleum",
    "cohort": "Fortune 500",
    "category": "Mining, Crude-Oil Production",
    "rank": 206,
    "website": "https://oxy.com"
  },
  {
    "name": "BJ's Wholesale Club",
    "cohort": "Fortune 500",
    "category": "General Merchandisers",
    "rank": 207,
    "website": "https://bjs.com"
  },
  {
    "name": "American Family Insurance",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 208,
    "website": "https://amfam.com"
  },
  {
    "name": "L3Harris Technologies",
    "cohort": "Fortune 500",
    "category": "Aerospace & Defense",
    "rank": 209,
    "website": "https://l3harris.com"
  },
  {
    "name": "Tenet Healthcare",
    "cohort": "Fortune 500",
    "category": "Health Care: Medical Facilities",
    "rank": 210,
    "website": "https://tenethealth.com"
  },
  {
    "name": "Fiserv",
    "cohort": "Fortune 500",
    "category": "Financial Data Services",
    "rank": 211,
    "website": "https://fiserv.com"
  },
  {
    "name": "Cognizant Technology",
    "cohort": "Fortune 500",
    "category": "Information Technology Services",
    "rank": 212,
    "website": "https://cognizant.com"
  },
  {
    "name": "GE HealthCare Technologies",
    "cohort": "Fortune 500",
    "category": "Medical Products and Equipment",
    "rank": 213,
    "website": "https://gehealthcare.com"
  },
  {
    "name": "Automatic Data Processing",
    "cohort": "Fortune 500",
    "category": "Diversified Outsourcing Services",
    "rank": 214,
    "website": "https://adp.com"
  },
  {
    "name": "Colgate-Palmolive",
    "cohort": "Fortune 500",
    "category": "Household and Personal Products",
    "rank": 215,
    "website": "https://colgatepalmolive.com"
  },
  {
    "name": "Carvana",
    "cohort": "Fortune 500",
    "category": "Automotive Retailing, Services",
    "rank": 216,
    "website": "https://carvana.com"
  },
  {
    "name": "Boston Scientific",
    "cohort": "Fortune 500",
    "category": "Medical Products and Equipment",
    "rank": 217,
    "website": "https://bostonscientific.com"
  },
  {
    "name": "Cheniere Energy",
    "cohort": "Fortune 500",
    "category": "Pipelines",
    "rank": 218,
    "website": "https://cheniere.com"
  },
  {
    "name": "Parker-Hannifin",
    "cohort": "Fortune 500",
    "category": "Industrial Machinery",
    "rank": 219,
    "website": "https://parker.com"
  },
  {
    "name": "KKR",
    "cohort": "Fortune 500",
    "category": "Securities",
    "rank": 220,
    "website": "https://kkr.com"
  },
  {
    "name": "Dollar Tree",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 221,
    "website": "https://dollartree.com"
  },
  {
    "name": "Murphy USA",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 222,
    "website": "https://murphyusa.com"
  },
  {
    "name": "Edison International",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 223,
    "website": "https://edisoninvestor.com"
  },
  {
    "name": "Republic Services",
    "cohort": "Fortune 500",
    "category": "Waste Management",
    "rank": 224,
    "website": "https://republicservices.com"
  },
  {
    "name": "AutoZone",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 225,
    "website": "https://autozone.com"
  },
  {
    "name": "Ameriprise Financial",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 226,
    "website": "https://ameriprise.com"
  },
  {
    "name": "Intuit",
    "cohort": "Fortune 500 + target",
    "category": "Computer Software",
    "rank": 227,
    "website": "https://intuit.com"
  },
  {
    "name": "SpaceX",
    "cohort": "Fortune 500 + target",
    "category": "Aerospace & Defense",
    "rank": 228,
    "website": "https://spacex.com"
  },
  {
    "name": "Cleveland-Cliffs",
    "cohort": "Fortune 500",
    "category": "Metals",
    "rank": 229,
    "website": "https://clevelandcliffs.com"
  },
  {
    "name": "Global Partners",
    "cohort": "Fortune 500",
    "category": "Energy",
    "rank": 230,
    "website": "https://globalp.com"
  },
  {
    "name": "Aramark",
    "cohort": "Fortune 500",
    "category": "Diversified Outsourcing Services",
    "rank": 231,
    "website": "https://aramark.com"
  },
  {
    "name": "Corebridge Financial",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 232,
    "website": "https://corebridgefinancial.com"
  },
  {
    "name": "Loews",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 233,
    "website": "https://loews.com"
  },
  {
    "name": "Lam Research",
    "cohort": "Fortune 500 + target",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 234,
    "website": "https://lamresearch.com"
  },
  {
    "name": "General Mills",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 235,
    "website": "https://generalmills.com"
  },
  {
    "name": "Goodyear Tire & Rubber",
    "cohort": "Fortune 500",
    "category": "Motor Vehicles & Parts",
    "rank": 236,
    "website": "https://goodyear.com"
  },
  {
    "name": "Truist Financial",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 237,
    "website": "https://truist.com"
  },
  {
    "name": "Lincoln National",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Stock)",
    "rank": 238,
    "website": "https://lincolnfinancial.com"
  },
  {
    "name": "Steel Dynamics",
    "cohort": "Fortune 500",
    "category": "Metals",
    "rank": 239,
    "website": "https://steeldynamics.com"
  },
  {
    "name": "Emerson Electric",
    "cohort": "Fortune 500",
    "category": "Industrial Machinery",
    "rank": 240,
    "website": "https://emerson.com"
  },
  {
    "name": "Asbury Automotive",
    "cohort": "Fortune 500",
    "category": "Automotive Retailing, Services",
    "rank": 241,
    "website": "https://asburyauto.com"
  },
  {
    "name": "Manpower",
    "cohort": "Fortune 500",
    "category": "Diversified Outsourcing Services",
    "rank": 242,
    "website": "https://manpowergroup.com"
  },
  {
    "name": "W.W. Grainger",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 243,
    "website": "https://grainger.com"
  },
  {
    "name": "O'Reilly Automotive",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 244,
    "website": "https://oreillyauto.com"
  },
  {
    "name": "Vistra",
    "cohort": "Fortune 500",
    "category": "Energy",
    "rank": 245,
    "website": "https://vistracorp.com"
  },
  {
    "name": "Texas Instruments",
    "cohort": "Fortune 500 + target",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 246,
    "website": "https://ti.com"
  },
  {
    "name": "Casey's General Stores",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 247,
    "website": "https://caseys.com"
  },
  {
    "name": "MGM Resorts International",
    "cohort": "Fortune 500",
    "category": "Hotels, Casinos, Resorts",
    "rank": 248,
    "website": "https://mgmresorts.com"
  },
  {
    "name": "Discover Financial",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 249,
    "website": "https://discover.com"
  },
  {
    "name": "Corteva",
    "cohort": "Fortune 500",
    "category": "Food Production",
    "rank": 250,
    "website": "https://corteva.com"
  },
  {
    "name": "Universal Health Services",
    "cohort": "Fortune 500",
    "category": "Health Care: Medical Facilities",
    "rank": 251,
    "website": "https://uhs.com"
  },
  {
    "name": "Pulte",
    "cohort": "Fortune 500",
    "category": "Homebuilders",
    "rank": 252,
    "website": "https://pultegroupinc.com"
  },
  {
    "name": "Omnicom",
    "cohort": "Fortune 500",
    "category": "Advertising, Marketing",
    "rank": 253,
    "website": "https://omnicomgroup.com"
  },
  {
    "name": "Dick's Sporting Goods",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 254,
    "website": "https://dickssportinggoods.com"
  },
  {
    "name": "Devon Energy",
    "cohort": "Fortune 500",
    "category": "Mining, Crude-Oil Production",
    "rank": 255,
    "website": "https://devonenergy.com"
  },
  {
    "name": "Leidos",
    "cohort": "Fortune 500 + target",
    "category": "Information Technology Services",
    "rank": 256,
    "website": "https://leidos.com"
  },
  {
    "name": "Aflac",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Stock)",
    "rank": 257,
    "website": "https://aflac.com"
  },
  {
    "name": "Targa Resources",
    "cohort": "Fortune 500",
    "category": "Pipelines",
    "rank": 258,
    "website": "https://targaresources.com"
  },
  {
    "name": "LPL Financial",
    "cohort": "Fortune 500",
    "category": "Securities",
    "rank": 259,
    "website": "https://lpl.com"
  },
  {
    "name": "EMCOR",
    "cohort": "Fortune 500",
    "category": "Engineering & Construction",
    "rank": 260,
    "website": "https://emcorgroup.com"
  },
  {
    "name": "Kinder Morgan",
    "cohort": "Fortune 500",
    "category": "Pipelines",
    "rank": 261,
    "website": "https://kindermorgan.com"
  },
  {
    "name": "Consolidated Edison",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 262,
    "website": "https://conedison.com"
  },
  {
    "name": "Peter Kiewit Sons'",
    "cohort": "Fortune 500",
    "category": "Engineering & Construction",
    "rank": 263,
    "website": "https://kiewit.com"
  },
  {
    "name": "Keurig Dr Pepper",
    "cohort": "Fortune 500",
    "category": "Beverages",
    "rank": 264,
    "website": "https://keurigdrpepper.com"
  },
  {
    "name": "Dominion Energy",
    "cohort": "Fortune 500 + target",
    "category": "Utilities: Gas and Electric",
    "rank": 265,
    "website": "https://dominionenergy.com"
  },
  {
    "name": "Guardian Life",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Mutual)",
    "rank": 266,
    "website": "https://guardianlife.com"
  },
  {
    "name": "Kimberly-Clark",
    "cohort": "Fortune 500",
    "category": "Household and Personal Products",
    "rank": 267,
    "website": "https://kimberly-clark.com"
  },
  {
    "name": "IQVIA",
    "cohort": "Fortune 500",
    "category": "Health Care: Pharmacy and Other Services",
    "rank": 268,
    "website": "https://iqvia.com"
  },
  {
    "name": "Fox",
    "cohort": "Fortune 500",
    "category": "Entertainment",
    "rank": 269,
    "website": "https://foxcorporation.com"
  },
  {
    "name": "Edward Jones",
    "cohort": "Fortune 500",
    "category": "Securities",
    "rank": 270,
    "website": "https://edwardjones.com"
  },
  {
    "name": "C.H. Robinson Worldwide",
    "cohort": "Fortune 500",
    "category": "Transportation and Logistics",
    "rank": 271,
    "website": "https://chrobinson.com"
  },
  {
    "name": "Land O'Lakes",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 272,
    "website": "https://landolakesinc.com"
  },
  {
    "name": "AECOM",
    "cohort": "Fortune 500",
    "category": "Engineering & Construction",
    "rank": 273,
    "website": "https://aecom.com"
  },
  {
    "name": "United Rentals",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 274,
    "website": "https://unitedrentals.com"
  },
  {
    "name": "Ecolab",
    "cohort": "Fortune 500",
    "category": "Chemicals",
    "rank": 275,
    "website": "https://ecolab.com"
  },
  {
    "name": "Illinois Tool Works",
    "cohort": "Fortune 500",
    "category": "Industrial Machinery",
    "rank": 276,
    "website": "https://itw.com"
  },
  {
    "name": "Raymond James Financial",
    "cohort": "Fortune 500",
    "category": "Securities",
    "rank": 277,
    "website": "https://raymondjames.com"
  },
  {
    "name": "PPG Industries",
    "cohort": "Fortune 500",
    "category": "Chemicals",
    "rank": 278,
    "website": "https://ppg.com"
  },
  {
    "name": "Auto-Owners Insurance",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Mutual)",
    "rank": 279,
    "website": "https://auto-owners.com"
  },
  {
    "name": "Pacific Life",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Stock)",
    "rank": 280,
    "website": "https://pacificlife.com"
  },
  {
    "name": "DTE Energy",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 281,
    "website": "https://dteenergy.com"
  },
  {
    "name": "United States Steel",
    "cohort": "Fortune 500",
    "category": "Metals",
    "rank": 282,
    "website": "https://ussteel.com"
  },
  {
    "name": "Corning",
    "cohort": "Fortune 500",
    "category": "Electronics, Electrical Equip.",
    "rank": 283,
    "website": "https://corning.com"
  },
  {
    "name": "Principal Financial",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Stock)",
    "rank": 284,
    "website": "https://principal.com"
  },
  {
    "name": "Kohl's",
    "cohort": "Fortune 500",
    "category": "General Merchandisers",
    "rank": 285,
    "website": "https://kohls.com"
  },
  {
    "name": "Tractor Supply",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 286,
    "website": "https://tractorsupply.com"
  },
  {
    "name": "Whirlpool",
    "cohort": "Fortune 500",
    "category": "Electronics, Electrical Equip.",
    "rank": 287,
    "website": "https://whirlpoolcorp.com"
  },
  {
    "name": "Markel",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 288,
    "website": "https://mklgroup.com"
  },
  {
    "name": "Fluor",
    "cohort": "Fortune 500",
    "category": "Engineering & Construction",
    "rank": 289,
    "website": "https://fluor.com"
  },
  {
    "name": "Farmers Insurance Exchange",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Mutual)",
    "rank": 290,
    "website": "https://farmers.com"
  },
  {
    "name": "Gap",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Apparel",
    "rank": 291,
    "website": "https://gapinc.com"
  },
  {
    "name": "S&P Global",
    "cohort": "Fortune 500 + target",
    "category": "Financial Data Services",
    "rank": 292,
    "website": "https://spglobal.com"
  },
  {
    "name": "Builders FirstSource",
    "cohort": "Fortune 500",
    "category": "Building Materials, Glass",
    "rank": 293,
    "website": "https://bldr.com"
  },
  {
    "name": "Sonic Automotive",
    "cohort": "Fortune 500",
    "category": "Automotive Retailing, Services",
    "rank": 294,
    "website": "https://sonicautomotive.com"
  },
  {
    "name": "Stanley Black & Decker",
    "cohort": "Fortune 500",
    "category": "Industrial Machinery",
    "rank": 295,
    "website": "https://stanleyblackanddecker.com"
  },
  {
    "name": "Kenvue",
    "cohort": "Fortune 500",
    "category": "Household and Personal Products",
    "rank": 296,
    "website": "https://kenvue.com"
  },
  {
    "name": "Kyndryl",
    "cohort": "Fortune 500",
    "category": "Information Technology Services",
    "rank": 297,
    "website": "https://kyndryl.com"
  },
  {
    "name": "FirstEnergy",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 298,
    "website": "https://firstenergycorp.com"
  },
  {
    "name": "Diamondback Energy",
    "cohort": "Fortune 500",
    "category": "Mining, Crude-Oil Production",
    "rank": 299,
    "website": "https://diamondbackenergy.com"
  },
  {
    "name": "Nordstrom",
    "cohort": "Fortune 500",
    "category": "General Merchandisers",
    "rank": 300,
    "website": "https://nordstrom.com"
  },
  {
    "name": "EchoStar",
    "cohort": "Fortune 500",
    "category": "Telecommunications",
    "rank": 301,
    "website": "https://echostar.com"
  },
  {
    "name": "Textron",
    "cohort": "Fortune 500",
    "category": "Aerospace & Defense",
    "rank": 302,
    "website": "https://textron.com"
  },
  {
    "name": "Expedia",
    "cohort": "Fortune 500 + target",
    "category": "Internet Services and Retailing",
    "rank": 303,
    "website": "https://expediagroup.com"
  },
  {
    "name": "W.R. Berkley",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 304,
    "website": "https://berkley.com"
  },
  {
    "name": "Xcel Energy",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 305,
    "website": "https://xcelenergy.com"
  },
  {
    "name": "Mutual of Omaha Insurance",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Mutual)",
    "rank": 306,
    "website": "https://mutualofomaha.com"
  },
  {
    "name": "Blackstone",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 307,
    "website": "https://blackstone.com"
  },
  {
    "name": "Fidelity National Financial",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 308,
    "website": "https://fnf.com"
  },
  {
    "name": "Otis Worldwide",
    "cohort": "Fortune 500",
    "category": "Industrial Machinery",
    "rank": 309,
    "website": "https://otis.com"
  },
  {
    "name": "Regeneron Pharmaceuticals",
    "cohort": "Fortune 500",
    "category": "Pharmaceuticals",
    "rank": 310,
    "website": "https://regeneron.com"
  },
  {
    "name": "Estée Lauder",
    "cohort": "Fortune 500",
    "category": "Household and Personal Products",
    "rank": 311,
    "website": "https://elcompanies.com"
  },
  {
    "name": "BorgWarner",
    "cohort": "Fortune 500",
    "category": "Motor Vehicles & Parts",
    "rank": 312,
    "website": "https://borgwarner.com"
  },
  {
    "name": "Viatris",
    "cohort": "Fortune 500",
    "category": "Pharmaceuticals",
    "rank": 313,
    "website": "https://viatris.com"
  },
  {
    "name": "MasTec",
    "cohort": "Fortune 500",
    "category": "Engineering & Construction",
    "rank": 314,
    "website": "https://mastec.com"
  },
  {
    "name": "Reliance",
    "cohort": "Fortune 500",
    "category": "Metals",
    "rank": 315,
    "website": "https://reliance.com"
  },
  {
    "name": "Alaska Air",
    "cohort": "Fortune 500",
    "category": "Airlines",
    "rank": 316,
    "website": "https://alaskaair.com"
  },
  {
    "name": "CSX",
    "cohort": "Fortune 500",
    "category": "Railroads",
    "rank": 317,
    "website": "https://csx.com"
  },
  {
    "name": "Labcorp",
    "cohort": "Fortune 500",
    "category": "Health Care: Pharmacy and Other Services",
    "rank": 318,
    "website": "https://labcorp.com"
  },
  {
    "name": "State Street",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 319,
    "website": "https://statestreet.com"
  },
  {
    "name": "Arthur J. Gallagher",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 320,
    "website": "https://ajg.com"
  },
  {
    "name": "Western & Southern Financial",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Mutual)",
    "rank": 321,
    "website": "https://westernsouthern.com"
  },
  {
    "name": "DoorDash",
    "cohort": "Fortune 500 + target",
    "category": "Internet Services and Retailing",
    "rank": 322,
    "website": "https://doordash.com"
  },
  {
    "name": "Sempra",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 323,
    "website": "https://sempra.com"
  },
  {
    "name": "LKQ",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 324,
    "website": "https://lkqcorp.com"
  },
  {
    "name": "DaVita",
    "cohort": "Fortune 500",
    "category": "Health Care: Medical Facilities",
    "rank": 325,
    "website": "https://davita.com"
  },
  {
    "name": "Eversource Energy",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 326,
    "website": "https://eversource.com"
  },
  {
    "name": "ServiceNow",
    "cohort": "Fortune 500 + target",
    "category": "Computer Software",
    "rank": 327,
    "website": "https://servicenow.com"
  },
  {
    "name": "Henry Schein",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Health Care",
    "rank": 328,
    "website": "https://henryschein.com"
  },
  {
    "name": "GXO Logistics",
    "cohort": "Fortune 500",
    "category": "Transportation and Logistics",
    "rank": 329,
    "website": "https://gxo.com"
  },
  {
    "name": "Erie Insurance",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Mutual)",
    "rank": 330,
    "website": "https://erieinsurance.com"
  },
  {
    "name": "Ball",
    "cohort": "Fortune 500",
    "category": "Packaging, Containers",
    "rank": 331,
    "website": "https://ball.com"
  },
  {
    "name": "Unum",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Stock)",
    "rank": 332,
    "website": "https://unum.com"
  },
  {
    "name": "Molson Coors Beverage",
    "cohort": "Fortune 500",
    "category": "Beverages",
    "rank": 333,
    "website": "https://molsoncoors.com"
  },
  {
    "name": "Las Vegas Sands",
    "cohort": "Fortune 500",
    "category": "Hotels, Casinos, Resorts",
    "rank": 334,
    "website": "https://sands.com"
  },
  {
    "name": "Entergy",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 335,
    "website": "https://entergy.com"
  },
  {
    "name": "BrightSpring Health Services",
    "cohort": "Fortune 500",
    "category": "Health Care: Pharmacy and Other Services",
    "rank": 336,
    "website": "https://brightspringhealth.com"
  },
  {
    "name": "Hess",
    "cohort": "Fortune 500",
    "category": "Mining, Crude-Oil Production",
    "rank": 337,
    "website": "https://hess.com"
  },
  {
    "name": "Alcoa",
    "cohort": "Fortune 500",
    "category": "Metals",
    "rank": 338,
    "website": "https://alcoa.com"
  },
  {
    "name": "Assurant",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 339,
    "website": "https://assurant.com"
  },
  {
    "name": "Kellanova",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 340,
    "website": "https://kellanova.com"
  },
  {
    "name": "Ryder System",
    "cohort": "Fortune 500",
    "category": "Transportation and Logistics",
    "rank": 341,
    "website": "https://ryder.com"
  },
  {
    "name": "DXC Technology",
    "cohort": "Fortune 500",
    "category": "Information Technology Services",
    "rank": 342,
    "website": "https://dxc.technology"
  },
  {
    "name": "Intercontinental Exchange",
    "cohort": "Fortune 500",
    "category": "Securities",
    "rank": 343,
    "website": "https://ice.com"
  },
  {
    "name": "Cincinnati Financial",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 344,
    "website": "https://cinfin.com"
  },
  {
    "name": "Chewy",
    "cohort": "Fortune 500 + target",
    "category": "Internet Services and Retailing",
    "rank": 345,
    "website": "https://chewy.com"
  },
  {
    "name": "Community Health Systems",
    "cohort": "Fortune 500",
    "category": "Health Care: Medical Facilities",
    "rank": 346,
    "website": "https://chs.net"
  },
  {
    "name": "Huntington Ingalls Industries",
    "cohort": "Fortune 500",
    "category": "Aerospace & Defense",
    "rank": 347,
    "website": "https://hii.com"
  },
  {
    "name": "Wayfair",
    "cohort": "Fortune 500 + target",
    "category": "Internet Services and Retailing",
    "rank": 348,
    "website": "https://wayfair.com"
  },
  {
    "name": "Lumen Technologies",
    "cohort": "Fortune 500",
    "category": "Telecommunications",
    "rank": 349,
    "website": "https://lumen.com"
  },
  {
    "name": "Ulta Beauty",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 350,
    "website": "https://ulta.com"
  },
  {
    "name": "Crown",
    "cohort": "Fortune 500",
    "category": "Packaging, Containers",
    "rank": 351,
    "website": "https://crowncork.com"
  },
  {
    "name": "Berry Global",
    "cohort": "Fortune 500",
    "category": "Packaging, Containers",
    "rank": 352,
    "website": "https://berryglobal.com"
  },
  {
    "name": "Airbnb",
    "cohort": "Fortune 500 + target",
    "category": "Internet Services and Retailing",
    "rank": 353,
    "website": "https://airbnb.com"
  },
  {
    "name": "AES",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 354,
    "website": "https://aes.com"
  },
  {
    "name": "Norfolk Southern",
    "cohort": "Fortune 500",
    "category": "Railroads",
    "rank": 355,
    "website": "https://norfolksouthern.com"
  },
  {
    "name": "Public Service Enterprise",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 356,
    "website": "https://pseg.com"
  },
  {
    "name": "KLA",
    "cohort": "Fortune 500 + target",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 357,
    "website": "https://kla.com"
  },
  {
    "name": "Hormel Foods",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 358,
    "website": "https://hormelfoods.com"
  },
  {
    "name": "Darden Restaurants",
    "cohort": "Fortune 500",
    "category": "Food Services",
    "rank": 359,
    "website": "https://darden.com"
  },
  {
    "name": "Mosaic",
    "cohort": "Fortune 500",
    "category": "Chemicals",
    "rank": 360,
    "website": "https://mosaicco.com"
  },
  {
    "name": "Hilton",
    "cohort": "Fortune 500 + target",
    "category": "Hotels, Casinos, Resorts",
    "rank": 361,
    "website": "https://hilton.com"
  },
  {
    "name": "Air Products & Chemicals",
    "cohort": "Fortune 500",
    "category": "Chemicals",
    "rank": 362,
    "website": "https://airproducts.com"
  },
  {
    "name": "Jacobs Solutions",
    "cohort": "Fortune 500",
    "category": "Diversified Outsourcing Services",
    "rank": 363,
    "website": "https://jacobs.com"
  },
  {
    "name": "Vertex Pharmaceuticals",
    "cohort": "Fortune 500",
    "category": "Pharmaceuticals",
    "rank": 364,
    "website": "https://vrtx.com"
  },
  {
    "name": "J.B. Hunt Transport Services",
    "cohort": "Fortune 500",
    "category": "Trucking, Truck Leasing",
    "rank": 365,
    "website": "https://jbhunt.com"
  },
  {
    "name": "Williams",
    "cohort": "Fortune 500",
    "category": "Pipelines",
    "rank": 366,
    "website": "https://williams.com"
  },
  {
    "name": "Chipotle Mexican Grill",
    "cohort": "Fortune 500",
    "category": "Food Services",
    "rank": 367,
    "website": "https://chipotle.com"
  },
  {
    "name": "Yum China",
    "cohort": "Fortune 500",
    "category": "Food Services",
    "rank": 368,
    "website": "https://yumchina.com"
  },
  {
    "name": "Oscar Health",
    "cohort": "Fortune 500",
    "category": "Health Care: Insurance and Managed Care",
    "rank": 369,
    "website": "https://hioscar.com"
  },
  {
    "name": "Hershey",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 370,
    "website": "https://thehersheycompany.com"
  },
  {
    "name": "Motorola Solutions",
    "cohort": "Fortune 500",
    "category": "Network and Other Communications Equipment",
    "rank": 371,
    "website": "https://motorolasolutions.com"
  },
  {
    "name": "Equitable",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Stock)",
    "rank": 372,
    "website": "https://equitableholdings.com"
  },
  {
    "name": "Avis Budget",
    "cohort": "Fortune 500",
    "category": "Automotive Retailing, Services",
    "rank": 373,
    "website": "https://avisbudgetgroup.com"
  },
  {
    "name": "Graybar Electric",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 374,
    "website": "https://graybar.com"
  },
  {
    "name": "Conagra Brands",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 375,
    "website": "https://conagrabrands.com"
  },
  {
    "name": "Burlington Stores",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Apparel",
    "rank": 376,
    "website": "https://burlingtoninvestors.com"
  },
  {
    "name": "Caesars Entertainment",
    "cohort": "Fortune 500",
    "category": "Hotels, Casinos, Resorts",
    "rank": 377,
    "website": "https://caesars.com"
  },
  {
    "name": "Baxter International",
    "cohort": "Fortune 500",
    "category": "Medical Products and Equipment",
    "rank": 378,
    "website": "https://baxter.com"
  },
  {
    "name": "Booz Allen Hamilton",
    "cohort": "Fortune 500",
    "category": "Information Technology Services",
    "rank": 379,
    "website": "https://boozallen.com"
  },
  {
    "name": "Westlake",
    "cohort": "Fortune 500",
    "category": "Chemicals",
    "rank": 380,
    "website": "https://westlake.com"
  },
  {
    "name": "Westinghouse Air Brake Technologies",
    "cohort": "Fortune 500",
    "category": "Industrial Machinery",
    "rank": 381,
    "website": "https://wabteccorp.com"
  },
  {
    "name": "Lululemon athletica",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Apparel",
    "rank": 382,
    "website": "https://lululemon.com"
  },
  {
    "name": "Ebay",
    "cohort": "Fortune 500 + target",
    "category": "Internet Services and Retailing",
    "rank": 383,
    "website": "https://ebay.com"
  },
  {
    "name": "Expeditors International of Washington",
    "cohort": "Fortune 500",
    "category": "Transportation and Logistics",
    "rank": 384,
    "website": "https://expeditors.com"
  },
  {
    "name": "Quest Diagnostics",
    "cohort": "Fortune 500",
    "category": "Health Care: Pharmacy and Other Services",
    "rank": 385,
    "website": "https://questdiagnostics.com"
  },
  {
    "name": "Analog Devices",
    "cohort": "Fortune 500 + target",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 386,
    "website": "https://analog.com"
  },
  {
    "name": "Andersons",
    "cohort": "Fortune 500",
    "category": "Food Production",
    "rank": 387,
    "website": "https://andersonsinc.com"
  },
  {
    "name": "A-Mark Precious Metals",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 388,
    "website": "https://amark.com"
  },
  {
    "name": "Toll Brothers",
    "cohort": "Fortune 500",
    "category": "Homebuilders",
    "rank": 389,
    "website": "https://tollbrothers.com"
  },
  {
    "name": "Thrivent Financial for Lutherans",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Mutual)",
    "rank": 390,
    "website": "https://thrivent.com"
  },
  {
    "name": "International Flavors & Fragrances",
    "cohort": "Fortune 500",
    "category": "Chemicals",
    "rank": 391,
    "website": "https://iff.com"
  },
  {
    "name": "Welltower",
    "cohort": "Fortune 500",
    "category": "Real Estate",
    "rank": 392,
    "website": "https://welltower.com"
  },
  {
    "name": "Jefferies Financial",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 393,
    "website": "https://jefferies.com"
  },
  {
    "name": "Autoliv",
    "cohort": "Fortune 500",
    "category": "Motor Vehicles & Parts",
    "rank": 394,
    "website": "https://autoliv.com"
  },
  {
    "name": "Mohawk Industries",
    "cohort": "Fortune 500",
    "category": "Home Equipment, Furnishings",
    "rank": 395,
    "website": "https://mohawkind.com"
  },
  {
    "name": "Owens & Minor",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Health Care",
    "rank": 396,
    "website": "https://owens-minor.com"
  },
  {
    "name": "Delek US",
    "cohort": "Fortune 500",
    "category": "Petroleum Refining",
    "rank": 397,
    "website": "https://delekus.com"
  },
  {
    "name": "Interpublic",
    "cohort": "Fortune 500",
    "category": "Advertising, Marketing",
    "rank": 398,
    "website": "https://interpublic.com"
  },
  {
    "name": "Fidelity National Information",
    "cohort": "Fortune 500",
    "category": "Financial Data Services",
    "rank": 399,
    "website": "https://fisglobal.com"
  },
  {
    "name": "American Tower",
    "cohort": "Fortune 500",
    "category": "Real Estate",
    "rank": 400,
    "website": "https://americantower.com"
  },
  {
    "name": "Oshkosh",
    "cohort": "Fortune 500",
    "category": "Construction and Farm Machinery",
    "rank": 401,
    "website": "https://oshkoshcorp.com"
  },
  {
    "name": "FM",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 402,
    "website": "https://fm.com"
  },
  {
    "name": "Cintas",
    "cohort": "Fortune 500",
    "category": "Diversified Outsourcing Services",
    "rank": 403,
    "website": "https://cintas.com"
  },
  {
    "name": "NVR",
    "cohort": "Fortune 500",
    "category": "Homebuilders",
    "rank": 404,
    "website": "https://nvrinc.com"
  },
  {
    "name": "Campbell's",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 405,
    "website": "https://thecampbellscompany.com"
  },
  {
    "name": "Vertiv",
    "cohort": "Fortune 500",
    "category": "Electronics, Electrical Equip.",
    "rank": 406,
    "website": "https://vertiv.com"
  },
  {
    "name": "Owens Corning",
    "cohort": "Fortune 500",
    "category": "Building Materials, Glass",
    "rank": 407,
    "website": "https://owenscorning.com"
  },
  {
    "name": "AGCO",
    "cohort": "Fortune 500",
    "category": "Construction and Farm Machinery",
    "rank": 408,
    "website": "https://agcocorp.com"
  },
  {
    "name": "Intuitive Surgical",
    "cohort": "Fortune 500 + target",
    "category": "Medical Products and Equipment",
    "rank": 409,
    "website": "https://intuitive.com"
  },
  {
    "name": "Biogen",
    "cohort": "Fortune 500",
    "category": "Pharmaceuticals",
    "rank": 410,
    "website": "https://biogen.com"
  },
  {
    "name": "Concentrix",
    "cohort": "Fortune 500",
    "category": "Information Technology Services",
    "rank": 411,
    "website": "https://concentrix.com"
  },
  {
    "name": "WEC Energy",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 412,
    "website": "https://wecenergygroup.com"
  },
  {
    "name": "Seaboard",
    "cohort": "Fortune 500",
    "category": "Food Production",
    "rank": 413,
    "website": "https://seaboardcorp.com"
  },
  {
    "name": "Icahn Enterprises",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 414,
    "website": "https://ielp.com"
  },
  {
    "name": "Synchrony Financial",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 415,
    "website": "https://synchrony.com"
  },
  {
    "name": "VF",
    "cohort": "Fortune 500",
    "category": "Apparel",
    "rank": 416,
    "website": "https://vfc.com"
  },
  {
    "name": "THOR Industries",
    "cohort": "Fortune 500",
    "category": "Motor Vehicles & Parts",
    "rank": 417,
    "website": "https://thorindustries.com"
  },
  {
    "name": "Workday",
    "cohort": "Fortune 500 + target",
    "category": "Computer Software",
    "rank": 418,
    "website": "https://workday.com"
  },
  {
    "name": "SpartanNash",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Food and Grocery",
    "rank": 419,
    "website": "https://spartannash.com"
  },
  {
    "name": "Celanese",
    "cohort": "Fortune 500",
    "category": "Chemicals",
    "rank": 420,
    "website": "https://celanese.com"
  },
  {
    "name": "First Citizens BancShares",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 421,
    "website": "https://firstcitizens.com"
  },
  {
    "name": "Western Digital",
    "cohort": "Fortune 500",
    "category": "Computers, Office Equipment",
    "rank": 422,
    "website": "https://westerndigital.com"
  },
  {
    "name": "Ace Hardware",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 423,
    "website": "https://acehardware.com"
  },
  {
    "name": "Zoetis",
    "cohort": "Fortune 500",
    "category": "Pharmaceuticals",
    "rank": 424,
    "website": "https://zoetis.com"
  },
  {
    "name": "APA",
    "cohort": "Fortune 500",
    "category": "Mining, Crude-Oil Production",
    "rank": 425,
    "website": "https://apacorp.com"
  },
  {
    "name": "CenterPoint Energy",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 426,
    "website": "https://centerpointenergy.com"
  },
  {
    "name": "Palo Alto Networks",
    "cohort": "Fortune 500",
    "category": "Network and Other Communications Equipment",
    "rank": 427,
    "website": "https://paloaltonetworks.com"
  },
  {
    "name": "Equinix",
    "cohort": "Fortune 500",
    "category": "Real Estate",
    "rank": 428,
    "website": "https://equinix.com"
  },
  {
    "name": "Constellation Brands",
    "cohort": "Fortune 500",
    "category": "Beverages",
    "rank": 429,
    "website": "https://cbrands.com"
  },
  {
    "name": "Old Republic International",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 430,
    "website": "https://oldrepublic.com"
  },
  {
    "name": "M&T Bank",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 431,
    "website": "https://mtb.com"
  },
  {
    "name": "JetBlue Airways",
    "cohort": "Fortune 500",
    "category": "Airlines",
    "rank": 432,
    "website": "https://jetblue.com"
  },
  {
    "name": "J.M. Smucker",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 433,
    "website": "https://jmsmucker.com"
  },
  {
    "name": "PPL",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 434,
    "website": "https://pplweb.com"
  },
  {
    "name": "Xylem",
    "cohort": "Fortune 500",
    "category": "Industrial Machinery",
    "rank": 435,
    "website": "https://xylem.com"
  },
  {
    "name": "Packaging Corp. of America",
    "cohort": "Fortune 500",
    "category": "Packaging, Containers",
    "rank": 436,
    "website": "https://packagingcorp.com"
  },
  {
    "name": "Skechers U.S.A.",
    "cohort": "Fortune 500",
    "category": "Apparel",
    "rank": 437,
    "website": "https://skechers.com"
  },
  {
    "name": "PVH",
    "cohort": "Fortune 500",
    "category": "Apparel",
    "rank": 438,
    "website": "https://pvh.com"
  },
  {
    "name": "Ovintiv",
    "cohort": "Fortune 500",
    "category": "Mining, Crude-Oil Production",
    "rank": 439,
    "website": "https://ovintiv.com"
  },
  {
    "name": "Avery Dennison",
    "cohort": "Fortune 500",
    "category": "Packaging, Containers",
    "rank": 440,
    "website": "https://averydennison.com"
  },
  {
    "name": "TransDigm",
    "cohort": "Fortune 500",
    "category": "Aerospace & Defense",
    "rank": 441,
    "website": "https://transdigm.com"
  },
  {
    "name": "Sprouts Farmers Market",
    "cohort": "Fortune 500",
    "category": "Food & Drug Stores",
    "rank": 442,
    "website": "https://sprouts.com"
  },
  {
    "name": "Prologis",
    "cohort": "Fortune 500",
    "category": "Real Estate",
    "rank": 443,
    "website": "https://prologis.com"
  },
  {
    "name": "Franklin Resources",
    "cohort": "Fortune 500",
    "category": "Securities",
    "rank": 444,
    "website": "https://franklinresources.com"
  },
  {
    "name": "Eastman Chemical",
    "cohort": "Fortune 500",
    "category": "Chemicals",
    "rank": 445,
    "website": "https://eastman.com"
  },
  {
    "name": "ABM Industries",
    "cohort": "Fortune 500",
    "category": "Diversified Outsourcing Services",
    "rank": 446,
    "website": "https://abm.com"
  },
  {
    "name": "NOV",
    "cohort": "Fortune 500",
    "category": "Oil and Gas Equipment, Services",
    "rank": 447,
    "website": "https://nov.com"
  },
  {
    "name": "CACI International",
    "cohort": "Fortune 500",
    "category": "Information Technology Services",
    "rank": 448,
    "website": "https://caci.com"
  },
  {
    "name": "Graphic Packaging",
    "cohort": "Fortune 500",
    "category": "Packaging, Containers",
    "rank": 449,
    "website": "https://graphicpkg.com"
  },
  {
    "name": "Advance Auto Parts",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 450,
    "website": "https://advanceautoparts.com"
  },
  {
    "name": "Altice USA",
    "cohort": "Fortune 500",
    "category": "Telecommunications",
    "rank": 451,
    "website": "https://alticeusa.com"
  },
  {
    "name": "Sirius XM",
    "cohort": "Fortune 500",
    "category": "Entertainment",
    "rank": 452,
    "website": "https://siriusxm.com"
  },
  {
    "name": "CMS Energy",
    "cohort": "Fortune 500",
    "category": "Utilities: Gas and Electric",
    "rank": 453,
    "website": "https://cmsenergy.com"
  },
  {
    "name": "Hertz",
    "cohort": "Fortune 500",
    "category": "Automotive Retailing, Services",
    "rank": 454,
    "website": "https://hertz.com"
  },
  {
    "name": "News Corp.",
    "cohort": "Fortune 500",
    "category": "Publishing, Printing",
    "rank": 455,
    "website": "https://newscorp.com"
  },
  {
    "name": "Rockwell Automation",
    "cohort": "Fortune 500 + target",
    "category": "Electronics, Electrical Equip.",
    "rank": 456,
    "website": "https://rockwellautomation.com"
  },
  {
    "name": "Solventum",
    "cohort": "Fortune 500",
    "category": "Medical Products and Equipment",
    "rank": 457,
    "website": "https://solventum.com"
  },
  {
    "name": "Monster Beverage",
    "cohort": "Fortune 500",
    "category": "Beverages",
    "rank": 458,
    "website": "https://monsterbevcorp.com"
  },
  {
    "name": "QVC",
    "cohort": "Fortune 500",
    "category": "Internet Services and Retailing",
    "rank": 459,
    "website": "https://qvcgrp.com"
  },
  {
    "name": "Howmet Aerospace",
    "cohort": "Fortune 500",
    "category": "Aerospace & Defense",
    "rank": 460,
    "website": "https://howmet.com"
  },
  {
    "name": "Insight Enterprises",
    "cohort": "Fortune 500",
    "category": "Information Technology Services",
    "rank": 461,
    "website": "https://insight.com"
  },
  {
    "name": "Citizens Financial",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 462,
    "website": "https://citizensbank.com"
  },
  {
    "name": "Zimmer Biomet",
    "cohort": "Fortune 500",
    "category": "Medical Products and Equipment",
    "rank": 463,
    "website": "https://zimmerbiomet.com"
  },
  {
    "name": "Securian Financial",
    "cohort": "Fortune 500",
    "category": "Insurance: Life, Health (Stock)",
    "rank": 464,
    "website": "https://securian.com"
  },
  {
    "name": "Yum Brands",
    "cohort": "Fortune 500",
    "category": "Food Services",
    "rank": 465,
    "website": "https://yum.com"
  },
  {
    "name": "Fastenal",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 466,
    "website": "https://fastenal.com"
  },
  {
    "name": "Voya Financial",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 467,
    "website": "https://voya.com"
  },
  {
    "name": "American Financial",
    "cohort": "Fortune 500",
    "category": "Insurance: Property and Casualty (Stock)",
    "rank": 468,
    "website": "https://afginc.com"
  },
  {
    "name": "Post",
    "cohort": "Fortune 500",
    "category": "Food Consumer Products",
    "rank": 469,
    "website": "https://postholdings.com"
  },
  {
    "name": "XPO",
    "cohort": "Fortune 500",
    "category": "Transportation and Logistics",
    "rank": 470,
    "website": "https://xpo.com"
  },
  {
    "name": "Fifth Third Bancorp",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 471,
    "website": "https://53.com"
  },
  {
    "name": "Sanmina",
    "cohort": "Fortune 500",
    "category": "Semiconductors and Other Electronic Components",
    "rank": 472,
    "website": "https://sanmina.com"
  },
  {
    "name": "Taylor Morrison Home",
    "cohort": "Fortune 500",
    "category": "Homebuilders",
    "rank": 473,
    "website": "https://taylormorrison.com"
  },
  {
    "name": "Dover",
    "cohort": "Fortune 500",
    "category": "Industrial Machinery",
    "rank": 474,
    "website": "https://dovercorporation.com"
  },
  {
    "name": "Northern Trust",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 475,
    "website": "https://northerntrust.com"
  },
  {
    "name": "Foot Locker",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Apparel",
    "rank": 476,
    "website": "https://footlocker.com"
  },
  {
    "name": "Vulcan Materials",
    "cohort": "Fortune 500",
    "category": "Building Materials, Glass",
    "rank": 477,
    "website": "https://vulcanmaterials.com"
  },
  {
    "name": "Ally Financial",
    "cohort": "Fortune 500",
    "category": "Diversified Financials",
    "rank": 478,
    "website": "https://ally.com"
  },
  {
    "name": "Williams-Sonoma",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 479,
    "website": "https://williams-sonomainc.com"
  },
  {
    "name": "Regions Financial",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 480,
    "website": "https://regions.com"
  },
  {
    "name": "Commercial Metals",
    "cohort": "Fortune 500",
    "category": "Metals",
    "rank": 481,
    "website": "https://cmc.com"
  },
  {
    "name": "KBR",
    "cohort": "Fortune 500",
    "category": "Information Technology Services",
    "rank": 482,
    "website": "https://kbr.com"
  },
  {
    "name": "Global Payments",
    "cohort": "Fortune 500",
    "category": "Financial Data Services",
    "rank": 483,
    "website": "https://globalpaymentsinc.com"
  },
  {
    "name": "Core & Main",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 484,
    "website": "https://coreandmain.com"
  },
  {
    "name": "ARKO",
    "cohort": "Fortune 500",
    "category": "Specialty Retailers: Other",
    "rank": 485,
    "website": "https://arkocorp.com"
  },
  {
    "name": "Masco",
    "cohort": "Fortune 500",
    "category": "Home Equipment, Furnishings",
    "rank": 486,
    "website": "https://masco.com"
  },
  {
    "name": "Electronic Arts",
    "cohort": "Fortune 500 + target",
    "category": "Entertainment",
    "rank": 487,
    "website": "https://ea.com"
  },
  {
    "name": "KeyCorp",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 488,
    "website": "https://key.com"
  },
  {
    "name": "Dana",
    "cohort": "Fortune 500",
    "category": "Motor Vehicles & Parts",
    "rank": 489,
    "website": "https://dana.com"
  },
  {
    "name": "Huntington Bancshares",
    "cohort": "Fortune 500",
    "category": "Commercial Banks",
    "rank": 490,
    "website": "https://huntington.com"
  },
  {
    "name": "Par Pacific",
    "cohort": "Fortune 500",
    "category": "Petroleum Refining",
    "rank": 491,
    "website": "https://parpacific.com"
  },
  {
    "name": "Rush Enterprises",
    "cohort": "Fortune 500",
    "category": "Automotive Retailing, Services",
    "rank": 492,
    "website": "https://rushenterprises.com"
  },
  {
    "name": "Science Applications International",
    "cohort": "Fortune 500",
    "category": "Information Technology Services",
    "rank": 493,
    "website": "https://saic.com"
  },
  {
    "name": "Watsco",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 494,
    "website": "https://watsco.com"
  },
  {
    "name": "Ingredion",
    "cohort": "Fortune 500",
    "category": "Food Production",
    "rank": 495,
    "website": "https://ingredion.com"
  },
  {
    "name": "Newell Brands",
    "cohort": "Fortune 500",
    "category": "Home Equipment, Furnishings",
    "rank": 496,
    "website": "https://newellbrands.com"
  },
  {
    "name": "Endeavor",
    "cohort": "Fortune 500",
    "category": "Entertainment",
    "rank": 497,
    "website": "https://endeavorco.com"
  },
  {
    "name": "DuPont",
    "cohort": "Fortune 500",
    "category": "Chemicals",
    "rank": 498,
    "website": "https://dupont.com"
  },
  {
    "name": "QXO Building Products",
    "cohort": "Fortune 500",
    "category": "Wholesalers: Diversified",
    "rank": 499,
    "website": "https://qxo.com"
  },
  {
    "name": "Interactive Brokers",
    "cohort": "Fortune 500",
    "category": "Securities",
    "rank": 500,
    "website": "https://interactivebrokers.com"
  },
  {
    "name": "Google",
    "cohort": "Target list",
    "category": "Big Tech / Core Tech",
    "rank": null,
    "website": null
  },
  {
    "name": "LinkedIn",
    "cohort": "Target list",
    "category": "Big Tech / Core Tech",
    "rank": null,
    "website": null
  },
  {
    "name": "AMD",
    "cohort": "Target list",
    "category": "Big Tech / Core Tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Cisco",
    "cohort": "Target list",
    "category": "Big Tech / Core Tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Dell",
    "cohort": "Target list",
    "category": "Big Tech / Core Tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Atlassian",
    "cohort": "Target list",
    "category": "Big Tech / Core Tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Databricks",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Snowflake",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Cloudflare",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "MongoDB",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Confluent",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Elastic",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "HashiCorp",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Red Hat",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Canonical",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "DigitalOcean",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Vercel",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Netlify",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "GitHub",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "GitLab",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Docker",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "PlanetScale",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Supabase",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Cockroach Labs",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Tailscale",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Fastly",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Akamai",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Twilio",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Okta",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Auth0",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Sentry",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "Postman",
    "cohort": "Target list",
    "category": "Strong software / cloud / infrastructure",
    "rank": null,
    "website": null
  },
  {
    "name": "OpenAI",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Anthropic",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "DeepMind",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Cohere",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Scale AI",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Hugging Face",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Perplexity",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Cursor",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Anysphere",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Runway",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Character.AI",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Harvey",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Glean",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Figure AI",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Wayve",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Sierra",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Together AI",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Mistral AI",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Weights & Biases",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Labelbox",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Roboflow",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Deepgram",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "ElevenLabs",
    "cohort": "Target list",
    "category": "AI / ML companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Jane Street",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Hudson River Trading",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Citadel",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Citadel Securities",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "D. E. Shaw",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Two Sigma",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "IMC",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Optiver",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Akuna Capital",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Five Rings",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Jump Trading",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "DRW",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Old Mission",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Chicago Trading Company",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Belvedere Trading",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "SIG",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Aquatic Capital",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Walleye Capital",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "AQR",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Bridgewater",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Point72",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Millennium",
    "cohort": "Target list",
    "category": "Quant / trading / finance tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Stripe",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Robinhood",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Coinbase",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Ramp",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Brex",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Plaid",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Chime",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Affirm",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "SoFi",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Nubank",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Adyen",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Toast",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Square",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Fidelity",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Bloomberg",
    "cohort": "Target list",
    "category": "Fintech / payments",
    "rank": null,
    "website": null
  },
  {
    "name": "Anduril",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Palantir",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Blue Origin",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Relativity Space",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Rocket Lab",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Zipline",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Skydio",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Shield AI",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Saronic",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Applied Intuition",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Aurora",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Waymo",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Cruise",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Zoox",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Motional",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Kodiak Robotics",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Nuro",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Boston Dynamics",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "BAE Systems",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "L3Harris",
    "cohort": "Target list",
    "category": "Robotics / autonomy / aerospace / defense",
    "rank": null,
    "website": null
  },
  {
    "name": "Epic",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Tempus",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Flatiron Health",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Verily",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Benchling",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Recursion",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Insitro",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Natera",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Illumina",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "10x Genomics",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Guardant Health",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "BillionToOne",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "PathAI",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Freenome",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Color Health",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "GRAIL",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Moderna",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "UnitedHealth Group",
    "cohort": "Target list",
    "category": "Healthcare tech / bio / science software",
    "rank": null,
    "website": null
  },
  {
    "name": "Figma",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Notion",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Linear",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Airtable",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Asana",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Canva",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Duolingo",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Discord",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Reddit",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Pinterest",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Snap",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Roblox",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Unity",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Epic Games",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Riot Games",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Twitch",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Yelp",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Dropbox",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Box",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Zapier",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Webflow",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Squarespace",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Mercury",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Rippling",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Pylon",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Circleback",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "The Trade Desk",
    "cohort": "Target list",
    "category": "Developer/product/startup companies",
    "rank": null,
    "website": null
  },
  {
    "name": "Chipotle",
    "cohort": "Target list",
    "category": "Retail / logistics / consumer companies with tech internships",
    "rank": null,
    "website": null
  },
  {
    "name": "Instacart",
    "cohort": "Target list",
    "category": "Retail / logistics / consumer companies with tech internships",
    "rank": null,
    "website": null
  },
  {
    "name": "Etsy",
    "cohort": "Target list",
    "category": "Retail / logistics / consumer companies with tech internships",
    "rank": null,
    "website": null
  },
  {
    "name": "Booking Holdings",
    "cohort": "Target list",
    "category": "Retail / logistics / consumer companies with tech internships",
    "rank": null,
    "website": null
  },
  {
    "name": "Marriott",
    "cohort": "Target list",
    "category": "Retail / logistics / consumer companies with tech internships",
    "rank": null,
    "website": null
  },
  {
    "name": "Micron",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "ASML",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "TSMC",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "GlobalFoundries",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "NXP",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "onsemi",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "GE Aerospace",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "GE HealthCare",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "John Deere",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "Emerson",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "Eaton",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "Siemens",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "Schneider Electric",
    "cohort": "Target list",
    "category": "Industrial / manufacturing / semiconductor",
    "rank": null,
    "website": null
  },
  {
    "name": "The Hartford",
    "cohort": "Target list",
    "category": "Insurance / enterprise data / financial services",
    "rank": null,
    "website": null
  },
  {
    "name": "Liberty Mutual",
    "cohort": "Target list",
    "category": "Insurance / enterprise data / financial services",
    "rank": null,
    "website": null
  },
  {
    "name": "Prudential",
    "cohort": "Target list",
    "category": "Insurance / enterprise data / financial services",
    "rank": null,
    "website": null
  },
  {
    "name": "New York Life",
    "cohort": "Target list",
    "category": "Insurance / enterprise data / financial services",
    "rank": null,
    "website": null
  },
  {
    "name": "AIG",
    "cohort": "Target list",
    "category": "Insurance / enterprise data / financial services",
    "rank": null,
    "website": null
  },
  {
    "name": "Vanguard",
    "cohort": "Target list",
    "category": "Insurance / enterprise data / financial services",
    "rank": null,
    "website": null
  },
  {
    "name": "T. Rowe Price",
    "cohort": "Target list",
    "category": "Insurance / enterprise data / financial services",
    "rank": null,
    "website": null
  },
  {
    "name": "US Bank",
    "cohort": "Target list",
    "category": "Insurance / enterprise data / financial services",
    "rank": null,
    "website": null
  },
  {
    "name": "BNY Mellon",
    "cohort": "Target list",
    "category": "Insurance / enterprise data / financial services",
    "rank": null,
    "website": null
  },
  {
    "name": "Nasdaq",
    "cohort": "Target list",
    "category": "Insurance / enterprise data / financial services",
    "rank": null,
    "website": null
  },
  {
    "name": "Moody's",
    "cohort": "Target list",
    "category": "Insurance / enterprise data / financial services",
    "rank": null,
    "website": null
  },
  {
    "name": "T-Mobile",
    "cohort": "Target list",
    "category": "Telecom / media / entertainment tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Disney",
    "cohort": "Target list",
    "category": "Telecom / media / entertainment tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Spotify",
    "cohort": "Target list",
    "category": "Telecom / media / entertainment tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Take-Two Interactive",
    "cohort": "Target list",
    "category": "Telecom / media / entertainment tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Activision Blizzard",
    "cohort": "Target list",
    "category": "Telecom / media / entertainment tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Sony Interactive Entertainment",
    "cohort": "Target list",
    "category": "Telecom / media / entertainment tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Nintendo of America",
    "cohort": "Target list",
    "category": "Telecom / media / entertainment tech",
    "rank": null,
    "website": null
  },
  {
    "name": "Schlumberger",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Shell",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "BP",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Southern Company",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Tesla Energy",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Rivian",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Lucid",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Ford",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Toyota North America",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Hyundai",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "NASA",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "JPL",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Los Alamos National Laboratory",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Sandia National Laboratories",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Lawrence Livermore National Laboratory",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Oak Ridge National Laboratory",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Argonne National Laboratory",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Brookhaven National Laboratory",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Johns Hopkins Applied Physics Laboratory",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "MIT Lincoln Laboratory",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Carnegie Mellon Software Engineering Institute",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "SRI International",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "RAND Corporation",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "The Allen Institute",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Chan Zuckerberg Initiative",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Broad Institute",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "HHMI Janelia",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Mayo Clinic",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Cleveland Clinic",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "Stanford Health Care",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  },
  {
    "name": "UCSF",
    "cohort": "Target list",
    "category": "Energy / infrastructure companies with tech/data roles",
    "rank": null,
    "website": null
  }
];

